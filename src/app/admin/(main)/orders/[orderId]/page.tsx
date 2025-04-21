"use client";
// React and Next.js imports
import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
// Data fetching
import useSWR from "swr";
import { IOrder } from "@/utils/interface";
// UI Components
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// Order management components

// Icons
import { BiArrowBack } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaCircle } from "react-icons/fa6";
import { LuTruck } from "react-icons/lu";
import PrintOrderButton from "@/components/admin/orders/orderDetails/PrintOrderButton";
import OrderStatusSelector from "@/components/admin/orders/orderDetails/OrderStatusSelector";
import PaymentStatusSelector from "@/components/admin/orders/orderDetails/PaymentStatusSelector";
import UploadInvoice from "@/components/admin/orders/orderDetails/UploadInvoice";
import UpdateOrderButton from "@/components/admin/orders/orderDetails/UpdateOrderButton";
import DeleteOrderButton from "@/components/admin/orders/orderDetails/DeleteOrderButton";
import EditInformation from "@/components/admin/orders/orderDetails/EditInformation";

export default function OrderDetailsPage() {
  const pathname = usePathname();
  const orderId = pathname.split("/")[2];
  const [uploadResponse, setUploadResponse] = useState<string | null>(null);

  const {
    data: order,
    isLoading,
    error,
  } = useSWR<IOrder>(
    orderId ? `/api/admin/get-order?orderId=${orderId}` : null,
    (url: string) => fetch(url).then((res) => res.json()),
  );

  if (error)
    return <div className="mx-auto my-10 max-w-6xl">Error loading order</div>;

  if (isLoading) {
    return <OrderSkeleton />;
  }

  const handleUploadResponse = (response: string) => {
    setUploadResponse(response);
  };

  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      {/* Mobile Screen Buttons */}
      <div className="flex items-center justify-between p-5 lg:hidden">
        <Link href={`/orders`}>
          <BiArrowBack className="text-lg" />
        </Link>
        <Popover>
          <PopoverTrigger asChild>
            <button className="rounded-lg p-1 font-bold transition-colors hover:bg-[#e7e7e7]">
              <BsThreeDots className="text-lg" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-44 space-y-3 text-sm" align="end">
            <Link
              href={`/orders/${orderId}/edit`}
              className="block w-full rounded-lg bg-[#e7e7e7] px-3 py-1.5 transition-colors hover:text-orange-600"
            >
              Edit
            </Link>
            <PrintOrderButton
              order={order}
              orderId={orderId}
              className="w-full rounded-lg px-3 text-left font-normal"
            />
            <Link
              // href={{
              //   pathname: "/track-order",
              //   query: {
              //     orderId: orderId,
              //     email: encodeURIComponent(
              //       order?.customerDetails?.email || "",
              //     ),
              //   },
              // }}
              href="#"
              className="block w-full rounded-lg bg-[#e7e7e7] px-3 py-1.5 transition-colors hover:text-orange-600"
            >
              View order status
            </Link>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-start justify-between px-5 lg:px-0">
        {/* Left Side - Order Details */}
        <div>
          {/* Order number */}
          <div className="flex gap-x-2">
            <p className="font-semibold">#{orderId}</p>
            <p className="flex items-center gap-x-1 rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs">
              <FaCircle className="text-[8px] text-neutral-600" /> Unpaid
            </p>
            <p className="flex items-center gap-x-1 rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs">
              <FaCircle className="text-[8px] text-neutral-600" /> Shipped
            </p>
          </div>

          {/* Date */}
          <p className="mt-1">
            {new Date(order?.createdAt ?? "").toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            at{" "}
            {new Date(order?.createdAt ?? "").toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/*Right Side - Edit Order */}
        <div className="hidden items-center gap-x-4 lg:flex">
          <Link
            href={`/orders/${orderId}/edit`}
            className="w-16 rounded-xl bg-[#e7e7e7] py-1.5 text-center font-semibold transition-colors hover:text-orange-600"
          >
            Edit
          </Link>
          <PrintOrderButton order={order} orderId={orderId} />
          <Link
            // href={{
            //   pathname: "/track-order",
            //   query: {
            //     orderId: orderId,
            //     email: encodeURIComponent(order?.customerDetails?.email || ""),
            //   },
            // }}
            href="#"
            className="rounded-xl bg-[#e7e7e7] px-4 py-1.5 font-semibold transition-colors hover:text-orange-600"
          >
            View order status page
          </Link>
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        <div className="basis-[70%] space-y-5">
          {/* First Card */}
          <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
            {/* Status */}
            <div className="flex items-center justify-between">
              <p className="w-fit rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs text-orange-600 capitalize">
                <LuTruck className="mr-1 inline text-sm" />
                {order?.status}
              </p>
            </div>

            {/* Products */}
            <div className="mt-4 rounded-lg border border-neutral-400">
              <div className="p-2 lg:p-4">
                <p className="text-sm lg:text-base">
                  {order?.paymentMethod
                    .replace(/_/g, " ")
                    .toLowerCase()
                    .replace(/^./, (char) => char.toUpperCase())}
                </p>
                <p className="mt-1 text-sm lg:text-base">
                  {new Date(order?.createdAt ?? "").toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </p>
              </div>

              <hr className="border-t-2 border-neutral-400 pb-4" />

              <div className="flex flex-col gap-y-2">
                {order?.items?.map((item) => (
                  <div
                    className="flex justify-between gap-x-3 px-2 pb-2 lg:px-4"
                    key={item?.variantId}
                  >
                    <div className="flex gap-x-3">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        width={60}
                        height={60}
                        className="mb-auto object-contain lg:mb-0"
                      />

                      <div className="space-y-0.5">
                        <p className="text-sm font-medium lg:text-base">
                          {item?.name}
                        </p>
                        <p className="text-xs text-neutral-500 lg:text-sm">
                          {item?.variant}
                        </p>
                        <p className="text-xs text-neutral-500 lg:text-sm">
                          SKU: {item?.sku}
                        </p>
                        <p className="text-xs text-neutral-500 lg:hidden">
                          Rs. {item?.price} X {item?.quantity}
                        </p>
                      </div>
                    </div>

                    <div className="flex lg:items-center lg:gap-x-6">
                      <p className="hidden text-neutral-500 lg:block">
                        Rs. {item?.price} x {item?.quantity}
                      </p>

                      <p className="text-sm text-nowrap text-neutral-500 lg:text-base">
                        Rs. {(item?.price ?? 0) * (item?.quantity ?? 0)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Status */}
            <div className="mt-4 ml-auto w-32 rounded-lg bg-[#E7E7E7] shadow-xs">
              <OrderStatusSelector
                orderId={orderId}
                initialStatus={order?.status ?? ""}
              />
            </div>
          </div>

          {/* Second Card - Payment Details */}
          <div className="bg-white p-4 lg:rounded-lg">
            {/* Status */}
            <p className="w-fit rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs text-orange-600 capitalize">
              Unpaid
            </p>
            {/* Grid */}
            <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm lg:text-base">
              {/* Row 1 */}
              <p>Subtotal</p>
              <p>
                {order?.items.reduce(
                  (total, item) => total + (item?.quantity ?? 0),
                  0,
                )}{" "}
                {order?.items.length == 1 ? "item" : "items"}
              </p>
              <p>
                Rs.{" "}
                {order?.items.reduce(
                  (total, item) =>
                    total + (item?.price ?? 0) * (item?.quantity ?? 0),
                  0,
                )}
              </p>

              {/* Row 2 */}
              <p className="col-span-2">Shipping</p>
              <p>Rs. {order?.shippingCost}</p>

              {/* Row 3 */}
              <p className="col-span-2">Total</p>
              <p>Rs. {order?.totalAmount}</p>
            </div>
          </div>

          {/* Third Card - Payment Details */}
          <div className="bg-white p-4 lg:rounded-lg">
            <p className="font-semibold">Payment Details</p>
            <p className="mt-2 text-sm text-neutral-500">#{orderId}</p>
            <div className="mt-4 flex items-center justify-between gap-x-2">
              <p className="text-sm lg:text-base">
                {order?.paymentMethod
                  ?.replace(/_/g, " ")
                  .toLowerCase()
                  .replace(/^./, (char) => char.toUpperCase())}
              </p>
              <PaymentStatusSelector />
            </div>
            <p className="text-sm lg:text-base">
              {new Date(order?.createdAt ?? "").toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>

            {/* Display when order is paid and payment method is bank transfer */}
            {order?.paymentMethod === "bank_transfer" && (
              <UploadInvoice onUploadResponse={handleUploadResponse} />
            )}
          </div>

          {/* Buttons for large screens */}
          <div className="mt-4 ml-auto hidden w-fit gap-x-4 lg:flex">
            <UpdateOrderButton
              orderId={orderId}
              uploadResponse={uploadResponse}
            />
            <DeleteOrderButton orderId={orderId} />
          </div>
        </div>

        {/* Right Side - Customer Details */}
        <div className="h-fit basis-[30%] bg-white p-4 lg:rounded-lg">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Customer</p>
            <EditInformation
              userEmail={order?.customerDetails?.email}
              userPhoneNumber={order?.customerDetails?.phoneNumber}
              userAddress={order?.customerDetails}
              orderId={orderId}
            />
          </div>

          {/* Customer Details */}
          <div className="mt-5 text-sm text-gray-700 lg:text-base">
            <p>{order?.customerDetails?.fullName}</p>
            {/* <p className="text-sm">1 order</p> */}
          </div>

          <div className="mt-5 space-y-1 text-base text-gray-700">
            <p className="text-base font-semibold text-black">
              Contact Information
            </p>
            <Link
              href={`mailto:${order?.customerDetails?.email}`}
              className="text-sm text-blue-500 hover:underline lg:text-base"
            >
              {order?.customerDetails?.email}
            </Link>
            <p className="text-sm lg:text-base">
              {order?.customerDetails?.phoneNumber}
            </p>
          </div>

          <div className="mt-5 space-y-1 text-sm text-gray-700 lg:text-base">
            <p className="text-base font-semibold text-black">
              Shipping Address
            </p>
            <p>{order?.customerDetails?.fullName}</p>
            <p>{order?.customerDetails?.address?.apartment}</p>
            <p>{order?.customerDetails?.address?.street}</p>
            <p>{order?.customerDetails?.address?.city}</p>
            <p>{order?.customerDetails?.address?.postalCode}</p>
            <Link
              href={`tel:${order?.customerDetails?.phoneNumber}`}
              className="block w-fit text-blue-500 hover:underline"
            >
              {order?.customerDetails?.phoneNumber}
            </Link>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${order?.customerDetails?.address?.street}, ${order?.customerDetails?.address?.city}, ${order?.customerDetails?.address?.postalCode}`,
              )}`}
              target="_blank"
              className="block w-fit text-blue-500 hover:underline"
            >
              View map
            </Link>
          </div>

          <div className="mt-5 space-y-1 text-sm text-gray-700 lg:text-base">
            <p className="text-base font-semibold text-black">
              Billing Address
            </p>
            <p>Same as shipping address</p>
          </div>
        </div>
      </div>
      {/* Buttons for mobile screens */}
      <div className="mt-4 flex w-full gap-x-4 px-3 pb-4 lg:ml-auto lg:hidden lg:w-fit lg:px-0 lg:pb-0">
        <UpdateOrderButton orderId={orderId} uploadResponse={uploadResponse} />
        <DeleteOrderButton orderId={orderId} />
      </div>
    </div>
  );
}

const OrderSkeleton = () => {
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      {/* Mobile Screen Buttons */}
      <div className="flex items-center justify-between p-5 lg:hidden">
        <div className="h-6 w-6 rounded bg-gray-200" />
        <div className="h-6 w-6 rounded bg-gray-200" />
      </div>

      <div className="flex items-start justify-between px-5 lg:px-0">
        {/* Left Side - Order Details */}
        <div>
          <div className="flex gap-x-2">
            <div className="h-6 w-20 rounded-md bg-gray-200" />
            <div className="h-6 w-16 rounded-lg bg-gray-200" />
            <div className="h-6 w-16 rounded-lg bg-gray-200" />
          </div>
          <div className="mt-1 h-5 w-48 rounded-md bg-gray-200" />
        </div>

        {/* Right Side - Actions */}
        <div className="hidden items-center gap-x-4 lg:flex">
          <div className="h-8 w-16 rounded-xl bg-gray-200" />
          <div className="h-8 w-36 rounded-xl bg-gray-200" />
          <div className="h-8 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Order Items */}
      <div className="mt-5 flex flex-col gap-5 lg:flex-row">
        <div className="basis-[70%] space-y-5">
          {/* First Card */}
          <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
            <div className="h-6 w-24 rounded-lg bg-gray-200" />

            <div className="mt-4 rounded-lg border border-neutral-400">
              <div className="space-y-2 p-2 lg:p-4">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-5 w-40 rounded bg-gray-200" />
              </div>

              <hr className="border-t-2 border-neutral-400 pb-4" />
              {/* Skeleton Items */}
              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="flex justify-between gap-x-3 px-2 pb-2 lg:px-4"
                >
                  <div className="flex gap-x-3">
                    <div className="h-[60px] w-[60px] rounded bg-gray-200" />
                    <div className="space-y-2">
                      <div className="h-5 w-40 rounded bg-gray-200" />
                      <div className="h-4 w-32 rounded bg-gray-200" />
                      <div className="h-4 w-24 rounded bg-gray-200" />
                      <div className="h-4 w-24 rounded bg-gray-200 lg:hidden" />
                    </div>
                  </div>
                  <div className="flex items-center gap-x-6">
                    <div className="hidden h-5 w-24 rounded bg-gray-200 lg:block" />
                    <div className="h-5 w-24 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 ml-auto h-8 w-32 rounded-lg bg-gray-200" />
          </div>

          {/* Payment Details Card */}
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div className="h-6 w-20 rounded-lg bg-gray-200" />
            <div className="grid grid-cols-3 gap-x-4 gap-y-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="h-5 rounded bg-gray-200" />
              ))}
            </div>
          </div>

          {/* Payment Info Card */}
          <div className="space-y-4 rounded-lg bg-white p-4">
            <div className="h-6 w-32 rounded bg-gray-200" />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-gray-200" />
              <div className="h-5 w-48 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Right Side - Customer Details */}
        <div className="h-fit basis-[30%] rounded-lg bg-white p-4">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-gray-200" />
            <div className="h-6 w-8 rounded bg-gray-200" />
          </div>

          {/* Customer Details Skeleton */}
          <div className="mt-5 space-y-4">
            {[1, 2, 3].map((section) => (
              <div key={section} className="space-y-2">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="h-4 w-48 rounded bg-gray-200" />
                <div className="h-4 w-40 rounded bg-gray-200" />
                <div className="h-4 w-36 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
