import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import EditProductComponent from '@/components/admin/products/addProduct/EditProductComponent'
import { Suspense } from 'react'

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
        <Link href={routes.admin.products}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Edit Product {productId}</h3>
      </div>
      <Suspense>
        <EditProductComponent productId={productId} />
      </Suspense>
    </div>
  )
}
