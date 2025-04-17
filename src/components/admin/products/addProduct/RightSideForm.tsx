"use client";	
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/schemas/productSchema";

export default function RightSideForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Status</label>
        <select
          {...register("status")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>
        {errors.status && (
          <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Publish Date</label>
        <input
          type="date"
          {...register("publishDate")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.publishDate && (
          <p className="mt-1 text-sm text-red-600">{errors.publishDate.message}</p>
        )}
      </div>
    </div>
  );
} 