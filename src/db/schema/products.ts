import { InferSelectModel, relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  numeric,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core'
import { productCategories } from './productCategories'
import { images } from './images'

export const productStatusEnum = pgEnum('product_status', [
  'active',
  'inactive',
])

// Products table with Shopify-like structure
export const products = pgTable('products', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  sku: text('sku').notNull().unique(),
  barcode: text('barcode'),
  description: text('description'),
  status: productStatusEnum('status').notNull().default('inactive'),
  publishDate: timestamp('publish_date'),

  // Price information
  price: numeric('price').notNull(),
  pricePerItem: numeric('price_per_item'),
  costPrice: numeric('cost_price'),
  profit: numeric('profit'),
  margin: numeric('margin'),
  defaultPrice: numeric('default_price'),
  customPrice: numeric('custom_price'),
  tax: numeric('tax'),

  // Inventory
  trackInventory: boolean('track_inventory').default(false),
  currentStock: numeric('current_stock'),
  lowStockThreshold: numeric('low_stock_threshold'),
  damageStock: numeric('damage_stock'),

  // Shipping
  isPhysicalProduct: boolean('is_physical_product').default(true),
  shippingPrice: numeric('shipping_price'),
  weight: numeric('weight'),
  weightUnit: text('weight_unit'),
  height: numeric('height'),
  width: numeric('width'),
  length: numeric('length'),
  country: text('country'),
  hsCode: text('hs_code'),

  // Organization
  type: text('type'),
  collection: text('collection'),
  organization: text('organization'),
  tag: text('tag'),

  // SEO
  pageTitle: text('page_title'),
  metaDescription: text('meta_description'),
  urlHandle: text('url_handle'),

  slug: text('slug').unique().notNull(),

  // Store recommended products as JSONB
  recommendedProducts: jsonb('recommended_products').default([]),

  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Product = InferSelectModel<typeof products>

export const productRelations = relations(products, ({ many }) => ({
  categories: many(productCategories),
  images: many(images),
}))
