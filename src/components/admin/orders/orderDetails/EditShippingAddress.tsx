'use client'
// React and Next.js imports
import { useActionState, useState, useTransition } from 'react'
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
import { ActionButtons } from '@/components/common/ActionButtons'
// Type imports
import { IOrderCustomer } from '@/types'
// Data imports
import { dummyOrders } from '@/data/dummyOrders'
// Server action imports
import {
  updateOrderShippingInfo,
  type UpdateOrderShippingInfoState,
} from '@/app/actions/admin/main/order'

const shippingSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .transform((val) => val.replace(/[\s\-\(\)]/g, '')) // Remove spaces, dashes, and parentheses
    .pipe(
      z
        .string()
        .regex(/^\+?[0-9]+$/, 'Must contain only numbers and optional + prefix')
        .min(8, 'Phone number must be at least 8 digits')
        .max(20, 'Phone number must not exceed 20 digits'),
    ),
  street: z.string().min(1, 'Street address is required'),
  apartment: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  postalCode: z.string().min(1, 'Postal code is required'),
})

type EditShippingInfoFormValues = z.infer<typeof shippingSchema>

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
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Find the order from dummy data
  const order = dummyOrders.find((order) => order.orderId === orderId)

  const methods = useForm<EditShippingInfoFormValues>({
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

  const [state, formAction] = useActionState<
    UpdateOrderShippingInfoState,
    FormData
  >(
    async (_prevState, formData) =>
      updateOrderShippingInfo({
        orderId: formData.get('orderId') as string,
        fullName: formData.get('fullName') as string,
        phoneNumber: formData.get('phoneNumber') as string,
        street: formData.get('street') as string,
        apartment: formData.get('apartment') as string,
        city: formData.get('city') as string,
        postalCode: formData.get('postalCode') as string,
        updateProfile: formData.get('updateProfile') === 'true',
      }),
    { success: false },
  )

  const handleSave = async (data: EditShippingInfoFormValues) => {
    const formData = new FormData()
    formData.append('orderId', orderId)
    formData.append('fullName', data.fullName)
    formData.append('phoneNumber', data.phoneNumber)
    formData.append('street', data.street)
    formData.append('apartment', data.apartment || '')
    formData.append('city', data.city)
    formData.append('postalCode', data.postalCode)
    formData.append('updateProfile', updateProfile.toString())

    startTransition(() => {
      formAction(formData)
    })

    if (state.status === 'success') {
      setOpen(false)
      onClose()
      router.refresh()
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-LightGrey hover:bg-LightGrey block w-full rounded-lg px-3 py-2 text-left transition-colors lg:bg-transparent">
          Edit shipping address
        </button>
      </DialogTrigger>
      <DialogContent className="scrollbar max-h-[90dvh] w-[90%] overflow-y-auto rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="bg-LightGrey rounded-t-lg px-3 py-5 text-left">
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
                  className="text-xs leading-none text-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70 lg:text-sm"
                >
                  Update customer profile
                </label>
              </div>
              <ActionButtons
                onCancel={() => {
                  setOpen(false)
                  onClose()
                }}
                onSave={methods.handleSubmit(handleSave)}
                isLoading={isPending}
              />
            </div>
            {state.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
