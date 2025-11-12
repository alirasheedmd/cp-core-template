import { productsColumns } from './products-columns'
import ProductClientContainer from './product-client-container'
import { getAllProducts } from '@/lib/dal'
import { IProduct } from '@/types'

// Function to fetch products with caching
async function getProducts() {
  const products = await getAllProducts()
  return products
}

// Function to get columns with caching
async function getColumns() {
  return productsColumns
}

// This is a server component (the page)
export default async function ProductServerComponent() {
  // Get data with caching
  const products = await getProducts()
  const columns = await getColumns()

  return (
    <ProductClientContainer
      products={products as IProduct[]}
      columns={columns}
    />
  )
}
