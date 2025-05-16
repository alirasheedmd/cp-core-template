import { formatCurrency } from "@/lib/utils";
import { z } from "zod";

export const cartItemSchema = z.object({
    productId: z.string().min(1, 'Product is required'),
    name: z.string().min(1, 'Name is required'),
    slug: z.string().min(1, 'Slug is required'),
    qty: z.number().int().nonnegative('Quantity must be a non-negative number'),
    image: z.string().min(1, 'Image is required'),
    price: z.number().refine((value) => /^\d+(\.\d{2})?$/.test(formatCurrency(value)),
    'Price must have exactly two decimal places (e.g, 49.99)')
})