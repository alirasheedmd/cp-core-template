import { json, numeric, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { InferSelectModel, relations } from "drizzle-orm";
import { CartItem } from "@/types";

export const carts = pgTable("carts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  sessionCartId: text('sessionCartId').notNull(),
  items: json('items').$type<CartItem[]>().notNull().default([]),
  itemsPrice: numeric('itemsPrice', { precision: 12, scale: 2 }).notNull(),
  shippingPrice: numeric('shippingPrice', {
    precision: 12,
    scale: 2,
  }).notNull(),
  taxPrice: numeric('taxPrice', { precision: 12, scale: 2 }).notNull(),
  totalPrice: numeric('totalPrice', { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp('createdAt').notNull().defaultNow(),
});

export type Cart = InferSelectModel<typeof carts>


export const cartsRelations = relations(carts, ({ one }) => ({
    user: one(users, {
        fields: [carts.userId],
        references: [users.id]
    })
}));