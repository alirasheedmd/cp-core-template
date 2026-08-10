import SubcategoryInfo from '@/components/admin/categories/addSubCategory/SubcategoryInfo'
import { getAllCategories } from '@/lib/dal'
import { IWebCategory } from '@/types'

interface SubcategoryProps {
  parentId: string
}

export default async function AddSubcategoryComponent({
  parentId,
}: SubcategoryProps) {
  const categories = await getAllCategories()
  return (
    <SubcategoryInfo
      categories={categories as IWebCategory[]}
      parentId={parentId}
    />
  )
}
