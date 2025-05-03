'use client'

import { useAuthRequired } from '@/hooks/useAuthRequired'

export function AddToCart({ productId }: { productId?: string }) {
  const requireAuth = useAuthRequired()
  
  const handleAddToCart = async () => {
    const isAuthenticated = await requireAuth()
    
    if (isAuthenticated) {
      // Proceed with adding to cart
      // Call your addToCart server action here
    }
  }
  
  return (
    <button 
      onClick={handleAddToCart}
      className="bg-primary text-white px-4 py-2 rounded-md"
    >
      Add to Cart
    </button>
  )
}