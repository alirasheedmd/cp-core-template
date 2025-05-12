'use server'

import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { ilike, or, isNull, not } from 'drizzle-orm/sql'
import { cache } from 'react'
import {
  users,
  products,
  images,
  productCategories,
  categories,
} from '@/db/schema'
import { CustomerInfoFormValues } from '@/components/web/customer/CustomerInfo'
import { orders } from '@/db/schema/orders'
// import { unstable_cacheTag as cacheTag } from 'next/cache'

// Current user
export const getCurrentUser = cache(async () => {
  const session = await getSession()
  if (!session) return null

  // Skip database query during prerendering if we don't have a session
  // hack until we have PPR https://nextjs.org/docs/app/building-your-application/rendering/partial-prerendering
  if (
    typeof window === 'undefined' &&
    process.env.NEXT_PHASE === 'phase-production-build'
  ) {
    return null
  }

  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.userId),
    })

    return result || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email),
    })
    return result || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
})

// Get user by ID (non-cached version for use in middleware and server actions)
export async function getUserById(userId: string) {
  try {
    const result = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, userId),
    })
    return result || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
}

// Create a new admin user
export async function createAdminUser(data: {
  id: string
  email: string
  password: string
}) {
  try {
    const adminData = {
      ...data,
      isAdmin: true, // Set isAdmin flag to true for admin users
    }

    const result = await db.insert(users).values(adminData).returning()
    return result[0] || null
  } catch (error) {
    console.error('Error creating admin user:', error)
    return null
  }
}

export async function getAllProducts() {
  // Get all products first
  const productsData = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      slug: products.slug,
    })
    .from(products)

  // Get all images
  const imagesData = await db
    .select({ src: images.src, productId: images.productId })
    .from(images)
    .where(not(isNull(images.productId)))

  // Map products and add their images as arrays
  const result = await Promise.all(
    productsData.map(async (data) => {
      const product = data

      const productCategories = await getProductCategories(product.id)

      const categories = productCategories.map((c) => c.name)

      // Find all images for this product
      const productImages = imagesData.filter(
        (img) => img.productId === product.id,
      )

      // Return the product with images as an array
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        categories: categories,
        price: product.price,
        image: productImages.length > 0 ? productImages[0].src : null,
        slug: product.slug,
      }
    }),
  )

  return result
}

interface SlugID {
  slug: string
  id: string
}

export async function getProductsByCategory(categorySlug: string) {
  const category = await db
    .select({ slug: categories.slug, id: categories.id })
    .from(categories)
    .where(eq(categories.slug, categorySlug))
  const categoryOne: SlugID = category[0]

  const productsData = await db
    .select({
      id: products.id,
      title: products.title,
      description: products.description,
      price: products.price,
      category: categories.slug,
      slug: products.slug,
    })
    .from(products)
    .innerJoin(productCategories, eq(productCategories.productId, products.id))
    .innerJoin(categories, eq(productCategories.categoryId, categories.id))
    .where(eq(categories.id, categoryOne.id))

  // Get all images
  const imagesData = await db
    .select({ src: images.src, productId: images.productId })
    .from(images)
    .where(not(isNull(images.productId)))

  // Map products and add their images as arrays
  const result = await Promise.all(
    productsData.map(async (data) => {
      const product = data

      const productCategories = await getProductCategories(product.id)

      const categories = productCategories.map((c) => c.name)

      // Find all images for this product
      const productImages = imagesData.filter(
        (img) => img.productId === product.id,
      )

      // Return the product with images as an array
      return {
        id: product.id,
        title: product.title,
        description: product.description,
        categories: categories,
        price: product.price,
        image: productImages.length > 0 ? productImages[0].src : null,
        slug: product.slug,
      }
    }),
  )

  return result
}

export async function getProductCategories(productId: string) {
  const categoriesData = await db
    .select({
      id: categories.id,
      name: categories.name,
      productID: products.id,
    })
    .from(categories)
    .innerJoin(
      productCategories,
      eq(categories.id, productCategories.categoryId),
    )
    .innerJoin(products, eq(productCategories.productId, products.id))
    .where(eq(products.id, productId))

  return categoriesData
}

export async function getAllCategories() {
  // Get all categories first
  const categoriesData = await db.select().from(categories)

  // Get all images
  const imagesData = await db
    .select({ src: images.src, categoryId: images.categoryId })
    .from(images)
    .where(not(isNull(images.categoryId)))

  // Map categories and add their images as arrays
  const result = categoriesData.map((category) => {
    // Find all images for this category
    const categoryImages = imagesData.filter(
      (img) => img.categoryId === category.id,
    )

    // Return the category with images as an array
    return {
      id: category.id,
      name: category.name,
      image: categoryImages.length > 0 ? categoryImages[0].src : null,
      slug: category.slug,
    }
  })

  return result
}

export async function getOneCategory(categorySlug: string) {
  const category = await db.query.categories.findFirst({
    where: (categories, { eq }) => eq(categories.slug, categorySlug),
  })

  return category
}

export async function getOneProduct(productSlug: string) {
  const product = await db.query.products.findFirst({
    where: (products, { eq }) => eq(products.slug, productSlug),
  })

  if (!product) return null

  // Get all images for this product
  const productImages = await db
    .select({ src: images.src })
    .from(images)
    .where(eq(images.productId, product.id))

  return {
    ...product,
    images: productImages.map((img) => img.src),
  }
}

export async function getProductSearchResults(searchText: string) {
  const filteredProducts = await db
    .select({ title: products.title, slug: products.slug })
    .from(products)
    .where(
      or(
        ilike(products.title, `%${searchText}%`),
        ilike(products.description, `%${searchText}%`),
        ilike(products.pageTitle, `%${searchText}%`),
        ilike(products.collection, `%${searchText}%`),
        ilike(products.type, `%${searchText}%`),
        ilike(products.metaDescription, `%${searchText}%`),
        ilike(products.barcode, `%${searchText}%`),
        ilike(products.country, `%${searchText}%`),
        ilike(products.sku, `%${searchText}%`),
        ilike(products.hsCode, `%${searchText}%`),
        ilike(products.tag, `%${searchText}%`),
        ilike(products.organization, `%${searchText}%`),
      ),
    )
  console.log('Filtered products:', filteredProducts)

  return filteredProducts
}

export async function getCustomerProfileInfo(userId: string) {
  const user = await db
    .select({
      firstName: users.firstName,
      lastName: users.lastName,
      phoneNumber: users.phoneNumber,
      buildingNo: users.buildingNo,
      street: users.street,
      district: users.district,
      city: users.city,
      province: users.province,
      postalCode: users.postalCode,
      secondaryNumber: users.secondaryNumber,
      shortAddress: users.shortAddress,
      unitNumber: users.unitNumber,
      country: users.country,
    })
    .from(users)
    .where(eq(users.id, userId))

  return user
}

export async function updateUserInfo(data: CustomerInfoFormValues) {
  const user = await getCurrentUser()
  if (!user) return

  const result = await db
    .update(users)
    .set({ ...data })
    .where(eq(users.id, user.id))
    .returning()

  return result[0]
}

export async function deleteUserInfo() {
  const user = await getCurrentUser()
  if (!user) return

  const result = await db
    .update(users)
    .set({
      phoneNumber: null,
      buildingNo: null,
      street: null,
      district: null,
      city: null,
      province: null,
      postalCode: null,
      secondaryNumber: null,
      unitNumber: null,
      country: null,
    })
    .where(eq(users.id, user.id))
    .returning()

  return result[0]
}

export async function createOrder(data: any) {
  const user = await getCurrentUser()
  if (!user) return

  const order = await db
    .insert(orders)
    .values({
      userId: user.id,
      ...data,
    })
    .returning()

  return order[0]
}
