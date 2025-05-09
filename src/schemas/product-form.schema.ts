import { z } from 'zod'

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  sku: z.string().min(1, 'SKU is required'),
  barcode: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['active', 'inactive']),
  publishDate: z.string().min(1, 'Publish date is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  subcategories: z.array(z.string()).default([]),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, 'At least one image is required'),
  price: z.string().min(1, 'Price is required'),
  pricePerItem: z.string().optional(),
  profit: z.string().optional(),
  margin: z.string().optional(),
  defaultPrice: z.string().optional(),
  customPrice: z.string().optional(),
  tax: z.string().optional(),
  currentStock: z.string().optional(),
  lowStock: z.string().optional(),
  damageProduct: z.string().optional(),
  shippingPrice: z.string().optional(),
  weight: z.string().optional(),
  width: z.string().optional(),
  length: z.string().optional(),
  height: z.string().optional(),
  country: z.string().optional(),
  hsCode: z.string().optional(),
  pageTitle: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaDescription: z
    .string()
    .max(100, 'Meta description must be 100 characters or less')
    .optional(),
  urlHandle: z.string().optional(),
  type: z.string().optional(),
  collection: z.string().optional(),
  organization: z.string().optional(),
  tag: z.string().optional(),
  recommendedProducts: z
    .array(
      z.object({
        _id: z.string(),
        name: z.string(),
      }),
    )
    .default([])
    .optional(),
})
