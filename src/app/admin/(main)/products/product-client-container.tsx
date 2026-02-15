'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { productsTabs } from '@/data/tabs'
import { IProduct } from '@/types'
import Link from 'next/link'
import ProductTabs from '@/components/admin/products/productTable/ProductTabs'
import ProductActions from '@/components/admin/products/productTable/ProductActions'
import ProductListMobile from '@/components/admin/products/productTable/ProductListMobile'
import EmptyProductView from '@/components/admin/products/productTable/EmptyProductView'
import { ProductsDataTable } from './products-data-table'
import { routes } from '@/config/routes'
import { deleteProducts } from '@/lib/dal'

interface ProductClientContainerProps {
  products: IProduct[]
  columns: ColumnDef<IProduct, string | number>[]
}

export default function ProductClientContainer({
  products,
  columns,
}: ProductClientContainerProps) {
  const [selectedTab, setSelectedTab] = useState<string>(productsTabs[0].id)
  const [query, setQuery] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<IProduct[]>([])
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false)

  const clearInput = () => {
    setQuery('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const productsCount = useMemo(() => {
    return productsTabs.reduce(
      (acc, tab) => {
        acc[tab.id] = products.filter(
          (product: IProduct) =>
            tab.id === 'all-products' || product.status === tab.id,
        ).length
        return acc
      },
      {} as Record<string, number>,
    )
  }, [products])

  const filteredProducts = useMemo(() => {
    return products
      .filter((product: IProduct) => {
        const queryLower = query.toLowerCase()
        const statusMatch =
          selectedTab === 'all-products' || product.status === selectedTab
        return statusMatch && product.title.toLowerCase().includes(queryLower)
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }, [products, query, selectedTab])

  const handleDeleteAction = async () => {
    try {
      console.log(
        'Deleting products:',
        selectedRows.map((row) => row.id || ''),
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await deleteProducts(selectedRows.map((row) => row.id || ''))
      setSelectedRows([])
      setClearSelectionTrigger((prev) => !prev)
    } catch (error) {
      console.error('Error deleting products:', error)
      throw error
    }
  }

  const emptyViewMessage = useMemo(() => {
    if (filteredProducts.length === 0 && query) {
      return `No products found for "${query}"`
    }
    if (filteredProducts.length === 0 && selectedTab === 'all-products') {
      return 'No products available'
    }
    if (filteredProducts.length === 0) {
      const tabName = productsTabs.find((tab) => tab.id === selectedTab)?.name
      return `No ${tabName ? tabName.toLowerCase() : ''} products available`
    }
    return '' // Should not happen if filteredProducts > 0
  }, [selectedTab, filteredProducts, query])

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Products
      </h1>

      <div className="my-2 flex justify-end">
        <Link href={routes.admin.addProduct}>
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
              <ProductsDataTable<IProduct, string | number>
                columns={columns}
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
  )
}
