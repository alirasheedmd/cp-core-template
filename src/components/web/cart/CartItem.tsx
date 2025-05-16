'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { routes } from '@/config/routes'
import CurrencySymbol from '@/components/common/CurrencySymbol'
// import { QuantitySelector } from '@/components/web/shared/QuantitySelector'
// import { CartItem as CartItemType } from '@/stores/useCartStore'
import { removeAllProductItemFromCart } from '@/lib/dal'
import { type CartItem } from '@/types'
import {
  // useState,
  useTransition
} from 'react'
import CartItemQuantitySelector from './CartQuantitySelector'

interface CartItemProps {
  // item: CartItemType
  item: CartItem
  // onQuantityChange: (id: string, quantity: number) => void
  // onRemove: (id: string) => void
}

export function CartItem({
  item,
  // onQuantityChange,
  // onRemove
}: CartItemProps) {
  const isValidUrl = (url: string) =>
  url?.startsWith("/") || url?.startsWith("http");
  const [isPending, startTransition] = useTransition()
  // const [quantity, setQuantity] = useState<number>(item.qty)
  // const onQuantityChange = (id: string, newQuantity: number) => {
  //   if (newQuantity < 1) return
  //   item.qty = newQuantity
  //   return setQuantity(newQuantity)
  // }
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center md:justify-between">
      {/* First row on mobile, first column on desktop */}
      <div className="flex items-center gap-4">
        {isValidUrl(item.image) && (
          <Link
            href={routes.dynamicProduct.product(item.slug)}
            className="relative h-24 w-24 flex-shrink-0"
          >
            <Image
              src={item.image} 
              alt={item?.name}
              fill
              className="rounded-md object-cover"
            />
          </Link>
        )}

        <div className="flex-1">
          <Link
            href={routes.dynamicProduct.product(item.slug)}
            className="block font-medium underline-offset-2 hover:underline"
          >
            {item.name}
          </Link>
          <CurrencySymbol amount={item.price} className="text-gray-600" />
          <div className="hidden md:block">
            {/* <QuantitySelector
              quantity={quantity}
              onQuantityChange={(newQuantity) =>
                onQuantityChange(item.productId, newQuantity)
              }
            /> */}
            <CartItemQuantitySelector
              quantity={item.qty}
              item={item}
            />
          </div>
        </div>
      </div>

      {/* Second row on mobile, second column on desktop */}
      <div className="sm:flex-1 md:hidden">
        {/* <QuantitySelector
          quantity={item.qty}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item.productId, newQuantity)
          }
        /> */}
        <CartItemQuantitySelector
          quantity={item.qty}
          item={item}
        />
      </div>

      {/* Third row on mobile, third column on desktop */}
      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
        <CurrencySymbol
          amount={item.price * item.qty}
          className="font-medium"
        />
        <button
          disabled={isPending}
          onClick={
           () =>
            startTransition(async () => {
              const res = await removeAllProductItemFromCart(item.productId)
              if (!res.success) {
                console.log('error in removing item to cart')
              }
            })
            // onRemove(item.id)
          }
          className="text-red-500 hover:text-red-600 sm:ml-4"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
