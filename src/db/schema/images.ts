import { InferSelectModel } from 'drizzle-orm'
import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { products } from './products'

// Images table with Shopify-like structure
export const images = pgTable('images', {
    id: text('id').primaryKey(),
    alt: text('alt').notNull(),
    src: text('src').notNull(),
    blurhash: text('blurhash').notNull(),
    isMain: boolean('is_main').default(false),
    productId: text('product_id').references(() => products.id)
  })

export type Image = InferSelectModel<typeof images>





