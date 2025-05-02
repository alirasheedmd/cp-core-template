import Image from 'next/image'
import AdjustQuantityButton from './AdjustQuantityButton'
import { ISuggestion } from './SearchProducts'

interface Props {
  selectedItems: ISuggestion[]
  onQuantityUpdate: (quantity: number, productId: string) => void
  onRemoveProduct: (productId: string) => void
}

export default function OrderProductList({
  selectedItems,
  onQuantityUpdate,
  onRemoveProduct,
}: Props) {
  if (selectedItems.length === 0) return null

  return (
    <>
      {selectedItems.map((item) => (
        <div
          key={item._id}
          className="mt-4 rounded-lg border border-neutral-400 p-3"
        >
          <div className="flex justify-between gap-x-3">
            <div className="flex gap-x-3">
              <Image
                src={item?.image}
                alt={item?.name}
                width={60}
                height={60}
                className="object-contain"
              />

              <div className="space-y-0.5">
                <p className="font-medium">{item?.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-x-6">
              <p className="text-neutral-500">
                Rs. {item.price} x {item.quantity}
              </p>

              <p className="text-neutral-500">
                Rs.{item.price * (item.quantity ?? 0)}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mx-auto flex w-full items-center justify-center gap-x-4 pt-2 text-sm">
            <AdjustQuantityButton
              availableStock={item?.stock || 0}
              onQuantitySave={(quantity) =>
                onQuantityUpdate(quantity, item._id)
              }
            />

            <button
              className="text-red-500 underline-offset-4 hover:underline"
              onClick={() => onRemoveProduct(item._id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
