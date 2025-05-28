import Link from 'next/link'
import EditInformation from './EditInformation'
import { IOrder } from '@/types'
import AdminContainer from '@/components/admin/shared/AdminContainer'

interface CustomerInformationProps {
  order: IOrder
  orderId: string
}

export default function CustomerInformation({
  order,
  orderId,
}: CustomerInformationProps) {
  return (
    <div className="h-fit basis-[30%]">
      <AdminContainer>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Customer</p>
          <EditInformation
            userEmail={order.user.email}
            userPhoneNumber={order.shippingAddress.phoneNumber}
            userAddress={order.shippingAddress}
            orderId={orderId}
          />
        </div>

        <div className="mt-5 text-sm text-gray-700 lg:text-base">
          <p>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
        </div>

        <div className="mt-5 space-y-1 text-base text-gray-700">
          <p className="text-base font-semibold text-black">
            Contact Information
          </p>
          <Link
            href={`mailto:${order.user.email}`}
            className="text-sm text-blue-500 hover:underline lg:text-base"
          >
            {order.user.email}
          </Link>
          <p className="text-sm lg:text-base">
            {order.shippingAddress.phoneNumber}
          </p>
        </div>

        <div className="mt-5 space-y-1 text-sm text-gray-700 lg:text-base">
          <p className="text-base font-semibold text-black">Shipping Address</p>
          <p>
            {order.shippingAddress.firstName} {order.shippingAddress.lastName}
          </p>
          <p>{order.shippingAddress.buildingNo}</p>
          <p>{order.shippingAddress.street}</p>
          <p>{order.shippingAddress.city}</p>
          <p>{order.shippingAddress.postalCode}</p>
          <Link
            href={`tel:${order.shippingAddress.phoneNumber}`}
            className="block w-fit text-blue-500 hover:underline"
          >
            {order.shippingAddress.phoneNumber}
          </Link>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}`,
            )}`}
            target="_blank"
            className="block w-fit text-blue-500 hover:underline"
          >
            View map
          </Link>
        </div>

        <div className="mt-5 space-y-1 text-sm text-gray-700 lg:text-base">
          <p className="text-base font-semibold text-black">Billing Address</p>
          <p>Same as shipping address</p>
        </div>
      </AdminContainer>
    </div>
  )
}
