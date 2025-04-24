"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LeftSideForm from "./LeftSideForm";
import RightSideForm from "./RightSideForm";
import { FormProvider } from "react-hook-form";
import { z } from "zod";
import { useActionState } from "react";
import {
  createProduct,
  type ActionState,
} from "@/app/actions/admin/main/product";
import { useRouter } from "next/navigation";
import { useRef, startTransition, useEffect } from "react";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  sku: z.string().min(1, "SKU is required"),
  barcode: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive"]),
  publishDate: z.string().min(1, "Publish date is required"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, "At least one image is required"),
});

export type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductInfo() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useActionState<ActionState, FormData>(
    async (_prevState, formData) => createProduct(formData),
    { status: "idle" },
  );

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      status: "active",
      publishDate: new Date().toISOString().split("T")[0],
      ...(state?.data ?? {}),
    },
  });

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const formValues = methods.getValues();
    console.log("Form Values:", formValues);
    startTransition(() => {
      formAction(formData);
    });
  };

  // Handle server-side validation errors
  useEffect(() => {
    if (state?.status === "error" && state.errors) {
      Object.entries(state.errors).forEach(([field, errors]) => {
        setError(field as keyof ProductFormValues, {
          type: "server",
          message: errors[0],
        });
      });
    }
  }, [state, setError]);

  // Redirect on success
  useEffect(() => {
    if (state?.status === "success") {
      router.push("/admin/products");
    }
  }, [state?.status, router]);

  const isPending = state?.status === "submitting";

  return (
    <FormProvider {...methods}>
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row">
          {/* Left Side */}
          <div className="basis-[70%]">
            <LeftSideForm />
          </div>

          {/* Right Side */}
          <div className="basis-[30%] space-y-5">
            <div className="rounded-lg bg-white p-3">
              <RightSideForm />
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
            disabled={isPending || isSubmitting}
            className="rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none disabled:opacity-50"
          >
            {isPending || isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>

        {/* Show general error message */}
        {state?.status === "error" && state.message && (
          <p className="mt-2 text-sm text-red-600">{state.message}</p>
        )}
      </form>
    </FormProvider>
  );
}
