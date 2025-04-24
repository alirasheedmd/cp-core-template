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
import { createSubcategory } from "@/app/actions/admin/main/category";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState, useRef, useEffect } from "react";
import { dummyCategories } from "@/data/dummyCategories";
import { X } from "lucide-react";

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
  parentCategory: z.string().min(1, "Parent category is required"),
});

type SubcategoryFormValues = {
  name: string;
  images: { src: string; alt: string }[];
  visibility: boolean;
  parentCategory: string;
};

export default function AddSubcategory({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const [isPending, startTransition] = useTransition();
  const [commandOpen, setCommandOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const commandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setCommandOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const methods = useForm<SubcategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<SubcategoryFormValues>,
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

  const onSubmit: SubmitHandler<SubcategoryFormValues> = (data) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("visibility", data.visibility.toString());
      formData.append("images", JSON.stringify(data.images));
      formData.append("parentCategory", data.parentCategory);

      const result = await createSubcategory(formData);
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
            Subcategory Name
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
            Subcategory Images
          </Label>
          <div>
            <MultiImageUploader<SubcategoryFormValues>
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

        {/* Search parent category */}
        <div className="space-y-2">
          <Label htmlFor="parent-category" className="text-sm">
            Parent Category
          </Label>
          <Command className="mb-5 h-fit" ref={commandRef}>
            <div className="relative">
              <CommandInput
                placeholder="Search categories..."
                onFocus={() => setCommandOpen(true)}
                value={selectedCategory}
                onValueChange={(value) => {
                  setSelectedCategory(value);
                  methods.setValue("parentCategory", value);
                }}
              />
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("");
                    methods.setValue("parentCategory", "");
                    setCommandOpen(true);
                  }}
                  className="absolute top-1/2 right-2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <CommandList
              className={`h-fit max-h-35 overflow-y-auto transition-all duration-200 ease-in-out ${
                commandOpen
                  ? "translate-y-0 opacity-100"
                  : "pointer-events-none h-2 -translate-y-2 opacity-0"
              }`}
            >
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="mt-2">
                {dummyCategories.map((category) => (
                  <CommandItem
                    key={category._id}
                    onSelect={() => {
                      setSelectedCategory(category.name);
                      methods.setValue("parentCategory", category.name);
                      setCommandOpen(false);
                    }}
                    className="bg-LightWhite mb-2 cursor-pointer hover:bg-neutral-50"
                  >
                    {category.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          {errors.parentCategory && (
            <p className="text-destructive -mt-5 text-sm">
              {errors.parentCategory.message}
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
          Makes new subcategories immediately available on the storefront.
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
