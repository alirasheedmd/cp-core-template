'use client'
import { Search, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/config/routes'
import dynamic from 'next/dynamic'
import UserIcon from '@/components/layout/UserIcon'

const CartBadge = dynamic(() => import('./CartBadge'), {
  ssr: false,
  loading: () => null,
})

export default function HeaderIcons() {
  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>
      <UserIcon className="hidden md:block" />
      <Link href={routes.cart} className="relative">
        <ShoppingBag className="transition-all hover:scale-105" />
        <CartBadge />
      </Link>
    </div>
  )
}
