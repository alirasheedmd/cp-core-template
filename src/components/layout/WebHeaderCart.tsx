'use server'

import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { routes } from '@/config/routes'
import { getMyCart } from '@/lib/dal'

export default async function WebHeaderCart() {
  let cartItemCount = 0

  try {
    const cart = await getMyCart()
    if (cart && cart.items?.length > 0) {
      cartItemCount = cart.items.reduce((sum, item) => sum + item.qty, 0)
    }
  } catch (error) {
    console.error('Failed to fetch cart:', error)
    // Continue rendering with 0 items rather than breaking the UI
  }

  return (
    <Link href={routes.cart} className="relative">
      <ShoppingBag className="transition-all hover:scale-105" />
      {cartItemCount > 0 && (
        <Badge className="bg-Red absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs">
          {cartItemCount}
        </Badge>
      )}
    </Link>
  )
}
