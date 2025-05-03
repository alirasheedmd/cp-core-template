'use server'

import { db } from '@/db'
import { getSession } from './auth'
import { eq, sql, inArray } from 'drizzle-orm'
import { cache } from 'react'
import { users, products,  } from '@/db/schema'
import { ProductFormValues } from '@/components/admin/products/addProduct/ProductInfo'
import { nanoid } from 'nanoid'

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
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return result[0] || null
  } catch (error) {
    console.error('Error getting user by ID:', error)
    return null
  }
})

// Get user by email
export const getUserByEmail = cache(async (email: string) => {
  try {
    const result = await db.select().from(users).where(eq(users.email, email))
    return result[0] || null
  } catch (error) {
    console.error('Error getting user by email:', error)
    return null
  }
})

// Get user by ID (non-cached version for use in middleware and server actions)
export async function getUserById(userId: string) {
  try {
    const result = await db.select().from(users).where(eq(users.id, userId))
    return result[0] || null
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

// Create a new product
export async function createProduct(data: ProductFormValues) {
  try {
    // Transform the form data to match our database schema
    const productId = nanoid()
    const productData = {
      id: productId,
      title: data.title,
      sku: data.sku,
      barcode: data.barcode || null,
      description: data.description,
      status: data.status,
      publishDate: data.publishDate ? new Date(data.publishDate) : null,
      
      // Price information
      price: data.price,
      pricePerItem: data.pricePerItem || null,
      costPrice: null, // Map this if you have it in your form
      profit: data.profit || null,
      margin: data.margin || null,
      defaultPrice: data.defaultPrice || null,
      customPrice: data.customPrice || null,
      tax: data.tax || null,
      
      // Inventory
      trackInventory: false, // Set based on your form
      currentStock: data.currentStock || null,
      lowStockThreshold: data.lowStock || null,
      damageStock: data.damageProduct || null,
      
      // Shipping
      isPhysicalProduct: true, // Set based on your form
      shippingPrice: data.shippingPrice || null,
      weight: data.weight || null,
      weightUnit: null, // Map this if you have it in your form
      height: data.height || null,
      width: data.width || null,
      length: data.length || null,
      country: data.country || null,
      hsCode: data.hsCode || null,
      
      // Organization
      type: data.type || null,
      collection: data.collection || null,
      organization: data.organization || null,
      tag: data.tag || null,
      
      // SEO
      pageTitle: data.pageTitle || null,
      metaDescription: data.metaDescription || null,
      urlHandle: data.urlHandle || null,

      categories: data.categories || [],
      
      // JSON data
      images: data.images || [],
      recommendedProducts: data.recommendedProducts || [],
    }

    // Insert the product
    const result = await db.insert(products).values(productData).returning()
    const product = result[0]
    
    
    
    return product || null
  } catch (error) {
    console.error('Error creating product:', error)
    throw error
  }
}
