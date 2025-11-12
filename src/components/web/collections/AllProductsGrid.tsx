import GridWrapper from '@/components/web/shared/GridWrapper'
import GridSkeleton from '@/components/web/shared/GridSkeleton'
import { getAllProducts } from '@/lib/dal'
import { Suspense } from 'react'
import { IWebProduct } from '@/types'
import WebProductCard from '@/components/web/shared/WebProductCard'

export default async function CollectionsGrid() {
  const products = await getAllProducts()

  const mappedProducts: IWebProduct[] = products.map((product) => ({
    id: product.id,
    title: product.title,
    description: product.description,
    categories: product.categories,
    price: product.price,
    image: product.images?.[0] || null,
    slug: product.slug,
    shippingPrice: product.shippingPrice,
    tax: product.tax,
  }))

  return (
    <Suspense fallback={<GridSkeleton count={8} />}>
      <GridWrapper
        data={mappedProducts}
        CardComponent={WebProductCard}
        cardProps={(product: IWebProduct) => ({ item: product })}
      />
    </Suspense>
  )
}
