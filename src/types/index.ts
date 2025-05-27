import { cartItemSchema } from '@/schemas/cart.schema'
import { z } from 'zod'

export interface IProductSlug {
  current: string
  _type: string
}

export interface ICategory {
  id: string
  name: string
  slug: string
  parentId?: string
  status: string
  images: string[]
  productCount?: number
  subcategoryCount?: number
  updatedAt: Date
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
  id: string
  title: string
  slug: string
  images: string[]
  categories: string[]
  description: string
  sku: string
  price: string
  // discountPrice?: number
  currentStock: string
  // rating: number
  // additionalDetails: IAdditionalDetail[]
  // reviews: IReview[]
  // overallRating: number
  createdAt: Date
  updatedAt: Date
  status: string
}

export interface IOrderItem {
  productId: string
  name: string
  sku: string
  price: number
  quantity: number
  image: string
  stock: number
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
  id: string
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  buildingNo: string
  street: string
  district: string
  city: string
  province: string
  postalCode: string
  secondaryNumber: string
  shortAddress: string
  unitNumber: string
  country: string
  ordersCount?: number
  totalAmount?: number
  paymentMethod: string
  isPromotionalEmailFlag: boolean
  isVerified: boolean
  lastLoginAt: Date
  createdAt: Date
  updatedAt: Date
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

/////////// Web Interfaces ///////////
export interface IWebProduct {
  id: string
  title: string
  description: string | null
  categories: string[]
  price: string
  image: string | null
  slug?: string
  shippingPrice: string
  tax: string
}

export interface IWebCategory {
  id: string
  name: string
  slug: string
  images: string[]
  parentId: string
  status: string
}

//CART
export type CartItem = z.infer<typeof cartItemSchema>
