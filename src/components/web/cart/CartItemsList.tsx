'use client'

import { CartItem } from './CartItem'
import { CartItem as CartItemType } from '@/stores/useCartStore'

interface CartItemsListProps {
  items: CartItemType[]
  onQuantityChange: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export function CartItemsList({
  items,
  onQuantityChange,
  onRemoveItem,
  onClearCart,
}: CartItemsListProps) {
  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="space-y-3 sm:space-y-4">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemoveItem}
          />
        ))}
      </div>

      {items.length > 0 && (
        <button
          onClick={onClearCart}
          className="mt-4 text-sm text-red-500 transition-colors hover:text-red-600 sm:text-base"
        >
          Clear Cart
        </button>
      )}
    </div>
  )
}
