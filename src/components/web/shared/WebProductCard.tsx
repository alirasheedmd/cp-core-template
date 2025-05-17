import Image from 'next/image'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import CurrencySymbol from '@/components/common/CurrencySymbol'
import { IWebProduct } from '@/types'
import AddToCart from './AddToCartButton'
import { routes } from '@/config/routes'
import { round2 } from '@/lib/utils'

interface WebProductCardProps {
  item: IWebProduct
}

export default async function WebProductCard({ item }: WebProductCardProps) {
  if (!item?.slug) return null

  return (
    <Link
      href={routes.dynamicProduct.product(item.slug)}
      className="flex h-full flex-col"
    >
      <Card className="group flex h-full flex-col justify-between gap-0 border-2 border-gray-200 p-3 transition-all hover:shadow-xl md:p-5">
        {/* Image */}
        <div className="relative mx-auto h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg sm:h-32 sm:w-32 md:h-40 md:w-40">
          {item?.image && (
            <Image
              src={item?.image}
              alt={item?.title}
              fill
              sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, 10rem"
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>

        {/* Content */}
        <div className="mt-4 flex flex-col items-center gap-y-1.5">
          <h3 className="group-hover:text-muted-foreground text-center text-xs font-medium underline-offset-2 group-hover:underline sm:text-sm">
            {item?.title}
          </h3>
          <p className="text-MediumGrey text-center text-xs uppercase sm:text-xs">
            Brand Name
          </p>
          <CurrencySymbol amount={item?.price} className="text-gray-600" />
          {/* Add to Cart Button */}
          {/* <AddToCart
            productId={item.id}
            name={item.title}
            price={item.price}
            image={item.image}
            slug={item.slug}
          /> */}
          <AddToCart
            item={{
              productId: item.id,
              name: item.title,
              slug: item.slug,
              price: round2(item.price),
              qty: 1,
              image: item.image as string,
              shippingPrice: Number(item.shippingPrice),
              tax: Number(item.tax),
            }}
          />
        </div>
      </Card>
    </Link>
  )
}
