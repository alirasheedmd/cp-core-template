'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'

interface DeleteOrderButtonProps {
  orderId: string
  onDelete: () => void
  isPending: boolean
}

export default function DeleteOrderButton({
  onDelete,
  isPending,
}: DeleteOrderButtonProps) {
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    onDelete()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="hover:text-Orange w-1/2 rounded-xl border border-neutral-300 bg-white py-2 text-sm text-nowrap shadow-md transition-colors lg:w-32 lg:text-base"
          disabled={isPending}
        >
          Delete Order
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg sm:max-w-[425px] lg:w-full">
        <DialogHeader>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <div className="mx-auto mt-5">
          <ActionButtons
            onCancel={() => setOpen(false)}
            onSave={handleDelete}
            isLoading={isPending}
            saveText="Yes"
            cancelText="No"
            loadingText="Deleting..."
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
