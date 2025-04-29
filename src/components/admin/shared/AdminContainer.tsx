import { cn } from '@/lib/utils'

interface AdminContainerProps {
  children: React.ReactNode
  className?: string
}

export default function AdminContainer({
  children,
  className,
}: AdminContainerProps) {
  return (
    <div className={cn('rounded-lg bg-white p-3', className)}>{children}</div>
  )
}
