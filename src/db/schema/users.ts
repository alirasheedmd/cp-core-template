import { InferSelectModel, relations } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core'
import { orders } from './orders'
import { carts } from './carts'

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phoneNumber: text('phone_number'),
  buildingNo: text('buildingNo'),
  street: text('street'),
  district: text('district'),
  city: text('city'),
  province: text('province'),
  postalCode: text('postal_code'),
  secondaryNumber: text('secondaryNumber'),
  shortAddress: text('shortAddress'),
  unitNumber: text('unitNumber'),
  country: text('country'),
  paymentMethod: text('payment_method'),
  isPromotionalEmailFlag: boolean('is_promotional_email_flag'),
  profileImage: text('profile_image'),
  isAdmin: boolean('is_admin').default(false).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  verificationCode: text('verification_code'),
  verificationCodeExpiry: timestamp('verification_code_expiry'),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = InferSelectModel<typeof users>

export const userRelations = relations(users, ({ many, one }) => ({
  orders: many(orders),
  cart: one(carts),
}))
