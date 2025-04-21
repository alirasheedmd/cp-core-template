'use server'

import { compare, hash } from 'bcrypt'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { db } from '@/db'
import { users } from '@/db/schema'
import * as jose from 'jose'
import { cache } from 'react'
import { getUserById } from './dal'

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

    return true
  } catch (error) {
    console.error('Error creating session:', error)
    return false
  }
}

// Get current session from JWT
export const getSession = cache(async () => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('session')?.value

    if (!token) return null
    const payload = await verifyJWT(token)

    return payload
      ? {
          userId: payload.userId,
          isAdmin: payload.isAdmin,
        }
      : null
  } catch (error) {
    // Handle the specific prerendering error
    if (
      error instanceof Error &&
      error.message.includes('During prerendering, `cookies()` rejects')
    ) {
      console.log(
        'Cookies not available during prerendering, returning null session',
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
