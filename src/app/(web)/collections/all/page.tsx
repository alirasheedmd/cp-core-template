import WebContainer from '@/components/web/shared/WebContainer'
import GridSkeleton from '@/components/web/shared/GridSkeleton'
import { Suspense } from 'react'
import AllProductsGrid from '@/components/web/collections/AllProductsGrid'

export default function AllProductsPage() {
  return (
    <WebContainer>
      <h1 className="my-8 text-2xl font-bold md:text-3xl">All Products</h1>
      <Suspense fallback={<GridSkeleton count={8} />}>
        <AllProductsGrid />
      </Suspense>
    </WebContainer>
  )
}
