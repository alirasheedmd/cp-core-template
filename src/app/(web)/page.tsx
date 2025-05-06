// import { AuthStatus } from '@/components/web/AuthStatus'
// import { AddToCart } from '@/components/web/AddToCart'
// import { CheckoutButton } from '@/components/web/CheckoutButton'
// import ProductCarousel from '@/components/web/homepage/ProductCarousel'
'use cache'
import { Suspense } from 'react'
import Link from 'next/link'
import { routes } from '@/config/routes'
import Categories from '@/components/web/homepage/Categories'
import FeaturedCategory from '@/components/web/homepage/FeaturedCategory'
import { getAllProducts } from '@/lib/dal'

export default async function Home() {
  const products = await getAllProducts('03f671b4-a24b-4738-a8c3-2bd1fde5d952')
  console.log(products)
  return (
    <main>
      <div className="container mx-auto pt-4">
        <p className="text-center">
          <span className="text-Red font-medium">Safety Vision</span> provides
          comprehensive fire protection services including{' '}
          <span className="font-medium">
            system design, sales, installation, inspection, maintenance, and
            repair.
          </span>
          <Link
            className="text-Blue mx-1 underline-offset-2 hover:underline"
            href={routes.contact}
          >
            Contact us
          </Link>
          for your project&apos;s fire safety needs.
        </p>
      </div>

      <Categories />

      <Suspense fallback={<div>Loading...</div>}>
        <FeaturedCategory category="Electronics" products={products} />
      </Suspense>

      {/* <div className="flex min-h-screen flex-col items-center justify-between p-24">
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

            {/* Example of components using authentication 
            <div className="flex space-x-4">
              <AddToCart productId="123" />
              <CheckoutButton />
            </div>
          </div>
        </div>
      </div> */}
    </main>
  )
}
