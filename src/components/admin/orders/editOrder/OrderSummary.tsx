import { IOrder } from '@/types'
import EditOrderUpdateButton from './EditOrderUpdateButton'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { Checkbox } from '@/components/ui/checkbox'

interface Props {
  order: IOrder | null
  hasChanges: boolean
  totalAmount: number
  difference: number
  sendNotification: boolean
  setSendNotification: (value: boolean) => void
  updateOrderHandler: () => Promise<void>
  isOrderEditable: boolean
}

export default function OrderSummary({
  order,
  hasChanges,
  totalAmount,
  difference,
  sendNotification,
  setSendNotification,
  updateOrderHandler,
  isOrderEditable,
}: Props) {
  return (
    <div className="basis-[30%]">
      <AdminContainer>
        <p className="font-semibold">Summary</p>
        {hasChanges ? (
          <div className="text-sm lg:text-base">
            <p className="my-4">Update total amount</p>
            <div className="grid grid-cols-2 gap-y-2">
              <p>Previous amount:</p>
              <p>Rs. {order?.totalAmount}</p>
              <p>Difference:</p>
              <p>
                {difference >= 0 ? '+ ' : ''}
                {difference}
              </p>
              <p>New total:</p>
              <p className="font-semibold">Rs. {totalAmount}</p>
            </div>
          </div>
        ) : (
          <p className="my-3 text-sm text-neutral-600 lg:text-base">
            No changes have been made
          </p>
        )}
        <div className="mt-5 flex items-center space-x-2">
          <Checkbox
            id="sendNotification"
            checked={sendNotification}
            onCheckedChange={(checked) =>
              setSendNotification(checked as boolean)
            }
          />
          <label
            htmlFor="sendNotification"
            className="text-base leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Send notification to customer
          </label>
        </div>
        <EditOrderUpdateButton
          className={`w-full ${
            !hasChanges || !isOrderEditable
              ? 'pointer-events-none cursor-not-allowed opacity-50'
              : ''
          }`}
          onClick={updateOrderHandler}
        />
      </AdminContainer>
    </div>
  )
}
