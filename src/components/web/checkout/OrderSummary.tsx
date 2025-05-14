'use client'

import { Separator } from '@/components/ui/separator'
import { useCartStore } from '@/stores/useCartStore'
import CurrencySymbol from '@/components/common/CurrencySymbol'
import Image from 'next/image'
import { routes } from '@/config/routes'

export default function OrderSummary() {
  const { items, shippingFee, getSubtotal, getTotal } = useCartStore()

  const subtotal = getSubtotal()
  const total = getTotal()

  return (
    <div className="w-full overflow-y-auto bg-gray-50 p-4 sm:p-6">
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h2 className="text-lg font-semibold sm:text-xl">Order Summary</h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-3 sm:space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-3 sm:gap-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border bg-gray-100 sm:h-20 sm:w-20">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-gray-400 sm:text-sm">
                    No image
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <h3 className="line-clamp-2 text-xs font-medium sm:text-sm">
                    {item.name}
                  </h3>
                  <CurrencySymbol
                    amount={item.price * item.quantity}
                    className="ml-2 text-xs font-medium sm:text-sm"
                  />
                </div>
                <p className="text-muted-foreground mt-0.5 text-xs sm:mt-1 sm:text-sm">
                  Quantity: {item.quantity}
                </p>
                <p className="text-muted-foreground mt-1 text-xs sm:mt-2 sm:text-sm">
                  <CurrencySymbol amount={item.price} />
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-3 sm:my-4" />

        {/* Order Totals */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-DarkGrey">Subtotal</span>
            <CurrencySymbol amount={subtotal} />
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-DarkGrey">Shipping Fee</span>
            <CurrencySymbol amount={shippingFee} />
          </div>
          <Separator className="my-2 sm:my-3" />
          <div className="flex justify-between text-sm font-medium sm:text-base">
            <span>Total</span>
            <CurrencySymbol amount={total} />
          </div>
        </div>

        {/* Additional Information */}
        <div className="rounded-lg border bg-white p-3 text-xs sm:p-4 sm:text-sm">
          <h3 className="font-medium">Delivery Information</h3>
          <p className="text-muted-foreground mt-1.5 sm:mt-2">
            Estimated delivery time: 2-3 business days
          </p>
          <p className="text-muted-foreground mt-0.5 sm:mt-1">
            Free shipping for orders above
            <CurrencySymbol
              symbolSize={12}
              amount={1000}
              className="ml-1.5 items-start sm:ml-2"
            />
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="text-muted-foreground text-[10px] sm:text-xs">
          <p>
            By completing your purchase, you agree to our{' '}
            <a
              href={routes.footer.termsOfService}
              className="hover:text-foreground underline"
            >
              Terms and Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
