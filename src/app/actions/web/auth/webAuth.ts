'use server'

import { z } from 'zod'
import { getUserByEmail } from '@/lib/dal'
import { verifyPassword, createSession, createUser, deleteSession } from '@/lib/auth'

// Form validation schemas
const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

const signupSchema = z.object({
  firstName: z.string().nonempty("Please Enter First Name"),
  lastName: z.string(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

interface AuthState {
  error: string
}

export async function customerSignIn(
  formData: FormData
): Promise<AuthState> {
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

export async function customerSignUp(
  formData: FormData
): Promise<AuthState> {
  // Validate the form data
  const validatedFields = signupSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
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

    return { error: '' }
  } catch (error) {
    console.error('Customer signup error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }
}

export async function customerLogOut(
): Promise<AuthState> {
  await deleteSession()
  return { error: '' }
}
