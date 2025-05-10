import GridWrapper from '@/components/web/shared/GridWrapper'
import GridSkeleton from '@/components/web/shared/GridSkeleton'
import { getAllProducts } from '@/lib/dal'
import { Suspense } from 'react'
import { IWebProduct } from '@/types'
import WebProductCard from '@/components/web/shared/WebProductCard'

export default async function CollectionsGrid() {
  const products = await getAllProducts()

  return (
    <Suspense fallback={<GridSkeleton count={8} />}>
      <GridWrapper
        data={products}
        CardComponent={WebProductCard}
        cardProps={(product: IWebProduct) => ({ item: product })}
      />
    </Suspense>
  )
}
