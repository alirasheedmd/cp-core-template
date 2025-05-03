import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import AdminContainer from '@/components/admin/shared/AdminContainer'

export default function ProductOrganization() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>()
  return (
    <AdminContainer>
      <h2 className="mb-4 text-sm font-semibold">Product Organization</h2>

      <div className="mt-5 space-y-5">
        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type" className="text-sm">
            Type
          </Label>
          <Input
            id="type"
            {...register('type')}
            placeholder="Enter product type"
            className={`${errors.type ? 'border-destructive' : 'border-black'}`}
          />
          {errors.type && (
            <p className="text-destructive text-sm">
              {errors.type?.message as string}
            </p>
          )}
        </div>

        {/* Collection */}
        <div className="space-y-2">
          <Label htmlFor="collection" className="text-sm">
            Collection
          </Label>
          <Input
            id="collection"
            {...register('collection')}
            placeholder="Enter product collection"
            className={`${errors.collection ? 'border-destructive' : 'border-black'}`}
          />
          {errors.collection && (
            <p className="text-destructive text-sm">
              {errors.collection?.message as string}
            </p>
          )}
        </div>

        {/* Organization */}
        <div className="space-y-2">
          <Label htmlFor="organization" className="text-sm">
            Organization
          </Label>
          <Input
            id="organization"
            {...register('organization')}
            placeholder="Enter product organization"
            className={`${errors.organization ? 'border-destructive' : 'border-black'}`}
          />
          {errors.organization && (
            <p className="text-destructive text-sm">
              {errors.organization?.message as string}
            </p>
          )}
        </div>

        {/* Tag */}
        <div className="space-y-2">
          <Label htmlFor="tag" className="text-sm">
            Tag
          </Label>
          <Input
            id="tag"
            {...register('tag')}
            placeholder="Enter product tag"
            className={`${errors.tag ? 'border-destructive' : 'border-black'}`}
          />
          {errors.tag && (
            <p className="text-destructive text-sm">
              {errors.tag?.message as string}
            </p>
          )}
        </div>
      </div>
    </AdminContainer>
  )
}
