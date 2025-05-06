import { getAllProducts } from '@/lib/dal'
import ProductCard2 from './ProductCard2'

export const ProductCarousel = async () => {
  const products = await getAllProducts()
  const prod = await getProductsByCategory('alarms')
  console.log(prod)

  return (
    <div className="w-full py-8">
      <h1 className="mb-6 px-4 text-2xl font-bold">Featured Products</h1>
      <div className="scrollbar-hide flex snap-x gap-4 overflow-x-auto px-4 pb-4">
        {products.map((product) => (
          <div key={product.id} className="flex-shrink-0 snap-start">
            <ProductCard2 product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductCarousel
