"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IVariant } from "@/utils/interface";
import { useState } from "react";

export default function SelectVariantButton({
  variants,
  onVariantSelect,
}: {
  variants: IVariant[];
  onVariantSelect: (selectedVariant: IVariant) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(variants[0]?.color || "");

  const handleSave = () => {
    const selectedVariant = variants.find((v) => v.color === selectedColor);
    if (selectedVariant) {
      onVariantSelect(selectedVariant); // Send the selected variant back to parent
      setOpen(false); // Close the dialog
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-4">
          Select variant
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-5">
            Select variant
          </DialogTitle>
        </DialogHeader>
        <div className="flex h-52 flex-col items-start justify-between">
          <div>
            <p className="px-3 pb-2">Select a variant</p>
            <Select
              value={selectedColor}
              onValueChange={setSelectedColor} // Update state when user selects
            >
              <SelectTrigger className="mx-2 mb-5 w-72">
                <SelectValue
                  placeholder={
                    variants.length > 0
                      ? "Select a variant"
                      : "No variants available"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant, index) => (
                  <SelectItem key={variant._key || index} value={variant.color}>
                    {variant.color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              disabled={variants.length === 0}
            >
              Save
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
