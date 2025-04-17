"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "@/components/admin/orders/orderTable/DataTablePagination";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowSelectionChange: (selectedData: TData[]) => void;
  clearSelectionTrigger?: boolean;
  sortConfig?: { type: "date" | "name"; direction: "asc" | "desc" } | null;
  onSortChange?: (sortConfig: { type: "date" | "name"; direction: "asc" | "desc" } | null) => void;
}

export function ProductsDataTable<TData, TValue>({
  columns,
  data,
  onRowSelectionChange,
  clearSelectionTrigger,
  sortConfig,
  onSortChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [lastClearTrigger, setLastClearTrigger] = useState(false);

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
  });

  // Compute selected rows as a memoized value
  const selectedRows = useMemo(
    () => table.getSelectedRowModel().rows.map((row) => row.original),
    [rowSelection, table],
  );

  const debouncedClearSelection = useRef(
    debounce(() => {
      setRowSelection({});
      onRowSelectionChange([]);
    }, 100),
  ).current;

  useEffect(() => {
    if (
      clearSelectionTrigger !== undefined &&
      clearSelectionTrigger !== lastClearTrigger
    ) {
      debouncedClearSelection();
      setLastClearTrigger(clearSelectionTrigger);
    }
  }, [clearSelectionTrigger, lastClearTrigger, debouncedClearSelection]);

  useEffect(() => {
    return () => {
      debouncedClearSelection.cancel();
    };
  }, [debouncedClearSelection]);

  useEffect(() => {
    onRowSelectionChange(selectedRows); // Notify parent on change
  }, [selectedRows, onRowSelectionChange]);

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
                  data-state={row.getIsSelected() && "selected"}
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
  );
}
