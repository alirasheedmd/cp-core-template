'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { ProductFormValues } from '@/components/admin/products/addProduct/ProductInfo'
import {
  createProduct as createProductInDb,
  updateProduct as updateProductInDb,
} from '@/lib/dal'
import { productSchema } from '@/schemas/product-form.schema'
import { Image } from '@/db/schema'

export type ProductActionState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  errors?: Record<string, string[]>
  data?: ProductFormValues
}

export async function createProduct(
  formData: FormData,
): Promise<ProductActionState> {
  try {
    const categories = formData.get('categories')
      ? JSON.parse(formData.get('categories') as string)
      : []

    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      categories,
      images,
    }

    const validatedData = productSchema.parse(data)

    // Save the product to the database
    await createProductInDb(validatedData)

    // Revalidate the products page to show the new product
    revalidatePath('/admin/products')

    return {
      status: 'success',
      message: 'Product created successfully',
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

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ProductActionState> {
  try {
    const categories = formData.get('categories')
      ? JSON.parse(formData.get('categories') as string)
      : []

    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      categories,
      images,
    }

    // Allow partial validation for updates
    const UpdateProductSchema = productSchema.partial()
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

    // Save the product to the database
    await updateProductInDb(id, validatedData as ProductFormValues)

    // Revalidate the products page to show the new product
    revalidatePath('/admin/products')

    return {
      status: 'success',
      message: 'Product updated successfully',
      data: validatedData as ProductFormValues,
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
      message: 'Failed to update product',
    }
  }
}
