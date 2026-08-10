import { getCategory } from '@/lib/dal'
import CategoryInfo, { CategoryFormValues } from './CategoryInfo'

interface EditCategoryProps {
  categoryId: string
}

const EditCategoryComponent = async ({ categoryId }: EditCategoryProps) => {
  const category = await getCategory(categoryId)
  return (
    <CategoryInfo
      data={category as CategoryFormValues}
      id={categoryId}
      isEditing
    />
  )
}

export default EditCategoryComponent
