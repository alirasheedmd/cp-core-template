import { z } from 'zod'

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, 'At least one image is required'),
  visibility: z.boolean().default(true),
  subcategories: z.array(z.string()).default([]),
})

// Subcategory Schema
export const subCategorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, 'At least one image is required'),
  visibility: z.boolean().default(true),
  parentCategory: z.string().min(1, 'Parent category is required'),
})
