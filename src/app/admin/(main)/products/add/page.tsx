import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import ProductInfo from '@/components/admin/products/addProduct/ProductInfo'
import { routes } from '@/config/routes'

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={routes.admin.products}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Add Product</h3>
      </div>
      <ProductInfo />
    </div>
  )
}
