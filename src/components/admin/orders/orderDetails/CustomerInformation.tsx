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
            userEmail={order?.customerDetails?.email}
            userPhoneNumber={order?.customerDetails?.phoneNumber}
            userAddress={order?.customerDetails}
            orderId={orderId}
          />
        </div>

        <div className="mt-5 text-sm text-gray-700 lg:text-base">
          <p>{order?.customerDetails?.fullName}</p>
        </div>

        <div className="mt-5 space-y-1 text-base text-gray-700">
          <p className="text-base font-semibold text-black">
            Contact Information
          </p>
          <Link
            href={`mailto:${order?.customerDetails?.email}`}
            className="text-sm text-blue-500 hover:underline lg:text-base"
          >
            {order?.customerDetails?.email}
          </Link>
          <p className="text-sm lg:text-base">
            {order?.customerDetails?.phoneNumber}
          </p>
        </div>

        <div className="mt-5 space-y-1 text-sm text-gray-700 lg:text-base">
          <p className="text-base font-semibold text-black">Shipping Address</p>
          <p>{order?.customerDetails?.fullName}</p>
          <p>{order?.customerDetails?.address?.apartment}</p>
          <p>{order?.customerDetails?.address?.street}</p>
          <p>{order?.customerDetails?.address?.city}</p>
          <p>{order?.customerDetails?.address?.postalCode}</p>
          <Link
            href={`tel:${order?.customerDetails?.phoneNumber}`}
            className="block w-fit text-blue-500 hover:underline"
          >
            {order?.customerDetails?.phoneNumber}
          </Link>
          <Link
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              `${order?.customerDetails?.address?.street}, ${order?.customerDetails?.address?.city}, ${order?.customerDetails?.address?.postalCode}`,
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
