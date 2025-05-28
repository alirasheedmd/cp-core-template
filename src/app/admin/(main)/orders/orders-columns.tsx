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
import { IOrder, IOrderItem } from '@/types'
import OrderStatusSelector from '@/components/admin/orders/orderDetails/OrderStatusSelector'
import { routes } from '@/config/routes'
import { ShippingAddress } from '@/schemas/checkout-form.schema'
import CurrencySymbol from '@/components/common/CurrencySymbol'

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
          href={routes.admin.orderDetails(orderId)}
          className="hover:text-Orange ml-4 transition-colors"
        >
          {orderId}
        </Link>
      )
    },
    enableSorting: false,
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
    accessorKey: 'shippingAddress',
    header: () => {
      return <h6 className="font-semibold">Customer</h6>
    },
    cell: ({ row }) => {
      const shippingAddress: ShippingAddress = row.getValue('shippingAddress')
      const userEmail = row.original.user.email
      return (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="hover:text-Orange h-full w-full text-left transition-colors">
                {shippingAddress?.firstName} {shippingAddress.lastName}
              </button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-fit rounded-lg">
              <div className="space-y-1 text-sm">
                <p className="font-semibold">
                  {shippingAddress?.firstName} {shippingAddress.lastName}
                </p>
                <p>{shippingAddress.city}</p>
                <p className="mt-2">{shippingAddress.phoneNumber}</p>
                <p className="text-muted-foreground mt-2">{userEmail}</p>
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
    accessorKey: 'totalPrice',
    header: () => {
      return <h6 className="font-semibold">Price</h6>
    },
    cell: ({ row }) => {
      const price: number = row.getValue('totalPrice')
      return <CurrencySymbol amount={price} />
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
    accessorKey: 'orderItems',
    header: () => {
      return <h6 className="font-semibold">Item</h6>
    },
    cell: ({ row }) => {
      const item: IOrderItem[] = row.getValue('orderItems')
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
                    key={i.productId}
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
                      <p className="text-muted-foreground">{i.sku}</p>
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
          status={status}
          mutate={mutate}
        />
      )
    },
  },
]
