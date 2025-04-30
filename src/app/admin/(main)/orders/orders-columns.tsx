'use client'

import { ColumnDef } from '@tanstack/react-table'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { ICustomerDetails, IOrder, IOrderItem } from '@/types'
import OrderStatusSelector from '@/components/admin/orders/orderDetails/OrderStatusSelector'

export const ordersColumns = (mutate: () => void): ColumnDef<IOrder>[] => [
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
  {
    accessorKey: 'orderId',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Order ID
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const orderId: string = row.getValue('orderId')
      return (
        <Link
          href={`/admin/orders/${orderId}`}
          className="hover:text-Orange ml-4 transition-colors"
        >
          {orderId}
        </Link>
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="font-semibold"
        >
          Date
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'))
      const formatted = date.toLocaleDateString()
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'customerDetails',
    header: () => {
      return <h6 className="font-semibold">Customer</h6>
    },
    cell: ({ row }) => {
      const customerDetails: ICustomerDetails = row.getValue('customerDetails')
      return (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:text-Orange h-full w-full text-left transition-colors">
                {customerDetails?.fullName}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-fit rounded-lg">
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{customerDetails?.fullName}</p>
                <p>{customerDetails?.address?.city}</p>
                <p className="mt-2">{customerDetails?.phoneNumber}</p>
                <p className="text-muted-foreground mt-2">
                  {customerDetails?.email}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
  {
    accessorKey: 'paymentMethod',
    header: () => {
      return <h6 className="font-semibold">Payment Mode</h6>
    },
    cell: ({ row }) => {
      const paymentMethod: string = row.getValue('paymentMethod')
      const formatted = paymentMethod
        .replace(/_/g, ' ')
        .toLowerCase()
        .replace(/^./, (char) => char.toUpperCase())
      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: 'totalAmount',
    header: () => {
      return <h6 className="font-semibold">Price</h6>
    },
    cell: ({ row }) => {
      const price: number = row.getValue('totalAmount')
      return <div>Rs. {price.toLocaleString('en-PK')}</div>
    },
  },
  // {
  //   accessorKey: "paymentStatus",
  //   header: "Payment Status",
  //   cell: () => {
  //     return <div>N/A</div>;
  //   },
  // },
  // {
  //   accessorKey: "deliveryStatus",
  //   header: "Shipment Status",
  //   cell: () => {
  //     return <div>N/A</div>;
  //   },
  // },
  {
    accessorKey: 'items',
    header: () => {
      return <h6 className="font-semibold">Item</h6>
    },
    cell: ({ row }) => {
      const item: IOrderItem[] = row.getValue('items')
      const status: string = row.getValue('status')
      const length = item?.length
      return (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:text-Orange h-full w-full text-left transition-colors">{`${length} ${length == 1 ? 'Item' : 'Items'}`}</button>
            </PopoverTrigger>
            <PopoverContent
              className="scrollbar max-h-[16.8rem] w-80 overflow-y-auto rounded-lg p-3"
              align="end"
            >
              <div className="bg-LightWhite rounded-lg border border-neutral-400 px-2 py-3 text-sm">
                <h4 className="text-base capitalize">{status}</h4>
                {item.map((i) => (
                  <div
                    key={i.variantId}
                    className="mt-2 flex h-14 gap-x-1 rounded-lg bg-white p-2 shadow-md"
                  >
                    <Image
                      src={i.image}
                      height={40}
                      width={40}
                      className="object-contain"
                      alt={i.name}
                    />
                    <div className="flex w-44 flex-col justify-between">
                      <p className="truncate">{i.name}</p>
                      <p className="text-muted-foreground">{i.variant}</p>
                    </div>
                    <p className="whitespace-nowrap">x {i.quantity}</p>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: () => {
      return <h6 className="font-semibold">Delivery Status</h6>
    },
    cell: ({ row }) => {
      const status: string = row.getValue('status')
      const orderId: string = row.getValue('orderId')

      return (
        <OrderStatusSelector
          orderId={orderId}
          initialStatus={status}
          mutate={mutate}
        />
      )
    },
  },
]
