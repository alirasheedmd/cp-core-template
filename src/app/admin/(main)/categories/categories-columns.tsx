'use client'

import { ICategory } from '@/types'
import { type DataTableColumnDef } from '@/lib/data-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/config/routes'
import { deleteCategory, updateCategoryStatus } from '@/lib/dal'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PiDotsThreeOutlineFill } from 'react-icons/pi'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CategoryStatus } from '@/db/schema'
import { useState } from 'react'

export const categoriesColumns: DataTableColumnDef<ICategory>[] = [
  // Checkbox Column
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
  // Category Name Column
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="font-semibold"
      >
        Category Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const name = row.getValue('name') as string

      return (
        <div>
          <div className="relative h-8 w-8 rounded-md bg-white">
            <Image
              src={row.original.images?.[0] ?? '/default-image.png'}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <p>{name}</p>
        </div>
      )
    },
  },
  // Type Column
  {
    accessorKey: 'type',
    header: () => {
      return <h6 className="font-semibold">Type</h6>
    },
    cell: ({ row }) => {
      const isCategory = !row.original.parentId
      const type = isCategory ? 'Category' : 'Subcategory'
      return (
        <div
          className={`rounded-full px-1 py-0.5 text-center text-sm ${
            type === 'Category' ? 'w-18 bg-green-200' : 'w-24 bg-yellow-200'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      )
    },
  },
  // Product Count column
  {
    accessorKey: 'productCount',
    header: () => <h6 className="font-semibold">Products</h6>,
    cell: ({ row }) => <div>{row.original.productCount || 0}</div>,
  },
  {
    accessorKey: 'subcategoryCount',
    header: () => <h6 className="font-semibold">Subcategory</h6>,
    cell: ({ row }) => <div>{row.original.subcategoryCount || 0}</div>,
  },
  // Status Column
  {
    accessorKey: 'status',
    header: () => <h6 className="font-semibold">Status</h6>,
    cell: ({ row }) => {
      const status = row.original.status
      const id = row.original.id

      const handleChange = async (value: string) => {
        await updateCategoryStatus(id, value as CategoryStatus)
      }

      return (
        <div className="mr-10">
          <Select value={status} onValueChange={(v) => handleChange(v)}>
            <SelectTrigger className="w-full border-black">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enable">Enable</SelectItem>
              <SelectItem value="disable">Disable</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )
    },
  },
  // More Actions Column
  {
    accessorKey: 'moreActions',
    header: () => <h6 className="font-semibold">More Actions</h6>,
    cell: ({ row }) => {
      const id = row.original.id
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [open, setOpen] = useState(false)

      const isCategory = row.original.parentId ? true : false

      const handleDeleteCategory = async () => {
        await deleteCategory(id)
        setOpen(false) // close dialog after deletion
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <PiDotsThreeOutlineFill />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link
                href={routes.admin.addSubcategory(id)}
                className="w-full font-semibold"
              >
                Subcategory
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={
                  isCategory
                    ? routes.admin.subcategoryEdit(id)
                    : !isCategory
                      ? routes.admin.categoryEdit(id)
                      : '#'
                }
                className="w-full font-semibold"
              >
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <DropdownMenuLabel className="w-full px-2 font-medium hover:rounded-sm hover:bg-neutral-100">
                    <button>Delete</button>
                  </DropdownMenuLabel>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. Are you sure you want to
                      permanently delete this category?
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={handleDeleteCategory}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      Confirm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
