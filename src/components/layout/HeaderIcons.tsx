'use client'
import { Search, ShoppingBag, User } from 'lucide-react'
import { useCartStore } from '@/stores/useCartStore'
import Link from 'next/link'
import { routes } from '@/config/routes'

export default function HeaderIcons() {
  const totalItems = useCartStore((state) => state.getTotalItems())

  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>
      <button className="hidden lg:block">
        <User className="transition-all hover:scale-105" />
      </button>
      <Link href={routes.cart} className="relative">
        <ShoppingBag className="transition-all hover:scale-105" />
        {totalItems > 0 && (
          <span className="bg-Red absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-xs text-white">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  )
}
