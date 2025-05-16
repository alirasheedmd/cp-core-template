'use client'

import { Cart } from '@/db/schema'
import { addItemToCart } from '@/lib/dal'

import { CartItem } from '@/types'
import { Loader } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'

export default function AddToCart({
  item,
}: {
  cart?: Cart
  item: Omit<CartItem, 'cardId'>
}) {
  const [isPending, startTransition] = useTransition()
  const currentPath = usePathname()
  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    startTransition(async () => {
      const res = await addItemToCart(item, currentPath)
      if (!res.success) {
        console.log(res.message)
        return
      }
      console.log(item.name + ' added to the cart')
    })
  }

  return (
    <button
      className="border-Red text-Red mt-5 w-full rounded-full border-2 px-4 py-2 text-nowrap transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
      type="button"
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <div className="flex items-center justify-center gap-x-1">
          <Loader className="inline-block animate-spin" />
          <span>Adding...</span>
        </div>
      ) : (
        'Add to cart'
      )}
    </button>
  )
}
