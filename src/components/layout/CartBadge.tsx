'use client'
import { useCartStore } from '@/stores/useCartStore'

export default function CartBadge() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  if (totalItems <= 0) return null

  return (
    <span className="bg-Red absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
      {totalItems}
    </span>
  )
}
