import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import AddSubcategoryComponent from '@/components/admin/categories/addSubCategory/SubcategoryComponent'
import { Suspense } from 'react'

export default async function AddSubcategoryPage({
  params,
}: {
  params: Promise<{
    parentId: string
  }>
}) {
  const { parentId } = await params

  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto max-w-6xl lg:my-4">
        <div className="flex items-center gap-2">
          <Link href={routes.admin.categories}>
            <BiArrowBack className="text-xl" />
          </Link>
          <h3 className="flex justify-between text-2xl font-semibold">
            Add Subcategory
          </h3>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <AddSubcategoryComponent parentId={parentId} />
        </Suspense>
      </div>
    </div>
  )
}
