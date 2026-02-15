import { getOneCategory } from '@/lib/dal'

interface CategoryHeaderProps {
  category: string
}

export default async function CategoryHeader({
  category,
}: CategoryHeaderProps) {
  const categoryData = await getOneCategory(category)
  const categoryName = categoryData?.name

  return <h1 className="my-8 text-2xl font-bold md:text-3xl">{categoryName}</h1>
}
