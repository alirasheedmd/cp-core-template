'use server'

import { compare, hash } from 'bcrypt'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { carts, users } from '@/db/schema'
import * as jose from 'jose'
import { cache } from 'react'
import { getUserByEmail, getUserById } from './dal'
import { eq } from 'drizzle-orm'

// JWT types
interface JWTPayload {
  userId: string
  isAdmin?: boolean
  [key: string]: string | number | boolean | null | undefined
}

// User type for verification result
export interface VerifiedUser {
  uid: string
  email: string
  verified: boolean
  isAdmin?: boolean
}

// Secret key for JWT signing (in a real app, use an environment variable)
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

// JWT expiration time
const JWT_EXPIRATION = '7d' // 7 days

// Token refresh threshold (refresh if less than this time left)
const REFRESH_THRESHOLD = 24 * 60 * 60 // 24 hours in seconds

// Hash a password
export async function hashPassword(password: string) {
  return hash(password, 10)
}

// Verify a password
export async function verifyPassword(password: string, hashedPassword: string) {
  return compare(password, hashedPassword)
}

// Create a new user
export async function createUser(
  email: string,
  password: string,
  isAdmin: boolean = false,
  firstName: string,
  lastName: string,
) {
  const hashedPassword = await hashPassword(password)
  const id = nanoid()

  try {
    await db.insert(users).values({
      id,
      email,
      password: hashedPassword,
      isAdmin,
      firstName,
      lastName,
    })

    return { id, email, isAdmin, firstName, lastName }
  } catch (error) {
    console.error('Error creating user:', error)
    return null
  }
}

// Generate a JWT token
export async function generateJWT(payload: JWTPayload) {
  return await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(JWT_EXPIRATION)
    .sign(JWT_SECRET)
}

// Verify a JWT token
export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET)
    return payload as JWTPayload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

// Verify a session using the session cookie
export async function verifySession(
  sessionCookie?: string,
): Promise<VerifiedUser | null> {
  try {
    if (!sessionCookie) {
      return null
    }

    // Verify the JWT token
    const payload = await verifyJWT(sessionCookie)
    if (!payload || !payload.userId) {
      return null
    }

    // Fetch the user from the database using DAL
    const user = await getUserById(payload.userId)

    if (!user) {
      return null
    }

    // In a real application, you would check if the email is verified
    return {
      uid: user.id,
      email: user.email,
      verified: true, // This should be from the database in a real application
      isAdmin: user.isAdmin,
    }
  } catch (error) {
    console.error('Session verification failed:', error)
    return null
  }
}

// Check if token needs refresh
export async function shouldRefreshToken(token: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
      clockTolerance: 15, // 15 seconds tolerance for clock skew
    })

    // Get expiration time
    const exp = payload.exp as number
    const now = Math.floor(Date.now() / 1000)

    // If token expires within the threshold, refresh it
    return exp - now < REFRESH_THRESHOLD
  } catch {
    // If verification fails, token is invalid or expired
    return false
  }
}

// Create a session using JWT
export async function createSession(userId: string, isAdmin: boolean = false) {
  try {
    // Create JWT with user data including isAdmin claim
    const token = await generateJWT({ userId, isAdmin })

    // Store JWT in a cookie
    const cookieStore = await cookies()
    cookieStore.set({
      name: 'session',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })

    // Handle cart merge
    const sessionCartId = cookieStore.get('sessionCartId')?.value
    if (!sessionCartId) {
      console.log('no cart cookie')
      return { error: 'Session Cart Not Found' }
    }

    const sessionCart = await db.query.carts.findFirst({
      where: eq(carts.sessionCartId, sessionCartId),
    })

    if (sessionCart && !sessionCart.userId) {
      const userCart = await db.query.carts.findFirst({
        where: (carts, { eq }) => eq(carts.userId, userId),
      })

      if (userCart) {
        cookieStore.set('beforeSigninSessionCartId', sessionCartId)
        cookieStore.set('sessionCartId', userCart.sessionCartId)
      } else {
        await db
          .update(carts)
          .set({ userId: userId })
          .where(eq(carts.id, sessionCart.id))
      }
    }

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    // During build time or static rendering, return null to avoid cookie errors
    if (
      typeof window === 'undefined' &&
      process.env.NEXT_PHASE === 'phase-production-build'
    ) {
      return null
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return null
    const payload = await verifyJWT(token)

    const sessionCartId = cookieStore.get('sessionCartId')?.value as string

    return payload
      ? {
          userId: payload.userId,
          isAdmin: payload.isAdmin,
          sessionCartId: sessionCartId,
        }
      : null
  } catch (error) {
    // Handle the specific prerendering or cookie access errors
    if (
      error instanceof Error &&
      (error.message.includes('During prerendering, `cookies()` rejects') ||
        error.message.includes('cookies'))
    ) {
      console.log(
        'Cookies not available during rendering, returning null session',
      )
      return null
    }

    console.error('Error getting session:', error)
    return null
  }
})

// Delete session by clearing the JWT cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Generate a 6-digit OTP
export async function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

// Store OTP for a user
export async function storeVerificationOTP(userId: string) {
  const otp = await generateOTP()
  const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  try {
    await db
      .update(users)
      .set({
        verificationCode: otp,
        verificationCodeExpiry: expires,
      })
      .where(eq(users.id, userId))

    return otp
  } catch (error) {
    console.error('Error storing verification OTP:', error)
    return null
  }
}

// Verify an OTP and mark user as verified
export async function verifyOTP(email: string, otp: string) {
  try {
    // Find user with the email
    const user = await getUserByEmail(email)

    if (!user) {
      return { success: false, error: 'User not found' }
    }

    // Check if OTP matches and hasn't expired
    const now = new Date()

    if (user.verificationCode !== otp) {
      return { success: false, error: 'Invalid verification code' }
    }

    if (!user.verificationCodeExpiry || user.verificationCodeExpiry < now) {
      return { success: false, error: 'Verification code has expired' }
    }

    // Update user to mark as verified and clear OTP
    await db
      .update(users)
      .set({
        isVerified: true,
        verificationCode: null,
        verificationCodeExpiry: null,
      })
      .where(eq(users.id, user.id))

    return { success: true, user }
  } catch (error) {
    console.error('Error verifying OTP:', error)
    return { success: false, error: 'An unexpected error occurred' }
  }
}

export async function createSessionCartId() {
  const cookieStore = await cookies()
  const hasSessionCartId = cookieStore.has('sessionCartId')

  if (!hasSessionCartId) {
    // Generate new sessionCartId
    const sessionCartId = crypto.randomUUID()

    // Store in cookie (secure, HTTP-only)
    cookieStore.set({
      name: 'sessionCartId',
      value: sessionCartId,
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
      sameSite: 'lax',
    })
    console.log('cartid created')
  }

  return cookieStore.get('sessionCartId')?.value
}
