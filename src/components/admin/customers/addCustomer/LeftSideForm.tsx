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
        {/* Tag */}
        <div className="space-y-2">
          <Label htmlFor="tag" className="text-sm">
            Tag<span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="tag"
            {...register('tag')}
            placeholder="Enter customer tag"
            className={`${errors.tag ? 'border-destructive' : 'border-black'}`}
          />
          {errors.tag && (
            <p className="text-destructive text-sm">{errors.tag.message}</p>
          )}
        </div>

        {/* Secondary Number */}
        <div className="space-y-2">
          <Label htmlFor="secondaryNumber" className="text-sm">
            Secondary Number
            <span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="secondaryNumber"
            {...register('secondaryNumber')}
            placeholder="Enter secondary number"
            className={`${errors.secondaryNumber ? 'border-destructive' : 'border-black'}`}
          />
          {errors.secondaryNumber && (
            <p className="text-destructive text-sm">
              {errors.secondaryNumber.message}
            </p>
          )}
        </div>

        {/* Short Address */}
        <div className="space-y-2">
          <Label htmlFor="shortAddress" className="text-sm">
            Short Address
            <span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="shortAddress"
            {...register('shortAddress')}
            placeholder="Enter short address"
            className={`${errors.shortAddress ? 'border-destructive' : 'border-black'}`}
          />
          {errors.shortAddress && (
            <p className="text-destructive text-sm">
              {errors.shortAddress.message}
            </p>
          )}
        </div>
      </AdminContainer>
    </div>
  )
}
