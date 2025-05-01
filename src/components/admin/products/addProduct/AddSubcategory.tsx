'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import MultiImageUploader from '../../shared/MultiImageUploader'
import { Resolver, SubmitHandler } from 'react-hook-form'
import { useTransition } from 'react'
import { createSubcategory } from '@/app/actions/admin/main/category'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState, useRef, useEffect } from 'react'
import { dummyCategories } from '@/data/dummyCategories'
import { ActionButtons } from '@/components/common/ActionButtons'

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
  parentCategory: z.string().min(1, 'Parent category is required'),
})

type SubcategoryFormValues = {
  name: string
  images: { src: string; alt: string }[]
  visibility: boolean
  parentCategory: string
}

export default function AddSubcategory({
  setOpen,
}: {
  setOpen: (open: boolean) => void
}) {
  const [isPending, startTransition] = useTransition()
  const [openCombobox, setComboboxOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const commandRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commandRef.current &&
        !commandRef.current.contains(event.target as Node)
      ) {
        setComboboxOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const methods = useForm<SubcategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<SubcategoryFormValues>,
    defaultValues: {
      name: '',
      images: [],
      visibility: true,
      parentCategory: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<SubcategoryFormValues> = (data) => {
    startTransition(async () => {
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('visibility', data.visibility.toString())
      formData.append('images', JSON.stringify(data.images))
      formData.append('parentCategory', data.parentCategory)

      const result = await createSubcategory(formData)
      if (result.success) {
        setOpen(false)
      }
    })
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
            Subcategory Name
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
          <Popover
            open={openCombobox}
            onOpenChange={setComboboxOpen}
            modal={true}
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombobox}
                className="w-full justify-between border-black font-normal"
              >
                {selectedCategory || 'Select category...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              className="h-52 w-(--radix-popover-trigger-width) p-0"
            >
              <Command>
                <CommandInput placeholder="Search categories..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {dummyCategories.map((category) => (
                      <CommandItem
                        key={category._id}
                        onSelect={() => {
                          setSelectedCategory(category.name)
                          methods.setValue('parentCategory', category.name)
                          setComboboxOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            selectedCategory === category.name
                              ? 'opacity-100'
                              : 'opacity-0',
                          )}
                        />
                        {category.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.parentCategory && (
            <p className="text-destructive text-sm">
              {errors.parentCategory.message}
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
          Makes new subcategories immediately available on the storefront.
        </p>

        <ActionButtons
          onCancel={() => setOpen(false)}
          onSave={methods.handleSubmit(onSubmit)}
          isLoading={isPending}
        />
      </form>
    </FormProvider>
  )
}
