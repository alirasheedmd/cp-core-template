'use client'

import {
  flexRender,
  type RowData,
  SortingState,
  useTable,
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
import { dataTableFeatures, type DataTableColumnDef } from '@/lib/data-table'
import React, { useEffect, useMemo, useState } from 'react'

interface DataTableProps<TData extends RowData> {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  onRowSelectionChange: (selectedData: TData[]) => void
  clearSelectionTrigger?: boolean
}

export function CustomersDataTable<TData extends RowData>({
  columns,
  data,
  onRowSelectionChange,
  clearSelectionTrigger,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [rowSelection, setRowSelection] = useState({})
  const [lastClearTrigger, setLastClearTrigger] = useState(false)

  const table = useTable({
    features: dataTableFeatures,
    data,
    columns,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  })

  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    // eslint-disable-next-line
    [rowSelection, table],
  )

  const clearSelection = () => {
    setRowSelection({})
    onRowSelectionChange([])
  }

  useEffect(() => {
    if (
      clearSelectionTrigger !== undefined &&
      clearSelectionTrigger !== lastClearTrigger
    ) {
      clearSelection()
      setLastClearTrigger(clearSelectionTrigger)
    }
    // eslint-disable-next-line
  }, [clearSelectionTrigger, lastClearTrigger])

  useEffect(() => {
    onRowSelectionChange(selectedRows)
  }, [selectedRows, onRowSelectionChange])

  return (
    <>
      <div className="scrollbar bg-LightWhite max-h-[calc(100vh-280px)] overflow-auto rounded-b-xl border shadow-lg">
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
      <DataTablePagination table={table} />
    </>
  )
}

export default CustomersDataTable
