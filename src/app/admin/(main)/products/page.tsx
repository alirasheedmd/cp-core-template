import { Suspense } from 'react'
import ProductServerComponent from './ProductServerComponent'

export default async function AdminProductsPage() {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductServerComponent />
    </Suspense>
  )
}
