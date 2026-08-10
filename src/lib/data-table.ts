import {
  columnFilteringFeature,
  columnVisibilityFeature,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table'

export const dataTableFeatures = tableFeatures({
  columnFilteringFeature,
  filteredRowModel: createFilteredRowModel(),
  columnVisibilityFeature,
  rowSortingFeature,
  sortedRowModel: createSortedRowModel(),
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
  rowSelectionFeature,
})

export type DataTableFeatures = typeof dataTableFeatures

export type DataTableColumnDef<
  TData extends RowData,
  TValue = unknown,
> = ColumnDef<DataTableFeatures, TData, TValue>
