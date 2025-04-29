'use client'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { DatePicker } from '@/components/common/DatePicker'
import ProductOrganization from './ProductOrganization'
import RecommendedProduct from './RecommendedProduct'
import AdminContainer from '../../shared/AdminContainer'

export default function RightSideForm() {
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<ProductFormValues>()

  const status = watch('status')
  const publishDate = watch('publishDate')

  // Convert string date to Date object for the DatePicker
  const dateValue = publishDate ? new Date(publishDate) : undefined

  return (
    <div className="space-y-4">
      {/* Status */}
      <AdminContainer className="space-y-2">
        <Label htmlFor="status" className="text-sm">
          Status
        </Label>
        <Select
          value={status}
          onValueChange={(value: 'active' | 'inactive') =>
            setValue('status', value)
          }
        >
          <SelectTrigger
            id="status"
            className={`${errors.status ? 'border-destructive' : 'border-black'} w-full`}
          >
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        {errors.status && (
          <p className="text-destructive text-sm">{errors.status.message}</p>
        )}
      </AdminContainer>

      {/* Publish / Restock Date */}
      <AdminContainer className="space-y-2">
        <Label htmlFor="publishDate" className="text-sm">
          Publish / Restock Date
        </Label>
        <DatePicker
          date={dateValue}
          onChange={(date) => {
            if (date) {
              setValue('publishDate', date.toISOString().split('T')[0])
            } else {
              setValue('publishDate', '')
            }
          }}
          label="Select publish date"
          className={`${errors.publishDate ? 'border-destructive' : 'border-black'}`}
        />
        {errors.publishDate && (
          <p className="text-destructive text-sm">
            {errors.publishDate.message}
          </p>
        )}
      </AdminContainer>

      {/* Recommended Product */}
      <RecommendedProduct />

      {/* Product Organization */}
      <ProductOrganization />
    </div>
  )
}
