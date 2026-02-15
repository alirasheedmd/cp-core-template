'use client'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select'
import { updatePaidStatus } from '@/lib/dal'

interface PaymentStatusSelectorProps {
  orderId: string
  isPaid: boolean
}
export default function PaymentStatusSelector({
  orderId,
  isPaid,
}: PaymentStatusSelectorProps) {
  const status = isPaid ? 'paid' : 'unpaid'
  const handleStatusChange = async (value: string) => {
    await updatePaidStatus(orderId, value)
  }
  return (
    <div className="w-fit">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="bg-LightGrey hover:text-Orange shadow-xs transition-colors lg:w-32 lg:text-sm">
          <SelectValue placeholder={'Unpaid'} className="capitalize" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
