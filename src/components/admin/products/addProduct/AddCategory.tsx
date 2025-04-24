"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import MultiImageUploader from "./MultiImageUploader";
import { Resolver, SubmitHandler } from "react-hook-form";
import { useTransition } from "react";
import { createCategory } from "@/app/actions/admin/main/category";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, "At least one image is required"),
  visibility: z.boolean().default(true),
});

type CategoryFormValues = {
  name: string;
  images: { src: string; alt: string }[];
  visibility: boolean;
};

export default function AddCategory({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: "",
      images: [],
      visibility: true,
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<CategoryFormValues> = (data) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("visibility", data.visibility.toString());
      formData.append("images", JSON.stringify(data.images));

      const result = await createCategory(formData);
      if (result.success) {
        setOpen(false);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.stopPropagation();
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-4 px-4 pb-4"
      >
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-sm">
            Category Name
          </Label>
          <Input
            id="name"
            {...register("name")}
            placeholder="Enter category name"
            className={`${errors.name ? "border-destructive" : "border-black"}`}
          />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Images */}
        <div className="space-y-2">
          <Label htmlFor="images" className="text-sm">
            Category Images
          </Label>
          <div>
            <MultiImageUploader<CategoryFormValues>
              name="images"
              form={methods}
              error={errors.images?.message}
            />
          </div>
          {errors.images && (
            <p className="text-destructive -mt-3 text-sm">
              {errors.images.message}
            </p>
          )}
        </div>

        {/* Visibility */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visibility"
            checked={methods.watch("visibility")}
            onCheckedChange={(checked) => {
              methods.setValue("visibility", checked as boolean);
            }}
          />
          <label htmlFor="visibility" className="text-sm text-gray-800">
            Enable visibility
          </label>
        </div>

        <p className="-mt-3 text-sm text-gray-800">
          Makes new categories immediately available on the storefront.
        </p>

        {/* Buttons */}
        <div className="flex w-full items-center justify-end gap-x-3 pt-2">
          <button
            type="button"
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1 shadow-md transition-colors hover:bg-[#e7e7e7]"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg border border-neutral-300 bg-white px-3 py-1 shadow-md transition-colors hover:bg-[#e7e7e7]"
            disabled={isPending}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
