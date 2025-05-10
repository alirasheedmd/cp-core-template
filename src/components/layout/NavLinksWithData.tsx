import { getAllCategories } from '@/lib/dal'
import NavLinks from '@/components/layout/NavLinks'

interface NavLinksWithDataProps {
  className?: string
}

export default async function NavLinksWithData({
  className,
}: NavLinksWithDataProps) {
  const categories = await getAllCategories()
  const firstSixCategories = categories.slice(0, 6)

  return <NavLinks className={className} categories={firstSixCategories} />
}
