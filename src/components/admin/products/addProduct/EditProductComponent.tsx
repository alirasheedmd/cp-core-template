import { getAllCategories, getProduct } from '@/lib/dal'
import ProductInfo, { ProductFormValues } from './ProductInfo'
import { IWebCategory } from '@/types'

interface EditProductProps {
    productId: string
}

const EditProductComponent = async ({ productId }: EditProductProps) => {
  const categories = await getAllCategories()
  const product = await getProduct(productId)

  return (
    <ProductInfo
      categories={categories as IWebCategory[]}
      id={productId}
      data={product as ProductFormValues}
      isEditing
    />
  )
}

export default EditProductComponent