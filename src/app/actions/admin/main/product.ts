"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  ProductFormValues,
  productSchema,
} from "@/components/admin/products/addProduct/ProductInfo";

export type ActionState = {
  status: "idle" | "submitting" | "success" | "error";
  message?: string;
  errors?: Record<string, string[]>;
  data?: ProductFormValues;
};

export async function createProduct(formData: FormData): Promise<ActionState> {
  try {
    const rawData = Object.fromEntries(formData.entries());
    const validatedData = productSchema.parse(rawData);

    // Here you would typically save the product to your database
    // For now, we'll just simulate a successful save
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Revalidate the products page to show the new product
    revalidatePath("/admin/products");

    return {
      status: "success",
      message: "Product created successfully",
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string[]> = {};
      error.errors.forEach((err) => {
        const path = err.path[0] as string;
        if (!errors[path]) {
          errors[path] = [];
        }
        errors[path].push(err.message);
      });

      return {
        status: "error",
        message: "Validation failed",
        errors,
      };
    }
    return {
      status: "error",
      message: "Failed to create product",
    };
  }
}
