"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteOrders } from "@/utils/api/order/deleteOrders";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      await deleteOrders([orderId]);
      setOpen(false);
      router.push("/admin/orders");
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("An error occurred while deleting the order.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="w-1/2 text-nowrap rounded-xl border border-neutral-300 bg-white py-2 text-sm shadow-md transition-colors hover:text-orange-600 lg:w-32 lg:text-base">
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
        <DialogFooter>
          <div className="mx-auto mt-5 flex gap-x-4">
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="w-28 text-nowrap rounded-xl bg-[#e7e7e7] px-4 py-2 text-sm shadow-xs transition-colors hover:text-orange-600 lg:text-base"
            >
              {isDeleting ? "Deleting..." : "Yes"}
            </button>
            <button
              onClick={() => setOpen(false)}
              disabled={isDeleting}
              className="w-28 text-nowrap rounded-xl bg-[#e7e7e7] px-4 py-2 text-sm shadow-xs transition-colors hover:text-orange-600 lg:text-base"
            >
              No
            </button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
