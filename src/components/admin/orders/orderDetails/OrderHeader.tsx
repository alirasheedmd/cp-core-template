import Link from 'next/link'
import { format } from 'date-fns'
import { FaCircle } from 'react-icons/fa6'
import PrintOrderButton from './PrintOrderButton'
import { IOrder } from '@/types'
import { routes } from '@/config/routes'

interface OrderHeaderProps {
  order: IOrder
  orderId: string
}

export default function OrderHeader({ order, orderId }: OrderHeaderProps) {
  return (
    <div className="flex items-start justify-between px-5 lg:px-0">
      <div>
        <div className="flex gap-x-2">
          <p className="font-semibold">#{orderId}</p>
          <p className="bg-LightGrey flex items-center gap-x-1 rounded-lg px-2 py-1 text-xs">
            <FaCircle className="text-[8px] text-neutral-600" /> Unpaid
          </p>
          <p className="bg-LightGrey flex items-center gap-x-1 rounded-lg px-2 py-1 text-xs">
            <FaCircle className="text-[8px] text-neutral-600" /> Shipped
          </p>
        </div>
        <p className="mt-1">
          {format(new Date(order?.createdAt ?? ''), 'MMMM d, yyyy')} at{' '}
          {format(new Date(order?.createdAt ?? ''), 'h:mm a')}
        </p>
      </div>

      <div className="hidden items-center gap-x-4 lg:flex">
        <Link
          href={routes.admin.orderEdit(orderId)}
          className="bg-LightGrey hover:text-Orange w-16 rounded-xl py-1.5 text-center font-semibold transition-colors"
        >
          Edit
        </Link>
        <PrintOrderButton order={order} orderId={orderId} />
        <Link
          href="#"
          className="bg-LightGrey hover:text-Orange rounded-xl px-4 py-1.5 font-semibold transition-colors"
        >
          View order status page
        </Link>
      </div>
    </div>
  )
}
