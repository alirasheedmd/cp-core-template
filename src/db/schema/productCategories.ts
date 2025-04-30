import { InferSelectModel, relations } from 'drizzle-orm';
import { pgTable, text } from 'drizzle-orm/pg-core';
import { products } from './products'; // Import products
import { categories } from './categories'; // Import categories

// ProductCategories junction table
export const productCategories = pgTable('product_categories', {
  productId: text('product_id').references(() => products.id), // Lazy reference to avoid circular issues
  categoryId: text('category_id').references(() => categories.id), // Lazy reference
});

// Type inference
export type ProductCategory = InferSelectModel<typeof productCategories>;

// Relations
export const productCategoryRelations = relations(productCategories, ({ one }) => ({
  product: one(products, {
    fields: [productCategories.productId],
    references: [products.id],
  }),
  category: one(categories, {
    fields: [productCategories.categoryId],
    references: [categories.id],
  }),
}));