import { Suspense } from "react";
import { products as dummyProducts } from "@/data/dummyProducts";
import { productsColumns } from "./products-columns";
import ProductClientContainer from "./product-client-container";

// Function to fetch products with caching
async function getProducts() {
  "use cache";
  // This would normally be a DB fetch
  return dummyProducts;
}

// Function to get columns with caching
async function getColumns() {
  "use cache";
  return productsColumns;
}

// This is a server component (the page)
export default async function AdminProductsPage() {
  // Get data with caching
  const products = await getProducts();
  const columns = await getColumns();

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ProductClientContainer products={products} columns={columns} />
    </Suspense>
  );
}
