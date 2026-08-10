import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import EditCategoryComponent from '@/components/admin/categories/addCategory/EditCategoryComponent'
import { Suspense } from 'react'

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{
    categoryId: string
  }>
}) {
  const { categoryId } = await params
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={routes.admin.categories}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Edit Category {categoryId}</h3>
      </div>
      <Suspense>
        <EditCategoryComponent categoryId={categoryId} />
      </Suspense>
    </div>
  )
}
