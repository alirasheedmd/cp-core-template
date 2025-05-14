'use client'

import CurrencySymbol from '@/components/common/CurrencySymbol'
import PrimaryButton from '@/components/common/PrimaryButton'
import Link from 'next/link'
import { routes } from '@/config/routes'

interface OrderSummaryProps {
  subtotal: number
  shippingFee: number
  total: number
}

export function OrderSummary({
  subtotal,
  shippingFee,
  total,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="rounded-lg border p-4">
        <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <CurrencySymbol amount={subtotal} />
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <CurrencySymbol amount={shippingFee} />
          </div>
          <div className="mt-2 border-t pt-2">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <CurrencySymbol amount={total} />
            </div>
          </div>
        </div>

        <Link href={routes.checkout}>
          <PrimaryButton className="mt-5 w-full" fullWidth>
            Proceed to Checkout
          </PrimaryButton>
        </Link>
      </div>
    </div>
  )
}
