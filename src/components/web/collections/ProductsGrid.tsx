import WebProductCard from '@/components/web/shared/WebProductCard'
import GridWrapper from '@/components/web/shared/GridWrapper'
import { getProductsByCategory } from '@/lib/dal'
import { IWebProduct } from '@/types'

interface ProductsGridProps {
  category: string
}

export default async function ProductsGrid({ category }: ProductsGridProps) {
  const products = await getProductsByCategory(category)

  return (
    <GridWrapper
      data={products}
      CardComponent={WebProductCard}
      cardProps={(product: IWebProduct) => ({ item: product })}
    />
  )
}
