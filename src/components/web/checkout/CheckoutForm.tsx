'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition, useState, useEffect } from 'react'
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
  PaymentMethodEnum,
  type CheckoutFormValues,
  type PaymentMethod,
} from '@/schemas/checkout-form.schema'
// import { useCartStore } from '@/stores/useCartStore'
import { Textarea } from '@/components/ui/textarea'
import { routes } from '@/config/routes'
import { clearCart, createOrder } from '@/lib/dal'
import { Cart, User } from '@/db/schema'
import { CartItem } from '@/types'

const STORAGE_KEY = 'checkout-form-data'

interface CheckoutFormProps {
  user?: User
  cart: Cart
}

export default function CheckoutFormPage(props: CheckoutFormProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)
  // const { items, clearCart } = useCartStore()
  const { user, cart } = props
  const items = cart.items as CartItem[]
  if (!user) {
    console.log('user not found ........', user)
  }

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: user?.email ? user.email : '',
      phoneNumber: user?.phoneNumber ? user.phoneNumber : '',
      firstName: user?.firstName ? user.firstName : '',
      lastName: user?.lastName ? user.lastName : '',
      city: user?.city ? user.city : '',
      house: user?.buildingNo ? user.buildingNo : '',
      street: user?.street ? user.street : '',
      district: user?.district ? user.district : '',
      province: user?.province ? user.province : '',
      country: user?.country ? user.country : '',
      shortAddress: user?.shortAddress ? user.shortAddress : '',
      postalCode: user?.phoneNumber ? user.phoneNumber : '',
      secondaryNumber: user?.secondaryNumber ? user.secondaryNumber : '',
      paymentMethod: user?.paymentMethod
        ? (user.paymentMethod as PaymentMethodEnum)
        : 'cash_on_delivery',
      notes: '',
    },
  })

  const { reset, watch } = form
  // Load from localStorage
  useEffect(() => {
    if (!user) {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          reset(parsed)
        } catch (err) {
          console.error('Failed to parse saved data:', err)
        }
      }
    }
  }, [reset, user])

  // Watch and persist to localStorage
  const watchedValues = watch()
  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues))
    }, 300) // debounce save
    return () => clearTimeout(timeout)
  }, [watchedValues])

  const onSubmit = (data: CheckoutFormValues) => {
    startTransition(async () => {
      const fullName = `${data.firstName} ${data.lastName}`
      try {
        await createOrder(data, fullName)
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
        localStorage.removeItem(STORAGE_KEY)
        router.push(routes.orderConfirmation)
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
              <h2 className="mb-6 text-xl font-semibold">
                Contact Information
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    className={`text-sm md:text-base ${form.formState.errors.firstName ? 'border-destructive' : ''}`}
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
                    className={`text-sm md:text-base ${form.formState.errors.lastName ? 'border-destructive' : ''}`}
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email address"
                  className={`text-sm md:text-base ${form.formState.errors.email ? 'border-destructive' : ''}`}
                  {...form.register('email')}
                />
                {form.formState.errors.email && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    className={`text-sm md:text-base ${form.formState.errors.phoneNumber ? 'border-destructive' : ''}`}
                    {...form.register('phoneNumber')}
                  />
                  {form.formState.errors.phoneNumber && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.phoneNumber.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondaryNumber">
                    Secondary Number
                    <span className="text-DarkGrey mx-0.5">(Optional)</span>
                  </Label>
                  <Input
                    id="secondaryNumber"
                    placeholder="Enter your secondary number (optional)"
                    className="text-sm md:text-base"
                    {...form.register('secondaryNumber')}
                  />
                  {form.formState.errors.secondaryNumber && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.secondaryNumber.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Shipping Information */}
              <h2 className="mb-6 text-xl font-semibold">
                Shipping Information
              </h2>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="house">Building No. / House No</Label>
                  <Input
                    id="house"
                    placeholder="Enter your house number"
                    className={`text-sm md:text-base ${form.formState.errors.house ? 'border-destructive' : ''}`}
                    {...form.register('house')}
                  />
                  {form.formState.errors.house && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.house.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unitNumber">
                    Unit No.
                    <span className="text-DarkGrey mx-0.5">(Optional)</span>
                  </Label>
                  <Input
                    id="unitNumber"
                    placeholder="Enter your unit number (optional)"
                    className="text-sm md:text-base"
                    {...form.register('unitNumber')}
                  />
                  {form.formState.errors.unitNumber && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.unitNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  placeholder="Enter your street name"
                  className={`text-sm md:text-base ${form.formState.errors.street ? 'border-destructive' : ''}`}
                  {...form.register('street')}
                />
                {form.formState.errors.street && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.street.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortAddress">
                  Short Address
                  <span className="text-DarkGrey mx-0.5">(Optional)</span>
                </Label>
                <Input
                  id="shortAddress"
                  placeholder="Enter short address (optional)"
                  className="text-sm md:text-base"
                  {...form.register('shortAddress')}
                />
                {form.formState.errors.shortAddress && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.shortAddress.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="district">District</Label>
                  <Input
                    id="district"
                    placeholder="Enter your district"
                    className={`text-sm md:text-base ${form.formState.errors.district ? 'border-destructive' : ''}`}
                    {...form.register('district')}
                  />
                  {form.formState.errors.district && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.district.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Input
                    id="province"
                    placeholder="Enter your province"
                    className={`text-sm md:text-base ${form.formState.errors.province ? 'border-destructive' : ''}`}
                    {...form.register('province')}
                  />
                  {form.formState.errors.province && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.province.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    placeholder="Enter area postal code"
                    className={`text-sm md:text-base ${form.formState.errors.postalCode ? 'border-destructive' : ''}`}
                    {...form.register('postalCode')}
                  />
                  {form.formState.errors.postalCode && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.postalCode.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    className={`text-sm md:text-base ${form.formState.errors.city ? 'border-destructive' : ''}`}
                    {...form.register('city')}
                  />
                  {form.formState.errors.city && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  placeholder="Enter your country"
                  className={`text-sm md:text-base ${form.formState.errors.country ? 'border-destructive' : ''}`}
                  {...form.register('country')}
                />
                {form.formState.errors.country && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.country.message}
                  </p>
                )}
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
                  {form.watch('paymentMethod') === 'bank_transfer' && (
                    <div className="mt-2 ml-6 space-y-2 text-sm text-gray-600">
                      <p>
                        Choose this method if you prefer to make a direct bank
                        deposit.
                      </p>
                      <p>
                        Please follow the instructions after placing your order.
                      </p>
                      <p>
                        Your order will be cancelled if the payment isn&apos;t
                        received within 3 days of your order.
                      </p>
                    </div>
                  )}
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
                  <Label htmlFor="notes">
                    Order Notes
                    <span className="text-DarkGrey mx-0.5">(Optional)</span>
                  </Label>
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
        <div className="lg:sticky lg:top-22 lg:basis-2/5 lg:self-start">
          <OrderSummary cart={cart as Cart} />
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
