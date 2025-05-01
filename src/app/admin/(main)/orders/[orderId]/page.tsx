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

export default function OrderDetailsPage() {
  const pathname = usePathname()
  const orderId = pathname.split('/')[3]
  const [uploadResponse, setUploadResponse] = useState<string | null>(null)

  // Find order from dummy data
  const order = dummyOrders.find((order) => order.orderId === orderId)
  const isLoading = false
  const error = null

  if (error)
    return <div className="mx-auto my-10 max-w-6xl">Error loading order</div>

  if (isLoading) {
    return <OrderSkeleton />
  }

  if (!order) {
    return <div className="mx-auto my-10 max-w-6xl">Order not found</div>
  }

  const handleUploadResponse = (response: string) => {
    setUploadResponse(response)
  }

  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <MobileHeader orderId={orderId} order={order} />
      <OrderHeader order={order} orderId={orderId} />

      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
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
          />
        </div>

        <CustomerInformation order={order} orderId={orderId} />
      </div>

      <OrderActionButtons
        orderId={orderId}
        uploadResponse={uploadResponse}
        className="lg:hidden"
      />
    </div>
  )
}

const OrderSkeleton = () => {
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      {/* Mobile Screen Buttons */}
      <div className="flex items-center justify-between p-5 lg:hidden">
        <div className="h-6 w-6 rounded bg-gray-200" />
        <div className="h-6 w-6 rounded bg-gray-200" />
      </div>

      <div className="flex items-start justify-between px-5 lg:px-0">
        {/* Left Side - Order Details */}
        <div>
          <div className="flex gap-x-2">
            <div className="h-6 w-20 rounded-md bg-gray-200" />
            <div className="h-6 w-16 rounded-lg bg-gray-200" />
            <div className="h-6 w-16 rounded-lg bg-gray-200" />
          </div>
          <div className="mt-1 h-5 w-48 rounded-md bg-gray-200" />
        </div>

        {/* Right Side - Actions */}
        <div className="hidden items-center gap-x-4 lg:flex">
          <div className="h-8 w-16 rounded-xl bg-gray-200" />
          <div className="h-8 w-36 rounded-xl bg-gray-200" />
          <div className="h-8 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        <div className="basis-[70%] space-y-5">
          {/* First Card */}
          <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
            <div className="h-6 w-24 rounded-lg bg-gray-200" />

            <div className="mt-4 rounded-lg border border-neutral-400">
              <div className="space-y-2 p-2 lg:p-4">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-5 w-40 rounded bg-gray-200" />
              </div>

              <hr className="border-t-2 border-neutral-400 pb-4" />
              {/* Skeleton Items */}
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex justify-between gap-x-3 px-2 pb-2 lg:px-4"
                >
                  <div className="flex gap-x-3">
                    <div className="h-[60px] w-[60px] rounded bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-5 w-40 rounded bg-gray-200" />
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-4 w-24 rounded bg-gray-200" />
                      <div className="h-4 w-24 rounded bg-gray-200 lg:hidden" />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <div className="hidden h-5 w-24 rounded bg-gray-200 lg:block" />
                    <div className="h-5 w-24 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 ml-auto h-8 w-32 rounded-lg bg-gray-200" />
          </div>

          {/* Payment Details Card */}
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div className="h-6 w-20 rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-5 rounded bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-5 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Right Side - Customer Details */}
        <div className="h-fit basis-[30%] rounded-lg bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-gray-200" />
            <div className="h-6 w-8 rounded bg-gray-200" />
          </div>

          {/* Customer Details Skeleton */}
          <div className="mt-5 space-y-4">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-2">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-4 w-48 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-4 w-36 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
