'use client'

import { useEffect } from 'react'
import { genereateSessionCartId } from '@/app/actions/web/auth/webAuth'

const WebCartSession = () => {
  useEffect(() => {
    const initCart = async () => {
      await genereateSessionCartId()
    }

    initCart()
  }, [])

  return null
}

export default WebCartSession
