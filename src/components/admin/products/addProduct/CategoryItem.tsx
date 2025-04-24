import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import AddSubcategory from "./AddSubcategory";

interface CategoryItemProps {
  name: string;
  isSelected: boolean;
  onChange: () => void;
}

export default function CategoryItem({
  name,
  isSelected,
  onChange,
}: CategoryItemProps) {
  const [open, setOpen] = useState(false);
  return (
    <li className="relative flex items-center justify-between pl-6">
      {/* Horizontal line for each item */}
      <div className="absolute top-1/2 left-0 h-px w-5 bg-black"></div>
      <div className="flex items-center space-x-2">
        <Checkbox id={name} checked={isSelected} onCheckedChange={onChange} />
        <label htmlFor={name} className="text-sm text-gray-800">
          {name}
        </label>
      </div>
      {/* Add sub categories */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-Blue px-2 text-xs font-normal hover:bg-transparent"
          >
            +Add subcategories
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[90vh] min-w-[50rem] overflow-y-auto p-0 [&>button]:hidden">
          <DialogHeader>
            <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-3 text-xl font-semibold">
              Add Subcategories
            </DialogTitle>
          </DialogHeader>
          <AddSubcategory setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </li>
  );
}
