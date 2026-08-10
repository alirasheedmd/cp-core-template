import { getAllCategories, getCategory } from '@/lib/dal'
import SubcategoryInfo, { SubcategoryFormValues } from './SubcategoryInfo'
import { IWebCategory } from '@/types'

interface EditSubcategoryProps {
  subcategoryId: string
}

const EditSubcategoryComponent = async ({
  subcategoryId,
}: EditSubcategoryProps) => {
  const subcategory = await getCategory(subcategoryId)
  const categories = await getAllCategories()
  return (
    <SubcategoryInfo
      data={subcategory as SubcategoryFormValues}
      categories={categories as IWebCategory[]}
      id={subcategoryId}
      isEditing
    />
  )
}

export default EditSubcategoryComponent
