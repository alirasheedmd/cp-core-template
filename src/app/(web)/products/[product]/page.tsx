import ProductData from '@/components/web/product/ProductData'
import ProductSkeleton from '@/components/web/product/ProductDetailSkeleton'
import { Suspense } from 'react'

export default async function DynamicProductPage({
  params,
}: {
  params: Promise<{ product: string }>
}) {
  const { product } = await params
  return (
    <div>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductData product={product} />
      </Suspense>
    </div>
  )
}
