import CategoryCard from '@/components/web/shared/CategoryCard'
import { getAllCategories } from '@/lib/dal'

export default async function Collections() {
  const categories = await getAllCategories()

  return (
    <section>
      <h1 className="my-8 text-4xl font-semibold">Categories</h1>
      <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
