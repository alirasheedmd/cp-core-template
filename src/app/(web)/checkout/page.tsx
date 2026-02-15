import Checkout from '@/components/web/checkout/CheckoutPage'
import { Suspense } from 'react'

const CheckoutPage = () => {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  )
}

export default CheckoutPage
