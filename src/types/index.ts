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
