'use client'

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { DataTablePagination } from '@/components/common/DataTablePagination'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { debounce } from 'lodash'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSelectedRowsChange: (selectedData: TData[]) => void
  clearSelectionTrigger?: boolean
}

export function OrdersDataTable<TData, TValue>({
  columns,
  data,
  onSelectedRowsChange,
  clearSelectionTrigger,
}: DataTableProps<TData, TValue>) {
  // Initialize sorting state with a default sort by orderId
  const [sorting, setSorting] = React.useState<SortingState>([
    { id: 'orderId', desc: false },
  ])
  const [rowSelection, setRowSelection] = useState({})
  const [lastClearTrigger, setLastClearTrigger] = useState(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  // Compute selected rows as a memoized value
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    // eslint-disable-next-line
    [rowSelection],
  )

  const debouncedClearSelection = useRef(
    debounce(() => {
      setRowSelection({})
      if (typeof onSelectedRowsChange === 'function') {
        onSelectedRowsChange([])
      }
    }, 100),
  ).current

  useEffect(() => {
    if (
      clearSelectionTrigger !== undefined &&
      clearSelectionTrigger !== lastClearTrigger
    ) {
      debouncedClearSelection()
      setLastClearTrigger(clearSelectionTrigger)
    }
    // eslint-disable-next-line
  }, [clearSelectionTrigger, onSelectedRowsChange, lastClearTrigger])

  useEffect(() => {
    return () => {
      debouncedClearSelection.cancel()
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (typeof onSelectedRowsChange === 'function') {
      onSelectedRowsChange(selectedRows) // Notify parent on change
    }
  }, [selectedRows, onSelectedRowsChange])

  // console.log("Data", data);
  return (
    <>
      {/* Table Container with max height and scrolling */}
      <div className="scrollbar max-h-[calc(100vh-280px)] overflow-auto rounded-b-xl border shadow-lg">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="border-b border-gray-400 font-bold"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className="border-b border-gray-300"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <DataTablePagination table={table} />
    </>
  )
}
