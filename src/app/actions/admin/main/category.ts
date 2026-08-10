'use server'

import { CategoryFormValues } from '@/components/admin/categories/addCategory/CategoryInfo'
import { categorySchema, subCategorySchema } from '@/schemas/category.schema'
import {
  createCategory as createCategoryInDb,
  updateCategory as updateCategoryInDb,
  createSubcategory as createSubcategoryInDb,
  updateSubcategory as updateSubcategoryInDb,
} from '@/lib/dal'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { SubcategoryFormValues } from '@/components/admin/categories/addSubCategory/SubcategoryInfo'
import { Image } from '@/db/schema'

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
  formData: FormData,
): Promise<CategoryActionState> {
  try {
    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      images,
    }
    const validatedData = categorySchema.parse(data)

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
      error.issues.forEach((err) => {
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

export async function updateCategory(
  id: string,
  formData: FormData,
): Promise<CategoryActionState> {
  try {
    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      images,
    }

    // Allow partial validation for updates
    const UpdateProductSchema = categorySchema.partial()
    const validationResult = UpdateProductSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        status: 'error',
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Type safe update object with validated data
    const validatedData = validationResult.data

    // Save the category to the database
    await updateCategoryInDb(id, validatedData as CategoryFormValues)

    // Revalidate the categories page to show the new category
    revalidatePath('/admin/categories')

    return {
      status: 'success',
      message: 'Category created successfully',
      data: validatedData as CategoryFormValues,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.issues.forEach((err) => {
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
  formData: FormData,
): Promise<SubcategoryActionState> {
  try {
    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const parentId = formData.get('parentId')?.toString()
    const name = formData.get('name')?.toString()
    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      parentId,
      name,
      images,
    }
    const validatedData = subCategorySchema.parse(data)

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
      error.issues.forEach((err) => {
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

export async function updateSubcategory(
  id: string,
  formData: FormData,
): Promise<SubcategoryActionState> {
  try {
    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const parentId = formData.get('parentId')?.toString()
    const name = formData.get('name')?.toString()
    const rawData = Object.fromEntries(formData.entries())
    console.log('Raw Data:', rawData)
    const data = {
      ...rawData,
      parentId,
      name,
      images,
    }

    // Allow partial validation for updates
    const UpdateProductSchema = subCategorySchema.partial()
    const validationResult = UpdateProductSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        status: 'error',
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Type safe update object with validated data
    const validatedData = validationResult.data

    // Save the category to the database
    await updateSubcategoryInDb(id, validatedData as SubcategoryFormValues)

    // Revalidate the categories page to show the new category
    revalidatePath('/admin/categories')

    return {
      status: 'success',
      message: 'Category created successfully',
      data: validatedData as SubcategoryFormValues,
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {}
      error.issues.forEach((err) => {
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
