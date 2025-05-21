import { z } from 'zod'

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
    .min(1, 'At least one image is required').optional(),
  status: z.enum(['enable', 'disable'], { required_error: 'Status is required' }),
  slug: z.string().min(1, 'Slug is required'),
  pageTitle: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaKeyword: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaDescription: z
    .string()
    .max(100, 'Meta description must be 160 characters or less')
    .optional(),
  urlHandle: z.string().optional(),
  parentId: z.string().min(1, 'Parent category is required'),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .optional(),
  status: z.enum(['enable', 'disable'], { required_error: 'Status is required' }),
  slug: z.string().min(1, 'Slug is required'),
  pageTitle: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaKeyword: z
    .string()
    .max(70, 'Page title must be 70 characters or less')
    .optional(),
  metaDescription: z
    .string()
    .max(100, 'Meta description must be 160 characters or less')
    .optional(),
  urlHandle: z.string().optional(),
})

