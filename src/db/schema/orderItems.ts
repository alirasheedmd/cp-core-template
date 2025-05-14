import { decimal, integer, pgTable, text } from "drizzle-orm/pg-core";
import { orders } from "./orders";
import { products } from "./products";
import { InferSelectModel, relations } from "drizzle-orm";

export const orderItems = pgTable("order_items", {
  id: text("id").primaryKey(),
  orderId: text("order_id").notNull().references(() => orders.id),
  productId: text("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull()
});

export type OrderItem = InferSelectModel<typeof orderItems>


export const orderItemsRelations = relations(orderItems, ({ one }) => ({
	order: one(orders, {
		fields: [orderItems.orderId],
		references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id]
    })
}));