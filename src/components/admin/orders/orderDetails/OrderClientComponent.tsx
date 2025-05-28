'use client'
// React and Next.js imports
// import { useState } from 'react'
import MobileHeader from '@/components/admin/orders/orderDetails/MobileHeader'
import OrderHeader from '@/components/admin/orders/orderDetails/OrderHeader'
import OrderItems from '@/components/admin/orders/orderDetails/OrderItems'
import PaymentDetails from '@/components/admin/orders/orderDetails/PaymentDetails'
import PaymentInformation from '@/components/admin/orders/orderDetails/PaymentInformation'
import CustomerInformation from '@/components/admin/orders/orderDetails/CustomerInformation'
import OrderActionButtons from '@/components/admin/orders/orderDetails/OrderActionButtons'
import { useTransition } from 'react'
import { deleteOrder } from '@/app/actions/admin/main/order'
import { IOrder } from '@/types'

interface OrderClientComponentProps {
  orderId: string
  order: IOrder
}

export default function OrderClientComponent({ orderId, order }: OrderClientComponentProps) {
  // const [uploadResponse, setUploadResponse] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  // const handleUploadResponse = (response: string) => {
  //   setUploadResponse(response)
  // }

  // Delete order using server action (will be implemented later)
  const handleDeleteOrder = () => {
    startTransition(async () => {
      const result = await deleteOrder(orderId)
      if (result.success) {
        // mutate() // Revalidate data
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
            // onUploadResponse={handleUploadResponse}
          />
          <OrderActionButtons
            orderId={orderId}
            // uploadResponse={uploadResponse}
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
        // uploadResponse={uploadResponse}
        className="lg:hidden"
        onDelete={handleDeleteOrder}
        isPending={isPending}
      />
    </div>
  )
}
