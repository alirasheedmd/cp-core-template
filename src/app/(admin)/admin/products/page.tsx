"use client";
// React imports
import { useState, useMemo } from "react";
// Data and types
import { productsColumns } from "@/app/(admin)/admin/products/products-columns";
import { productsTabs } from "@/data/tabs";
import { IProduct } from "@/types";
import { products as dummyProducts } from "@/data/dummyProducts"; // Import dummy data
// Next.js
import Link from "next/link";
// Custom Components
import ProductTabs from "@/components/admin/products/productTable/ProductTabs";
import ProductActions from "@/components/admin/products/productTable/ProductActions";
import ProductListMobile from "@/components/admin/products/productTable/ProductListMobile";
import EmptyProductView from "@/components/admin/products/productTable/EmptyProductView";
import { ProductsDataTable } from "./products-data-table";

// Define the type for the dynamic component props
// interface ProductsDataTableProps {
//   columns: ColumnDef<IProduct>[];
//   data: IProduct[];
//   onRowSelectionChange: (selectedData: IProduct[]) => void;
//   clearSelectionTrigger?: boolean;
// }

// // Explicitly type the dynamic component
// const DynamicProductsDataTable = dynamic<ProductsDataTableProps>(
//   () =>
//     import("@/app/(admin)/admin/products/products-data-table").then(
//       (mod) => mod.ProductsDataTable,
//     ),
//   { ssr: false },
// );

export default function AdminProductsPage() {
  const [selectedTab, setSelectedTab] = useState<string>(productsTabs[0].id);
  const [query, setQuery] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<IProduct[]>([]);
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false);
  const products = dummyProducts; // Initialize products directly

  const clearInput = () => {
    setQuery("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const productsCount = useMemo(() => {
    return productsTabs.reduce(
      (acc, tab) => {
        acc[tab.id] = products.filter(
          (product: IProduct) =>
            tab.id === "all-products" || product.status === tab.id,
        ).length;
        return acc;
      },
      {} as Record<string, number>,
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product: IProduct) => {
      const queryLower = query.toLowerCase();
      const statusMatch =
        selectedTab === "all-products" || product.status === selectedTab;
      return statusMatch && product.name.toLowerCase().includes(queryLower);
    });
  }, [products, query, selectedTab]);

  const handleDeleteAction = async () => {
    try {
      console.log(
        "Deleting products:",
        selectedRows.map((row) => row._id || ""),
      );
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // await deleteProducts(selectedRows.map((row) => row._id || ""));
      // await fetchProducts();
      setSelectedRows([]);
      setClearSelectionTrigger((prev) => !prev);
    } catch (error) {
      console.error("Error deleting products:", error);
      throw error;
    }
  };

  const emptyViewMessage = useMemo(() => {
    if (filteredProducts.length === 0 && query) {
      return `No products found for "${query}"`;
    }
    if (filteredProducts.length === 0 && selectedTab === "all-products") {
      return "No products available";
    }
    if (filteredProducts.length === 0) {
      const tabName = productsTabs.find((tab) => tab.id === selectedTab)?.name;
      return `No ${tabName ? tabName.toLowerCase() : ""} products available`;
    }
    return ""; // Should not happen if filteredProducts > 0
  }, [selectedTab, filteredProducts, query]);

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Products
      </h1>

      <div className="my-2 flex justify-end">
        <Link href="/admin/products/add">
          <button className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black">
            Add Product
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-between gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 lg:bg-white xl:flex-row xl:items-center">
        <ProductTabs
          tabs={productsTabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          productsCount={productsCount}
        />
        <ProductActions
          query={query}
          onQueryChange={handleChange}
          onClearQuery={clearInput}
          selectedRowCount={selectedRows.length}
          onDelete={handleDeleteAction}
          sortConfig={null}
          onSortChange={() => {}}
        />
      </div>

      <div className="h-full">
        {filteredProducts.length === 0 ? (
          <EmptyProductView message={emptyViewMessage} />
        ) : (
          <>
            <div className="hidden lg:block">
              <ProductsDataTable
                columns={productsColumns}
                data={filteredProducts}
                onRowSelectionChange={setSelectedRows}
                clearSelectionTrigger={clearSelectionTrigger}
              />
            </div>
            <div className="block lg:hidden">
              <ProductListMobile products={filteredProducts} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
