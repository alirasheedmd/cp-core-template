import { z } from 'zod'
import { editContactInfoSchema } from './update-user.schema'

export const paymentMethodEnum = z.enum(['cash_on_delivery', 'bank_transfer'], {
  required_error: 'Please select a payment method',
})

export type PaymentMethodEnum = z.infer<typeof paymentMethodEnum>

export const checkoutFormSchema = z.object({
  // Contact Information
  email: z.string().email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/[\s\-\(\)]/g, '')) // Remove spaces, dashes, and parentheses
    .pipe(
      z
        .string()
        .regex(/^\+?[0-9]+$/, 'Must contain only numbers and optional + prefix')
        .min(8, 'Phone number must be at least 8 digits')
        .max(20, 'Phone number must not exceed 20 digits'),
    ),

  // Shipping Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  house: z.string().min(2, 'Please enter a valid house number'),
  street: z.string().min(2, 'Please enter a valid street name'),
  district: z.string().min(2, 'Please enter a valid district'),
  city: z.string().min(2, 'Please enter a valid city'),
  province: z.string().min(2, 'Please enter a valid province'),
  country: z.string().min(2, 'Please enter a valid country'),
  postalCode: z.string().optional(),
  secondaryNumber: z.string().optional(),
  unitNumber: z.string().optional(),
  shortAddress: z.string().optional(),

  // Payment Information
  paymentMethod: paymentMethodEnum,

  // Optional fields
  saveInfo: z.boolean().optional(),
  notes: z.string().optional(),
})

export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
})

export type PaymentResult = z.infer<typeof paymentResultSchema>

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>
export type PaymentMethod = z.infer<typeof paymentMethodEnum>

export type ShippingAddress = z.infer<typeof editContactInfoSchema>

