import Image from 'next/image'
import React from 'react'

// Define a simplified type that matches what getAllProducts returns
type SimpleProduct = {
  id: string
  title: string
  description: string | null
  price: string
  image: string | null
  images: Array<{ id: string; url: string; alt: string }>
}

const ProductCard2 = ({ product }: { product: SimpleProduct }) => {
  return (
    <div className="w-64 overflow-hidden rounded-lg bg-white shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative h-48 w-full bg-gray-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        ) : (
          <Image
            src={`https://cp-core-template.imgix.net/uploads/rachit-tank-2cFZ_FB08UM-unsplash.jpg`}
            alt={product.title}
            fill
            className="object-cover"
          />
        )}
      </div>
      <div className="p-4">
        <h2 className="truncate text-lg font-semibold text-gray-800">
          {product.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${Number(product.price).toFixed(2)}
          </span>
          <button className="rounded-md bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
            View
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard2
