import { z } from 'zod'

/////////// ADMIN AUTH ///////////
// Form validation schema
export const createUserSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password must be less than 100 characters'),
})

// Form validation schema
export const signinSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
})

/////////// WEB AUTH ///////////
export const signupSchema = z.object({
  firstName: z.string().nonempty('Please Enter First Name'),
  lastName: z.string(),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})
