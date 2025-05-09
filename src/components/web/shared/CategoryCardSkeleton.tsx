import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function CategoryCardSkeleton() {
  return (
    <Card className="flex h-full flex-1 flex-col justify-between gap-10 border-2 border-gray-200 p-3 md:w-50 md:p-5">
      <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-lg md:h-36 md:w-36">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex items-center justify-center gap-x-1">
        <Skeleton className="h-6 w-24 md:h-7 md:w-32" />
        <Skeleton className="mt-1.5 h-5 w-5 md:h-6 md:w-6" />
      </div>
    </Card>
  )
}
