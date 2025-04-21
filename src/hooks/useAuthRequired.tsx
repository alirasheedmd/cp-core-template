'use client'

import { useCallback } from 'react'
import { useAuth } from '@/context/AuthContext'
import { getUserStatus } from '@/app/actions/web/auth/getUserStatus'

export function useAuthRequired() {
  const { openAuth } = useAuth()
  
  const requireAuth = useCallback(async () => {
    // Check if user is already authenticated using server action
    const { authenticated } = await getUserStatus()
    
    if (!authenticated) {
      openAuth('signin')
      return false
    }
    
    return true
  }, [openAuth])
  
  return requireAuth
}