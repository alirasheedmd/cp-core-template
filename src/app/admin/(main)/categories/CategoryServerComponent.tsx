import { getAllCategories, getProductsByCategory, getSubcategoriesByParentId } from '@/lib/dal'
import CategoryClientContainer from './category-client-container'
import { ICategory } from '@/types'
import { categoriesColumns } from './categories-columns'

// Function to get columns with caching
async function getColumns() {
  'use cache'
  return categoriesColumns
}

// Function to fetch categories with caching
async function getCategories() {
  'use cache'
  // This would normally be a DB fetch
  const categories = await getAllCategories()
  
  const categoriesWithMeta = await Promise.all(
    categories.map(async (category) => {
      const products = await getProductsByCategory(category.slug)
      const productCount = products.length
      const subcategoryCount = (await getSubcategoriesByParentId(category.id)).length
      return {
        ...category,
        productCount,
        subcategoryCount,
      }
    })
  )
  return categoriesWithMeta
}

export default async function CategoryServerComponent() {

  const categories = await getCategories()
  const columns = await getColumns()
  return (
    <CategoryClientContainer categories={categories as ICategory[]} columns={columns} />
  )
}
