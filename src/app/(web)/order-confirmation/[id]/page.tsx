import OrderConfirmation from '@/components/web/orderConfirmation/OrderConfirmationPage'
import React, { Suspense } from 'react'

const OrderConfirmationPage = async ({ params }: { params: { id: string } }) => {
    const { id } = await params
  return (
    <Suspense>
          <OrderConfirmation id={id} />
    </Suspense>
  )
}

export default OrderConfirmationPage