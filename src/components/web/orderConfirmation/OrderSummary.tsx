import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import CurrencySymbol from '@/components/common/CurrencySymbol'
import { routes } from '@/config/routes'

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface OrderSummaryProps {
  items: OrderItem[]
  subtotal: number
  shippingFee: number
  total: number
}

export default function OrderSummary({
  items,
  subtotal,
  shippingFee,
  total,
}: OrderSummaryProps) {
  return (
    <div className="mx-auto flex h-fit w-full flex-col gap-6 rounded-lg border bg-gray-50 p-6 lg:sticky lg:top-22 lg:max-w-md">
      {/* Logo */}
      <Link
        href={routes.home}
        className="relative mx-auto h-12 w-24 md:h-14 md:w-28"
      >
        <Image src={'/logo.svg'} alt="logo" fill className="shrink-0" />
      </Link>

      {/* Items List */}
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border bg-gray-50">
              <Image
                src={'/default-image.png'}
                alt={item.name}
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
            </div>
            <div className="text-sm font-medium whitespace-nowrap">
              <CurrencySymbol amount={item.price} />
            </div>
          </div>
        ))}
      </div>
      <Separator />
      {/* Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <CurrencySymbol amount={subtotal} />
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <CurrencySymbol amount={shippingFee} />
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between text-base font-semibold">
          <span>Total</span>
          <CurrencySymbol amount={total} className="text-base font-semibold" />
        </div>
        <div className="mt-1 text-xs text-gray-400">
          Including SAR 3.65 in taxes
        </div>
      </div>
    </div>
  )
}
