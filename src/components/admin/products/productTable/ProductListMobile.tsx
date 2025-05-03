import Link from 'next/link'
import { IProduct } from '@/types' // Make sure IProduct type path is correct
import { routes } from '@/config/routes'

interface ProductListMobileProps {
  products: IProduct[]
}

const ProductListMobile: React.FC<ProductListMobileProps> = ({ products }) => {
  return (
    <div className="space-y-4 p-2">
      {products.map((product) => (
        <div
          key={product._id} // Assuming _id is the unique identifier
          className="rounded-lg bg-white p-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {product.category?.name || 'No Category'}{' '}
              {/* Optional chaining for category */}
            </span>
            <span className="text-sm font-medium text-gray-900">
              {/* Display price with discount if available */}$
              {(product.discountPrice || product.originalPrice)?.toFixed(2) ||
                'N/A'}
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span
              className={`rounded-full px-2 py-1 text-xs ${
                product.status === 'active'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800' // Assuming draft maps to yellow
              }`}
            >
              {product.status === 'active' ? 'Active' : 'Draft'}
            </span>
            {/* Ensure the link path is correct */}
            <Link href={routes.admin.productEdit(product._id)}>
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

export default ProductListMobile
