"use client";
// React and SWR imports
import { useState } from "react";
import useSWR from "swr";
// UI Component imports
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DataTable } from "./data-table";
import MobileOrders from "@/components/admin/orders/orderTable/MobileOrders";
import SortButton from "@/components/admin/orders/orderTable/SortButton";
// Icons
import { FaSearch, FaTimes } from "react-icons/fa";
import { PiPackageThin } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
// Data and types
import { columns } from "./columns";
import { orderTabs } from "@/utils/data";
import { IOrder } from "@/utils/interface";
// API utilities
import { deleteOrders } from "@/utils/api/order/deleteOrders";
import { fetchAllOrders } from "@/utils/api/order/fetchAllOrders";

export default function AdminOrdersPage() {
  const [selectedTab, setSelectedTab] = useState<string>(orderTabs[0].id);
  const [query, setQuery] = useState<string>("");
  const [selectedRows, setSelectedRows] = useState<IOrder[]>([]);
  const [clearSelectionTrigger, setClearSelectionTrigger] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    type: "date" | "name";
    direction: "asc" | "desc";
  } | null>(null);

  const {
    data: orders,
    error,
    isLoading,
    mutate,
  } = useSWR<IOrder[]>("/api/get-orders", fetchAllOrders);

  // Handle clearing the search input
  const clearInput = () => {
    setQuery("");
  };

  // Handle the input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // Count orders for each tab status
  const ordersCount = orderTabs.reduce(
    (acc, tab) => {
      acc[tab.id] = (orders || []).filter(
        (order: IOrder) => tab.id === "all-orders" || order.status === tab.id,
      ).length;
      return acc;
    },
    {} as Record<string, number>,
  );

  const getSortedOrders = (orders: IOrder[]) => {
    if (!sortConfig) return orders;

    return [...orders].sort((a, b) => {
      if (sortConfig.type === "date") {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return sortConfig.direction === "asc" ? dateA - dateB : dateB - dateA;
      } else {
        // Sort by customer name
        const nameA = `${a.customerDetails?.fullName}`.toLowerCase();
        const nameB = `${b.customerDetails?.fullName}`.toLowerCase();
        return sortConfig.direction === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      }
    });
  };

  // Filter orders based on the selected tab and query
  const filteredOrders = getSortedOrders(
    orders?.filter((order: IOrder) => {
      const queryLower = query.toLowerCase();
      const statusMatch =
        selectedTab === "all-orders" || order.status === selectedTab;
      return statusMatch && order.orderId.toLowerCase().includes(queryLower);
    }) ?? [],
  );

  // Delete orders by order ID
  const handleAction = async () => {
    setIsDeleting(true);
    try {
      await deleteOrders(selectedRows.map((row) => row.orderId));
      setSelectedRows([]); // Clear the selection
      setClearSelectionTrigger((prev) => !prev); // Toggle the trigger to clear the table selection
      mutate(); // Re-fetch the orders
    } catch (error) {
      console.error("Error deleting orders:", error);
    } finally {
      setIsDeleting(false);
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      <h1 className="p-6 text-2xl font-semibold lg:mb-4 lg:p-0 lg:text-4xl">
        Orders
      </h1>

      {/* Container for the scrollable tabs */}
      <div className="flex flex-col justify-between gap-y-3 rounded-t-xl bg-white p-2 md:gap-y-2 lg:bg-neutral-50 xl:flex-row xl:items-center">
        <div className="w-full overflow-x-auto pb-2 whitespace-nowrap lg:w-auto lg:pb-0">
          <ul className="flex justify-between lg:justify-center lg:space-x-1">
            {orderTabs.map((tab) => (
              <li key={tab.id} className="inline-block text-xs lg:text-sm">
                <button
                  onClick={() => setSelectedTab(tab.id)}
                  className={`relative block rounded-xl px-2 py-2 font-medium whitespace-nowrap transition-all hover:bg-[#e7e7e7] xl:px-4 xl:py-2 ${
                    selectedTab === tab.id
                      ? "bg-[#e7e7e7] text-orange-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab.name} (
                  {isLoading ? (
                    <span className="animate-pulse rounded-full bg-gray-300 text-transparent">
                      0
                    </span>
                  ) : (
                    <span className="text-xs lg:text-sm">
                      {ordersCount[tab.id]}
                    </span>
                  )}
                  )
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Search order input and sort */}
        <div className="mb-3 flex items-center gap-x-3 lg:mb-0">
          <div className="flex w-full items-center rounded-full border border-gray-500 xl:w-72">
            <input
              type="text"
              value={query}
              onChange={handleChange}
              placeholder="Enter your order number"
              className="w-full rounded-l-full bg-white px-3 py-1 text-xs outline-hidden lg:px-4 lg:text-sm"
            />

            <div className="flex h-4 items-center justify-center gap-x-1 rounded-r-full bg-white pr-1 lg:h-7 lg:pr-2">
              {/* Clear Input */}
              {query && (
                <button
                  className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500"
                  onClick={clearInput}
                >
                  <FaTimes className="text-[10px] text-white" />
                </button>
              )}
              {/* Search Icon */}
              <button>
                <FaSearch className="text-base text-black" />
              </button>
            </div>
          </div>

          {/* Delete button */}
          <div className="hidden lg:block">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <button
                  className={`flex h-6 w-6 items-center justify-center rounded-lg border border-gray-300 bg-neutral-50 transition-colors ${
                    selectedRows.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer hover:bg-[#e7e7e7] hover:text-orange-600"
                  }`}
                >
                  <RiDeleteBinLine className="text-base" />
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Delete Orders</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to delete {selectedRows.length}{" "}
                    orders? This action cannot be undone.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mx-auto mt-5 gap-x-4">
                  <button
                    onClick={handleAction}
                    disabled={isDeleting}
                    className="w-28 rounded-xl bg-[#e7e7e7] px-4 py-2 text-nowrap shadow-xs transition-colors hover:text-orange-600"
                  >
                    {isDeleting ? "Deleting..." : "Yes"}
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    disabled={isDeleting}
                    className="w-28 rounded-xl bg-[#e7e7e7] px-4 py-2 text-nowrap shadow-xs transition-colors hover:text-orange-600"
                  >
                    No
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Sort Button Small screens */}
          <div className="block lg:hidden">
            <SortButton sortConfig={sortConfig} onSortChange={setSortConfig} />
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="h-full">
        {isLoading && (
          <div className="rounded-b-xl border shadow-lg">
            {/* Desktop Shimmer */}
            <div className="hidden animate-pulse lg:block">
              {/* Header */}
              <div className="flex border-b border-gray-400 p-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="flex-1">
                    <div className="h-6 w-3/4 rounded bg-gray-300" />
                  </div>
                ))}
              </div>
              {/* Rows */}
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex border-b border-gray-300 p-3">
                  {[...Array(5)].map((_, j) => (
                    <div key={j} className="flex-1">
                      <div className="h-4 w-2/3 rounded bg-gray-200" />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Mobile Shimmer */}
            <div className="block animate-pulse lg:hidden">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="border-b border-gray-300 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    {/* Order ID and Date */}
                    <div className="w-[40%]">
                      <div className="mb-2 h-4 rounded bg-gray-200" />
                      <div className="h-3 w-2/3 rounded bg-gray-200" />
                    </div>
                    {/* Status */}
                    <div className="h-6 w-24 rounded-full bg-gray-200" />
                  </div>
                  {/* Customer Details */}
                  <div className="space-y-2">
                    <div className="h-3 w-1/4 rounded bg-gray-200" />
                    <div className="h-3 w-1/3 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
            <p className="text-sm text-red-500">
              Failed to load orders. Please try again later. {error.message}
            </p>
          </div>
        )}

        {!isLoading &&
          !error &&
          orders?.length === 0 &&
          selectedTab === "all-orders" && (
            <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
              <PiPackageThin className="text-[6rem] text-gray-300" />
              <p className="text-sm">No orders available</p>
            </div>
          )}

        {!isLoading &&
          !error &&
          filteredOrders?.length === 0 &&
          selectedTab !== "all-orders" && (
            <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
              <PiPackageThin className="text-[6rem] text-gray-300" />
              <p className="text-sm">
                No{" "}
                <span className="lowercase">
                  {orderTabs.find((tab) => tab.id === selectedTab)?.name}
                </span>{" "}
                orders available
              </p>
            </div>
          )}

        {!isLoading && !error && filteredOrders!.length > 0 && (
          <>
            <div className="hidden lg:block">
              <DataTable
                data={filteredOrders ?? []}
                columns={columns(mutate)}
                onSelectedRowsChange={(rows) => setSelectedRows(rows)}
                clearSelectionTrigger={clearSelectionTrigger}
              />
            </div>
            <div className="block border-t border-neutral-300 bg-white lg:hidden">
              <MobileOrders orders={filteredOrders ?? []} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
