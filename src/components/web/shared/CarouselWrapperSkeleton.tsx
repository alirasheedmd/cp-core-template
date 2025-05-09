import { Skeleton } from '@/components/ui/skeleton'
import { ProductCardSkeleton } from '@/components/web/shared/ProductCardSkeleton'

export default function CarouselWrapperSkeleton() {
  return (
    <div className="my-16 space-y-8">
      {[1, 2, 3, 4].map((categoryIndex) => (
        <div key={categoryIndex} className="space-y-4">
          {/* Category Title */}
          <div className="mb-8 flex items-center justify-between">
            <Skeleton className="h-8 w-48" />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {/* Small screens: 2 cards */}
            <ProductCardSkeleton className="md:hidden" />
            <ProductCardSkeleton className="md:hidden" />

            {/* Medium screens: 3 cards */}
            <ProductCardSkeleton className="hidden md:flex lg:hidden" />
            <ProductCardSkeleton className="hidden md:flex lg:hidden" />
            <ProductCardSkeleton className="hidden md:flex lg:hidden" />

            {/* Large screens: 4 cards */}
            <ProductCardSkeleton className="hidden lg:flex" />
            <ProductCardSkeleton className="hidden lg:flex" />
            <ProductCardSkeleton className="hidden lg:flex" />
            <ProductCardSkeleton className="hidden lg:flex" />
          </div>
        </div>
      ))}
    </div>
  )
}
