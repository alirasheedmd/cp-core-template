import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import CurrencySymbol from '@/components/ui/CurrencySymbol'
import { IWebProduct } from '@/types'

export default function ProductCard({ product }: { product: IWebProduct }) {
  const { title, price, image } = product
  return (
    <Link href={'#'} className="flex h-full flex-col">
      <Card className="group flex h-full max-w-44 flex-col border-2 border-black p-3 transition-all hover:shadow-xl md:max-w-[14.5rem] md:p-5">
        {/* Image */}
        <div className="relative mx-auto h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg md:h-40 md:w-40">
          <Image
            src={image || '/default-image.png'}
            alt={title}
            fill
            className="object-contain transition-all duration-500 ease-in-out group-hover:scale-103"
          />
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col items-center gap-y-1.5">
          <h3 className="group-hover:text-muted-foreground text-center text-sm font-medium underline-offset-2 group-hover:underline">
            {title}
          </h3>
          <p className="text-MediumGrey text-center text-xs uppercase">
            Brand Name
          </p>
          <CurrencySymbol amount={price} className="text-gray-600" />
          {/* Add to Cart Button */}
          <button className="border-Red text-Red mt-5 rounded-full border-2 px-4 py-2 transition-all duration-300 hover:scale-105">
            Add to Cart
          </button>
        </div>
      </Card>
    </Link>
  )
}
