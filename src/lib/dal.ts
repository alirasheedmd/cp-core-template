'use server'

import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import { users, products, images } from '@/db/schema'

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

export async function getAllProducts() {
  // Get all products first
  const productsData = await db.select().from(products)

  // Get all images
  const imagesData = await db.select().from(images)

  // Map products and add their images as arrays
  const result = productsData.map((product) => {
    // Find all images for this product
    const productImages = imagesData.filter(
      (img) => img.productId === product.id,
    )

    // Return the product with images as an array
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      image: productImages.length > 0 ? productImages[0].src : null,
      images: productImages.map((img) => ({
        id: img.id,
        url: img.src,
        alt: img.alt,
      })),
    }
  })

  return result
}
