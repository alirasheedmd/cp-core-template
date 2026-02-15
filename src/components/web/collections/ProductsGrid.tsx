import WebProductCard from '@/components/web/shared/WebProductCard'
import GridWrapper from '@/components/web/shared/GridWrapper'
import { getProductsByCategory } from '@/lib/dal'
import { IWebProduct } from '@/types'
import { BsCartX } from 'react-icons/bs'
import Link from 'next/link'
import { routes } from '@/config/routes'
import PrimaryButton from '@/components/common/PrimaryButton'

interface ProductsGridProps {
  category: string
}

export default async function ProductsGrid({ category }: ProductsGridProps) {
  const products = await getProductsByCategory(category)
  if (!products || products.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-6 py-12 text-center">
        <div className="relative">
          <BsCartX className="h-24 w-24 text-gray-400 transition-all duration-300 hover:scale-110" />
          <div className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-red-500/30" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            No Products Found
          </h2>
          <p className="text-gray-500">
            We couldn&apos;t find any products in this category
          </p>
        </div>
        <Link href={routes.collections} className="w-full">
          <PrimaryButton className="max-w-80" fullWidth>
            Browse All Categories
          </PrimaryButton>
        </Link>
      </div>
    )
  }

  return (
    <GridWrapper
      data={products}
      CardComponent={WebProductCard}
      cardProps={(product: IWebProduct) => ({ item: product })}
    />
  )
}
