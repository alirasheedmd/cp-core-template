import { IOrder } from '@/types'

interface PaymentDetailsProps {
  order: IOrder
}

export default function PaymentDetails({ order }: PaymentDetailsProps) {
  return (
    <div className="bg-white p-4 lg:rounded-lg">
      <p className="bg-LightGrey text-Orange w-fit rounded-lg px-2 py-1 text-xs capitalize">
        Unpaid
      </p>
      <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm lg:text-base">
        <p>Subtotal</p>
        <p>
          {order?.items.reduce(
            (total, item) => total + (item?.quantity ?? 0),
            0,
          )}{' '}
          {order?.items.length == 1 ? 'item' : 'items'}
        </p>
        <p>
          Rs.{' '}
          {order?.items.reduce(
            (total, item) => total + (item?.price ?? 0) * (item?.quantity ?? 0),
            0,
          )}
        </p>

        <p className="col-span-2">Shipping</p>
        <p>Rs. {order?.shippingCost}</p>

        <p className="col-span-2">Total</p>
        <p>Rs. {order?.totalAmount}</p>
      </div>
    </div>
  )
}
