'use client'
import { useState } from 'react'
import CurrencySymbol from '@/components/ui/CurrencySymbol'
import { AddToCart } from '@/components/web/shared/AddToCartButton'
import { QuantitySelector } from '@/components/web/shared/QuantitySelector'

interface ProductInfoProps {
  title: string
  sku: string
  price: string
  description?: string | null
  status: string
  descriptionTitle: string
  id: string
  image?: string | null
}

export default function ProductInfo({
  title,
  sku,
  price,
  description,
  status,
  id,
  image,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="space-y-6">
      <div>
        <p className="text-MediumGrey text-sm">Brand Name</p>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-MediumGrey mt-2 text-sm">SKU: {sku}</p>
      </div>

      <div className="flex items-end space-x-4">
        <CurrencySymbol amount={price} className="text-2xl font-bold" />
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
            status === 'active'
              ? 'bg-LightWhite text-DarkGrey'
              : 'bg-LightGrey text-DarkGrey'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="text-MediumGrey text-sm">
        Taxes included.{' '}
        <span className="text-Red cursor-pointer underline">Shipping</span>{' '}
        calculated at checkout.
      </div>

      {/* Quantity Selector */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        <AddToCart
          productId={id}
          name={title}
          price={price}
          image={image}
          quantity={quantity}
        />
        <button className="bg-Red w-full rounded-full py-3 text-base font-semibold text-white transition-all duration-300 hover:scale-105">
          Buy it now
        </button>
      </div>

      {/* Pickup/availability info */}
      <div className="text-MediumGrey mt-2 text-xs">
        Pickup currently unavailable at Dammam Showroom
        <br />
        <a href="#" className="underline">
          Check availability at other stores
        </a>
      </div>

      {/* Description */}
      <div className="prose prose-sm text-DarkGrey mt-6">
        {description ? (
          <p>{` ${description}`}</p>
        ) : (
          <p>. No description available.</p>
        )}
      </div>

      {/* Share link */}
      <div className="mt-4">
        <a
          href="#"
          className="text-Red flex items-center text-sm hover:underline"
        >
          <span className="mr-1">⇩</span> Share
        </a>
      </div>
    </div>
  )
}
