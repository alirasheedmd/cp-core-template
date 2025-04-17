"use client";

import { cn } from "@/lib/utils";

export default function UpdateOrderButton({
  className,
  onClick,
}: {
  className?: string;
  onClick: () => void;
}) {
  return (
    <div className="mt-5">
      <button
        onClick={onClick}
        className={cn(
          "w-full text-nowrap rounded-xl border border-neutral-300 bg-white py-2 text-sm shadow-md transition-colors hover:text-orange-600 lg:text-base",
          className,
        )}
      >
        Update Order
      </button>
    </div>
  );
}
