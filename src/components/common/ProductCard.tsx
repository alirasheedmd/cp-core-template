import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import CurrencySymbol from '@/components/ui/CurrencySymbol'
import { IWebProduct } from '@/types'

export default function ProductCard({ product }: { product: IWebProduct }) {
  const { title, price, image } = product
  return (
    <Link href={'#'} className="flex h-full flex-col">
      <Card className="group flex h-full w-full flex-col justify-between border-2 border-black p-5 transition-all hover:shadow-xl">
        <div className="relative mx-auto h-40 w-40 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image || '/default-image.png'}
            alt={title}
            fill
            className="object-contain transition-all duration-500 ease-in-out group-hover:scale-103"
          />
        </div>
        <div className="flex flex-grow flex-col items-center justify-end gap-y-1.5">
          <h3 className="group-hover:text-muted-foreground text-center text-sm font-medium underline-offset-2 group-hover:underline">
            {title}
          </h3>
          <p className="text-MediumGrey text-center text-xs uppercase">
            Brand Name
          </p>
          <CurrencySymbol amount={price} className="text-gray-600" />
          <button className="border-Red text-Red mt-5 rounded-full border-2 px-4 py-2 transition-all duration-300 hover:scale-105">
            Add to Cart
          </button>
        </div>
      </Card>
    </Link>
  )
}
