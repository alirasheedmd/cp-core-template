import { EmptyCart } from '@/components/web/cart/EmptyCart'
import { CartItemsList } from '@/components/web/cart/CartItemsList'
import { OrderSummary } from '@/components/web/cart/OrderSummary'
import { getMyCart } from '@/lib/dal'
import { Cart } from '@/db/schema'

export async function CartContent() {
  const cart = await getMyCart()

  if (!cart || cart.items.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <CartItemsList cart={cart as Cart} />
      </div>
      <div className="lg:sticky lg:top-22 lg:self-start">
        <OrderSummary
          subtotal={Number(cart.itemsPrice)}
          shippingFee={Number(cart.shippingPrice)}
          tax={Number(cart.taxPrice)}
          total={Number(cart.totalPrice)}
        />
      </div>
    </div>
  )
}
