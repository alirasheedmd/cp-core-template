import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import CategoryCardSkeleton from '@/components/web/shared/CategoryCardSkeleton'

export default function HomeCategorySkeleton() {
  return (
    <section className="my-10">
      {/* Heading Skeleton */}
      <div className="mb-8 flex items-end justify-between">
        <div className="h-9 w-48">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="h-6 w-24">
          <Skeleton className="h-full w-full" />
        </div>
      </div>

      {/* Category Cards Skeleton Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-6">
        {[...Array(6)].map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </section>
  )
}
