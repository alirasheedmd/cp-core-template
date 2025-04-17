"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductFormValues } from "@/lib/schemas/productSchema";
import LeftSideForm from "./LeftSideForm";
import RightSideForm from "./RightSideForm";
import { FormProvider } from "react-hook-form";

export default function ProductInfo() {
  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "draft",
      publishDate: new Date().toISOString().split("T")[0],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ProductFormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          {/* Left Side */}
          <div className="basis-[70%] space-y-5">
            <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
              <div className="mt-4">
                <LeftSideForm />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="basis-[30%] space-y-5">
            <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
              <div className="mt-4">
                <RightSideForm />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
          >
            Discard
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
