import { cn } from '@/lib/utils'

export default function WebContainer({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('mx-auto max-w-[1365px] px-4 md:px-9', className)}>
      {children}
    </div>
  )
}
