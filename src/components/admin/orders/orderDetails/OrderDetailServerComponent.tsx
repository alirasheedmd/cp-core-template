import { getOrderById } from '@/lib/dal'
import OrderClientComponent from './OrderClientComponent'
import { IOrder } from '@/types'

interface OrderComponentProps {
    orderId: string
}

const OrderDetailServerComponent = async ({ orderId }: OrderComponentProps) => {
  const order = await getOrderById(orderId)

  const orderData = {
    ...order,
    orderId: order?.id
  }
  return (
      <OrderClientComponent orderId={orderId} order={orderData as IOrder}/>
  )
}

export default OrderDetailServerComponent