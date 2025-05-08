import { Skeleton } from '@/components/ui/skeleton'
import { Card } from '@/components/ui/card'

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

const ProductCardSkeleton = ({ className = '' }: { className?: string }) => (
  <Card
    className={`flex h-full w-full flex-col justify-between border-2 border-gray-200 p-5 py-10 ${className}`}
  >
    <div className="relative mx-auto h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg md:h-32 md:w-32 lg:h-40 lg:w-40">
      <Skeleton className="h-full w-full" />
    </div>
    <div className="flex flex-grow flex-col items-center justify-end gap-y-1.5">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="mt-5 h-9 w-32 rounded-full" />
    </div>
  </Card>
)
