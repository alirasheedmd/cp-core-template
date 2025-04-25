import ProductInfo from '@/components/admin/products/addProduct/ProductInfo'
import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{
    productId: string
  }>
}) {
  const { productId } = await params
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={`/products`}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Edit Product {productId}</h3>
      </div>
      <ProductInfo />
    </div>
  )
}
