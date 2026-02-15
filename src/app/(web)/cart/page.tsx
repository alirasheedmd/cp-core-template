import { Suspense } from 'react'
import WebContainer from '@/components/web/shared/WebContainer'
import { CartSkeleton } from '@/components/web/cart/CartSkeleton'
import { CartContent } from '@/components/web/cart/CartContent'

export default function CartPage() {
  return (
    <WebContainer>
      <h1 className="mt-9 mb-4 text-2xl font-bold">Your Cart</h1>
      <Suspense fallback={<CartSkeleton />}>
        <CartContent />
      </Suspense>
    </WebContainer>
  )
}
