import { Button } from '@/components/ui/button'
import { addItemToCart, removeItemFromCart } from '@/lib/dal'
import { CartItem } from '@/types'
import { Minus, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useTransition } from 'react'

interface CartItemQuantitySelectorProps {
  quantity: number
  item: CartItem
  min?: number
}

export default function CartItemQuantitySelector({
  quantity,
  min = 1,
  item,
}: CartItemQuantitySelectorProps) {
  const [isPending, startTransition] = useTransition()
  const currentPath = usePathname()
  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Quantity</span>
      <div className="ml-2 flex items-center overflow-hidden rounded-md border">
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          aria-label="Decrease quantity"
          className="text-DarkGrey hover:bg-LightGrey rounded-r-none px-2 py-0.5 text-base"
          onClick={() => {
            startTransition(async () => {
              const res = await removeItemFromCart(item.productId)
              // toast(res.message)
              console.log(res.message)

              return
            })
          }}
        >
          <Minus className="h-3.5 w-3.5" />
          {/* <Toaster /> */}
        </Button>
        <input
          type="number"
          className="mx-auto w-10 [appearance:textfield] border-0 text-center text-sm focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={quantity}
          min={min}
          readOnly
        />
        <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          className="text-DarkGrey hover:bg-LightGrey rounded-l-none px-2 py-0.5 text-base"
          aria-label="Increase quantity"
          onClick={() => {
            startTransition(async () => {
              const res = await addItemToCart(item, currentPath)
              // toast(res.message)
              console.log(res.message)
              return
            })
          }}
        >
          <Plus className="h-3.5 w-3.5" />
          {/* <Toaster /> */}
        </Button>
      </div>
    </div>
  )
}
