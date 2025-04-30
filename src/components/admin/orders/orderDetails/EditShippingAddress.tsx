'use client'
// React and Next.js imports
import { useState } from 'react'
import { useRouter } from 'next/navigation'
// Form validation imports
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
// UI Components imports
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
// Type imports
import { IOrderCustomer } from '@/types'
// Data imports
import { dummyOrders } from '@/data/dummyOrders'

const shippingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(14, 'Phone number must not exceed 14 digits'),
  street: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
})

type ShippingFormValues = z.infer<typeof shippingSchema>

export default function EditShippingAddress({
  userAddress,
  orderId,
  onClose,
}: {
  userAddress: IOrderCustomer | undefined
  orderId: string
  onClose: () => void
}) {
  const router = useRouter()
  const [updateProfile, setUpdateProfile] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Find the order from dummy data
  const order = dummyOrders.find((order) => order.orderId === orderId)

  const methods = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullName: order?.customerDetails.fullName || userAddress?.fullName || '',
      phoneNumber:
        order?.customerDetails.phoneNumber || userAddress?.phoneNumber || '',
      street:
        order?.customerDetails.address.street ||
        userAddress?.address?.street ||
        '',
      apartment:
        order?.customerDetails.address.apartment ||
        userAddress?.address?.apartment ||
        '',
      city:
        order?.customerDetails.address.city || userAddress?.address?.city || '',
      postalCode:
        order?.customerDetails.address.postalCode ||
        userAddress?.address?.postalCode ||
        '',
    },
  })

  const handleSave = async (data: ShippingFormValues) => {
    try {
      setIsLoading(true)
      // In a real application, this would be an API call
      console.log('Updating order:', orderId, 'with shipping details:', data)

      if (updateProfile) {
        console.log('Updating user profile with new shipping details')
      }

      setOpen(false)
      onClose()
      router.refresh()
    } catch (error) {
      console.error('Error updating customer details:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="block w-full rounded-lg bg-[#e7e7e7] px-3 py-2 text-left transition-colors hover:bg-[#e7e7e7] lg:bg-transparent">
          Edit shipping address
        </button>
      </DialogTrigger>
      <DialogContent className="scrollbar max-h-[90dvh] w-[90%] overflow-y-auto rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-5 text-left">
            Edit shipping address
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSave)}
            className="space-y-5 p-3 pt-0"
          >
            {/* Full Name */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="fullName"
                className="text-right font-normal text-black"
              >
                Full Name
              </Label>
              <Input
                id="fullName"
                {...methods.register('fullName')}
                className="w-full text-sm lg:text-base"
              />
              {methods.formState.errors.fullName && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.fullName.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="phoneNumber"
                className="text-right font-normal text-black"
              >
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                {...methods.register('phoneNumber')}
                className="w-full text-sm lg:text-base"
              />
              {methods.formState.errors.phoneNumber && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="street"
                className="text-right font-normal text-black"
              >
                Street Address
              </Label>
              <Input
                id="street"
                {...methods.register('street')}
                className="w-full text-sm lg:text-base"
              />
              {methods.formState.errors.street && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.street.message}
                </p>
              )}
            </div>

            {/* Apartment/Suite */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="apartment"
                className="text-right font-normal text-black"
              >
                Apartment/Suite (Optional)
              </Label>
              <Input
                id="apartment"
                {...methods.register('apartment')}
                className="w-full text-sm lg:text-base"
              />
            </div>

            {/* City */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="city"
                className="text-right font-normal text-black"
              >
                City
              </Label>
              <Input
                id="city"
                {...methods.register('city')}
                className="w-full text-sm lg:text-base"
              />
              {methods.formState.errors.city && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.city.message}
                </p>
              )}
            </div>

            {/* Postal Code */}
            <div className="w-full space-y-1">
              <Label
                htmlFor="postalCode"
                className="text-right font-normal text-black"
              >
                Postal Code
              </Label>
              <Input
                id="postalCode"
                {...methods.register('postalCode')}
                className="w-full text-sm lg:text-base"
              />
              {methods.formState.errors.postalCode && (
                <p className="text-sm text-red-500">
                  {methods.formState.errors.postalCode.message}
                </p>
              )}
            </div>

            <div className="flex justify-between gap-x-2">
              {/* Checkbox */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="update"
                  checked={updateProfile}
                  onCheckedChange={(checked) =>
                    setUpdateProfile(
                      checked === 'indeterminate' ? true : checked,
                    )
                  }
                />
                <label
                  htmlFor="update"
                  className="text-xs leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-sm"
                >
                  Update customer profile
                </label>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-x-2 text-sm">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    onClose()
                  }}
                  disabled={isLoading}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm shadow-md transition-colors hover:bg-[#e7e7e7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm shadow-md transition-colors hover:bg-[#e7e7e7]"
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
