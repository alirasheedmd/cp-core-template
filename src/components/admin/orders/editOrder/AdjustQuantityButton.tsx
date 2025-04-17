"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function AdjustQuantityButton({
  availableStock,
  onQuantitySave,
}: {
  availableStock: number;
  onQuantitySave: (quantity: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1
  const [error, setError] = useState("");

  const handleSave = () => {
    if (quantity > availableStock) {
      setError(`Quantity cannot exceed available stock (${availableStock}).`);
      return;
    }
    onQuantitySave(quantity); // Send quantity to parent component
    setOpen(false); // Close dialog
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === "") {
      setQuantity(0); // Temporarily set to 0 to allow editing
      setError(""); // No error when input is blank for now
      return;
    }

    const numericValue = Number(value);
    if (isNaN(numericValue) || numericValue < 1) {
      setQuantity(1); // Reset to 1 if input is invalid or below 1
      setError("Quantity cannot be less than 1.");
    } else if (numericValue > availableStock) {
      setQuantity(numericValue); // Temporarily allow exceeding stock but show error
      setError(`Quantity cannot exceed available stock (${availableStock}).`);
    } else {
      setQuantity(numericValue); // Valid input
      setError(""); // Clear error
    }
  };

  const handleBlur = () => {
    if (!quantity || quantity < 1) {
      setQuantity(1); // Ensure minimum quantity of 1 on blur
      setError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-4">
          Adjust quantity
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-5 text-left">
            Adjust quantity
          </DialogTitle>
        </DialogHeader>
        <div>
          {/* Input */}
          <div className="flex flex-col gap-x-8 gap-y-5 p-4 lg:flex-row lg:items-center">
            <div>
              <p>Quantity</p>
              <input
                type="number"
                value={quantity === 0 ? "" : quantity} // Show empty if 0
                onChange={handleQuantityChange}
                onBlur={handleBlur}
                className="mt-2 w-full rounded-lg border border-neutral-300 px-2 py-1"
              />
              {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
            <div>
              <p>Available Stock</p>
              <p className="text-orange-600 lg:mt-2">{availableStock}</p>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex w-full items-center justify-end gap-x-3 px-4 pb-4 pt-2">
            <button
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1 shadow-md transition-colors hover:bg-[#e7e7e7]"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="rounded-lg border border-neutral-300 bg-white px-3 py-1 shadow-md transition-colors hover:bg-[#e7e7e7]"
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
