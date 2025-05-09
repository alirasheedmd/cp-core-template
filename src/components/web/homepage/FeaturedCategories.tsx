import CarouselWrapper from '@/components/web/shared/CarouselWrapper'
import WebProductCard from '@/components/web/shared/WebProductCard'
import { routes } from '@/config/routes'
import { getOneCategory, getProductsByCategory } from '@/lib/dal'

const FEATURED_CATEGORIES = [
  'alarms',
  'fire-extinguishers',
  'detectors',
  'exit-signs',
]

export default async function FeaturedCategories() {
  // Fetch all categories and their products in parallel
  const categoriesData = await Promise.all(
    FEATURED_CATEGORIES.map(async (slug) => {
      const [category, products] = await Promise.all([
        getOneCategory(slug),
        getProductsByCategory(slug),
      ])
      return {
        name: category?.name,
        slug: category?.slug,
        products,
      }
    }),
  )

  return (
    <div className="space-y-0 md:space-y-8">
      {categoriesData.map((category) => (
        <CarouselWrapper
          key={category?.slug}
          title={category?.name}
          data={category?.products}
          cardComponent={(product) => <WebProductCard product={product} />}
          viewMoreLink={routes.dynamicCategory.category(category?.slug)}
        />
      ))}
    </div>
  )
}
