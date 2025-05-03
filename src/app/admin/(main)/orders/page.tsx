import { Suspense } from 'react'
import { dummyOrders as orders } from '@/data/dummyOrders'
import { ordersColumns } from './orders-columns'
import OrderClientContainer from './order-client-container'

// Function to fetch products with caching
async function getOrders() {
  'use cache'
  // This would normally be a DB fetch
  return orders
}

// Function to get columns with caching
async function getColumns() {
  'use cache'
  return ordersColumns
}

// This is a server component (the page)
export default async function AdminOrdersPage() {
  // Get data with caching
  const orders = await getOrders()
  const columns = await getColumns()

  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrderClientContainer orders={orders} columns={columns} />
    </Suspense>
  )
}
