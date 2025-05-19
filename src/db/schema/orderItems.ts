import {
  integer,
  numeric,
  pgTable,
  primaryKey,
  text,
} from 'drizzle-orm/pg-core'
import { orders } from './orders'
import { products } from './products'
import { InferSelectModel, relations } from 'drizzle-orm'

export const orderItems = pgTable(
  'order_items',
  {
    orderId: text('order_id')
      .notNull()
      .references(() => orders.id, { onDelete: 'cascade' }),
    productId: text('product_id')
      .notNull()
      .references(() => products.id, { onDelete: 'cascade' }),
    quantity: integer('quantity').notNull(),
    price: numeric('price', { precision: 12, scale: 2 }).notNull(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
    image: text('image').notNull(),
  },
  (table) => [primaryKey({ columns: [table.orderId, table.productId] })],
)

export type OrderItem = InferSelectModel<typeof orderItems>

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}))
