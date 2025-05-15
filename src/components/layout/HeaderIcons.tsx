'use client'
import {
  Search,
  // ShoppingBag,
  User,
} from 'lucide-react'
// import Link from 'next/link'
// import { routes } from '@/config/routes'
// import dynamic from 'next/dynamic'

import { Cart, type User as UserType } from '@/db/schema'
import UserDropdownMenu from './UserDropdownMenu'
import { useAuth } from '@/context/AuthContext'
import CartButton from './CartButton'

// const CartBadge = dynamic(() => import('./CartBadge'), {
//   ssr: false,
//   loading: () => null,
// })

interface HeaderIconsProps {
  user?: UserType
  cart: Cart
}

export default function HeaderIcons(props: HeaderIconsProps) {
  const { user, cart } = props
  const { openAuth } = useAuth()

  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>

      {!user && (
        <button onClick={() => openAuth('signin')}>
          <User className="transition-all hover:scale-105" />
        </button>
      )}
      {user && <UserDropdownMenu user={user} />}

      {/* <Link href={routes.cart} className="relative">
        <ShoppingBag className="transition-all hover:scale-105" />
        <CartBadge />
      </Link> */}
      <CartButton cart={cart} />
    </div>
  )
}
