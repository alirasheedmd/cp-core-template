import Image from 'next/image'
import { IOrderItem } from '@/types'
import AdjustQuantityButton from './AdjustQuantityButton'

interface Props {
  orderItems: IOrderItem[]
  isOrderEditable: boolean
  onQuantityUpdate: (quantity: number, productId: string) => void
  onRemoveItem: (productId: string) => void
}

export default function OrderItemsList({
  orderItems,
  isOrderEditable,
  onQuantityUpdate,
  onRemoveItem,
}: Props) {
  return (
    <div>
      {orderItems.map((item) => (
        <div
          key={item?.productId}
          className="mb-3 rounded-lg border border-neutral-400 p-2 lg:p-3"
        >
          <div className="flex justify-between gap-x-3">
            <div className="flex gap-x-3">
              <Image
                src={item?.image || '/placeholder-image.png'}
                alt={item?.name || 'Product'}
                width={60}
                height={60}
                className="mb-auto object-contain lg:mb-0"
              />

              <div className="space-y-0.5">
                <p className="text-sm font-medium lg:text-base">
                  {item?.name || 'No Name'}
                </p>
                <p className="text-xs text-neutral-500 lg:text-sm">
                  {item?.sku || 'No SKU'}
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
          {/* Buttons */}
          {isOrderEditable && (
            <div className="mx-auto flex w-full items-center justify-center gap-x-4 pt-2 text-sm">
              <AdjustQuantityButton
                availableStock={item?.stock || 0}
                onQuantitySave={(quantity) =>
                  onQuantityUpdate(quantity, item.productId)
                }
              />
              <button
                className="text-red-500 underline-offset-4 hover:underline"
                onClick={() => onRemoveItem(item.productId)}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
