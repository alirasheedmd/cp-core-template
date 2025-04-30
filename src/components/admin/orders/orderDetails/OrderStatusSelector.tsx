'use client'

import { useState } from 'react'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'

const OrderStatusSelector = ({
  orderId,
  initialStatus,
  mutate,
}: {
  orderId: string
  initialStatus: string
  mutate?: () => void
}) => {
  const [status, setStatus] = useState<string>(initialStatus)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    console.log(orderId)
    mutate?.() // Call mutate if provided
  }

  return (
    <Select value={status} onValueChange={handleStatusChange}>
      <SelectTrigger className="hover:text-Orange w-30 transition-colors">
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="confirmed">Confirmed</SelectItem>
          <SelectItem value="shipped">Shipped</SelectItem>
          <SelectItem value="delivered">Delivered</SelectItem>
          <SelectItem value="returned">Returned</SelectItem>
          <SelectItem value="cancelled">Cancelled</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default OrderStatusSelector
