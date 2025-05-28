import { Suspense } from 'react'
import OrderServerComponent from './OrderServerComponent'

const AdminOrderPage = () => {
  return (
    <Suspense fallback={<div>Loading orders...</div>}>
      <OrderServerComponent />
    </Suspense>
  )
}

export default AdminOrderPage
