import CategoryCard from '@/components/web/shared/CategoryCard'
import GridWrapper from '@/components/web/shared/GridWrapper'
import GridSkeleton from '@/components/web/shared/GridSkeleton'
import { getAllCategories } from '@/lib/dal'
import { Suspense } from 'react'
import { IWebCategory } from '@/types'

export default async function CollectionsGrid() {
  const categories = await getAllCategories()

  return (
    <Suspense fallback={<GridSkeleton count={8} />}>
      <GridWrapper
        data={categories as IWebCategory[]}
        CardComponent={CategoryCard}
        cardProps={(category: IWebCategory) => ({ category })}
      />
    </Suspense>
  )
}
