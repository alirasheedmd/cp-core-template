import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { users } from "./users";
import { products } from "./products";
import { InferSelectModel, relations } from "drizzle-orm";

export const cartItems = pgTable("cart_items", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  productId: text("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull()
});

export type CartItem = InferSelectModel<typeof cartItems>


export const cartItemsRelations = relations(cartItems, ({ one }) => ({
    user: one(users, {
        fields: [cartItems.userId],
        references: [users.id]
    }),
    product: one(products, {
        fields: [cartItems.productId],
        references: [products.id]
    })
}));