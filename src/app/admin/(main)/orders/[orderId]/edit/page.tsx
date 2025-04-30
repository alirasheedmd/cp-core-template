'use client'
// React and hooks
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
// Next.js components
import Image from 'next/image'
import Link from 'next/link'
// Data fetching
import useSWR from 'swr'
// Components
import AdjustQuantityButton from '@/components/admin/orders/editOrder/AdjustQuantityButton'
import EditOrderUpdateButton from '@/components/admin/orders/editOrder/EditOrderUpdateButton'
import SearchProducts, {
  ISuggestion,
} from '@/components/admin/orders/editOrder/SearchProducts'
import SelectVariantButton from '@/components/admin/orders/editOrder/SelectVariantButton'
// Icons
import { BiArrowBack } from 'react-icons/bi'
import { LuTruck } from 'react-icons/lu'
// Types and interfaces
import { IOrder, IVariant } from '@/utils/interface'
import { IUpdateOrderData } from '@/utils/api/order/updateOrder'
// API utilities
import { updateOrder } from '@/utils/api/order'
import { fetchOrder } from '@/utils/api/order/fetchOrder'

export default function EditOrderPage() {
  const pathname = usePathname()
  const orderId = pathname.split('/')[2]
  const {
    data: order,
    isLoading,
    error,
  } = useSWR<IOrder>(orderId ? `/api/get-order?orderId=${orderId}` : null, () =>
    fetchOrder(orderId),
  )
  const [selectedItems, setSelectedItems] = useState<ISuggestion[]>([])
  const [orderItems, setOrderItems] = useState(order?.items || [])
  const [sendNotification, setSendNotification] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    if (order?.items) {
      setOrderItems(order.items)
    }
  }, [order])

  // Calculate subtotal for selected items
  const selectedItemsSubtotal = selectedItems.reduce(
    (total: number, item: ISuggestion) => {
      const price =
        item.variant?.discountPrice ?? item.variant?.originalPrice ?? 0
      return total + price * (item.quantity ?? 1)
    },
    0,
  )

  // Calculate subtotal for order items
  const orderItemsSubtotal = orderItems.reduce(
    (total: number, item: IOrderItem) => {
      return total + (item.price ?? 0) * (item.quantity ?? 0)
    },
    0,
  )

  // Combined subtotal
  const subtotal = selectedItemsSubtotal + orderItemsSubtotal

  // Total amount including shipping
  const totalAmount = subtotal + (order?.shippingCost || 0)

  const handleProductsSelected = (products: ISuggestion[]) => {
    const productsWithDefaults = products.map((product) => {
      const defaultVariant = product.variants?.[0]
      return {
        ...product,
        quantity: product.quantity ?? 1,
        variant: defaultVariant
          ? {
              originalPrice: defaultVariant.originalPrice,
              discountPrice:
                defaultVariant.discountPrice ?? defaultVariant.originalPrice, // Default to originalPrice if discountPrice is missing
              stock: defaultVariant.stock,
              images: defaultVariant.images,
              color: defaultVariant.color ?? '', // Provide default empty string if undefined
              sku: defaultVariant.sku ?? '', // Provide default empty string if undefined
              _key: defaultVariant._key,
            }
          : undefined,
      }
    })
    setSelectedItems(productsWithDefaults)
    setHasChanges(true)
  }

  const handleVariantSelect = (variant: IVariant, productId: string) => {
    setSelectedItems((prevItems: ISuggestion[]) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, variant: variant } : item,
      ),
    )
    setHasChanges(true)
  }

  const handleQuantityUpdate = (quantity: number, productId: string) => {
    setSelectedItems((prevItems: ISuggestion[]) =>
      prevItems.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      ),
    )
    setHasChanges(true)
  }

  const handleRemoveProduct = (productId: string) => {
    setSelectedItems((prevItems: ISuggestion[]) =>
      prevItems.filter((item) => item._id !== productId),
    )
    setHasChanges(true)
  }

  const handleOrderItemQuantityUpdate = (
    quantity: number,
    variantId: string,
  ) => {
    setOrderItems((prevItems: IOrderItem[]) =>
      prevItems.map((item) =>
        item.variantId === variantId ? { ...item, quantity } : item,
      ),
    )
    setHasChanges(true)
  }

  const handleOrderItemRemove = (variantId: string) => {
    setOrderItems((prevItems: IOrderItem[]) =>
      prevItems.filter((item) => item.variantId !== variantId),
    )
    setHasChanges(true)
  }

  useEffect(() => {
    if (
      order &&
      JSON.stringify(order.items) === JSON.stringify(orderItems) &&
      selectedItems.length === 0
    ) {
      setHasChanges(false)
    }
  }, [orderItems, selectedItems, order])

  const difference = totalAmount - (order?.totalAmount || 0)

  const updateOrderHandler = async () => {
    const updatedItems = [
      ...orderItems.map((item) => ({
        productId: item.productId,
        variantId: item.variantId, // Assumes variantId is always a string in orderItems
        quantity: item.quantity ?? 1, // Default to 1 if undefined
      })),
      ...selectedItems
        .filter((item) => item.variant?._id || item.variants?.[0]?._id) // Filter out items without a valid variantId
        .map((item) => ({
          productId: item._id,
          variantId: item.variant?._id ?? item.variants![0]._id, // Use ! to assert non-null after filter
          quantity: item.quantity ?? 1, // Default to 1 if undefined
        })),
    ]

    const updateData: IUpdateOrderData = {
      orderId,
      items: updatedItems,
      sendNotification,
    }

    const response = await updateOrder(updateData)

    if (response.success) {
      setHasChanges(false)
      setSelectedItems([])
    } else {
      console.error('Failed to update order:')
    }
  }

  if (error)
    return <div className="mx-auto my-10 max-w-6xl">Error loading order</div>

  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="p-5 pb-0 lg:p-0">
        <Link href={`/orders/${orderId}`} className="block w-fit">
          <BiArrowBack className="text-lg" />
        </Link>
        <p className="mt-1 pt-5 font-semibold lg:pt-0">Edit order</p>
        <p className="pt-1 text-sm text-neutral-600">#{orderId}</p>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:gap-x-5">
        <div className="basis-[70%] space-y-5">
          {order?.status === 'shipped' ||
          order?.status === 'delivered' ||
          order?.status === 'cancelled' ||
          order?.status === 'returned' ||
          isLoading ? null : (
            <div className="bg-white px-2 py-4 lg:rounded-lg lg:p-4">
              {/* Add product */}
              <p className="mb-2">Add product</p>
              <SearchProducts
                onProductsSelected={handleProductsSelected}
                selectedItems={selectedItems}
              />
              {selectedItems.length > 0 && (
                <>
                  {selectedItems.map((item) => (
                    <div
                      key={item._id}
                      className="mt-4 rounded-lg border border-neutral-400 p-3"
                    >
                      <div
                        className="flex justify-between gap-x-3"
                        key={item?._id}
                      >
                        <div className="flex gap-x-3">
                          <Image
                            src={item?.image}
                            alt={item?.name}
                            width={60}
                            height={60}
                            className="object-contain"
                          />

                          <div className="space-y-0.5">
                            <p className="font-medium">{item?.name}</p>
                            <p className="text-sm text-neutral-500">
                              {item?.variant?.color || 'No color'}
                            </p>
                            <p className="text-sm text-neutral-500">
                              SKU: {item?.variant?.sku || 'No SKU'}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-x-6">
                          <p className="text-neutral-500">
                            Rs.{' '}
                            {item?.variant?.discountPrice ??
                              item?.variant?.originalPrice ??
                              0}{' '}
                            x {item.quantity}
                          </p>

                          <p className="text-neutral-500">
                            Rs.{' '}
                            {(item?.variant?.discountPrice ??
                              item?.variant?.originalPrice ??
                              0) * (item.quantity ?? 0)}
                          </p>
                        </div>
                      </div>

                      {/* Buttons */}
                      <div className="mx-auto flex w-full items-center justify-center gap-x-4 pt-1 text-sm">
                        <AdjustQuantityButton
                          availableStock={item?.stock || 0}
                          onQuantitySave={(quantity) =>
                            handleQuantityUpdate(quantity, item._id)
                          }
                        />
                        <SelectVariantButton
                          // @ts-expect-error - item.variants is not defined
                          variants={item?.variants || []}
                          onVariantSelect={(variant) =>
                            handleVariantSelect(variant, item._id)
                          }
                        />
                        <button
                          className="text-red-500 underline-offset-4 hover:underline"
                          onClick={() => handleRemoveProduct(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white p-2 lg:rounded-lg lg:p-4">
            {/* Status */}
            <div className="mb-4 flex items-center justify-between">
              {isLoading ? (
                <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200" />
              ) : (
                <p className="w-fit rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs text-orange-600 capitalize">
                  <LuTruck className="mr-1 inline text-sm" />
                  {order?.status}
                </p>
              )}
            </div>
            <div>
              {isLoading ? (
                // Shimmer skeleton items
                Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className="my-2 flex justify-between gap-x-3 px-2 pb-2 lg:px-4"
                      key={`skeleton-${index}`}
                    >
                      <div className="flex gap-x-3">
                        <div className="h-[50px] w-[50px] animate-pulse rounded-md bg-gray-200 lg:h-[60px] lg:w-[60px]" />
                        <div className="space-y-1.5 lg:space-y-2">
                          <div className="h-3 w-32 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-40" />
                          <div className="h-2.5 w-20 animate-pulse rounded bg-gray-200 lg:h-3 lg:w-24" />
                          <div className="h-2.5 w-24 animate-pulse rounded bg-gray-200 lg:h-3 lg:w-32" />
                        </div>
                      </div>
                      <div className="flex items-center gap-x-3 lg:gap-x-6">
                        <div className="h-3 w-16 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />
                        <div className="h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-20" />
                      </div>
                    </div>
                  ))
              ) : (
                <div>
                  {orderItems.map((item) => (
                    <div
                      key={item?.variantId}
                      className="mb-3 rounded-lg border border-neutral-400 p-2 lg:p-3"
                    >
                      <div className="flex justify-between gap-x-3">
                        <div className="flex gap-x-3">
                          <Image
                            src={item?.image || '/placeholder-image.png'}
                            alt={item?.name || 'Product'}
                            width={60}
                            height={60}
                            className="mb-auto object-contain lg:mb-0"
                          />

                          <div className="space-y-0.5">
                            <p className="text-sm font-medium lg:text-base">
                              {item?.name || 'No Name'}
                            </p>
                            <p className="text-xs text-neutral-500 lg:text-sm">
                              {item?.variant || 'No Variant'}
                            </p>
                            <p className="text-xs text-neutral-500 lg:text-sm">
                              SKU: {item?.sku || 'No SKU'}
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
                      {/* Buttons */}
                      {order?.status === 'shipped' ||
                      order?.status === 'delivered' ||
                      order?.status === 'cancelled' ||
                      order?.status === 'returned' ? null : (
                        <div className="mx-auto flex w-full items-center justify-center gap-x-4 pt-2 text-sm">
                          <AdjustQuantityButton
                            // @ts-expect-error - item.stock is not defined
                            availableStock={item?.stock || 0}
                            onQuantitySave={(quantity) =>
                              handleOrderItemQuantityUpdate(
                                quantity,
                                item.variantId,
                              )
                            }
                          />
                          <button
                            className="text-red-500 underline-offset-4 hover:underline"
                            onClick={() =>
                              handleOrderItemRemove(item.variantId)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {order?.status === 'shipped' && (
              <p className="mt-3 text-sm">Shipped orders cannot be edited</p>
            )}

            {order?.status === 'delivered' && (
              <p className="mt-3 text-sm">Delivered orders cannot be edited</p>
            )}

            {order?.status === 'cancelled' && (
              <p className="mt-3 text-sm">Cancelled orders cannot be edited</p>
            )}

            {order?.status === 'returned' && (
              <p className="mt-3 text-sm">Returned orders cannot be edited</p>
            )}
          </div>

          {/* Second Card - Payment Details */}
          <div className="bg-white p-4 lg:rounded-lg">
            {/* Status */}
            {isLoading ? (
              <div className="h-5 w-20 animate-pulse rounded-lg bg-gray-200 lg:h-6 lg:w-24" />
            ) : (
              <p className="w-fit rounded-lg bg-[#e7e7e7] px-2 py-1 text-xs text-orange-600 capitalize">
                Unpaid
              </p>
            )}
            {/* Grid */}
            <div className="mt-4 grid grid-cols-3 gap-x-4 gap-y-3 text-sm lg:text-base">
              {isLoading ? (
                <>
                  {/* Shimmer Row 1 */}
                  <div className="h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
                  <div className="h-3 w-16 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-20" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

                  {/* Shimmer Row 2 */}
                  <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

                  {/* Shimmer Row 3 */}
                  <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />
                </>
              ) : (
                <>
                  {/* Row 1 */}
                  <p>Subtotal</p>
                  <p>
                    {orderItems.reduce(
                      (total, item) => total + (item?.quantity ?? 0),
                      0,
                    ) +
                      selectedItems.reduce(
                        (total, item) => total + (item.quantity ?? 1),
                        0,
                      )}{' '}
                    {orderItems.length + selectedItems.length === 1
                      ? 'item'
                      : 'items'}
                  </p>
                  <p>Rs. {subtotal}</p>

                  {/* Row 2 */}
                  <p className="col-span-2">Shipping</p>
                  <p>Rs. {order?.shippingCost || 0}</p>

                  {/* Row 3 */}
                  <p className="col-span-2">Total</p>
                  <p>Rs. {totalAmount}</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="basis-[30%] rounded-lg bg-white p-4">
          {isLoading ? (
            <>
              {/* Shimmer header */}
              <div className="h-5 w-20 animate-pulse rounded bg-gray-200 lg:h-6 lg:w-24" />

              {/* Shimmer content */}
              <div className="my-3 h-4 w-32 animate-pulse rounded bg-gray-200 lg:my-4 lg:h-5 lg:w-36" />
              <div className="grid grid-cols-2 gap-y-1.5 lg:gap-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-28" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-24" />
                <div className="h-4 w-20 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-24" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-20" />
                <div className="h-4 w-16 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-20" />
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-28" />
              </div>

              {/* Shimmer button */}
              <div className="mt-3 h-9 w-full animate-pulse rounded bg-gray-200 lg:mt-4 lg:h-10" />
            </>
          ) : (
            <>
              <p className="font-semibold">Summary</p>
              {hasChanges ? (
                <div className="text-sm lg:text-base">
                  <p className="my-4">Update total amount</p>
                  <div className="grid grid-cols-2 gap-y-2">
                    <p>Previous amount:</p>
                    <p>Rs. {order?.totalAmount}</p>
                    <p>Difference:</p>
                    <p>
                      {difference >= 0 ? '+ ' : ''}
                      {difference}
                    </p>
                    <p>New total:</p>
                    <p className="font-semibold">Rs. {totalAmount}</p>
                  </div>
                </div>
              ) : (
                <p className="my-3 text-sm text-neutral-600 lg:text-base">
                  No changes have been made
                </p>
              )}
              <div className="mt-3 flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sendNotification"
                  checked={sendNotification}
                  onChange={(e) => setSendNotification(e.target.checked)}
                />
                <label htmlFor="sendNotification">
                  Send notification to customer
                </label>
              </div>
              <EditOrderUpdateButton
                className={`w-full ${
                  !hasChanges ||
                  order?.status === 'shipped' ||
                  order?.status === 'delivered' ||
                  order?.status === 'cancelled' ||
                  order?.status === 'returned'
                    ? 'pointer-events-none cursor-not-allowed opacity-50'
                    : ''
                }`}
                onClick={updateOrderHandler}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
