'use client'

import { ICustomerDetails } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { format } from 'date-fns'
import { routes } from '@/config/routes'
import { formatCurrency2 } from '@/lib/utils'

export const customersColumns: ColumnDef<ICustomerDetails>[] = [
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
  // Customer Name column
  {
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    id: 'name', // required when using accessorFn
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-semibold"
      >
        Customer Name
        <ArrowUpDown className="h-2 w-2" />
      </Button>
    ),
    cell: ({ row }) => {
      const firstName = row.original.firstName
      const lastName = row.original.lastName
      const id = row.original.id || ''
      return (
        <Link
          href={routes.admin.customerEdit(id)}
          className="hover:text-Orange ml-3 flex w-fit items-center gap-x-2 transition-colors"
        >
          <p>{firstName} {lastName}</p>
        </Link>
      )
    },
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as string
      const b = rowB.getValue(columnId) as string
      return a.localeCompare(b)
    }
  },
  // Email Subscription column
  {
    accessorKey: 'subscription',
    header: () => {
      return <h6 className="font-semibold">Email Subscription</h6>
    },
    cell: ({ row }) => {
      const isSubscribed = row.original.isPromotionalEmailFlag
      return (
        <div
          className={` rounded-full px-1 py-0.5 text-center text-sm ${
            isSubscribed === true ? 'w-22 bg-green-200' : 'w-28 bg-yellow-200'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Not Subscribed'}
        </div>
      )
    },
  },
  // location column
  {
    accessorKey: 'location',
    header: () => {
      return <h6 className="font-semibold">Location</h6>
    },
    cell: ({ row }) => {
      const city = row.original.city
      const country = row.original.country      
      return (
        <div>
          { city && country ? (
            <p>{city} {', '} {country} </p>
          ) : (
            <p>Not Provided</p>
          )}
        </div>
      )
    },
  },
  // Order column
  {
    accessorKey: 'order',
    header: () => {
      return <h6 className="font-semibold">Order</h6>
    },
    cell: ({ row }) => {
      const ordersCount = row.original.ordersCount || 0

      return (
        <div>
          {ordersCount} orders
        </div>
      )
    },
  },
  // AmountSpend column
  {
    accessorKey: 'amountSpend',
    header: () => {
      return <h6 className="font-semibold">Amount Spend</h6>
    },
    cell: ({ row }) => {
      const amountSpend = row.original.totalAmount
      return <div>{ amountSpend ? formatCurrency2(amountSpend) : formatCurrency2(0)}</div>
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
      const a: any = rowA.getValue(columnId)
      const b: any = rowB.getValue(columnId)
      const dateA = a instanceof Date ? a : new Date(a)
      const dateB = b instanceof Date ? b : new Date(b)
      return dateA.getTime() - dateB.getTime()
    },
  },
]
