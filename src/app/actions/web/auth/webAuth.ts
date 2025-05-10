'use server'


import { db } from '@/db'
import { users } from '@/db/schema'
import { getUserByEmail } from '@/lib/dal'
import {
  verifyPassword,
  createSession,
  createUser,
  storeVerificationOTP,
  deleteSession,
  hashPassword,
} from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'
import { eq } from 'drizzle-orm'
import { signinSchema, signupSchema } from '@/schemas/auth.schema'


interface AuthState {
  error: string
  userId?: string
  email?: string
  needsVerification?: boolean
}

export async function customerSignIn(formData: FormData): Promise<AuthState> {
  // Validate the form data
  const validatedFields = signinSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: 'Invalid email or password',
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Find user by email
    const user = await getUserByEmail(email)

    if (!user) {
      return {
        error: 'Invalid email or password',
      }
    }

    // Check if email is verified
    if (!user.isVerified) {
      // Generate new OTP
      const otp = await storeVerificationOTP(user.id)

      if (otp) {
        // Send verification email
        await sendVerificationEmail(email, otp)
      }

      return {
        error: 'Please verify your email address before signing in',
        userId: user.id,
        email: user.email,
        needsVerification: true,
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)

    if (!isValidPassword) {
      return {
        error: 'Invalid email or password',
      }
    }

    // Create session (isAdmin is false for regular customers)
    await createSession(user.id, user.isAdmin || false)

    return { error: '' }
  } catch (error) {
    console.error('Customer signin error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function customerSignUp(formData: FormData): Promise<AuthState> {
  // Validate the form data
  const validatedFields = signupSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.errors[0].message || 'Invalid input',
    }
  }

  const { email, password, firstName, lastName } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return {
        error: 'An account with this email already exists',
      }
    }

    // Create new user (isAdmin is false by default)
    const user = await createUser(email, password, false, firstName, lastName)

    if (!user) {
      return {
        error: 'Failed to create account',
      }
    }

    // Generate OTP and send verification email
    const otp = await storeVerificationOTP(user.id)

    if (otp) {
      await sendVerificationEmail(email, otp)
      return {
        error: '',
        userId: user.id,
        email: user.email,
        needsVerification: true,
      }
    } else {
      return {
        error: 'Failed to generate verification code. Please try again.',
      }
    }
  } catch (error) {
    console.error('Customer signup error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function customerSignOut() {
  await deleteSession()
}



export const changePassword = async (email: string, password: string) => {
  try {
    const user = await getUserByEmail(email)

    if (!user) {
      throw new Error('User not found')
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.id, user.id))

    return { success: true, user }
  } catch (error) {
    console.error('Error verifying email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred',
    }
  }
}
