import React from 'react'
import OrderConfirmationComponent from './OrderConfirmationComponent'
import { getOrderById } from '@/lib/dal'
import { Order, OrderItem } from '@/db/schema'

interface OrderConfirmationProps {
  id: string
}

export interface OrderData extends Order {
  orderItems: OrderItem[]
  user: {
    email: string
  }
}

const OrderConfirmation = async (props: OrderConfirmationProps) => {
  const { id } = props
  const order = await getOrderById(id)
  console.log('order details.....', order)

  return <OrderConfirmationComponent order={order as OrderData} />
}

export default OrderConfirmation
