import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, text, timestamp, pgEnum } from "drizzle-orm/pg-core";


// Users table
export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export type User = InferSelectModel<typeof users>;
