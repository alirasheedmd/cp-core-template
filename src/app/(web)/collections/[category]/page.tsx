import WebProductCard from '@/components/web/shared/WebProductCard'
import { getOneCategory, getProductsByCategory } from '@/lib/dal'
import { IWebProduct } from '@/types'
import React, { Suspense } from 'react'

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const products = await getProductsByCategory(category)
  const categoryData = await getOneCategory(category)
  const categoryName = categoryData.name

  return (
    <div>
      <h1 className="my-8 text-4xl font-semibold">{categoryName}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-5 gap-10">
          {products.map((product: IWebProduct) => (
            <WebProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  )
}
