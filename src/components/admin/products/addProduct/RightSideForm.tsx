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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

export default function RightSideForm() {
  const {
    formState: { errors },
    setValue,
    control,
    watch,
  } = useFormContext<ProductFormValues>()

  // const status = watch('status')
  const publishDate = watch('publishDate')

  // Convert string date to Date object for the DatePicker
  const dateValue = publishDate ? new Date(publishDate) : undefined

  return (
    <div className="space-y-4">
      {/* Status */}
      <AdminContainer className="space-y-2">
        {/* Status */}
        <FormField
          control={control}
          name="status"
          render={({ field }) => (
            <FormItem className="mt-2 mr-1 w-full">
              <FormLabel htmlFor="status" className="text-sm">
                Status
              </FormLabel>
              <Select onValueChange={field.onChange} {...field}>
                <FormControl>
                  <SelectTrigger
                    className={`${errors.status ? 'border-destructive' : 'border-black'} w-full`}
                  >
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {errors.status && (
                <p className="text-destructive text-sm">
                  {errors.status.message}
                </p>
              )}
            </FormItem>
          )}
        />
      </AdminContainer>

      {/* Publish / Restock Date */}
      <AdminContainer className="space-y-2">
        <FormField
          control={control}
          name="publishDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="publishDate" className="text-sm">
                Publish / Restock Date
              </FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value ? new Date(field.value) : undefined}
                  onChange={(date) => {
                    field.onChange(date ? date.toISOString().split('T')[0] : '')
                  }}
                  label="Select publish date"
                  className={`${errors.publishDate ? 'border-destructive' : 'border-black'}`}
                />
              </FormControl>
              <input
                type="hidden"
                name="publishDate"
                value={field.value || ''}
              />
              {errors.publishDate && (
                <p className="text-destructive text-sm">
                  {errors.publishDate.message}
                </p>
              )}
            </FormItem>
          )}
        />
      </AdminContainer>

      {/* Recommended Product */}
      <RecommendedProduct />

      {/* Product Organization */}
      <ProductOrganization />
    </div>
  )
}
