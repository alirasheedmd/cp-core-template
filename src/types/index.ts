export interface IProductSlug {
  current: string
  _type: string
}

export interface ICategory {
  _id: string
  name: string
  slug: IProductSlug
  subcategories?: ICategory[]
}

export interface IVariant {
  _key: string
  color: string
  sku: string
  originalPrice: number
  discountPrice: number
  stock: number
  images: string[]
}

export interface IAdditionalDetailChild {
  _key: string
  _type: string
  text: string
  marks: string[]
}

export interface IAdditionalDetail {
  _type: string
  style: string
  children: IAdditionalDetailChild[]
}

export interface IReview {
  _id: string
  rating: number
  comment: string
  createdAt: string
  user: string
}

export interface IProduct {
  _id: string
  name: string
  slug: IProductSlug
  images: string[]
  category: ICategory
  description: string
  variants: IVariant[]
  rating: number
  additionalDetails: IAdditionalDetail[]
  reviews: IReview[]
  overallRating: number
  createdAt: string
  status: string
}

export interface IOrderItem {
  productId: string
  variantId: string
  name: string
  variant: string
  sku: string
  price: number
  quantity: number
  image: string
}

export interface IOrderAddress {
  apartment: string
  street: string
  city: string
  postalCode: string
}

export interface IOrderCustomer {
  fullName: string
  email: string
  phoneNumber: string
  address: IOrderAddress
}

export interface ICustomerDetails {
  fullName: string
  email: string
  phoneNumber: string
  address: IOrderAddress
}

export interface IOrder {
  orderId: string
  createdAt: string
  status:
    | 'pending'
    | 'confirmed'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'returned'
  paymentMethod: 'CASH_ON_DELIVERY' | 'ONLINE_PAYMENT'
  totalAmount: number
  shippingCost: number
  customerDetails: IOrderCustomer
  items: IOrderItem[]
}
