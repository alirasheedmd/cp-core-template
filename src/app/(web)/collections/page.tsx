import WebContainer from '@/components/web/shared/WebContainer'
import CollectionsGrid from '@/components/web/collections/CollectionsGrid'
import GridSkeleton from '@/components/web/shared/GridSkeleton'
import { Suspense } from 'react'

export default function Collections() {
  return (
    <WebContainer>
      <h1 className="my-8 text-2xl font-bold md:text-3xl">Categories</h1>
      <Suspense fallback={<GridSkeleton count={8} />}>
        <CollectionsGrid />
      </Suspense>
    </WebContainer>
  )
}
