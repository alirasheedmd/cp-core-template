import { z } from 'zod'
import { editContactInfoSchema } from './update-user.schema'
import { orders } from '@/db/schema/orders'
import { orderItems } from '@/db/schema/orderItems'
import { createInsertSchema } from 'drizzle-zod'

export const insertOrderSchema = createInsertSchema(orders, {
  shippingAddress: editContactInfoSchema,
  paymentResult: z
    .object({
      id: z.string(),
      status: z.string(),
      email_address: z.string(),
      pricePaid: z.string(),
    })
    .optional(),
})

export const insertOrderItemSchema = createInsertSchema(orderItems, {
  price: z.number(),
})
