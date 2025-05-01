import UpdateOrderButton from './UpdateOrderButton'
import DeleteOrderButton from './DeleteOrderButton'

interface OrderActionButtonsProps {
  orderId: string
  uploadResponse: string | null
  className?: string
}

export default function OrderActionButtons({
  orderId,
  uploadResponse,
  className = '',
}: OrderActionButtonsProps) {
  return (
    <div
      className={`mt-4 flex w-full gap-x-4 px-3 pb-4 lg:ml-auto lg:w-fit lg:px-0 lg:pb-0 ${className}`}
    >
      <UpdateOrderButton orderId={orderId} uploadResponse={uploadResponse} />
      <DeleteOrderButton orderId={orderId} />
    </div>
  )
}
