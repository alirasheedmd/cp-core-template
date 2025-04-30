import { IOrder } from '@/types'
import Link from 'next/link'
import { FaCircle } from 'react-icons/fa6'

export default function MobileOrders({ orders }: { orders: IOrder[] }) {
  return (
    <div className="text-sm">
      {orders.map((order) => (
        <Link
          key={order.orderId}
          href={`/orders/${order.orderId}`}
          className="flex items-center justify-between gap-x-2 border-b border-neutral-300 px-3 py-3"
        >
          <div className="space-y-1">
            <p className="font-medium">#{order.orderId}</p>
            <div className="flex items-center gap-x-2">
              <p>{order.customerDetails?.fullName}</p>
              <p className="bg-LightGrey flex w-fit items-center gap-x-1 rounded-lg px-2 py-1 text-xs">
                <FaCircle className="text-[8px] text-neutral-600" />{' '}
                {`${order.items.length} ${order.items.length == 1 ? 'Item' : 'Items'}`}
              </p>
            </div>
            <p className="bg-LightGrey flex w-fit items-center gap-x-1 rounded-lg px-2 py-1 text-xs">
              <FaCircle className="text-[8px] text-neutral-600" />{' '}
              <span className="capitalize">{order.status}</span>
            </p>
            <p>
              {order.paymentMethod
                .replace(/_/g, ' ')
                .toLowerCase()
                .replace(/^./, (char) => char.toUpperCase())}
            </p>
          </div>
          <p>Rs. {order.totalAmount}</p>
        </Link>
      ))}
    </div>
  )
}
