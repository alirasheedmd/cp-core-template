'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { CustomerFormValues } from '@/components/admin/customers/addCustomer/CustomerInfo'
import {
  createCustomer as createCustomerInDb,
  updateCustomer as updateCustomerInDb,
} from '@/lib/dal'
// import { customerSchema } from '@/schemas/customer-form.schema'
import { Image } from '@/db/schema'

export type CustomerActionState = {
  status: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
  errors?: Record<string, string[]>
  data?: CustomerFormValues
}

export async function createCustomer(
  formData: FormData,
): Promise<CustomerActionState> {
  try {
    const categories = formData.get('categories')
      ? JSON.parse(formData.get('categories') as string)
      : []

    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const track_inventory = formData.get('trackInventory')?.toString()
    const trackInventory = Boolean(track_inventory)

    const is_physical_customer = formData.get('isPhysicalCustomer')?.toString()
    const isPhysicalCustomer = Boolean(is_physical_customer)

    const recommendedCustomers = formData.get('recommendedCustomers')
      ? JSON.parse(formData.get('recommendedCustomers') as string)
      : null

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      categories,
      trackInventory,
      isPhysicalCustomer,
      recommendedCustomers,
      images,
    }

    const validatedData = customerSchema.parse(data)

    // Save the customer to the database
    await createCustomerInDb(validatedData)

    // Revalidate the customers page to show the new customer
    revalidatePath('/admin/customers')

    return {
      status: 'success',
      message: 'Customer created successfully',
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
      message: 'Failed to create customer',
    }
  }
}

export async function updateCustomer(
  id: string,
  formData: FormData,
): Promise<CustomerActionState> {
  try {
    const categories = formData.get('categories')
      ? JSON.parse(formData.get('categories') as string)
      : []

    const images: Image[] = formData.get('images')
      ? JSON.parse(formData.get('images') as string)
      : []

    const track_inventory = formData.get('trackInventory')?.toString()
    const trackInventory = Boolean(track_inventory)

    const is_physical_customer = formData.get('isPhysicalCustomer')?.toString()
    const isPhysicalCustomer = Boolean(is_physical_customer)
    const recommendedCustomers = formData.get('recommendedCustomers')
      ? JSON.parse(formData.get('recommendedCustomers') as string)
      : null

    const rawData = Object.fromEntries(formData.entries())
    const data = {
      ...rawData,
      categories,
      trackInventory,
      isPhysicalCustomer,
      recommendedCustomers,
      images,
    }

    // Allow partial validation for updates
    const UpdateCustomerSchema = customerSchema.partial()
    const validationResult = UpdateCustomerSchema.safeParse(data)

    if (!validationResult.success) {
      return {
        status: 'error',
        message: 'Validation failed',
        errors: validationResult.error.flatten().fieldErrors,
      }
    }

    // Type safe update object with validated data
    const validatedData = validationResult.data

    // Save the customer to the database
    await updateCustomerInDb(id, validatedData as CustomerFormValues)

    // Revalidate the customers page to show the new customer
    revalidatePath('/admin/customers')

    return {
      status: 'success',
      message: 'Customer updated successfully',
      data: validatedData as CustomerFormValues,
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
      message: 'Failed to update customer',
    }
  }
}
