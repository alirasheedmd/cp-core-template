// import { AuthStatus } from '@/components/web/AuthStatus'
// import { AddToCart } from '@/components/web/AddToCart'
// import { CheckoutButton } from '@/components/web/CheckoutButton'
// import ProductCarousel from '@/components/web/homepage/ProductCarousel'

import Categories from '@/components/web/homepage/Categories'
import FeaturedCategory from '@/components/web/homepage/FeaturedCategory'
import { getProductsByCategory } from '@/lib/dal'
import { Suspense } from 'react'

export default async function Home() {
  // const search = await getProductSearchResults('Practical')
  // console.log(search)

  const alarms = await getProductsByCategory('alarms')
  const fireExtinguishers = await getProductsByCategory('fire-extinguishers')
  const detectors = await getProductsByCategory('detectors')
  const exitSigns = await getProductsByCategory('exit-signs')

  return (
    <main>
      <Suspense
        fallback={
          <div className="container mx-auto my-10">Loading categories...</div>
        }
      >
        <Categories />
      </Suspense>

      <FeaturedCategory
        categoryName="Alarms"
        products={alarms}
        categorySlug="alarms"
      />
      <FeaturedCategory
        categoryName="Fire Extinguishers"
        products={fireExtinguishers}
        categorySlug="fire-extinguishers"
      />
      <FeaturedCategory
        categoryName="Detectors"
        products={detectors}
        categorySlug="detectors"
      />
      <FeaturedCategory
        categoryName="Exit Signs"
        products={exitSigns}
        categorySlug="exit-signs"
      />
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
