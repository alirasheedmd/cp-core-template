'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation'
import { getUserByEmail } from '@/lib/dal'
import { verifyPassword, createSession } from '@/lib/auth'

// Form validation schema
const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

interface SignInState {
  error: string;
}

export async function adminSignIn(
  prevState: SignInState, 
  formData: FormData
): Promise<SignInState> {
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
  let success = false

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

    console.log(isValidPassword)

    if (!isValidPassword) {
      return {
        error: 'Invalid email or password',
      }
    }

    // Create session
    await createSession(user.id)
    success = true
  } catch (error) {
    console.error('Admin signin error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }

  // Redirect only if authentication was successful
  if (success) {
    redirect('/admin/dashboard')
  }
  
  // This should never be reached if success is true
  return { error: '' }
} 