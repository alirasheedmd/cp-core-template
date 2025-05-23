import { getAllCategories } from '@/lib/dal'
import ProductInfo from './ProductInfo'
import { IWebCategory } from '@/types'

const AddProductComponent = async () => {
    const categories = await getAllCategories()
  return (
   <ProductInfo  categories={categories as IWebCategory[]}/>
  )
}

export default AddProductComponent