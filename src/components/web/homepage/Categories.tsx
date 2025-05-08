import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'
import { getAllCategories } from '@/lib/dal'
import { routes } from '@/config/routes'
import CategoryCard from '@/components/common/CategoryCard'

export default async function Categories() {
  const categories = await getAllCategories()

  return (
    <section className="my-10">
      {/* Heading */}
      <div className="mb-8 flex items-end justify-between">
        <p className="text-3xl font-bold">Categories</p>
        <Link
          href={routes.collections}
          className="text-Blue hover:border-b-Blue flex items-center gap-x-1 border-b border-transparent transition-all"
        >
          <span>View All</span>
          <IoArrowForward />
        </Link>
      </div>

      {/* Category Card */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-6">
        {categories.slice(0, 6).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  )
}
