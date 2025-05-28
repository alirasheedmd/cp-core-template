import OrderDetailServerComponent from '@/components/admin/orders/orderDetails/OrderDetailServerComponent'
import { OrderDetailSkeleton } from '@/components/admin/orders/orderDetails/OrderDetailSkeleton'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { Suspense } from 'react'
import { BiArrowBack } from 'react-icons/bi'

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{
    orderId: string
  }>
}) {
  const { orderId } = await params
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={routes.admin.orders}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Order Details </h3>
      </div>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetailServerComponent orderId={orderId} />
      </Suspense>
    </div>
  )
}
