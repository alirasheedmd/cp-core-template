// 'use client'

// import { useCartStore } from '@/stores/useCartStore'
import { EmptyCart } from '@/components/web/cart/EmptyCart'
import { CartItemsList } from '@/components/web/cart/CartItemsList'
import { OrderSummary } from '@/components/web/cart/OrderSummary'
import { getMyCart } from '@/lib/dal'
import { Cart } from '@/db/schema'

export async function CartContent() {
  // const {
  //   items,
  //   removeItem,
  //   updateQuantity,
  //   clearCart,
  //   getSubtotal,
  //   getTotal,
  //   shippingFee,
  // } = useCartStore()

  const cart = await getMyCart()

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CartItemsList
          cart={cart as Cart}
          // items={items}
          // onQuantityChange={updateQuantity}
          // onRemoveItem={removeItem}
          // onClearCart={clearCart}
        />
      </div>
      <div className="lg:sticky lg:top-22 lg:self-start">
        <OrderSummary
          // subtotal={getSubtotal()}
          // shippingFee={shippingFee}
          // total={getTotal()}
          subtotal={Number(cart.itemsPrice)}
          shippingFee={Number(cart.shippingPrice)}
          total={Number(cart.totalPrice)}
        />
      </div>
    </div>
  )
}
