'use client'
// React and Next.js imports
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import MobileHeader from '@/components/admin/orders/orderDetails/MobileHeader'
import OrderHeader from '@/components/admin/orders/orderDetails/OrderHeader'
import OrderItems from '@/components/admin/orders/orderDetails/OrderItems'
import PaymentDetails from '@/components/admin/orders/orderDetails/PaymentDetails'
import PaymentInformation from '@/components/admin/orders/orderDetails/PaymentInformation'
import CustomerInformation from '@/components/admin/orders/orderDetails/CustomerInformation'
import OrderActionButtons from '@/components/admin/orders/orderDetails/OrderActionButtons'
import { dummyOrders } from '@/data/dummyOrders'
import useSWR from 'swr'
import { useTransition } from 'react'
import { deleteOrder } from '@/app/actions/admin/main/order'
import { OrderDetailSkeleton } from '@/components/admin/orders/orderDetails/OrderDetailSkeleton'

// Fetcher for SWR (will be used with real API later)
const fetcher = (url: string) => {
  // For now, just return dummy data
  const orderId = url.split('/').pop()
  return Promise.resolve(dummyOrders.find((order) => order.orderId === orderId))
}

export default function OrderDetailsPage() {
  const pathname = usePathname()
  const orderId = pathname.split('/')[3]
  const [uploadResponse, setUploadResponse] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // Use SWR to fetch order data (using dummy data for now)
  const {
    data: order,
    error,
    isLoading,
    mutate,
  } = useSWR(`/api/orders/${orderId}`, fetcher)

  if (error)
    return <div className="mx-auto my-10 max-w-6xl">Error loading order</div>

  if (isLoading) {
    return <OrderDetailSkeleton />
  }

  if (!order) {
    return <div className="mx-auto my-10 max-w-6xl">Order not found</div>
  }

  const handleUploadResponse = (response: string) => {
    setUploadResponse(response)
  }

  // Delete order using server action (will be implemented later)
  const handleDeleteOrder = () => {
    startTransition(async () => {
      const result = await deleteOrder(orderId)
      if (result.success) {
        mutate() // Revalidate data
      } else {
        alert(result.error)
      }
    })
  }

  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <MobileHeader orderId={orderId} order={order} />
      <OrderHeader order={order} orderId={orderId} />

      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        {/* Left side */}
        <div className="basis-[70%] space-y-5">
          <OrderItems order={order} orderId={orderId} />
          <PaymentDetails order={order} />
          <PaymentInformation
            order={order}
            orderId={orderId}
            onUploadResponse={handleUploadResponse}
          />
          <OrderActionButtons
            orderId={orderId}
            uploadResponse={uploadResponse}
            className="hidden lg:flex"
            onDelete={handleDeleteOrder}
            isPending={isPending}
          />
        </div>

        {/* Right side */}
        <CustomerInformation order={order} orderId={orderId} />
      </div>

      <OrderActionButtons
        orderId={orderId}
        uploadResponse={uploadResponse}
        className="lg:hidden"
        onDelete={handleDeleteOrder}
        isPending={isPending}
      />
    </div>
  )
}
