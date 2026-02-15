import { z } from 'zod'
////////////// Create Customer //////////////

export const customerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  language: z.string().min(1, 'Language is required'),
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
  buildingNo: z.string().min(1, 'House No./ Building No. is required'),
  street: z.string().min(1, 'Street name/no. is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  secondaryNumber: z.string().optional(),
  shortAddress: z.string().optional(),
  unitNumber: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
  tag: z.string().optional(),
  notes: z.string().optional()
})

////////////// Edit Contact Information //////////////

export const editContactInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
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
  buildingNo: z.string().min(1, 'House No./ Building No. is required'),
  street: z.string().min(1, 'Street name/no. is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  secondaryNumber: z.string().optional(),
  shortAddress: z.string().optional(),
  unitNumber: z.string().optional(),
  country: z.string().min(1, 'Country is required'),
})

////////////// Edit Shipping Address //////////////

export const editShippingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
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
  buildingNo: z.string().min(1, 'House No./ Building No. is required'),
  street: z.string().min(1, 'Street name/no. is required'),
  district: z.string().min(1, 'District is required'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
  country: z.string().min(1, 'Country is required'),
  secondaryNumber: z.string().optional(),
  shortAddress: z.string().optional(),
  unitNumber: z.string().optional(),
})
