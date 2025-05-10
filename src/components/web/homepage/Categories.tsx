import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'
import { getAllCategories } from '@/lib/dal'
import { routes } from '@/config/routes'
import CategoryCard from '@/components/web/shared/CategoryCard'

export default async function Categories() {
  // Delay to test skeleton
  // await new Promise((resolve) => setTimeout(resolve, 2000))
  const categories = await getAllCategories()

  return (
    <section className="mx-auto my-10 max-w-[1500px] px-3 md:px-5">
      {/* Heading */}
      <div className="mb-8 flex items-end justify-between">
        <p className="text-2xl font-bold md:text-3xl">Categories</p>
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
