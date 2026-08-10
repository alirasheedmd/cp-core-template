import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import { Suspense } from 'react'
import EditSubcategoryComponent from '@/components/admin/categories/addSubCategory/EditSubcategoryComponent'

export default async function EditSubcategoryPage({
  params,
}: {
  params: Promise<{
    subcategoryId: string
  }>
}) {
  const { subcategoryId } = await params
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={routes.admin.categories}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">
          Edit Subcategory {subcategoryId}
        </h3>
      </div>
      <Suspense>
        <EditSubcategoryComponent subcategoryId={subcategoryId} />
      </Suspense>
    </div>
  )
}
