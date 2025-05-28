import { Suspense } from 'react'
import { ordersColumns } from './orders-columns'
import OrderClientContainer from './order-client-container'
import { getAllOrders } from '@/lib/dal'
import { IOrder } from '@/types'

// Function to fetch products with caching
async function getOrders() {
  'use cache'
    const orders = await getAllOrders()
    
    const orderData = orders.map((order) => ({
        ...order,
        orderId: order.id
    }))
  return orderData
}

// Function to get columns with caching
async function getColumns() {
  'use cache'
  return ordersColumns
}

// This is a server component (the page)
export default async function OrderServerComponent() {
  // Get data with caching
  const orders = await getOrders()
  const columns = await getColumns()

  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrderClientContainer orders={orders as IOrder[]} columns={columns} />
    </Suspense>
  )
}
