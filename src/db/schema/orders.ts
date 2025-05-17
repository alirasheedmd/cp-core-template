import { InferSelectModel, relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  boolean,
  json,
  numeric,
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { orderItems } from './orderItems'
import { PaymentResult, ShippingAddress } from '@/schemas/checkout-form.schema'

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  shippingAddress: json('shippingAddress').$type<ShippingAddress>().notNull(),
  paymentMethod: text('paymentMethod').notNull(),
  paymentResult: json('paymentResult').$type<PaymentResult>(),
  itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
  isPaid: boolean('isPaid').notNull().default(false),
  paidAt: timestamp('paidAt'),
  isDelivered: boolean('isDelivered').notNull().default(false),
  deliveredAt: timestamp('deliveredAt'),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
})

export type Order = InferSelectModel<typeof orders>

export const orderRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  orderItems: many(orderItems),
}))
