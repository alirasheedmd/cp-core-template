'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { routes } from '@/config/routes'
import CurrencySymbol from '@/components/common/CurrencySymbol'
import { QuantitySelector } from '@/components/web/shared/QuantitySelector'
import { CartItem as CartItemType } from '@/stores/useCartStore'
import { removeItemFromCart } from '@/lib/dal'

interface CartItemProps {
  item: CartItemType
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  return (
    <div className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center md:justify-between">
      {/* First row on mobile, first column on desktop */}
      <div className="flex items-center gap-4">
        {item.image && (
          <Link
            href={routes.dynamicProduct.product(item.slug)}
            className="relative h-24 w-24 flex-shrink-0"
          >
            <Image
              src={item.image}
              alt={item.name}
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
            <QuantitySelector
              quantity={item.quantity}
              onQuantityChange={(newQuantity) =>
                onQuantityChange(item.id, newQuantity)
              }
            />
          </div>
        </div>
      </div>

      {/* Second row on mobile, second column on desktop */}
      <div className="sm:flex-1 md:hidden">
        <QuantitySelector
          quantity={item.quantity}
          onQuantityChange={(newQuantity) =>
            onQuantityChange(item.id, newQuantity)
          }
        />
      </div>

      {/* Third row on mobile, third column on desktop */}
      <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
        <CurrencySymbol
          amount={item.price * item.quantity}
          className="font-medium"
        />
        <button
          onClick={
            () => removeItemFromCart(item.id)
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
