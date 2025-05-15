'use client'

import { Button } from '@/components/ui/button'
import { Cart } from '@/db/schema'
import { addItemToCart, removeItemFromCart } from '@/lib/dal'
// import { useAuthRequired } from '@/hooks/useAuthRequired'
// import { useCartStore } from '@/stores/useCartStore'
import { CartItem } from '@/types'
import { Loader, Minus, Plus } from 'lucide-react'
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
  cart,
  item,
}: {
  cart?: Cart
  item: Omit<CartItem, 'cardId'>
}) {
  const [isPending, startTransition] = useTransition()
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId)
  return existItem ? (
    <div>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await removeItemFromCart(item.productId)
            toast(res.success ? 'default' : 'destructive', res.message as any)
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Minus className="h-4 w-4" />
        )}
      </Button>
      <span className="px-2">{existItem.qty}</span>
      <Button
        type="button"
        variant="outline"
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            const res = await addItemToCart(item)
            toast(res.success ? 'default' : 'destructive', res.message as any)
            return
          })
        }}
      >
        {isPending ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Plus className="h-4 w-4" />
        )}
      </Button>
    </div>
  ) : (
    <Button
      className="w-full"
      type="button"
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          const res = await addItemToCart(item)
          if (!res.success) {
            toast('destructive', res.message as any)
            return
          }
          toast(`${item.name} added to the cart`)
        })
      }}
    >
      {isPending ? <Loader className="animate-spin" /> : <Plus />}
      Add to cart
    </Button>
  )
}
