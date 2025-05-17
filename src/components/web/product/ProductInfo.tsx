'use client'
// import { useState } from 'react'
import CurrencySymbol from '@/components/common/CurrencySymbol'
import AddToCart from '@/components/web/shared/AddToCartButton'
import { QuantitySelector } from '@/components/web/shared/QuantitySelector'
import PrimaryButton from '@/components/common/PrimaryButton'
import { round2 } from '@/lib/utils'
import { CartItem } from '@/types'
import { useState } from 'react'

interface ProductInfoProps {
  title: string
  sku: string
  price: string
  description?: string | null
  status: string
  descriptionTitle: string
  id: string
  image?: string | null
  slug: string
  shippingPrice: string
  tax: string
}

export default function ProductInfo({
  title,
  sku,
  price,
  description,
  status,
  id,
  image,
  slug,
  shippingPrice,
  tax,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)

  // const quantity = cart?.items?.length
  //   ? cart.items.find((pId) => pId.productId === id)?.qty ?? 1
  //   : 1
  const item: CartItem = {
    productId: id,
    name: title,
    slug: slug,
    qty: quantity,
    image: image as string,
    price: round2(price),
    shippingPrice: Number(shippingPrice),
    tax: Number(tax),
  }
  const onQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    item.qty = newQuantity
    return setQuantity(newQuantity)
  }
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
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />

      {/* Buttons */}
      <div className="flex max-w-80 flex-col gap-3">
        <AddToCart
          item={{
            productId: id,
            name: title,
            slug: slug,
            qty: quantity,
            image: image as string,
            price: round2(price),
            shippingPrice: Number(shippingPrice),
            tax: Number(tax),
          }}
          // productId={id}
          // name={title}
          // price={price}
          // image={image}
          // quantity={quantity}
          // slug={slug}
        />
        <PrimaryButton fullWidth>Buy it now</PrimaryButton>
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
