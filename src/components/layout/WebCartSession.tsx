'use client'

import { useEffect } from 'react'
import { generateSessionCartId } from '@/app/actions/web/auth/webAuth'

const WebCartSession = () => {
  useEffect(() => {
    const initCart = async () => {
      await generateSessionCartId()
    }

    initCart()
  }, [])

  return null
}

export default WebCartSession
