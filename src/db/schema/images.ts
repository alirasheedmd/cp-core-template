import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { products } from './products'
import { categories } from './categories'

// Images table with Shopify-like structure
export const images = pgTable('images', {
  id: text('id').primaryKey(),
  alt: text('alt').notNull(),
  src: text('src').notNull(),
  blurhash: text('blurhash').notNull(),
  isMain: boolean('is_main').default(false),
  productId: text('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  categoryId: text('category_id').references(() => categories.id, {
    onDelete: 'cascade',
  }),
})

export type Image = InferSelectModel<typeof images>

export const imagesRelations = relations(images, ({ one }) => ({
  product: one(products, {
    fields: [images.productId],
    references: [products.id],
  }),
  category: one(images, {
    fields: [images.categoryId],
    references: [images.id],
  }),
}))
