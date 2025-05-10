import { Skeleton } from '@/components/ui/skeleton'

interface GridSkeletonProps {
  count?: number
  className?: string
}

export default function GridSkeleton({
  count = 10,
  className = '',
}: GridSkeletonProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-5 ${className}`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
        >
          <Skeleton className="h-full w-full" />
        </div>
      ))}
    </div>
  )
}
