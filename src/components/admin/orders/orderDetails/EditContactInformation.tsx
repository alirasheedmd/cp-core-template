'use client'
// React and Next.js imports
import { useActionState, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
// Form validation imports
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
// UI Components imports
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ActionButtons } from '@/components/common/ActionButtons'
// Data imports
import { dummyOrders } from '@/data/dummyOrders'
// Server action imports
import {
  updateOrderContactInfo,
  type UpdateOrderContactInfoState,
} from '@/app/actions/admin/main/order'

const formSchema = z.object({
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
})

type EditContactInfoFormValues = z.infer<typeof formSchema>

export default function EditContactInformation({
  userEmail,
  userPhoneNumber,
  orderId,
  onClose,
}: {
  userEmail: string | undefined
  userPhoneNumber: string | undefined
  orderId: string
  onClose: () => void
}) {
  const router = useRouter()
  const [updateProfile, setUpdateProfile] = useState(true)
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Find the order from dummy data
  const order = dummyOrders.find((order) => order.orderId === orderId)

  const form = useForm<EditContactInfoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: order?.customerDetails.phoneNumber || userPhoneNumber || '',
    },
  })

  const [state, formAction] = useActionState<
    UpdateOrderContactInfoState,
    FormData
  >(
    async (_prevState, formData) =>
      updateOrderContactInfo({
        orderId: formData.get('orderId') as string,
        phoneNumber: formData.get('phoneNumber') as string,
        updateProfile: formData.get('updateProfile') === 'true',
      }),
    { success: false },
  )

  const handleSave = async (data: EditContactInfoFormValues) => {
    const formData = new FormData()
    formData.append('orderId', orderId)
    formData.append('phoneNumber', data.phoneNumber)
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
          Edit contact information
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="bg-LightGrey rounded-t-lg px-3 py-5 text-left">
            Edit contact information
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={form.handleSubmit(handleSave)}
          className="space-y-5 p-3 pt-0"
        >
          {/* Email */}
          <div className="w-full space-y-1">
            <Label
              htmlFor="email"
              className="text-right text-sm font-normal text-black lg:text-base"
            >
              Email
            </Label>
            <Input
              id="email"
              value={userEmail}
              disabled
              className="w-full text-sm text-black lg:text-base"
            />
          </div>

          {/* Phone number */}
          <div className="w-full space-y-1">
            <Label
              htmlFor="phoneNumber"
              className="text-right text-sm font-normal text-black lg:text-base"
            >
              Phone number
            </Label>
            <Input
              id="phoneNumber"
              {...form.register('phoneNumber')}
              className="w-full text-sm lg:text-base"
            />
            {form.formState.errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phoneNumber.message}
              </p>
            )}
            {state.error && (
              <p className="text-sm text-red-500">{state.error}</p>
            )}
          </div>

          <div className="flex justify-between gap-x-2 pt-0 pb-4 lg:px-3">
            {/* Checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="update"
                checked={updateProfile}
                onCheckedChange={(checked) =>
                  setUpdateProfile(checked === 'indeterminate' ? true : checked)
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
              onSave={form.handleSubmit(handleSave)}
              isLoading={isPending}
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
