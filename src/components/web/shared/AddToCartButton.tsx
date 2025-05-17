'use client'

import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/sonner'
import { addItemToCart } from '@/lib/dal'
// import { useAuthRequired } from '@/hooks/useAuthRequired'
// import { useCartStore } from '@/stores/useCartStore'
import { CartItem } from '@/types'
import { Loader, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

// interface AddToCartProps {
//   productId: string
//   name: string
//   price: string
//   image?: string | null
//   quantity?: number
//   slug: string
// }

// export function AddToCart({
//   productId,
//   name,
//   price,
//   image,
//   quantity = 1,
//   slug,
// }: AddToCartProps) {
//   // const requireAuth = useAuthRequired()
//   const addItem = useCartStore((state) => state.addItem)

//   const handleAddToCart = async () => {
//     // const isAuthenticated = await requireAuth()

//     // if (isAuthenticated) {
//     // Add the item multiple times based on quantity
//     for (let i = 0; i < quantity; i++) {
//       addItem({
//         id: productId,
//         name,
//         price: parseFloat(price),
//         image: image || undefined,
//         slug,
//       })
//     }
//     // }
//   }

//   return (
//     <button
//       onClick={(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         handleAddToCart()
//       }}
//       className="border-Red text-Red mt-5 rounded-full border-2 px-4 py-2 text-nowrap transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
//     >
//       Add to Cart
//     </button>
//   )
// }

export default function AddToCart({
  item,
}: {
  item: Omit<CartItem, 'cardId'>
}) {
  const [isPending, startTransition] = useTransition()
  const currentPath = usePathname()
  return (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart(item, currentPath)
          if (!res.success) {
            toast(res.message)
            return
          }
          toast(`${item.name} added to the cart`)
        })
      }}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      <Toaster />
      Add to cart
    </Button>
  )
}
