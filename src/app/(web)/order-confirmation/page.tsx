import WebContainer from '@/components/web/shared/WebContainer'
import ConfirmationHeader from '@/components/web/orderConfirmation/ConfirmationHeader'
import PaymentInstructions from '@/components/web/orderConfirmation/PaymentInstructions'
import OrderDetails from '@/components/web/orderConfirmation/OrderDetails'
import OrderSummary from '@/components/web/orderConfirmation/OrderSummary'
import OrderConfirmationButtons from '@/components/web/orderConfirmation/OrderConfirmationButtons'

const bankDetails = {
  bankName: 'Al-Rajhi Bank',
  accountName: 'شركة روكة الجزيرة للأشرطة ومعدات السلامة',
  accountNumber: '487 6080 1112 1128',
  iban: 'SA62 8000 0487 6080 1112 1128',
  swift: 'RJHISARIXXX',
  note: 'Please include your order number in the payment reference to ensure your order is processed quickly.',
}

const dummyOrder = {
  orderNumber: 'G218TR8MK',
  items: [
    {
      id: '1',
      name: 'Black-Yellow Arrow Caution Tape',
      price: 27.95,
      quantity: 1,
      image: '/placeholder-product.jpg',
    },
  ],
  shippingAddress: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'customer@email.com',
    phoneNumber: '+1234567890',
    secondaryNumber: '+0987654321',
    house: '123',
    unitNumber: '4B',
    street: 'Example Street',
    shortAddress: 'Near City Mall',
    district: 'Downtown',
    province: 'Central',
    city: 'City',
    country: 'Country',
    postalCode: '00000',
  },
  paymentMethod: 'bank_transfer' as const,
  notes: 'Please deliver in the morning',
  subtotal: 27.95,
  shippingFee: 24.93,
  total: 52.88,
  estimatedDelivery: 'Aramex Express (2-3 Days)',
}

export default function OrderConfirmationPage() {
  return (
    <WebContainer className="py-8">
      <div className="mx-auto flex flex-col gap-2 lg:flex-row lg:gap-8">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          <ConfirmationHeader
            firstName={dummyOrder.shippingAddress.firstName}
            lastName={dummyOrder.shippingAddress.lastName}
            orderNumber={dummyOrder.orderNumber}
          />

          <PaymentInstructions bankDetails={bankDetails} />

          <OrderDetails
            shippingAddress={dummyOrder.shippingAddress}
            paymentMethod={dummyOrder.paymentMethod}
            notes={dummyOrder.notes}
            estimatedDelivery={dummyOrder.estimatedDelivery}
          />

          {/* Buttons for large screen */}
          <OrderConfirmationButtons className="hidden lg:flex lg:flex-row lg:justify-between" />
        </div>

        {/* Right Column */}
        <OrderSummary
          items={dummyOrder.items}
          subtotal={dummyOrder.subtotal}
          shippingFee={dummyOrder.shippingFee}
          total={dummyOrder.total}
        />

        {/* Buttons for mobile screen */}
        <OrderConfirmationButtons className="mt-3 lg:hidden" />
      </div>
    </WebContainer>
  )
}
