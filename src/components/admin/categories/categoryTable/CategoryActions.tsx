'use client'

import { FaSearch, FaTimes } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import SortButton from '../../products/addProduct/SortButton'
import { ActionButtons } from '@/components/common/ActionButtons'
import { useState } from 'react'

interface CategoryActionsProps {
  query: string
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearQuery: () => void
  selectedRowCount: number
  onDelete: () => Promise<void>
  sortConfig: { type: 'date' | 'name'; direction: 'asc' | 'desc' } | null
  onSortChange: (
    config: { type: 'date' | 'name'; direction: 'asc' | 'desc' } | null,
  ) => void
}

const CategoryActions: React.FC<CategoryActionsProps> = ({
  query,
  onQueryChange,
  onClearQuery,
  selectedRowCount,
  onDelete,
  sortConfig,
  onSortChange
}) => {
  
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await onDelete()
    } catch (error) {
      console.error('Error in delete action:', error)
      // Optionally show an error message to the user
    } finally {
      setIsDeleting(false)
      setOpen(false)
    }
  }
  
  return (
    <div className="mb-3 flex items-center gap-x-3 lg:mb-0">
      {/* Search Input */}
      <div className="flex w-full items-center rounded-full border border-gray-500 xl:w-72">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Search product name"
          className="w-full rounded-l-full bg-white px-3 py-1 text-xs outline-hidden lg:px-4 lg:text-sm"
        />
        <div className="flex h-4 items-center justify-center gap-x-1 rounded-r-full bg-white pr-1 lg:h-7 lg:pr-2">
          {query && (
            <button
              className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500"
              onClick={onClearQuery}
            >
              <FaTimes className="text-[10px] text-white" />
            </button>
          )}
          <button>
            <FaSearch className="text-base text-black" />
          </button>
        </div>
      </div>

      {/* Delete button - Desktop */}
      <div className="hidden lg:block">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              disabled={selectedRowCount === 0}
              className={`flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-white transition-colors ${
                selectedRowCount === 0
                  ? 'cursor-not-allowed opacity-50'
                  : 'hover:bg-LightGrey hover:text-Orange cursor-pointer'
              }`}
            >
              <RiDeleteBinLine className="text-base" />
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete Products</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedRowCount} product(s)?
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="mx-auto mt-5">
              <ActionButtons
                onCancel={() => setOpen(false)}
                onSave={handleDelete}
                isLoading={isDeleting}
                saveText="Yes"
                cancelText="No"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Sort Button - Mobile */}
      <div className="block lg:hidden">
        <SortButton sortConfig={sortConfig} onSortChange={onSortChange} />
      </div>
    </div>
  )
}

export default CategoryActions
