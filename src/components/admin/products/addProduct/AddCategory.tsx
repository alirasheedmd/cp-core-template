'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import MultiImageUploader from './MultiImageUploader'
import { Resolver, SubmitHandler } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { createCategory } from '@/app/actions/admin/main/category'
import { Button } from '@/components/ui/button'
import { getAllSubcategories } from '@/utils/categories'
import { dummyCategories } from '@/data/dummyCategories'
import { MultiSelect, Option } from '@/components/common/MultiSelect'

const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  images: z
    .array(
      z.object({
        src: z.string(),
        alt: z.string(),
      }),
    )
    .min(1, 'At least one image is required'),
  visibility: z.boolean().default(true),
  subcategories: z.array(z.string()).default([]),
})

type CategoryFormValues = {
  name: string
  images: { src: string; alt: string }[]
  visibility: boolean
  subcategories: string[]
}

export default function AddCategory({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const [selectedSubcategories, setSelectedSubcategories] = useState<Option[]>(
    [],
  )
  const methods = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: '',
      images: [],
      visibility: true,
      subcategories: [],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const dummySubcategories = getAllSubcategories(dummyCategories)
  const subcategoryOptions: Option[] = dummySubcategories.map((sub) => ({
    value: sub.name,
    label: sub.name,
  }))

  const onSubmit: SubmitHandler<CategoryFormValues> = (data) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('visibility', data.visibility.toString())
      formData.append('images', JSON.stringify(data.images))

      const result = await createCategory(formData)
      if (result.success) {
        setOpen(false)
      }
    })
  }

  const handleSubcategoryChange = (selected: Option[]) => {
    setSelectedSubcategories(selected)
    methods.setValue(
      'subcategories',
      selected.map((option) => option.value),
    )
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.stopPropagation()
          handleSubmit(onSubmit)(e)
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
            {...register('name')}
            placeholder="Enter category name"
            className={`${errors.name ? 'border-destructive' : 'border-black'}`}
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

        {/* Subcategories */}
        <div className="space-y-2">
          <Label htmlFor="subcategories" className="text-sm">
            Subcategories
          </Label>
          <MultiSelect
            options={subcategoryOptions}
            selected={selectedSubcategories}
            onSelectedChange={handleSubcategoryChange}
            placeholder="Select subcategories..."
          />
          {errors.subcategories && (
            <p className="text-destructive text-sm">
              {errors.subcategories.message}
            </p>
          )}
        </div>

        {/* Visibility */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="visibility"
            checked={methods.watch('visibility')}
            onCheckedChange={(checked) => {
              methods.setValue('visibility', checked as boolean)
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
          <Button
            type="button"
            className="hover:bg-LightGrey font-normal text-black"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="hover:bg-LightGrey font-normal text-black"
            variant="outline"
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
