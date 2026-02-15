import { Suspense } from 'react'
import Categories from '@/components/web/homepage/Categories'
import FeaturedCategories from '@/components/web/homepage/FeaturedCategories'
import CarouselWrapperSkeleton from '@/components/web/shared/CarouselWrapperSkeleton'
import HomeCategorySkeleton from '@/components/web/homepage/HomeCategorySkeleton'

export default async function Home() {
  return (
    <main>
      <Suspense fallback={<HomeCategorySkeleton />}>
        <Categories />
      </Suspense>

      <Suspense fallback={<CarouselWrapperSkeleton />}>
        <FeaturedCategories />
      </Suspense>
    </main>
  )
}
