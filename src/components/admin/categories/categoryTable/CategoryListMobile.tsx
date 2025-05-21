import Link from 'next/link'
import { ICategory } from '@/types' // Make sure ICategory type path is correct
import { routes } from '@/config/routes'

interface CategoryListMobileProps {
  categories: ICategory[]
}

const CategoryListMobile: React.FC<CategoryListMobileProps> = ({ categories }) => {
  return (
    <div className="space-y-4 p-2">
      {categories.map((category) => (
        <div
          key={category.id} // Assuming _id is the unique identifier
          className="rounded-lg bg-white p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold">{category.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-1 text-xs ${
                category.status === 'enable'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800' // Assuming draft maps to yellow
              }`}
            >
              {category.status === 'enable' ? 'Active' : 'Draft'}
            </span>
            {/* Ensure the link path is correct */}
            <Link href={routes.admin.categoryEdit(category.id)}>
              <button className="text-Orange text-xs hover:underline">
                Edit
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryListMobile
