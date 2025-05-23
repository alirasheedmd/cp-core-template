'use client'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import MultiImageUploader from '../../shared/MultiImageUploader'
import Categories from './Categories'
import Pricing from './Pricing'
import Inventory from './Inventory'
import Shipping from './Shipping'
import SearchEngineListing from './SearchEngineListing'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { IWebCategory } from '@/types'

export interface ProductFormProps {
  categories: IWebCategory[]
}

export default function LeftSideForm({ categories }: ProductFormProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>()

  const form = useFormContext<ProductFormValues>()

  const title = watch('title') || ''

  return (
    <div className="space-y-5">
      <AdminContainer className="space-y-7">
        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-sm">
            Title
          </Label>
          <Input
            id="title"
            {...register('title')}
            placeholder="Enter product title"
            className={`${errors.title ? 'border-destructive' : 'border-black'}`}
          />
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* SKU */}
        <div className="space-y-2">
          <Label htmlFor="sku" className="text-sm">
            SKU
          </Label>
          <Input
            id="sku"
            {...register('sku')}
            placeholder="Enter product sku"
            className={`${errors.sku ? 'border-destructive' : 'border-black'}`}
          />
          {errors.sku && (
            <p className="text-destructive text-sm">{errors.sku.message}</p>
          )}
        </div>

        {/* Barcode */}
        <div className="space-y-2">
          <Label htmlFor="barcode" className="text-sm">
            Barcode<span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="barcode"
            {...register('barcode')}
            placeholder="Enter product barcode"
            className={`${errors.barcode ? 'border-destructive' : 'border-black'}`}
          />
          {errors.barcode && (
            <p className="text-destructive text-sm">{errors.barcode.message}</p>
          )}
        </div>

        {/* Slug */}
        <div className="space-y-2">
          <Label htmlFor="slug" className="text-sm">
            Slug
          </Label>
          <Input
            id="slug"
            {...register('slug')}
            readOnly
            value={title
              .toLowerCase()
              .replace(/\s+/g, '-')
              .replace(/[^a-z0-9\-]/g, '')}
            className={`${errors.slug ? 'border-destructive' : 'border-black'}`}
          />
          {errors.slug && (
            <p className="text-destructive text-sm">{errors.slug.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm">
            Description
          </Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Enter product description"
            rows={4}
            className={`${errors.description ? 'border-destructive' : 'border-black'} h-48`}
          />
          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Media */}
        <div className="space-y-2">
          <Label htmlFor="barcode" className="text-sm">
            Media
          </Label>
          <div>
            <MultiImageUploader<ProductFormValues>
              name="images"
              form={form}
              // error={!!errors.images}
              error={form.formState.errors.images?.message}
            />
          </div>
          {errors.images && (
            <p className="text-destructive -mt-3 text-sm">
              {errors.images.message}
            </p>
          )}
        </div>
      </AdminContainer>

      {/* Categories */}
      <AdminContainer>
        <div className="space-y-2">
          <Categories {...register('categories')} categories={categories} />
          {errors.categories && (
            <p className="text-destructive text-sm">
              {errors.categories.message}
            </p>
          )}
        </div>
      </AdminContainer>

      {/* Price */}
      <Pricing />

      {/* Inventory */}
      <Inventory />

      {/* Shipping */}
      <Shipping />

      {/* Search Engine Listing */}
      <SearchEngineListing />
    </div>
  )
}
