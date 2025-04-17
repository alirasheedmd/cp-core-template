"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useState } from "react";

export default function PaymentStatusSelector() {
  const [status, setStatus] = useState<string>("unpaid");

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    // console.log("Payment status changed to:", newStatus);
  };
  return (
    <div className="w-fit">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="rounded-lg bg-[#E7E7E7] shadow-xs transition-colors hover:text-orange-600 lg:w-32 lg:text-base">
          <SelectValue placeholder={"Unpaid"} className="capitalize" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="unpaid">Unpaid</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
