import { AuthStatus } from '@/components/web/AuthStatus'
import { AddToCart } from '@/components/web/AddToCart'
import { CheckoutButton } from '@/components/web/CheckoutButton'
import ProductCarousel from '@/components/web/homepage/ProductCarousel'
import { Suspense } from 'react'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 flex w-full max-w-5xl flex-col items-center justify-between font-mono text-sm lg:flex">
        <h1 className="mb-10 text-4xl font-bold">E-Commerce Website</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductCarousel />
        </Suspense>

        <div className="w-full max-w-md">
          <AuthStatus />
        </div>

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-semibold">Protected Actions</h2>

          {/* Example of components using authentication */}
          <div className="flex space-x-4">
            <AddToCart productId="123" />
            <CheckoutButton />
          </div>
        </div>
      </div>
    </main>
  )
}
