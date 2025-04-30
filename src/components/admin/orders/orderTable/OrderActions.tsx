import { FaSearch, FaTimes } from 'react-icons/fa'
import { RiDeleteBinLine } from 'react-icons/ri'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface OrderActionsProps {
  query: string
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClearQuery: () => void
  selectedRowCount: number
  onDelete: () => Promise<void>
  isDeleting?: boolean
  open: boolean
  setOpen: (open: boolean) => void
}

export default function OrderActions({
  query,
  onQueryChange,
  onClearQuery,
  selectedRowCount,
  onDelete,
  isDeleting,
  open,
  setOpen,
}: OrderActionsProps) {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={onQueryChange}
          placeholder="Search orders..."
          className="focus:border-Orange w-full rounded-lg border border-gray-300 px-4 py-2 pl-10 focus:outline-none"
        />
        {query ? (
          <button
            onClick={onClearQuery}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes />
          </button>
        ) : (
          <FaSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        )}
      </div>
      {selectedRowCount > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              className="flex items-center gap-x-1 rounded-lg border border-red-500 px-3 py-2 text-red-500 hover:bg-red-50"
              disabled={isDeleting}
            >
              <RiDeleteBinLine />
              Delete
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Orders</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete {selectedRowCount} selected
                orders? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={() => setOpen(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
