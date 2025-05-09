
'use client'
import { useAuth } from '@/context/AuthContext'

import { Search, ShoppingBag, User } from 'lucide-react'
import Link from 'next/link'
import { routes } from '@/config/routes'
import dynamic from 'next/dynamic'

const CartBadge = dynamic(() => import('./CartBadge'), {
  ssr: false,
  loading: () => null,
})

export default function HeaderIcons() {
  const { openAuth } = useAuth()
  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>

      <button onClick={() => openAuth('signin')}>

        <User className="transition-all hover:scale-105" />
      </button>
      <Link href={routes.cart} className="relative">
        <ShoppingBag className="transition-all hover:scale-105" />
        <CartBadge />
      </Link>
    </div>
  )
}
