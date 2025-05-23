'use client'

import { IProduct } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { routes } from '@/config/routes'
import { formatCurrency2 } from '@/lib/utils'

export const productsColumns: ColumnDef<IProduct>[] = [
  // Checkbox column
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="bg-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="bg-white"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Product Title column
  {
    accessorKey: 'title',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Product Title
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const title: string = row.getValue('title')
      const _id: string = row.original.id || ''
      return (
        <Link
          href={routes.admin.productEdit(_id)}
          className="hover:text-Orange ml-3 flex w-fit items-center gap-x-2 transition-colors"
        >
          <div className="relative h-8 w-8 rounded-md bg-white">
            <Image
              src={row.original.images?.[0] ?? '/default-image.png'}
              alt={title}
              fill
              className="object-contain"
            />
          </div>
          <p>{title}</p>
        </Link>
      )
    },
  },
  // Status column
  {
    accessorKey: 'status',
    header: () => {
      return <h6 className="font-semibold">Status</h6>
    },
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <div
          className={`w-14 rounded-full px-1 py-0.5 text-center text-sm ${
            status === 'active' ? 'bg-green-200' : 'bg-yellow-200'
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      )
    },
  },
  // Stock column
  {
    accessorKey: 'inventory',
    header: () => {
      return <h6 className="font-semibold">Inventory</h6>
    },
    cell: ({ row }) => {
      const totalStock = row.original.currentStock
      return (
        <div>
          {Number(totalStock) === 0 ? (
            <p>Out of stock</p>
          ) : (
            <p>{totalStock} in stock</p>
          )}
        </div>
      )
    },
  },
  // Category column
  {
    accessorKey: 'category',
    header: () => {
      return <h6 className="font-semibold">Category</h6>
    },
    cell: ({ row }) => {
      const category = row.original.categories || []

      return (
        <div>
          {category.length > 0 ? (
            category.map((cat: string, index: number) => (
              <div key={index}>{cat}</div>
            ))
          ) : (
            <div>Uncategorized</div>
          )}
        </div>
      )
    },
  },
  // Price column
  {
    accessorKey: 'price',
    header: () => {
      return <h6 className="font-semibold">Price</h6>
    },
    cell: ({ row }) => {
      const price = row.original.price
      return <div>{formatCurrency2(price)}</div>
    },
  },
  // Vendor column
  {
    accessorKey: 'vendor',
    header: () => {
      return <h6 className="font-semibold">Vendor</h6>
    },
    cell: () => {
      return <div>Ali Rasheed</div>
    },
  },
  // Created At column
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Created At
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = row.original.createdAt
      const formatted = format(date, 'dd/MM/yyyy')
      return <div className="ml-3">{formatted}</div>
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = parseISO(rowA.getValue(columnId))
      const dateB = parseISO(rowB.getValue(columnId))
      return dateA.getTime() - dateB.getTime()
    },
  },
]
