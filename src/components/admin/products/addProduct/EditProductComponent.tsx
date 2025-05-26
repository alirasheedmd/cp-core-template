import { getAllCategories, getAllProducts, getProduct } from '@/lib/dal'
import ProductInfo, { ProductFormValues } from './ProductInfo'
import { IProduct, IWebCategory } from '@/types'

interface EditProductProps {
  productId: string
}

const EditProductComponent = async ({ productId }: EditProductProps) => {
  const categories = await getAllCategories()
  const recommendedProducts = await getAllProducts()
  const product = await getProduct(productId)

  return (
    <ProductInfo
      categories={categories as IWebCategory[]}
      recommendedProducts={recommendedProducts as IProduct[]}
      id={productId}
      data={product as ProductFormValues}
      isEditing
    />
  )
}

export default EditProductComponent
