import { InferSelectModel, relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  pgEnum,
  decimal,
} from 'drizzle-orm/pg-core'
import { users } from './users'
import { payments } from './payments';
import { orderItems } from './orderItems';

export const orderStatusEnum = pgEnum('order_status', [
  "pending",       
  "processing",   
  "shipped",       
  "delivered",   
  "cancelled",    
  "returned",     
  "refunded"   
]);

export const orders = pgTable("orders", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow()
});

export type Order = InferSelectModel<typeof orders>

export const orderRelations = relations(orders, ({ one, many }) => ({
  payments: one(payments),
  user: one(users, {
		fields: [orders.userId],
		references: [users.id],
  }),
  orderItems: many(orderItems)
}))
