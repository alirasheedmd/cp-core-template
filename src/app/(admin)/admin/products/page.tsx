"use client";
// React imports
import { useState } from "react";
// UI Component imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProductsDataTable } from "./products-data-table";
import SortButton from "@/components/common/SortButton";
// Icons
import { FaSearch, FaTimes } from "react-icons/fa";
import { PiPackageThin } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
// Data and types
import { productsColumns } from "./products-columns";
import { productsTabs } from "@/data/tabs";
import { IProduct } from "@/types";
import { products as dummyProducts } from "@/data/dummyProducts"; // Import dummy data
// Next.js
import Link from "next/link";

export default function AdminProductsPage() {
  const [selectedTab, setSelectedTab] = useState<string>(productsTabs[0].id);
  const [query, setQuery] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<IProduct[]>([]);
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    type: "date" | "name";
    direction: "asc" | "desc";
  } | null>(null);
  const products = dummyProducts; // Initialize products directly

  // Handle clearing the search input
  const clearInput = () => {
    setQuery("");
  };

  // Handle the input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Count products for each tab status
  const productsCount = productsTabs.reduce(
    (acc, tab) => {
      acc[tab.id] = products.filter(
        (product: IProduct) =>
          tab.id === "all-products" || product.status === tab.id,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getSortedProducts = (products: IProduct[]) => {
    if (!sortConfig) return products;

    return [...products].sort((a, b) => {
      if (sortConfig.type === "date") {
        const dateA = new Date(a?.createdAt).getTime();
        const dateB = new Date(b?.createdAt).getTime();
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        // Sort by product name
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return sortConfig.direction === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });
  };

  // Filter products based on the selected tab and query
  const filteredProducts = getSortedProducts(
    products.filter((product: IProduct) => {
      const queryLower = query.toLowerCase();
      const statusMatch =
        selectedTab === "all-products" || product.status === selectedTab;
      return statusMatch && product.name.toLowerCase().includes(queryLower);
    }),
  );

  // Delete products by product ID
  const handleAction = async () => {
    setIsDeleting(true);
    try {
      // await deleteProducts(selectedRows.map((row) => row._id || ""));

      // Refetch products after deletion
      // await fetchProducts();

      setSelectedRows([]); // Clear the selection
      setClearSelectionTrigger((prev) => !prev); // Toggle the trigger to clear the table selection
    } catch (error) {
      console.error("Error deleting products:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  // console.log(filteredProducts);
  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Products
      </h1>

      {/* Add Product Button */}
      <div className="my-2 flex justify-end">
        <Link href="/admin/products/add">
          <button className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black">
            Add Product
          </button>
        </Link>
      </div>

      {/* Container for the scrollable tabs */}
      <div className="flex flex-col justify-between gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 lg:bg-neutral-50 xl:flex-row xl:items-center">
        <div className="w-full overflow-x-auto pb-2 whitespace-nowrap lg:w-auto lg:pb-0">
          <ul className="flex justify-between lg:justify-center lg:space-x-1">
            {productsTabs.map((tab) => (
              <li key={tab.id} className="inline-block text-xs lg:text-sm">
                <button
                  onClick={() => setSelectedTab(tab.id)}
                  className={`relative block cursor-pointer rounded-xl px-2 py-2 font-medium whitespace-nowrap transition-all hover:bg-[#e7e7e7] xl:px-4 xl:py-2 ${
                    selectedTab === tab.id
                      ? "bg-[#e7e7e7] text-orange-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab.name} (
                  <span className="text-xs lg:text-sm">
                    {productsCount[tab.id]}
                  </span>
                  )
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search product input and sort */}
        <div className="mb-3 flex items-center gap-x-3 lg:mb-0">
          <div className="flex w-full items-center rounded-full border border-gray-500 xl:w-72">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Search products"
              className="w-full rounded-l-full bg-white px-3 py-1 text-xs outline-hidden lg:px-4 lg:text-sm"
            />

            <div className="flex h-4 items-center justify-center gap-x-1 rounded-r-full bg-white pr-1 lg:h-7 lg:pr-2">
              {/* Clear Input */}
              {query && (
                <button
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500"
                  onClick={clearInput}
                >
                  <FaTimes className="text-[10px] text-white" />
                </button>
              )}
              {/* Search Icon */}
              <button>
                <FaSearch className="text-base text-black" />
              </button>
            </div>
          </div>

          {/* Delete button */}
          <div className="hidden lg:block">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className={`flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-neutral-50 transition-colors ${
                    selectedRows.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-[#e7e7e7] hover:text-orange-600"
                  }`}
                >
                  <RiDeleteBinLine className="text-base" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Products</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {selectedRows.length}{" "}
                    products? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mx-auto mt-5 gap-x-4">
                  <button
                    onClick={handleAction}
                    disabled={isDeleting}
                    className="w-28 rounded-xl bg-[#e7e7e7] px-4 py-2 text-nowrap shadow-xs transition-colors hover:text-orange-600"
                  >
                    {isDeleting ? "Deleting..." : "Yes"}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    disabled={isDeleting}
                    className="w-28 rounded-xl bg-[#e7e7e7] px-4 py-2 text-nowrap shadow-xs transition-colors hover:text-orange-600"
                  >
                    No
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sort Button Small screens */}
          <div className="block lg:hidden">
            <SortButton sortConfig={sortConfig} onSortChange={setSortConfig} />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="h-full">
        {/* Loading state - Removed as data is static */}
        {/* {isLoading && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>
            <p className="text-sm">Loading products...</p>
          </div>
        )} */}

        {/* Error state - Removed as data is static */}
        {/* {error && !isLoading && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <div className="text-xl text-red-500">⚠️</div>
            <p className="text-sm text-red-500">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded-lg bg-orange-600 px-4 py-2 text-sm text-white hover:bg-orange-700"
            >
              Retry
            </button>
          </div>
        )} */}

        {/* No products available */}
        {filteredProducts.length === 0 && selectedTab === "all-products" && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <PiPackageThin className="text-[6rem] text-gray-300" />
            <p className="text-sm">No products available</p>
          </div>
        )}

        {/* No products in selected tab */}
        {filteredProducts.length === 0 && selectedTab !== "all-products" && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <PiPackageThin className="text-[6rem] text-gray-300" />
            <p className="text-sm">
              No{" "}
              <span className="lowercase">
                {productsTabs.find((tab) => tab.id === selectedTab)?.name}
              </span>{" "}
              products available
            </p>
          </div>
        )}

        {/* Products data table */}
        {filteredProducts.length > 0 && (
          <>
            <div className="hidden lg:block">
              <ProductsDataTable
                columns={productsColumns as any}
                data={filteredProducts}
                onRowSelectionChange={setSelectedRows}
                clearSelectionTrigger={clearSelectionTrigger}
                sortConfig={sortConfig}
                onSortChange={setSortConfig}
              />
            </div>
            <div className="block lg:hidden">
              {/* Mobile view of products table - implementation depends on your mobile UI */}
              <div className="space-y-4 p-2">
                {filteredProducts.map((product) => (
                  <div
                    key={product._id}
                    className="rounded-lg bg-white p-4 shadow-sm"
                  >
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {product.category.name || "No Category"}
                      </span>
                      <span className="text-sm font-medium text-gray-900">
                        ${product.variants[0]?.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {product.status === "active" ? "Active" : "Draft"}
                      </span>
                      <Link href={`/products/edit/${product._id}`}>
                        <button className="text-xs text-orange-600 hover:underline">
                          Edit
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
