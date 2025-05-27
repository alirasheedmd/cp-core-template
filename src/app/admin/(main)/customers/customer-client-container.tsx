'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import CustomerActions from '@/components/admin/customers/customerTable/CustomerActions'
import CustomerListMobile from '@/components/admin/customers/customerTable/CustomerListMobile'
import EmptyProductView from '@/components/admin/products/productTable/EmptyProductView'
import { CustomersDataTable } from './customers-data-table'
import { routes } from '@/config/routes'
import { ICustomerDetails } from '@/types'
import { deleteCustomers } from '@/lib/dal'

interface CustomerClientContainerProps {
  customers: ICustomerDetails[]
  columns: ColumnDef<ICustomerDetails, string | number>[]
}

export default function CustomerClientContainer({
  customers,
  columns,
}: CustomerClientContainerProps) {
  const [query, setQuery] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<ICustomerDetails[]>([])
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false)

  const clearInput = () => {
    setQuery('')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const filteredCustomers = useMemo(() => {
    return customers
      .filter((customer: ICustomerDetails) => {
        const queryLower = query.toLowerCase()
        return customer.firstName.toLowerCase().includes(queryLower) || customer.lastName.toLowerCase().includes(queryLower)
      })
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }, [customers, query])

  const handleDeleteAction = async () => {
    try {
      console.log(
        'Deleting customers:',
        selectedRows.map((row) => row.id || ''),
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await deleteCustomers(selectedRows.map((row) => row.id || ''))
      setSelectedRows([])
      setClearSelectionTrigger((prev) => !prev)
    } catch (error) {
      console.error('Error deleting customers:', error)
      throw error
    }
  }

  const emptyViewMessage = useMemo(() => {
    if (filteredCustomers.length === 0 && query) {
      return `No customers found for "${query}"`
    }
    return '' // Should not happen if filteredCustomers > 0
  }, [filteredCustomers, query])

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Customers
      </h1>

      <div className="my-2 flex justify-end">
        <Link href={routes.admin.addCustomer}>
          <button className="rounded-lg bg-gray-700 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-black">
            Add Customer
          </button>
        </Link>
      </div>

      <div className="flex flex-col justify-end gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 lg:bg-white xl:flex-row xl:items-center">
        <CustomerActions
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
        {filteredCustomers.length === 0 ? (
          <EmptyProductView message={emptyViewMessage} />
        ) : (
          <>
            <div className="hidden lg:block">
              <CustomersDataTable<ICustomerDetails, string | number>
                columns={columns}
                data={filteredCustomers}
                onRowSelectionChange={setSelectedRows}
                clearSelectionTrigger={clearSelectionTrigger}
              />
            </div>
            <div className="block lg:hidden">
              <CustomerListMobile customers={filteredCustomers} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
