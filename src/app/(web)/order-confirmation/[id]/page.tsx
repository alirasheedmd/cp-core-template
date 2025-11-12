import OrderConfirmation from '@/components/web/orderConfirmation/OrderConfirmationPage'
import React, { Suspense } from 'react'

interface OrderConfirmationPageProps {
  params: Promise<{
    id: string
  }>
}

const OrderConfirmationPage = async ({
  params,
}: OrderConfirmationPageProps) => {
  const { id } = await params

  return (
    <Suspense>
      <OrderConfirmation id={id} />
    </Suspense>
  )
}

export default OrderConfirmationPage
