'use client'

import { ICategory } from '@/types'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/config/routes'
import { deleteCategory, updateCategoryStatus } from '@/lib/dal'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PiDotsThreeOutlineFill } from "react-icons/pi"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { CategoryStatus } from '@/db/schema'
import { useState } from 'react'

export const categoriesColumns: ColumnDef<ICategory>[] = [
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
        <ArrowUpDown className="h-4 w-4 ml-2" />
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
          className={`mr-5 rounded-full px-1 py-0.5 text-center text-sm ${
            type === 'Category' ? 'bg-green-200' : 'bg-yellow-200'
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
        <div className='mr-10'>
          <Select value={status} onValueChange={(v) => handleChange(v)} >
            <SelectTrigger className="border-black w-full">
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
            <Link href={routes.admin.addSubcategory(id)} className='font-semibold w-full'>Subcategory</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href={isCategory ? routes.admin.subcategoryEdit(id) : !isCategory ? routes.admin.categoryEdit(id) : '#'} className='font-semibold w-full'>Edit</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <DropdownMenuLabel className='px-2 font-medium hover:bg-neutral-100 hover:rounded-sm w-full'>
                  <button>
                    Delete
                  </button>
                </DropdownMenuLabel>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to permanently
                    delete this category?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    onClick={handleDeleteCategory}
                    className="bg-red-600 hover:bg-red-700 text-white"
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
}

]