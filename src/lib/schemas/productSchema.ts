import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["draft", "published", "archived"]),
  publishDate: z.string().min(1, "Publish date is required"),
  images: z.array(z.string()).optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>; 