import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, timestamp, pgEnum } from 'drizzle-orm/pg-core'
import { productCategories } from './productCategories'
import { images } from './images'

export const categoryStatusEnum = pgEnum('category_status', [
  'enable',
  'disable',
])

export type CategoryStatus = (typeof categoryStatusEnum.enumValues)[number]

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull().unique(),
  status: categoryStatusEnum('status').notNull().default('enable'),
  slug: text('slug').unique().notNull(),
  parentId: text('parent_id'),
  pageTitle: text('page_title'),
  metaKeyword: text('meta_keyword'),
  metaDescription: text('meta_description'),
  urlHandle: text('url_handle'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Category = InferSelectModel<typeof categories>

export type ProductCategory = InferSelectModel<typeof productCategories>

export const categoryRelations = relations(categories, ({ many, one }) => ({
  products: many(productCategories),
  images: one(images),
}))
