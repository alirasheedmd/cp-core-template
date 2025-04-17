"use client";

import { IProduct } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import Link from "next/link";

export const productsColumns: ColumnDef<IProduct>[] = [
  // Checkbox column
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  // Product Name column
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="font-bold"
        >
          Product Name
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const name: string = row.getValue("name");
      const _id: string = row.original._id || "";
      return (
        <Link
          href={`/admin/products/${_id}`}
          className="ml-4 flex w-fit items-center gap-x-2 transition-colors hover:text-orange-600"
        >
          <div className="relative h-8 w-8 rounded-md bg-white">
            <Image
              src={row.original.images[0] || "/placeholder.jpg"}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <p>{name}</p>
        </Link>
      );
    },
  },
  // Status column
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={`w-14 rounded-full px-2 py-1 text-center text-sm ${
            status === "active" ? "bg-green-200" : "bg-yellow-200"
          }`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      );
    },
  },
  // Stock column
  {
    accessorKey: "inventory",
    header: "Inventory",
    cell: ({ row }) => {
      const variants = row.original.variants;
      const totalStock = variants.reduce(
        (sum, variant) => sum + variant.stock,
        0,
      );
      return (
        <div>
          {totalStock === 0 ? (
            <p>Out of stock</p>
          ) : (
            <p>{totalStock} in stock for all variants</p>
          )}
        </div>
      );
    },
  },
  // Category column
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return <div>{category?.name || "Uncategorized"}</div>;
    },
  },
  // Price column
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price =
        row.original.variants?.[0]?.discountPrice ||
        row.original.variants?.[0]?.originalPrice ||
        0;
      return <div>Rs. {price.toLocaleString("en-PK")}</div>;
    },
  },
  // Vendor column
  {
    accessorKey: "vendor",
    header: "Vendor",
    cell: () => {
      return <div>Ali Rasheed</div>;
    },
  },
  // Created At column
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-bold"
        >
          Created At
          <ArrowUpDown className="h-2 w-2" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"));
      const formatted = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      });
      return <div>{formatted}</div>;
    },
  },
  // Variants column
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.original.variants;
      return (
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <button className="h-full w-full text-left transition-colors hover:text-orange-600">
                {variants.length} Variants
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="scrollbar max-h-[14.3rem] w-80 overflow-y-auto rounded-lg p-3"
              align="end"
            >
              <div className="rounded-lg border border-neutral-400 bg-[#f1f1f1] px-2 py-3 text-sm">
                {variants.map((variant) => (
                  <div
                    key={variant.sku}
                    className="mt-2 flex h-14 gap-x-1 rounded-lg bg-white p-2 shadow-md"
                  >
                    <Image
                      src={variant.images?.[0] || "/placeholder.jpg"}
                      height={40}
                      width={40}
                      className="object-contain"
                      alt={variant.color}
                    />
                    <div className="flex w-44 flex-col justify-between">
                      <p className="truncate">{variant.color}</p>
                      <p className="text-muted-foreground">{variant.sku}</p>
                    </div>
                    <div className="text-right">
                      <p className="whitespace-nowrap">
                        Rs.{" "}
                        {(
                          variant.discountPrice ||
                          variant.originalPrice ||
                          0
                        ).toLocaleString("en-PK")}
                      </p>
                      <p className="text-muted-foreground text-xs whitespace-nowrap">
                        Stock: {variant.stock}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      );
    },
  },
];
