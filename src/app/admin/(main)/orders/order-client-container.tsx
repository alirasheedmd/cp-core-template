'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { orderTabs } from '@/data/tabs'
import { IOrder } from '@/types'
import { OrdersDataTable } from './orders-data-table'
import MobileOrders from '@/components/admin/orders/orderTable/MobileOrders'
import OrderTabs from '@/components/admin/orders/orderTable/OrderTabs'
import OrderActions from '@/components/admin/orders/orderTable/OrderActions'
import EmptyOrderView from '@/components/admin/orders/orderTable/EmptyOrderView'
import { deleteOrders } from '@/lib/dal'

interface OrderClientContainerProps {
  orders: IOrder[]
  columns: (mutate: () => void) => ColumnDef<IOrder, string | number>[]
}

export default function OrderClientContainer({
  orders,
  columns,
}: OrderClientContainerProps) {
  const [selectedTab, setSelectedTab] = useState<string>(orderTabs[0].id)
  const [query, setQuery] = useState<string>('')
  const [selectedRows, setSelectedRows] = useState<IOrder[]>([])
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [open, setOpen] = useState(false)

  // dummy data
  const isLoading = false
  const error: Error | null = null
  const mutate = () => {} // Dummy mutate function

  // Handle clearing the search input
  const clearInput = () => {
    setQuery('')
  }

  // Handle the input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  // Count orders for each tab status
  const ordersCount = useMemo(() => {
    return orderTabs.reduce(
      (acc, tab) => {
        acc[tab.id] = (orders || []).filter(
          (order: IOrder) => tab.id === 'all-orders' || order.status === tab.id,
        ).length
        return acc
      },
      {} as Record<string, number>,
    )
  }, [orders])

  // Filter orders based on the selected tab and query
  const filteredOrders = useMemo(() => {
    return (
      orders?.filter((order: IOrder) => {
        const queryLower = query.toLowerCase()
        const statusMatch =
          selectedTab === 'all-orders' || order.status === selectedTab
        return statusMatch && order.orderId.toLowerCase().includes(queryLower)
      }) ?? []
    )
  }, [orders, query, selectedTab])

  // Delete orders by order ID
  const handleDeleteAction = async () => {
    setIsDeleting(true)
    try {
      // In a real app, this would call an API
      console.log(
        'Deleting orders:',
        selectedRows.map((row) => row.orderId),
      )
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await deleteOrders(selectedRows.map((row) => row.orderId || ''))
      setSelectedRows([]) // Clear the selection
      setClearSelectionTrigger((prev) => !prev) // Toggle the trigger to clear the table selection
      mutate() // Re-fetch the orders
    } catch (error) {
      console.error('Error deleting orders:', error)
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }

  const emptyViewMessage = useMemo(() => {
    if (filteredOrders.length === 0 && query) {
      return `No orders found for "${query}"`
    }
    if (filteredOrders.length === 0 && selectedTab === 'all-orders') {
      return 'No orders available'
    }
    if (filteredOrders.length === 0) {
      const tabName = orderTabs.find((tab) => tab.id === selectedTab)?.name
      return `No ${tabName ? tabName.toLowerCase() : ''} orders available`
    }
    return ''
  }, [selectedTab, filteredOrders, query])

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Orders
      </h1>

      {/* Container for the scrollable tabs */}
      <div className="flex flex-col justify-between gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 xl:flex-row xl:items-center">
        <OrderTabs
          tabs={orderTabs}
          selectedTab={selectedTab}
          onSelectTab={setSelectedTab}
          ordersCount={ordersCount}
          isLoading={isLoading}
        />
        <OrderActions
          query={query}
          onQueryChange={handleChange}
          onClearQuery={clearInput}
          selectedRowCount={selectedRows.length}
          onDelete={handleDeleteAction}
          isDeleting={isDeleting}
          open={open}
          setOpen={setOpen}
        />
      </div>

      {/* Tab Content */}
      <div className="h-full">
        {isLoading && (
          <div className="rounded-b-xl border shadow-lg">
            {/* Desktop Shimmer */}
            <div className="hidden animate-pulse lg:block">
              {/* Header */}
              <div className="flex border-b border-gray-400 p-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex-1">
                    <div className="h-6 w-3/4 rounded bg-gray-300" />
                  </div>
                ))}
              </div>
              {/* Rows */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex border-b border-gray-300 p-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex-1">
                      <div className="h-4 w-2/3 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile Shimmer */}
            <div className="block animate-pulse lg:hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-gray-300 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    {/* Order ID and Date */}
                    <div className="w-[40%]">
                      <div className="mb-2 h-4 rounded bg-gray-200" />
                      <div className="h-3 w-2/3 rounded bg-gray-200" />
                    </div>
                    {/* Status */}
                    <div className="h-6 w-24 rounded-full bg-gray-200" />
                  </div>
                  {/* Customer Details */}
                  <div className="space-y-2">
                    <div className="h-3 w-1/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <p className="text-sm text-red-500">
              Failed to load orders. Please try again later. {error}
            </p>
          </div>
        )}

        {!isLoading && !error && filteredOrders.length === 0 && (
          <EmptyOrderView message={emptyViewMessage} />
        )}

        {!isLoading && !error && filteredOrders.length > 0 && (
          <>
            <div className="hidden lg:block">
              <OrdersDataTable
                data={filteredOrders}
                columns={columns(mutate)}
                onSelectedRowsChange={(rows) => setSelectedRows(rows)}
                clearSelectionTrigger={clearSelectionTrigger}
              />
            </div>
            <div className="block border-t border-neutral-300 bg-white lg:hidden">
              <MobileOrders orders={filteredOrders} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
