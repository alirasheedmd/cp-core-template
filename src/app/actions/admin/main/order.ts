'use server'

import { deleteOrder as deleteOrderInDB } from '@/lib/dal'
import { revalidatePath } from 'next/cache'

/**
 * Types for order management actions
 */
export type OrderActionResponse = {
  success: boolean
  error?: string
  status?: 'success' | 'error'
}

export type UpdateOrderContactInfoState = {
  success?: boolean
  error?: string
  orderId?: string
  phoneNumber?: string
  updateProfile?: boolean
  status?: 'success' | 'error'
}

export type UpdateOrderShippingInfoState = {
  success?: boolean
  error?: string
  orderId?: string
  fullName?: string
  phoneNumber?: string
  street?: string
  apartment?: string
  city?: string
  postalCode?: string
  updateProfile?: boolean
  status?: 'success' | 'error'
}

/**
 * Updates the contact information for an order.
 * This server action will be called from the client to update order contact details.
 * Replace the TODO section with actual database logic when integrating.
 */
export async function updateOrderContactInfo(
  state: UpdateOrderContactInfoState,
): Promise<UpdateOrderContactInfoState> {
  const orderId = state.orderId
  const phoneNumber = state.phoneNumber
  const updateProfile = state.updateProfile

  try {
    // TODO: Replace with actual database/API call
    console.log('Updating order:', orderId, 'with phone number:', phoneNumber)

    if (updateProfile) {
      // TODO: Add logic to update user profile
      console.log('Updating user profile with new phone number')
    }

    revalidatePath(`/admin/orders/${orderId}`)

    return {
      success: true,
      status: 'success',
      orderId,
      phoneNumber,
      updateProfile,
    }
  } catch (error) {
    console.error('Error updating order contact info:', error)
    return {
      error: 'Failed to update contact information',
      status: 'error',
      orderId,
      phoneNumber,
      updateProfile,
    }
  }
}

/**
 * Updates the shipping information for an order.
 * This server action will be called from the client to update order shipping details.
 * Replace the TODO section with actual database logic when integrating.
 */
export async function updateOrderShippingInfo(
  state: UpdateOrderShippingInfoState,
): Promise<UpdateOrderShippingInfoState> {
  const {
    orderId,
    fullName,
    phoneNumber,
    street,
    apartment,
    city,
    postalCode,
    updateProfile,
  } = state

  try {
    // TODO: Replace with actual database/API call
    console.log('Updating order:', orderId, 'with shipping details:', {
      fullName,
      phoneNumber,
      street,
      apartment,
      city,
      postalCode,
    })

    if (updateProfile) {
      // TODO: Add logic to update user profile
      console.log('Updating user profile with new shipping details')
    }

    revalidatePath(`/admin/orders/${orderId}`)

    return {
      success: true,
      status: 'success',
      orderId,
      fullName,
      phoneNumber,
      street,
      apartment,
      city,
      postalCode,
      updateProfile,
    }
  } catch (error) {
    console.error('Error updating order shipping info:', error)
    return {
      error: 'Failed to update shipping information',
      status: 'error',
      orderId,
      fullName,
      phoneNumber,
      street,
      apartment,
      city,
      postalCode,
      updateProfile,
    }
  }
}

/**
 * Deletes an order by orderId.
 * This server action will be called from the client to delete an order.
 * Replace the TODO section with actual database logic when integrating.
 * @param orderId - The ID of the order to delete
 * @returns { success: boolean, error?: string }
 */
export async function deleteOrder(
  orderId: string,
): Promise<OrderActionResponse> {
  try {
    await deleteOrderInDB(orderId)
    console.log('Deleting order:', orderId)

    // Invalidate/revalidate the orders list and order detail page
    revalidatePath('/admin/orders')
    revalidatePath(`/admin/orders/${orderId}`)

    return { success: true, status: 'success' }
  } catch (error) {
    console.error('Error deleting order:', error)
    return {
      success: false,
      error: 'Failed to delete order',
      status: 'error',
    }
  }
}

/**
 * Updates the status of an order.
 * This server action will be called from the client to update order status.
 * Replace the TODO section with actual database logic when integrating.
 * @param orderId - The ID of the order to update
 * @param status - The new status to set
 * @returns { success: boolean, error?: string }
 */
export async function updateOrderStatus(
  orderId: string,
  status: string,
): Promise<OrderActionResponse> {
  try {
    // TODO: Replace with actual database/API call
    console.log('Updating order status:', orderId, 'to:', status)

    revalidatePath(`/admin/orders/${orderId}`)
    revalidatePath('/admin/orders')

    return { success: true, status: 'success' }
  } catch (error) {
    console.error('Error updating order status:', error)
    return {
      success: false,
      error: 'Failed to update order status',
      status: 'error',
    }
  }
}

/**
 * Fetches an order by ID.
 * This server action will be called from the client to fetch order details.
 * Replace the TODO section with actual database logic when integrating.
 * @param orderId - The ID of the order to fetch
 * @returns The order data or null if not found
 */
export async function getOrderById(orderId: string) {
  try {
    // TODO: Replace with actual database/API call
    console.log('Fetching order:', orderId)

    // Return null for now, will be replaced with actual data fetching
    return null
  } catch (error) {
    console.error('Error fetching order:', error)
    throw new Error('Failed to fetch order')
  }
}
