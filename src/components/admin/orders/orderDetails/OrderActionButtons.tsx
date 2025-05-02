import UpdateOrderButton from './UpdateOrderButton'
import DeleteOrderButton from './DeleteOrderButton'

interface OrderActionButtonsProps {
  orderId: string
  uploadResponse: string | null
  className?: string
  onDelete: () => void
  isPending: boolean
}

export default function OrderActionButtons({
  orderId,
  uploadResponse,
  className = '',
  onDelete,
  isPending,
}: OrderActionButtonsProps) {
  return (
    <div
      className={`mt-4 flex w-full gap-x-4 px-3 pb-4 lg:ml-auto lg:w-fit lg:px-0 lg:pb-0 ${className}`}
    >
      <UpdateOrderButton orderId={orderId} uploadResponse={uploadResponse} />
      <DeleteOrderButton
        orderId={orderId}
        onDelete={onDelete}
        isPending={isPending}
      />
    </div>
  )
}
