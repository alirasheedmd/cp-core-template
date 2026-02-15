import { getAllCategories, getAllProducts } from '@/lib/dal'
import ProductInfo from './ProductInfo'
import { IProduct, IWebCategory } from '@/types'

const AddProductComponent = async () => {
  const categories = await getAllCategories()
  const recommendedProducts = await getAllProducts()
  return (
    <ProductInfo
      recommendedProducts={recommendedProducts as IProduct[]}
      categories={categories as IWebCategory[]}
    />
  )
}

export default AddProductComponent
