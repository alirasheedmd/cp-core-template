import { IOrder } from '@/types'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import CurrencySymbol from '@/components/common/CurrencySymbol'

interface PaymentDetailsProps {
  order: IOrder
}

export default function PaymentDetails({ order }: PaymentDetailsProps) {
  return (
    <AdminContainer>
      <p
        className={`w-fit rounded-lg px-2 py-1 text-xs capitalize ${order.isPaid === true ? 'bg-lime-100 text-green-700' : 'bg-LightGrey text-Orange'}`}
      >
        {order.isPaid === true ? 'Paid' : 'Unpaid'}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm lg:text-base">
        <p className="col-span-2">Subtotal</p>
        <p>
          <CurrencySymbol amount={order.itemsPrice} />
        </p>

        <p className="col-span-2">Tax</p>
        <p>
          <CurrencySymbol amount={order.taxPrice} />
        </p>

        <p className="col-span-2">Shipping</p>
        <p>
          <CurrencySymbol amount={order.shippingPrice} />
        </p>

        <p className="col-span-2 font-semibold">Total</p>
        <p className="font-semibold">
          <CurrencySymbol amount={order.totalPrice} />
        </p>
      </div>
    </AdminContainer>
  )
}
