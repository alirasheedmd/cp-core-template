import OrderConfirmation from '@/components/web/orderConfirmation/OrderConfirmationPage'
import React, { Suspense } from 'react'

interface OrderConfirmationPageProps {
  params: Promise<{
    id: string
  }>
}

// Disable static generation for dynamic routes
export const dynamic = 'force-dynamic'

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
