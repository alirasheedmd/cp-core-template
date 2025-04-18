"use client";
import { useFormContext } from "react-hook-form";
import { ProductFormValues } from "./ProductInfo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function LeftSideForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>();

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm">
          Title
        </Label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter product title"
          className={`${errors.title ? "border-destructive" : "border-black"}`}
        />
        {errors.title && (
          <p className="text-destructive text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sku" className="text-sm">
          SKU
        </Label>
        <Input
          id="sku"
          {...register("sku")}
          placeholder="Enter product sku"
          className={`${errors.sku ? "border-destructive" : "border-black"}`}
        />
        {errors.sku && (
          <p className="text-destructive text-sm">{errors.sku.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="barcode" className="text-sm">
          Barcode (Optional)
        </Label>
        <Input
          id="barcode"
          {...register("barcode")}
          placeholder="Enter product barcode"
          className={`${errors.barcode ? "border-destructive" : "border-black"}`}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm">
          Description
        </Label>
        <Textarea
          id="description"
          {...register("description")}
          placeholder="Enter product description"
          rows={4}
          className={`${errors.description ? "border-destructive" : "border-black"} h-48`}
        />
        {errors.description && (
          <p className="text-destructive text-sm">
            {errors.description.message}
          </p>
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
