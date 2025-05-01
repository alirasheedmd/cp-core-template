'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ActionButtons } from '@/components/common/ActionButtons'

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)

    try {
      // await deleteOrders([orderId]);
      console.log('Deleting order:', orderId)
      setOpen(false)
      router.push('/admin/orders')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('An error occurred while deleting the order.')
    } finally {
      setIsDeleting(false)
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="hover:text-Orange w-1/2 rounded-xl border border-neutral-300 bg-white py-2 text-sm text-nowrap shadow-md transition-colors lg:w-32 lg:text-base">
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
            isLoading={isDeleting}
            saveText="Yes"
            cancelText="No"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
