"use client";

import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/utils/api/order/updateOrderStatus";

const OrderStatusSelector = ({
  orderId,
  initialStatus,
  mutate,
}: {
  orderId: string;
  initialStatus: string;
  mutate?: () => void;
}) => {
  const [status, setStatus] = useState<string>(initialStatus);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStatusChange = async (newStatus: string) => {
    setStatus(newStatus); // Optimistic UI update
    setIsLoading(true);

    try {
      await updateOrderStatus(orderId, newStatus);
      console.log("Status updated successfully!");
      mutate?.(); // Re-fetch the orders
    } catch (error) {
      console.error("Failed to update status:", error);
      setStatus(initialStatus); // Revert on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Select
        value={status}
        onValueChange={handleStatusChange}
        disabled={isLoading}
      >
        <SelectTrigger className="transition-colors hover:text-orange-600">
          <SelectValue placeholder={status} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="returned">Returned</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
};

export default OrderStatusSelector;
