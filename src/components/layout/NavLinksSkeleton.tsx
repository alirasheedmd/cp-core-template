import { cn } from '@/lib/utils'

interface NavLinksSkeletonProps {
  className?: string
}

export default function NavLinksSkeleton({ className }: NavLinksSkeletonProps) {
  return (
    <nav className={cn('flex items-center gap-x-6', className)}>
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="h-6 w-20 animate-pulse rounded-md bg-gray-100"
        />
      ))}
    </nav>
  )
}
