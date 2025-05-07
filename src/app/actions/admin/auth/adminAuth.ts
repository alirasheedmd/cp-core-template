'use server'

import { nanoid } from 'nanoid'
import { createAdminUser } from '@/lib/dal'
import { getUserByEmail } from '@/lib/dal'
import { hashPassword } from '@/lib/auth'
import { deleteSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { verifyPassword, createSession } from '@/lib/auth'
import { routes } from '@/config/routes'
import { createUserSchema, signinSchema } from '@/schemas/auth.schema'

/////// CREATE NEW ADMIN USER /////////
interface CreateUserState {
  success: boolean
  error: string
  fields?: {
    email?: string[]
    password?: string[]
  }
  user: {
    id: string
    email: string
  } | null
}

export async function createNewAdminUser(
  prevState: CreateUserState,
  formData: FormData,
): Promise<CreateUserState> {
  // Validate the form data
  const validatedFields = createUserSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
      fields: validatedFields.error.flatten().fieldErrors,
      user: null,
    }
  }

  const { email, password } = validatedFields.data

  try {
    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return {
        success: false,
        error: 'A user with this email already exists',
        user: null,
      }
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // Create a new user ID
    const id = nanoid()

    // Create the user
    const user = await createAdminUser({
      id,
      email,
      password: hashedPassword,
    })

    if (!user) {
      return {
        success: false,
        error: 'Error creating account. Please try again.',
        user: null,
      }
    }

    return {
      success: true,
      error: '',
      user: {
        id: user.id,
        email: user.email,
      },
    }
  } catch (error) {
    console.error('Create admin user error:', error)
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
      user: null,
    }
  }
}

///////// SIGN IN //////////
interface SignInState {
  error: string
}

export async function adminSignIn(
  prevState: SignInState,
  formData: FormData,
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

    if (!isValidPassword) {
      return {
        error: 'Invalid email or password',
      }
    }

    // Create session
    await createSession(user.id, user.isAdmin)
    success = true
  } catch (error) {
    console.error('Admin signin error:', error)
    return {
      error: 'An unexpected error occurred. Please try again.',
    }
  }

  // Redirect only if authentication was successful
  if (success) {
    redirect(routes.admin.dashboard)
  }

  // This should never be reached if success is true
  return { error: '' }
}

/////// LOG OUT /////////
export async function logout() {
  await deleteSession()
  redirect(routes.admin.signin)
}
