'use client'

import { useCartStore } from '@/stores/useCartStore'
import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { BsCartX } from 'react-icons/bs'
import WebContainer from '@/components/web/shared/WebContainer'
import CurrencySymbol from '@/components/ui/CurrencySymbol'
import Link from 'next/link'
import { routes } from '@/config/routes'

export default function CartPage() {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    getSubtotal,
    getTotal,
    shippingFee,
  } = useCartStore()

  if (items.length === 0) {
    return (
      <WebContainer className="py-8 lg:max-w-[64rem]">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-6 py-12 text-center">
          <div className="relative">
            <BsCartX className="h-24 w-24 text-gray-400 transition-all duration-300 hover:scale-110" />
            <div className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-red-500/30" />
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold text-gray-800">
              Your cart is empty
            </h2>
            <p className="text-gray-500">
              Looks like you haven&apos;t added anything yet
            </p>
          </div>
          <Link
            href={routes.collections}
            className="bg-Blue hover:bg-Blue/90 mt-2 rounded-full px-8 py-3 font-medium text-white transition-all hover:shadow-lg"
          >
            Start Shopping
          </Link>
        </div>
      </WebContainer>
    )
  }

  return (
    <WebContainer className="lg:max-w-[64rem]">
      <h1 className="mt-9 mb-4 text-2xl font-bold">Your Cart</h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                {item.image && (
                  <div className="relative h-24 w-24">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="rounded-md object-cover"
                    />
                  </div>
                )}

                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <CurrencySymbol
                    amount={item.price}
                    className="text-gray-600"
                  />

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="rounded p-1 hover:bg-gray-100"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <CurrencySymbol
                    amount={item.price * item.quantity}
                    className="font-medium"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="mt-2 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={clearCart}
            className="mt-4 text-red-500 hover:text-red-600"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <CurrencySymbol amount={getSubtotal()} />
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <CurrencySymbol amount={shippingFee} />
              </div>
              <div className="mt-2 border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <CurrencySymbol amount={getTotal()} />
                </div>
              </div>
            </div>

            <button className="bg-primary hover:bg-primary/90 mt-4 w-full rounded-md py-2 text-white">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </WebContainer>
  )
}
