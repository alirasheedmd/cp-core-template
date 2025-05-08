import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const ProductCardSkeleton = ({
  className = '',
}: {
  className?: string
}) => (
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
