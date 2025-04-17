"use client";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "@/lib/schemas/productSchema";
// import { CldUploadWidget } from "next-cloudinary";

export default function LeftSideForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          {...register("title")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">SKU</label>
        <input
          {...register("sku")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.sku && (
          <p className="mt-1 text-sm text-red-600">{errors.sku.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Barcode (Optional)</label>
        <input
          {...register("barcode")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          {...register("description")}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      {/* <div>
        <label className="block text-sm font-medium text-gray-700">Images</label>
        <CldUploadWidget
          uploadPreset="your_upload_preset"
          onSuccess={(result) => {
            console.log(result);
          }}
        >
          {({ open }) => (
            <button
              type="button"
              onClick={() => open()}
              className="mt-1 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Upload Images
            </button>
          )}
        </CldUploadWidget>
      </div> */}
    </div>
  );
} 