'use client'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { type CustomerInfoFormValues } from './CustomerForm'

export default function CustomerInfoForm() {
  const {
    register,
    formState: { errors },
  } = useFormContext<CustomerInfoFormValues>()

  return (
    <div className="justify- flex flex-row space-y-5">
      <AdminContainer className="w-[50%] space-y-7">
        {/* FirstName */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm">
            First Name
          </Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Enter product firstName"
            className={`${errors.firstName ? 'border-destructive' : 'border-black'}`}
          />
          {errors.firstName && (
            <p className="text-destructive text-sm">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* LastName */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm">
            Last Name
          </Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Enter product lastName"
            className={`${errors.lastName ? 'border-destructive' : 'border-black'}`}
          />
          {errors.lastName && (
            <p className="text-destructive text-sm">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* PhoneNumber */}
        <div className="space-y-2">
          <Label htmlFor="phoneNumber" className="text-sm">
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            {...register('phoneNumber')}
            placeholder="Enter product phoneNumber"
            className={`${errors.phoneNumber ? 'border-destructive' : 'border-black'}`}
          />
          {errors.phoneNumber && (
            <p className="text-destructive text-sm">
              {errors.phoneNumber.message}
            </p>
          )}
        </div>

        {/* BuildingNo */}
        <div className="space-y-2">
          <Label htmlFor="buildingNo" className="text-sm">
            Building No./ House No.
          </Label>
          <Input
            id="buildingNo"
            {...register('buildingNo')}
            placeholder="Enter Building No./ House No."
            className={`${errors.buildingNo ? 'border-destructive' : 'border-black'}`}
          />
          {errors.buildingNo && (
            <p className="text-destructive text-sm">
              {errors.buildingNo.message}
            </p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-2">
          <Label htmlFor="street" className="text-sm">
            Street
          </Label>
          <Input
            id="street"
            {...register('street')}
            placeholder="Enter Building No./ House No."
            className={`${errors.street ? 'border-destructive' : 'border-black'}`}
          />
          {errors.street && (
            <p className="text-destructive text-sm">{errors.street.message}</p>
          )}
        </div>

        {/* District */}
        <div className="space-y-2">
          <Label htmlFor="district" className="text-sm">
            District
          </Label>
          <Input
            id="district"
            {...register('district')}
            placeholder="Enter Building No./ House No."
            className={`${errors.district ? 'border-destructive' : 'border-black'}`}
          />
          {errors.district && (
            <p className="text-destructive text-sm">
              {errors.district.message}
            </p>
          )}
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-sm">
            City
          </Label>
          <Input
            id="city"
            {...register('city')}
            placeholder="Enter Building No./ House No."
            className={`${errors.city ? 'border-destructive' : 'border-black'}`}
          />
          {errors.city && (
            <p className="text-destructive text-sm">{errors.city.message}</p>
          )}
        </div>
      </AdminContainer>
      <AdminContainer className="w-[50%] space-y-7">
        {/* Province */}
        <div className="space-y-2">
          <Label htmlFor="province" className="text-sm">
            Province
          </Label>
          <Input
            id="province"
            {...register('province')}
            placeholder="Enter Building No./ House No."
            className={`${errors.province ? 'border-destructive' : 'border-black'}`}
          />
          {errors.province && (
            <p className="text-destructive text-sm">
              {errors.province.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm">
            Country
          </Label>
          <Input
            id="country"
            {...register('country')}
            placeholder="Enter Building No./ House No."
            className={`${errors.country ? 'border-destructive' : 'border-black'}`}
          />
          {errors.country && (
            <p className="text-destructive text-sm">{errors.country.message}</p>
          )}
        </div>

        {/* PostalCode */}
        <div className="space-y-2">
          <Label htmlFor="postalCode" className="text-sm">
            Postal Code
          </Label>
          <Input
            id="postalCode"
            {...register('postalCode')}
            placeholder="Enter Building No./ House No."
            className={`${errors.postalCode ? 'border-destructive' : 'border-black'}`}
          />
          {errors.postalCode && (
            <p className="text-destructive text-sm">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* SecondaryNumber */}
        <div className="space-y-2">
          <Label htmlFor="secondaryNumber" className="text-sm">
            Secondary Number
            <span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="secondaryNumber"
            {...register('secondaryNumber')}
            placeholder="Enter Building No./ House No."
            className={`${errors.secondaryNumber ? 'border-destructive' : 'border-black'}`}
          />
          {errors.secondaryNumber && (
            <p className="text-destructive text-sm">
              {errors.secondaryNumber.message}
            </p>
          )}
        </div>

        {/* ShortAddress */}
        <div className="space-y-2">
          <Label htmlFor="shortAddress" className="text-sm">
            Unit Number
            <span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="shortAddress"
            {...register('shortAddress')}
            placeholder="Enter Building No./ House No."
            className={`${errors.shortAddress ? 'border-destructive' : 'border-black'}`}
          />
          {errors.shortAddress && (
            <p className="text-destructive text-sm">
              {errors.shortAddress.message}
            </p>
          )}
        </div>

        {/* ShortAddress */}
        <div className="space-y-2">
          <Label htmlFor="shortAddress" className="text-sm">
            Short Address
            <span className="font-normal text-gray-500">(Optional)</span>
          </Label>
          <Input
            id="shortAddress"
            {...register('shortAddress')}
            placeholder="Enter Building No./ House No."
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
