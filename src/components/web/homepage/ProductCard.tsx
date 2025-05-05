import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'

export default function ProductCard({ product }: { product: any }) {
  const { title, price, image } = product
  return (
    <Link href={'#'} className="flex h-full flex-col">
      <Card className="group flex h-full w-full flex-col justify-between border-2 border-black p-5 transition-all hover:shadow-lg">
        <div className="mx-auto flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={170}
            height={170}
            className="transition-all duration-500 ease-in-out group-hover:scale-103"
          />
        </div>
        <div className="flex flex-grow flex-col items-center justify-end gap-y-1.5">
          <h3 className="text-center text-sm font-medium underline-offset-2 group-hover:underline">
            {title}
          </h3>
          <p className="text-MediumGrey text-center text-xs uppercase">
            Brand Name
          </p>
          <p className="text-gray-600">{Number(price)?.toFixed(2)}</p>
          <button className="border-Red text-Red mt-5 rounded-full border-2 px-4 py-2 transition-all duration-300 hover:scale-105">
            Add to Cart
          </button>
        </div>
      </Card>
    </Link>
  )
}
