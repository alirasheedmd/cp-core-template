'use client'

import { Cart } from '@/db/schema'
import { CartItem } from './CartItem'
import { useTransition } from 'react'
import { clearCart } from '@/lib/dal'
import { type CartItem as CartItemType } from '@/types'

interface CartItemsListProps {
  cart: Cart
}

export function CartItemsList(props: CartItemsListProps) {
  const { cart } = props
  const [isPending, startTransition] = useTransition()
  console.log('cart items', cart.items)

  const handleClearCart = async () => {
    startTransition(async () => {
      const res = await clearCart()
      if (!res.success) {
        console.log('error in removing item to cart')
      }
    })
  }

  return (
    <div className="col-span-1 lg:col-span-2">
      <div className="space-y-3 sm:space-y-4">
        {cart.items.map((item) => (
          <CartItem key={item.productId} item={item as CartItemType} />
        ))}
      </div>

      {cart.items.length > 0 && (
        <button
          disabled={isPending}
          onClick={handleClearCart}
          className="mt-4 text-sm text-red-500 transition-colors hover:text-red-600 sm:text-base"
        >
          Clear Cart
        </button>
      )}
    </div>
  )
}
