'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState } from 'react'
import { useRouter } from 'next/navigation'
import WebContainer from '@/components/web/shared/WebContainer'
import { Form } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import PrimaryButton from '@/components/common/PrimaryButton'
import OrderSummary from '@/components/web/checkout/OrderSummary'
import {
  checkoutFormSchema,
  type CheckoutFormValues,
  type PaymentMethod,
} from '@/schemas/checkout-form.schema'
import { useCartStore } from '@/stores/useCartStore'
import { Textarea } from '@/components/ui/textarea'

export default function CheckoutPage() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  const { items, clearCart } = useCartStore()

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: '',
      phoneNumber: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      zipCode: undefined,
      paymentMethod: 'cash_on_delivery',
      notes: '',
    },
  })

  const onSubmit = (data: CheckoutFormValues) => {
    startTransition(async () => {
      try {
        // Log the order data
        console.log('Placing order:', {
          customerInfo: data,
          items,
          orderDate: '2025-05-12',
          orderNumber: `ORD-12345`,
        })

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Clear cart and show success message
        clearCart()
        setNotification({
          type: 'success',
          message: 'Order placed successfully!',
        })
        router.push('/order-confirmation')
      } catch (error) {
        console.error('Checkout error:', error)
        setNotification({
          type: 'error',
          message:
            error instanceof Error ? error.message : 'Failed to place order',
        })
      }
    })
  }

  return (
    <WebContainer className="py-2 lg:py-8">
      <h1 className="my-8 text-2xl font-bold md:text-3xl">Checkout</h1>

      {notification && (
        <div
          className={`mb-4 rounded-md p-4 ${
            notification.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex flex-col gap-2 lg:flex-row lg:gap-8">
        {/* Left side - Form */}
        <div className="basis-3/5 space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="Enter your email address"
                    className="text-sm md:text-base"
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className="text-sm md:text-base"
                    {...form.register('phoneNumber')}
                  />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      className="text-sm md:text-base"
                      {...form.register('firstName')}
                    />
                    {form.formState.errors.firstName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      className="text-sm md:text-base"
                      {...form.register('lastName')}
                    />
                    {form.formState.errors.lastName && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Enter your address"
                    className="text-sm md:text-base"
                    {...form.register('address')}
                  />
                  {form.formState.errors.address && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.address.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      placeholder="Enter your city"
                      className="text-sm md:text-base"
                      {...form.register('city')}
                    />
                    {form.formState.errors.city && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.city.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      placeholder="Enter area ZIP code"
                      className="text-sm md:text-base"
                      {...form.register('zipCode')}
                    />
                    {form.formState.errors.zipCode && (
                      <p className="text-sm text-red-500">
                        {form.formState.errors.zipCode.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Payment Method</h2>
                <RadioGroup
                  onValueChange={(value) =>
                    form.setValue('paymentMethod', value as PaymentMethod)
                  }
                  value={form.watch('paymentMethod')}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="cash_on_delivery"
                      id="cash_on_delivery"
                    />
                    <Label htmlFor="cash_on_delivery">Cash on Delivery</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank_transfer" id="bank_transfer" />
                    <Label htmlFor="bank_transfer">Bank Transfer</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.paymentMethod && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.paymentMethod.message}
                  </p>
                )}
              </div>

              {/* Additional Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">
                  Additional Information
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any special instructions or notes for your order (e.g., delivery instructions, preferred delivery time)."
                    className="text-sm md:text-base"
                    {...form.register('notes')}
                  />
                  {form.formState.errors.notes && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.notes.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Place Order Button - Hidden on mobile, shown in form on desktop */}
              <div className="hidden lg:block">
                <PrimaryButton type="submit" fullWidth disabled={isPending}>
                  {isPending ? 'Placing Order...' : 'Place Order'}
                </PrimaryButton>
              </div>
            </form>
          </Form>
        </div>

        {/* Right side - Order Summary */}
        <div className="lg:sticky lg:top-20 lg:basis-2/5 lg:self-start">
          <OrderSummary />
        </div>
      </div>

      {/* Place Order Button - At bottom on mobile only */}
      <div className="mt-2 lg:hidden">
        <PrimaryButton
          type="submit"
          fullWidth
          disabled={isPending}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isPending ? 'Placing Order...' : 'Place Order'}
        </PrimaryButton>
      </div>
    </WebContainer>
  )
}
