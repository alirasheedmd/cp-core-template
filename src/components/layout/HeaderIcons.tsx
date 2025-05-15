'use client'
import { Search } from 'lucide-react'
import { Cart } from '@/db/schema'
import CartButton from './CartButton'

interface HeaderIconsProps {
  cart: Cart
}

export default function HeaderIcons(props: HeaderIconsProps) {
  const { cart } = props

  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>

      <CartButton cart={cart} />
    </div>
  )
}
