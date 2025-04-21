import { db } from '@/db'
import { getSession } from './auth'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import {  users } from '@/db/schema'


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

// Create a new admin user
export async function createAdminUser(data: { 
  id: string;
  email: string;
  password: string;
}) {
  try {
    const result = await db.insert(users).values(data).returning()
    return result[0] || null
  } catch (error) {
    console.error('Error creating admin user:', error)
    return null
  }
}

