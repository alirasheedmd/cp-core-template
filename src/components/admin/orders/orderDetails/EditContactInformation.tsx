'use client'
// React and Next.js imports
import { useState } from 'react'
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
// Data imports
import { dummyOrders } from '@/data/dummyOrders'

const formSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, 'Phone number is required')
    .regex(/^[0-9]+$/, 'Must be a valid phone number')
    .min(10, 'Phone number must be at least 10 digits')
    .max(14, 'Phone number must not exceed 14 digits'),
})

type FormValues = z.infer<typeof formSchema>

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
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

  // Find the order from dummy data
  const order = dummyOrders.find((order) => order.orderId === orderId)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phoneNumber: order?.customerDetails.phoneNumber || userPhoneNumber || '',
    },
  })

  const handleSave = async (data: FormValues) => {
    try {
      setIsLoading(true)
      // In a real application, this would be an API call
      console.log(
        'Updating order:',
        orderId,
        'with phone number:',
        data.phoneNumber,
      )

      // If checkbox is selected, update user profile
      if (updateProfile) {
        console.log('Updating user profile with new phone number')
      }

      setOpen(false) // Close dialog after successful update
      onClose()
      // Refresh page to fetch data
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
          Edit contact information
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-5 text-left">
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
                className="rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm shadow-md transition-colors hover:bg-[#e7e7e7] lg:text-base"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="rounded-lg border border-neutral-300 bg-white px-3 py-1 text-sm shadow-md transition-colors hover:bg-[#e7e7e7] lg:text-base"
              >
                {isLoading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
