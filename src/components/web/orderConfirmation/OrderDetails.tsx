interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  secondaryNumber?: string
  house: string
  unitNumber?: string
  street: string
  shortAddress?: string
  district: string
  province: string
  city: string
  country: string
  postalCode: string
}

interface OrderDetailsProps {
  shippingAddress: ShippingAddress
  paymentMethod: 'bank_transfer' | 'cash_on_delivery'
  notes?: string
  estimatedDelivery: string
}

export default function OrderDetails({
  shippingAddress,
  paymentMethod,
  notes,
  estimatedDelivery,
}: OrderDetailsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-md border bg-white p-4 md:grid-cols-2">
      <div>
        <div className="mb-1 font-semibold">Contact information</div>
        <div>{shippingAddress.email}</div>
        <div className="mt-4 mb-1 font-semibold">Shipping address</div>
        <div>
          {shippingAddress.firstName} {shippingAddress.lastName}
          <br />
          {shippingAddress.house}
          {shippingAddress.unitNumber && `, Unit ${shippingAddress.unitNumber}`}
          <br />
          {shippingAddress.street}
          {shippingAddress.shortAddress && (
            <>
              <br />
              {shippingAddress.shortAddress}
            </>
          )}
          <br />
          {shippingAddress.district}
          <br />
          {shippingAddress.province}
          <br />
          {shippingAddress.city}, {shippingAddress.postalCode}
          <br />
          {shippingAddress.country}
          <br />
          {shippingAddress.phoneNumber}
          {shippingAddress.secondaryNumber && (
            <>
              <br />
              Secondary: {shippingAddress.secondaryNumber}
            </>
          )}
        </div>
      </div>
      <div>
        <div className="mb-1 font-semibold">Payment method</div>
        <div>
          {paymentMethod === 'bank_transfer'
            ? 'Bank Transfer'
            : 'Cash on Delivery'}
        </div>
        {notes && (
          <>
            <div className="mt-4 mb-1 font-semibold">Order Notes</div>
            <div>{notes}</div>
          </>
        )}
        <div className="mt-4 mb-1 font-semibold">Shipping method</div>
        <div>{estimatedDelivery}</div>
      </div>
    </div>
  )
}
