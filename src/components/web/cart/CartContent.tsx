'use client'

import { useCartStore } from '@/stores/useCartStore'
import { EmptyCart } from '@/components/web/cart/EmptyCart'
import { CartItemsList } from '@/components/web/cart/CartItemsList'
import { OrderSummary } from '@/components/web/cart/OrderSummary'

export function CartContent() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotal,
    shippingFee,
  } = useCartStore()

  if (items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CartItemsList
          items={items}
          onQuantityChange={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
      </div>
      <div className="lg:sticky lg:top-22 lg:self-start">
        <OrderSummary
          subtotal={getSubtotal()}
          shippingFee={shippingFee}
          total={getTotal()}
        />
      </div>
    </div>
  )
}
