import { Skeleton } from '@/components/ui/skeleton'

export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Cart Items Skeleton - spans 2 columns on large screens */}
      <div className="lg:col-span-2">
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center md:justify-between"
            >
              {/* Product image and details */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 flex-shrink-0 rounded-md" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-5 w-48" /> {/* Product name */}
                  <Skeleton className="h-4 w-24" /> {/* Price */}
                  <div className="hidden md:block">
                    <div className="flex items-center space-x-2">
                      <Skeleton className="h-4 w-16" /> {/* Quantity label */}
                      <div className="flex items-center overflow-hidden rounded-md border">
                        <Skeleton className="h-8 w-8" /> {/* Minus button */}
                        <Skeleton className="h-8 w-10" /> {/* Quantity input */}
                        <Skeleton className="h-8 w-8" /> {/* Plus button */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile quantity selector */}
              <div className="sm:flex-1 md:hidden">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-4 w-16" />
                  <div className="flex items-center overflow-hidden rounded-md border">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-10" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </div>

              {/* Price and delete button */}
              <div className="flex items-center justify-between sm:justify-end">
                <Skeleton className="h-5 w-24" /> {/* Total price */}
                <Skeleton className="ml-4 h-5 w-5" /> {/* Delete button */}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Skeleton - sticky on large screens */}
      <div className="lg:sticky lg:top-22 lg:self-start">
        <div className="rounded-lg border p-4">
          <Skeleton className="mb-4 h-6 w-40" /> {/* Order Summary title */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" /> {/* Subtotal label */}
              <Skeleton className="h-4 w-24" /> {/* Subtotal amount */}
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" /> {/* Shipping label */}
              <Skeleton className="h-4 w-24" /> {/* Shipping amount */}
            </div>
            <div className="mt-2 border-t pt-2">
              <div className="flex justify-between">
                <Skeleton className="h-5 w-16" /> {/* Total label */}
                <Skeleton className="h-5 w-28" /> {/* Total amount */}
              </div>
            </div>
            <div className="pt-4">
              <Skeleton className="h-10 w-full" /> {/* Checkout button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
