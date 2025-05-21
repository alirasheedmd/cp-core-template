"use server";

import { CategoryFormValues } from '@/components/admin/categories/addCategory/CategoryInfo'
import { categorySchema, subCategorySchema } from '@/schemas/category.schema'
import {
  createCategory as createCategoryInDb,
  createSubcategory as createSubcategoryInDb,
} from '@/lib/dal'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { SubcategoryFormValues } from '@/components/admin/categories/addSubCategory/SubcategoryInfo'

export type CategoryActionState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  errors?: Record<string, string[]>
  data?: CategoryFormValues
}

export type SubcategoryActionState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  errors?: Record<string, string[]>
  data?: SubcategoryFormValues
}

export async function createCategory(
  state: CategoryActionState,
  formData: FormData,
): Promise<CategoryActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = categorySchema.parse(rawData)

    // Save the category to the database
    await createCategoryInDb(validatedData)

    // Revalidate the categories page to show the new category
    revalidatePath('/admin/categories')

    return {
      status: 'success',
      message: 'Category created successfully',
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
      message: 'Failed to create category',
    }
  }
}

export async function createSubcategory(
  state: SubcategoryActionState,
  formData: FormData,
): Promise<SubcategoryActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries())
    const validatedData = subCategorySchema.parse(rawData)

    // Save the category to the database
    await createSubcategoryInDb(validatedData)

    // Revalidate the categories page to show the new category
    revalidatePath('/admin/categories')

    return {
      status: 'success',
      message: 'Category created successfully',
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
      message: 'Failed to create category',
    }
  }
}
