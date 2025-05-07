import { InferSelectModel } from 'drizzle-orm'
import { pgTable, text, timestamp, boolean, } from 'drizzle-orm/pg-core'

// Users table
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phoneNumber: text('phone_number'),
  address: text('address'),
  city: text('city'),
  province: text('province'),
  zipCode: text('zip_code'),
  country: text('country'),
  profileImage: text('profile_image'),
  isAdmin: boolean('is_admin').default(false).notNull(),
  isVerified: boolean('is_verified').default(false).notNull(),
  verificationCode: text('verification_code'),
  verificationCodeExpiry: timestamp('verification_code_expiry'),
  resetPasswordToken: text('reset_password_token').unique(),
  resetPasswordTokenExpiry: timestamp('reset_password_token_expiry'),
  lastLoginAt: timestamp('last_login_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type User = InferSelectModel<typeof users>