import WebContainer from '@/components/web/shared/WebContainer'
import CategoryHeader from '@/components/web/collections/CategoryHeader'
import ProductsGrid from '@/components/web/collections/ProductsGrid'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import GridSkeleton from '@/components/web/shared/GridSkeleton'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params

  return (
    <WebContainer>
      <Suspense
        fallback={
          <div className="my-8">
            <Skeleton className="h-10 w-64" />
          </div>
        }
      >
        <CategoryHeader category={category} />
      </Suspense>
      <Suspense fallback={<GridSkeleton count={10} />}>
        <ProductsGrid category={category} />
      </Suspense>
    </WebContainer>
  )
}
