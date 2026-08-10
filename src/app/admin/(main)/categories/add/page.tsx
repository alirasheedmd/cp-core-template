import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import CategoryInfo from '@/components/admin/categories/addCategory/CategoryInfo'

export default function AddCategoryPage() {
  return (
    <div className="flex flex-col justify-center">
      <div className="mx-auto max-w-6xl lg:my-4">
        <div className="flex items-center gap-2">
          <Link href={routes.admin.categories}>
            <BiArrowBack className="text-xl" />
          </Link>
          <h3 className="flex justify-between text-2xl font-semibold">
            Add Category
          </h3>
        </div>
        <CategoryInfo />
      </div>
    </div>
  )
}
