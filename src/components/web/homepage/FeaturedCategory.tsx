import { IWebProduct } from '@/types'
import ProductCard from '../../common/ProductCard'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { routes } from '@/config/routes'

export default function FeaturedCategory({
  categoryName,
  products,
  categorySlug,
}: {
  categoryName: string
  products: IWebProduct[]
  categorySlug: string
}) {
  const remainingProducts = products.length - 5
  return (
    <section className="py-12">
      <h2 className="mb-8 text-3xl font-bold">{categoryName}</h2>

      <ScrollArea className="relative">
        <div className="flex gap-5 pb-4">
          {products.slice(0, 5).map((product) => (
            <div key={product?.id} className="min-w-1/5">
              <ProductCard product={product} />
            </div>
          ))}
          {/* View More Products */}
          {remainingProducts > 0 && (
            <Card className="group min-h-full min-w-1/5 border-2 border-black p-5 transition-all hover:shadow-lg">
              <Link
                href={routes.dynamicCategory.category(categorySlug)}
                className="flex h-full items-center justify-center"
              >
                <p className="text-Blue text-sm font-medium underline-offset-2 group-hover:underline">
                  View More Products ({remainingProducts})
                </p>
              </Link>
            </Card>
          )}
          <ScrollBar orientation="horizontal" hidden />
        </div>
      </ScrollArea>
    </section>
  )
}
