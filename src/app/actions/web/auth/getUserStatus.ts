'use server'

import { getCurrentUser } from '@/lib/dal'

export async function getUserStatus() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return { authenticated: false, user: null }
    }
    
    // Don't send sensitive data to client
    return { 
      authenticated: true, 
      user: {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin || false
      }
    }
  } catch (error) {
    console.error('Error getting user status:', error)
    return { authenticated: false, user: null }
  }
} 