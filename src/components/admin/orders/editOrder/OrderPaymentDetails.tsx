import { IOrder, IOrderItem } from '@/types'
import { ISuggestion } from './SearchProducts'
import AdminContainer from '@/components/admin/shared/AdminContainer'

interface Props {
  orderItems: IOrderItem[]
  selectedItems: ISuggestion[]
  subtotal: number
  totalAmount: number
  isLoading: boolean
  order: IOrder | null
}

export default function OrderPaymentDetails({
  orderItems,
  selectedItems,
  subtotal,
  totalAmount,
  isLoading,
  order,
}: Props) {
  return (
    <AdminContainer>
      {/* Status */}
      {isLoading ? (
        <div className="h-5 w-20 animate-pulse rounded-lg bg-gray-200 lg:h-6 lg:w-24" />
      ) : (
        <p className="bg-LightGrey text-Orange w-fit rounded-lg px-2 py-1 text-xs capitalize">
          Unpaid
        </p>
      )}
      {/* Grid */}
      <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm lg:text-base">
        {isLoading ? (
          <>
            {/* Shimmer Row 1 */}
            <div className="h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-20" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

            {/* Shimmer Row 2 */}
            <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

            {/* Shimmer Row 3 */}
            <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
            <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />
          </>
        ) : (
          <>
            {/* Row 1 */}
            <p>Subtotal</p>
            <p>
              {orderItems.reduce(
                (total, item) => total + (item?.quantity ?? 0),
                0,
              ) +
                selectedItems.reduce(
                  (total, item) => total + (item.quantity ?? 1),
                  0,
                )}{' '}
              {orderItems.length + selectedItems.length === 1
                ? 'item'
                : 'items'}
            </p>
            <p>Rs. {subtotal}</p>

            {/* Row 2 */}
            <p className="col-span-2">Shipping</p>
            <p>Rs. {order?.shippingCost || 0}</p>

            {/* Row 3 */}
            <p className="col-span-2">Total</p>
            <p>Rs. {totalAmount}</p>
          </>
        )}
      </div>
    </AdminContainer>
  )
}
