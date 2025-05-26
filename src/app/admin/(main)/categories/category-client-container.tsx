'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import ProductActions from '@/components/admin/categories/categoryTable/CategoryActions'
import { routes } from '@/config/routes'
import { ICategory } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import EmptyProductView from '@/components/admin/products/productTable/EmptyProductView'
import CategoryListMobile from '@/components/admin/categories/categoryTable/CategoryListMobile'
import { CategoriesDataTable } from '@/app/admin/(main)/categories/category-data-table'
import { deleteCategories } from '@/lib/dal'
import CategoryTabs from '@/components/admin/categories/categoryTable/CategoryTabs'
import { categoriesTabs } from '@/data/tabs'

interface CategoryClientContainerProps {
  categories: ICategory[]
  columns: ColumnDef<ICategory, string | number>[]
}

export default function CategoryClientContainer({
  categories,
  columns
}: CategoryClientContainerProps) {
    const [selectedTab, setSelectedTab] = useState<string>(categoriesTabs[0].id)
    const [query, setQuery] = useState<string>('')
    const [selectedRows, setSelectedRows] = useState<ICategory[]>([])
    const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false)

  const clearInput = () => {
    setQuery('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

   const categoriesCount = useMemo(() => {
      return categoriesTabs.reduce(
        (acc, tab) => {
          acc[tab.id] = categories.filter(
            (category: ICategory) =>
              tab.id === 'all-categories' || category.status === tab.id,
          ).length
          return acc
        },
        {} as Record<string, number>,
      )
    }, [categories])
  
  const filteredCategories = useMemo(() => {
    return categories
      .filter((category: ICategory) => {
        const queryLower = query.toLowerCase()
        const statusMatch =
          selectedTab === 'all-categories' || category.status === selectedTab
        return statusMatch && category.name.toLowerCase().includes(queryLower)
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }, [categories, query, selectedTab])

  const emptyViewMessage = useMemo(() => {
    if (filteredCategories.length === 0 && query) {
      return `No categories found for "${query}"`
    }
    if (filteredCategories.length === 0 && selectedTab === 'all-products') {
      return 'No products available'
    }
    if (filteredCategories.length === 0) {
      const tabName = categoriesTabs.find((tab) => tab.id === selectedTab)?.name
      return `No ${tabName ? tabName.toLowerCase() : ''} products available`
    }
    return '' // Should not happen if filteredCategories > 0
  }, [filteredCategories.length, query, selectedTab])

  const handleDeleteAction = async () => {
    try {
      console.log(
        'Deleting categories:',
        selectedRows.map((row) => row.id || ''),
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await deleteCategories(selectedRows.map((row) => row.id || ""));
      setSelectedRows([])
      setClearSelectionTrigger((prev) => !prev)
    } catch (error) {
      console.error('Error deleting products:', error)
      throw error
    }
  }

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Categories
      </h1>

      <div className="my-2 flex justify-end">
        <Link href={routes.admin.addCategory}>
          <button className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black">
            Add Category
          </button>
        </Link>
      </div>

      <div className="flex flex-cal justify-between gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 lg:bg-white xl:flex-row xl:items-center">
        <CategoryTabs
          tabs={categoriesTabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          categoriesCount={categoriesCount}
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
        {filteredCategories.length === 0 ? (
          <EmptyProductView message={emptyViewMessage} />
        ) : (
          <>
            <div className="hidden lg:block">
               <CategoriesDataTable<ICategory, string | number>
                    columns={columns}
                    data={filteredCategories}
                    onRowSelectionChange={setSelectedRows}
                    clearSelectionTrigger={clearSelectionTrigger}
                  />
            </div>
            <div className="block lg:hidden">
              <CategoryListMobile categories={filteredCategories} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
