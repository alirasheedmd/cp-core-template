"use client";

import { BiSortAlt2 } from "react-icons/bi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface SortConfig {
  type: "date" | "name";
  direction: "asc" | "desc";
}

interface SortButtonProps {
  sortConfig: SortConfig | null;
  onSortChange: (newConfig: SortConfig) => void;
}

export default function SortButton({
  sortConfig,
  onSortChange,
}: SortButtonProps) {
  const [open, setOpen] = useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 bg-neutral-50 transition-colors hover:bg-[#e7e7e7] hover:text-orange-600`}
        >
          <BiSortAlt2 className="text-lg" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="mr-1 w-fit space-y-3 text-sm">
        <button
          className={`block w-full px-3 text-left hover:text-orange-600 ${
            sortConfig?.type === "date" && sortConfig.direction === "asc"
              ? "text-orange-600"
              : ""
          }`}
          onClick={() => {
            onSortChange({ type: "date", direction: "asc" });
            setOpen(false);
          }}
        >
          Orders (Oldest to Newest)
        </button>
        <button
          className={`block w-full px-3 text-left hover:text-orange-600 ${
            sortConfig?.type === "date" && sortConfig.direction === "desc"
              ? "text-orange-600"
              : ""
          }`}
          onClick={() => {
            onSortChange({ type: "date", direction: "desc" });
            setOpen(false);
          }}
        >
          Orders (Newest to Oldest)
        </button>
        <button
          className={`block w-full px-3 text-left hover:text-orange-600 ${
            sortConfig?.type === "name" && sortConfig.direction === "asc"
              ? "text-orange-600"
              : ""
          }`}
          onClick={() => {
            onSortChange({ type: "name", direction: "asc" });
            setOpen(false);
          }}
        >
          Customer Name (A to Z)
        </button>
        <button
          className={`block w-full px-3 text-left hover:text-orange-600 ${
            sortConfig?.type === "name" && sortConfig.direction === "desc"
              ? "text-orange-600"
              : ""
          }`}
          onClick={() => {
            onSortChange({ type: "name", direction: "desc" });
            setOpen(false);
          }}
        >
          Customer Name (Z to A)
        </button>
      </PopoverContent>
    </Popover>
  );
}
