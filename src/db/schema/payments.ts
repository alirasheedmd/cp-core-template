import { decimal, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { InferSelectModel, relations } from "drizzle-orm";

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",     
  "completed",   
  "failed",     
  "refunded",  
  "cancelled"   
])

export const payments = pgTable("payments", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  paymentMethod: text("payment_method"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  status: paymentStatusEnum("status").notNull().default('pending'),
  createdAt: timestamp("created_at").defaultNow()
});

export type Payment = InferSelectModel<typeof payments>


export const paymentsRelations = relations(payments, ({ one }) => ({
	order: one(orders, { fields: [payments.orderId], references: [orders.id] }),
}));