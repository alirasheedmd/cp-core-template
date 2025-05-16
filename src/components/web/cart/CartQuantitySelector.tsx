import { Button } from "@/components/ui/button"
import { addItemToCart, removeItemFromCart } from "@/lib/dal"
import { CartItem } from "@/types"
import { Minus, Plus } from "lucide-react"
import { usePathname } from "next/navigation"
import { useTransition } from "react"
import { toast, Toaster } from "sonner"

interface CartItemQuantitySelectorProps {
  quantity: number
  item: CartItem
  min?: number
}

export default function CartItemQuantitySelector({
    quantity,
    min = 1,
    item
}: CartItemQuantitySelectorProps 
) {
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
                  className="text-DarkGrey hover:bg-LightGrey px-3 py-1 text-lg"
                    onClick={() => {
                    startTransition(async () => {
                        const res = await removeItemFromCart(
                          item.productId,
                          currentPath,
                        )
                        toast(res.message)
                        return
                    })
                    }}
                >
                    <Minus className="h-4 w-4" />

                    <Toaster />
                </Button>
                <input
                    type="number"
                    className="mx-auto w-12 border-0 text-center focus:ring-0"
                    value={quantity}
                    min={min}
                    readOnly
                    />
                <Button
                    type="button"
                    variant="ghost"
                  disabled={isPending}
                  className="text-DarkGrey hover:bg-LightGrey px-3 py-1 text-lg"
                  aria-label="Increase quantity"
                    onClick={() => {
                    startTransition(async () => {
                        const res = await addItemToCart(item, currentPath)
                        toast(res.message)
                        return
                    })
                    }}
                >
                    <Plus className="h-4 w-4" />
                    <Toaster />
                </Button>
        </div>
    </div>
  ) 
}
