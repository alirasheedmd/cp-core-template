import Image from 'next/image'
import { LuTruck } from 'react-icons/lu'
import { format } from 'date-fns'
import OrderStatusSelector from './OrderStatusSelector'
import { IOrder } from '@/types'
import AdminContainer from '@/components/admin/shared/AdminContainer'

interface OrderItemsProps {
  order: IOrder
  orderId: string
}

export default function OrderItems({ order, orderId }: OrderItemsProps) {
  return (
    <AdminContainer>
      <div className="flex items-center justify-between">
        <p className="bg-LightGrey text-Orange w-fit rounded-lg px-2 py-1 text-xs capitalize">
          <LuTruck className="mr-1 inline text-sm" />
          {order?.status}
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-neutral-400">
        <div className="p-2 lg:p-4">
          <p className="text-sm lg:text-base">
            {order?.paymentMethod
              .replace(/_/g, ' ')
              .toLowerCase()
              .replace(/^./, (char) => char.toUpperCase())}
          </p>
          <p className="mt-1 text-sm lg:text-base">
            {format(new Date(order?.createdAt ?? ''), 'MMMM d, yyyy')}
          </p>
        </div>

        <hr className="border-t-2 border-neutral-400 pb-4" />

        <div className="flex flex-col gap-y-2">
          {order?.items?.map((item) => (
            <div
              className="flex justify-between gap-x-3 px-2 pb-2 lg:px-4"
              key={item?.productId}
            >
              <div className="flex gap-x-3">
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={60}
                  height={60}
                  className="mb-auto object-contain lg:mb-0"
                />

                <div className="space-y-0.5">
                  <p className="text-sm font-medium lg:text-base">
                    {item?.name}
                  </p>
                  <p className="text-xs text-neutral-500 lg:text-sm">
                    SKU: {item?.sku}
                  </p>
                  <p className="text-xs text-neutral-500 lg:hidden">
                    Rs. {item?.price} X {item?.quantity}
                  </p>
                </div>
              </div>

              <div className="flex lg:items-center lg:gap-x-6">
                <p className="hidden text-neutral-500 lg:block">
                  Rs. {item?.price} x {item?.quantity}
                </p>

                <p className="text-sm text-nowrap text-neutral-500 lg:text-base">
                  Rs. {(item?.price ?? 0) * (item?.quantity ?? 0)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-LightGrey mt-4 ml-auto w-32 rounded-lg shadow-xs">
        <OrderStatusSelector
          orderId={orderId}
          initialStatus={order?.status ?? ''}
        />
      </div>
    </AdminContainer>
  )
}
