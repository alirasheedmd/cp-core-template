"use client";

import { cn } from "@/lib/utils";

export default function UpdateOrderButton({
  orderId,
  className,
  uploadResponse,
}: {
  orderId: string;
  className?: string;
  uploadResponse: string | null;
}) {
  const handleUpdate = () => {
    console.log(orderId);
    if (uploadResponse) {
      console.log("Upload response:", uploadResponse);
      // You can use the upload response here as needed
    }
  };

  return (
    <button
      onClick={handleUpdate}
      className={cn(
        "w-1/2 text-nowrap rounded-xl bg-white py-2 text-sm shadow-md transition-colors hover:text-orange-600 lg:w-32 lg:text-base",
        className,
      )}
    >
      Update Order
    </button>
  );
}
