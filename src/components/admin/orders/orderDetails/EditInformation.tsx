'use client'
// Internal component imports
import EditContactInformation from '@/components/admin/orders/orderDetails/EditContactInformation'
import EditShippingAddress from '@/components/admin/orders/orderDetails/EditShippingAddress'
// UI component imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
// Icon imports
import { BsThreeDots } from 'react-icons/bs'
// Type imports
import { ICustomerDetails } from '@/types'
import { useState } from 'react'

export default function EditInformation({
  userEmail,
  userPhoneNumber,
  userAddress,
  orderId,
}: {
  userEmail: string | undefined
  userPhoneNumber: string | undefined
  userAddress: ICustomerDetails | undefined
  orderId: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button className="hover:bg-LightGrey rounded-lg p-1 font-bold transition-colors">
          <BsThreeDots className="text-lg" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-fit space-y-3 text-sm" align="end">
        {/* Edit contact information */}
        <EditContactInformation
          userEmail={userEmail}
          userPhoneNumber={userPhoneNumber}
          orderId={orderId}
          onClose={() => setOpen(false)}
        />
        {/* Edit shipping address */}
        <EditShippingAddress
          userAddress={userAddress}
          orderId={orderId}
          onClose={() => setOpen(false)}
        />
      </PopoverContent>
    </Popover>
  )
}
