import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, primaryKey, text } from 'drizzle-orm/pg-core'
import { products } from './products' // Import products
import { categories } from './categories' // Import categories

// ProductCategories junction table
export const productCategories = pgTable(
  'product_categories',
  {
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }), // Lazy reference to avoid circular issues
    categoryId: text('category_id')
      .notNull()
      .references(() => categories.id, { onDelete: 'cascade' }), // Lazy reference
  },
  (table) => [primaryKey({ columns: [table.productId, table.categoryId] })],
)

// Type inference
export type ProductCategoryJoin = InferSelectModel<typeof productCategories>

// Relations
export const productCategoryRelations = relations(
  productCategories,
  ({ one }) => ({
    product: one(products, {
      fields: [productCategories.productId],
      references: [products.id],
    }),
    category: one(categories, {
      fields: [productCategories.categoryId],
      references: [categories.id],
    }),
  }),
)
