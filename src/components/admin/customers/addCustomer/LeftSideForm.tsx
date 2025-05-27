'use client'
import { useFormContext } from 'react-hook-form'
import { CustomerFormValues } from './CustomerInfo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AdminContainer from '@/components/admin/shared/AdminContainer'

export default function LeftSideForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerFormValues>()

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
            placeholder="Enter customer title"
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
            placeholder="Enter customer sku"
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
            placeholder="Enter customer barcode"
            className={`${errors.barcode ? 'border-destructive' : 'border-black'}`}
          />
          {errors.barcode && (
            <p className="text-destructive text-sm">{errors.barcode.message}</p>
          )}
        </div>
      </AdminContainer>
    </div>
  )
}
