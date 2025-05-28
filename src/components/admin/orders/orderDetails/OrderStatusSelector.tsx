'use client'

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { updateOrderStatus } from '@/lib/dal'
import { OrderStatus } from '@/db/schema'

const OrderStatusSelector = ({
  orderId,
  status,
  mutate,
}: {
  orderId: string
  status: string
  mutate?: () => void
}) => {
  const handleStatusChange = async (value: string) => {
    await updateOrderStatus(orderId, value as OrderStatus)
    console.log(orderId)
    mutate?.() // Call mutate if provided
  }

  return (
    <Select value={status} onValueChange={(v) => handleStatusChange(v)}>
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
