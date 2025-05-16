'use server'

import { CustomerInfoFormValues } from '@/components/web/customer/CustomerForm'
import { updateUserInfo } from '@/lib/dal'
import { editContactInfoSchema } from '@/schemas/update-user.schema'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export interface ProfileActionState {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  errors?: Record<string, string[]>
  data?: CustomerInfoFormValues
}

export async function updateUserProfile(
  prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = editContactInfoSchema.parse(rawData)

    await updateUserInfo(validatedData)

    revalidatePath('/profile')

    return {
      status: 'success',
      message: 'User Info updated successfully',
      data: validatedData,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.errors.forEach((err) => {
        const path = err.path[0] as string
        if (!errors[path]) {
          errors[path] = []
        }
        errors[path].push(err.message)
      })

      return {
        status: 'error',
        message: 'Validation failed',
        errors,
      }
    }
    return {
      status: 'error',
      message: 'Failed to create product',
    }
  }
}
