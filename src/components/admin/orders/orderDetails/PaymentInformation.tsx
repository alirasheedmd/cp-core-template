import AdminContainer from '@/components/admin/shared/AdminContainer'
import PaymentStatusSelector from './PaymentStatusSelector'
import UploadInvoice from './UploadInvoice'
import { IOrder } from '@/types'
import { format } from 'date-fns'

interface PaymentInformationProps {
  order: IOrder
  orderId: string
  // onUploadResponse: (response: string) => void
}

export default function PaymentInformation({
  order,
  orderId,
  // onUploadResponse,
}: PaymentInformationProps) {
  return (
    <AdminContainer>
      <p className="font-semibold">Payment Details</p>
      <p className="mt-2 text-sm text-neutral-500">#{orderId}</p>
      <div className="mt-4 flex items-center justify-between gap-x-2">
        <p className="text-sm lg:text-base">
          {order?.paymentMethod
            ?.replace(/_/g, ' ')
            .toLowerCase()
            .replace(/^./, (char) => char.toUpperCase())}
        </p>
        <PaymentStatusSelector orderId={orderId} isPaid={order.isPaid} />
      </div>
      <p className="text-sm lg:text-base">
        {order?.createdAt
          ? format(new Date(order.createdAt), 'MMMM d, yyyy')
          : ''}
      </p>

      {order?.paymentMethod === 'bank_transfer' && (
        <UploadInvoice
        // onUploadResponse={onUploadResponse}
        />
      )}
    </AdminContainer>
  )
}
