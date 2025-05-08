'use client'

// import { useAuthRequired } from '@/hooks/useAuthRequired'
import { useCartStore } from '@/stores/useCartStore'

interface AddToCartProps {
  productId: string
  name: string
  price: string
  image?: string | null
}

export function AddToCart({ productId, name, price, image }: AddToCartProps) {
  // const requireAuth = useAuthRequired()
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    // const isAuthenticated = await requireAuth()

    // if (isAuthenticated) {
    addItem({
      id: productId,
      name,
      price: parseFloat(price),
      image: image || undefined,
    })
    // }
  }

  return (
    <button
      onClick={handleAddToCart}
      className="border-Red text-Red mt-5 rounded-full border-2 px-4 py-2 text-nowrap transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50"
    >
      Add to Cart
    </button>
  )
}
