import CarouselWrapper from '@/components/web/shared/CarouselWrapper'
import WebProductCard from '@/components/web/shared/WebProductCard'
import { routes } from '@/config/routes'
import { Cart } from '@/db/schema'
import { getMyCart, getOneCategory, getProductsByCategory } from '@/lib/dal'

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
  const cart = await getMyCart()

  return (
    <div className="space-y-0 md:space-y-8">
      {categoriesData.map((category) =>
        category?.name && category?.slug ? (
          <CarouselWrapper
            key={category.slug}
            title={category.name}
            data={category?.products}
            cardComponent={(product) => (
              <WebProductCard item={product} cart={cart as Cart} />
            )}
            viewMoreLink={routes.dynamicCategory.category(category.slug)}
          />
        ) : null,
      )}
    </div>
  )
}
