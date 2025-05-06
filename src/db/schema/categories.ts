import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { productCategories } from './productCategories'
import { images } from './images'

// Categories table
export const categories = pgTable('categories', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  slug: text('slug').unique().notNull(),
  parentId: text('parent_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
})

export type Category = InferSelectModel<typeof categories>

export type ProductCategory = InferSelectModel<typeof productCategories>

export const categoryRelations = relations(categories, ({ many, one }) => ({
  products: many(productCategories),
  images: one(images),
}))
