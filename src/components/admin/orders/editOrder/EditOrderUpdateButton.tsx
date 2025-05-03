'use client'

import { cn } from '@/lib/utils'

export default function UpdateOrderButton({
  className,
  onClick,
}: {
  className?: string
  onClick: () => void
}) {
  return (
    <div className="mt-5">
      <button
        onClick={onClick}
        className={cn(
          'hover:text-Orange w-full rounded-xl border border-neutral-300 bg-white py-2 text-sm text-nowrap shadow-md transition-colors lg:text-base',
          className,
        )}
      >
        Update Order
      </button>
    </div>
  )
}
