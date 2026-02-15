'use client'
// React and hooks
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
// Next.js components
import Link from 'next/link'
// Components
import SearchProducts from '@/components/admin/orders/editOrder/SearchProducts'
import OrderProductList from '@/components/admin/orders/editOrder/OrderProductList'
import OrderItemsList from '@/components/admin/orders/editOrder/OrderItemsList'
import OrderSummary from '@/components/admin/orders/editOrder/OrderSummary'
import OrderPaymentDetails from '@/components/admin/orders/editOrder/OrderPaymentDetails'
import LoadingSkeletons from '@/components/admin/orders/editOrder/LoadingSkeletons'
// Icons
import { BiArrowBack } from 'react-icons/bi'
import { LuTruck } from 'react-icons/lu'
// Types and interfaces
import { IOrder, IOrderItem } from '@/types'
import { ISuggestion } from '@/components/admin/orders/editOrder/SearchProducts'
import { dummyOrders } from '@/data/dummyOrders'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import RefundReason from '@/components/admin/orders/editOrder/RefundReason'
import { routes } from '@/config/routes'

interface IUpdateOrderData {
  orderId: string
  items: Array<{
    productId: string
    quantity: number
  }>
  sendNotification: boolean
}

// Mock functions for now - will be replaced with server actions later
const fetchOrder = async (orderId: string): Promise<IOrder> => {
  const order = dummyOrders.find((order) => order.orderId === orderId)
  if (!order) throw new Error('Order not found')
  return order
}

const updateOrder = async (data: IUpdateOrderData) => {
  // Mock implementation - will be replaced with server action
  console.log('Updating order:', data)
  return { success: true }
}

export default function EditOrderPage() {
  const pathname = usePathname()
  const orderId = pathname.split('/')[3]
  const [order, setOrder] = useState<IOrder | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [selectedItems, setSelectedItems] = useState<ISuggestion[]>([])
  const [orderItems, setOrderItems] = useState<IOrderItem[]>([])
  const [sendNotification, setSendNotification] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const [reasonForRefund, setReasonForRefund] = useState('')

  useEffect(() => {
    const loadOrder = async () => {
      try {
        setIsLoading(true)
        const data = await fetchOrder(orderId)
        setOrder(data)
        // Map OrderItem to IOrderItem
        const mappedItems: IOrderItem[] = data.orderItems.map((item) => ({
          productId: item.productId,
          name: item.name,
          sku: '', // Not available in OrderItem schema
          price: Number(item.price),
          quantity: item.quantity,
          image: item.image,
          stock: 0, // Not available in OrderItem schema
        }))
        setOrderItems(mappedItems)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  // Calculate subtotal for selected items
  const selectedItemsSubtotal = selectedItems.reduce(
    (total: number, item: ISuggestion) => {
      const price = item.price ?? 0
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
  const totalAmount = subtotal + (Number(order?.shippingPrice) || 0)

  const handleProductsSelected = (products: ISuggestion[]) => {
    const productsWithDefaults = products.map((product) => {
      return {
        ...product,
        quantity: product.quantity ?? 1,
      }
    })
    setSelectedItems(productsWithDefaults)
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
    productId: string,
  ) => {
    setOrderItems((prevItems: IOrderItem[]) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item,
      ),
    )
    setHasChanges(true)
  }

  const handleOrderItemRemove = (productId: string) => {
    setOrderItems((prevItems: IOrderItem[]) =>
      prevItems.filter((item) => item.productId !== productId),
    )
    setHasChanges(true)
  }

  useEffect(() => {
    if (
      order &&
      JSON.stringify(order.orderItems) === JSON.stringify(orderItems) &&
      selectedItems.length === 0
    ) {
      setHasChanges(false)
    }
  }, [orderItems, selectedItems, order])

  const difference = totalAmount - (Number(order?.totalPrice) || 0)

  const updateOrderHandler = async () => {
    const updatedItems = [
      ...orderItems.map((item) => ({
        productId: item.productId,
        quantity: item.quantity ?? 1,
      })),
      ...selectedItems
        .filter((item) => item.sku)
        .map((item) => ({
          productId: item._id,
          sku: item.sku,
          quantity: item.quantity ?? 1,
        })),
    ]

    const updateData: IUpdateOrderData = {
      orderId,
      items: updatedItems,
      sendNotification,
    }

    console.log('Updating order with data:', {
      ...updateData,
      reasonForRefund,
      totalAmount,
      difference,
    })

    const response = await updateOrder(updateData)

    if (response.success) {
      setHasChanges(false)
      setSelectedItems([])
    } else {
      console.error('Failed to update order:')
    }
  }

  // Update status checks to match IOrder type
  const isOrderEditable = Boolean(
    order?.status && ['pending', 'confirmed'].includes(order.status),
  )

  if (error)
    return <div className="mx-auto my-10 max-w-6xl">Error loading order</div>

  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="p-5 pb-0 lg:p-0">
        <Link href={routes.admin.orderDetails(orderId)} className="block w-fit">
          <BiArrowBack className="text-lg" />
        </Link>
        <p className="mt-1 pt-5 font-semibold lg:pt-0">Edit order</p>
        <p className="pt-1 text-sm text-neutral-600">#{orderId}</p>
      </div>

      <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:gap-x-5">
        <div className="basis-[70%] space-y-5">
          {!isOrderEditable || isLoading ? null : (
            <AdminContainer>
              {/* Add product */}
              <p className="mb-2">Add product</p>
              <SearchProducts
                onProductsSelected={handleProductsSelected}
                selectedItems={selectedItems}
              />
              <OrderProductList
                selectedItems={selectedItems}
                onQuantityUpdate={handleQuantityUpdate}
                onRemoveProduct={handleRemoveProduct}
              />
            </AdminContainer>
          )}

          {/* Order Items */}
          <AdminContainer>
            {/* Status */}
            <div className="mb-4 flex items-center justify-between">
              {isLoading ? (
                <div className="h-6 w-24 animate-pulse rounded-lg bg-gray-200" />
              ) : (
                <p className="bg-LightGrey text-Orange w-fit rounded-lg px-2 py-1 text-xs capitalize">
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
                    <LoadingSkeletons
                      key={`skeleton-${index}`}
                      type="product"
                    />
                  ))
              ) : (
                <OrderItemsList
                  orderItems={orderItems}
                  isOrderEditable={isOrderEditable}
                  onQuantityUpdate={handleOrderItemQuantityUpdate}
                  onRemoveItem={handleOrderItemRemove}
                />
              )}
            </div>

            {!isOrderEditable && (
              <p className="mt-3 text-sm">
                {order?.status === 'shipped' &&
                  'Shipped orders cannot be edited'}
                {order?.status === 'delivered' &&
                  'Delivered orders cannot be edited'}
                {order?.status === 'cancelled' &&
                  'Cancelled orders cannot be edited'}
              </p>
            )}
          </AdminContainer>

          {/* Payment Details */}
          <OrderPaymentDetails
            orderItems={orderItems}
            selectedItems={selectedItems}
            subtotal={subtotal}
            totalAmount={totalAmount}
            isLoading={isLoading}
            order={order}
          />

          {/* Refund */}
          <RefundReason
            reasonForRefund={reasonForRefund}
            setReasonForRefund={setReasonForRefund}
          />
        </div>

        {/* Summary */}
        {isLoading ? (
          <div className="basis-[30%] rounded-lg bg-white p-4">
            <LoadingSkeletons type="summary" />
          </div>
        ) : (
          <OrderSummary
            order={order}
            hasChanges={hasChanges}
            totalAmount={totalAmount}
            difference={difference}
            sendNotification={sendNotification}
            setSendNotification={setSendNotification}
            updateOrderHandler={updateOrderHandler}
            isOrderEditable={isOrderEditable}
          />
        )}
      </div>
    </div>
  )
}
