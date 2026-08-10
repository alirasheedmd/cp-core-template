'use client'

import { useAuthRequired } from '@/hooks/useAuthRequired'

export function CheckoutButton() {
  const requireAuth = useAuthRequired()

  const handleCheckout = async () => {
    const isAuthenticated = await requireAuth()

    if (isAuthenticated) {
      alert('Proceeding to checkout!')
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="bg-primary rounded-md px-4 py-2 text-white"
    >
      Checkout
    </button>
  )
}
