'use client'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { A11y } from 'swiper/modules'
import 'swiper/css'
import ProductCard from './ProductCard'

export default function FeaturedCategory({
  category,
  products,
}: {
  category: string
  products: any[]
}) {
  const [currentSlide, setCurrentSlide] = useState(1)
  const [totalSlides, setTotalSlides] = useState(products.length)
  const [swiper, setSwiper] = useState(null)

  return (
    <section className="container mx-auto py-12">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-bold text-gray-900">
          Featured {category}
        </h2>

        <Swiper
          modules={[A11y]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          className="mySwiper flex items-stretch"
          onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex + 1)}
          onSwiper={(swiper) => {
            setSwiper(swiper)
            setTotalSlides(swiper.slides.length)
          }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product._id}
              className="flex h-auto min-h-0 flex-col py-4"
            >
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-4 flex items-center justify-center space-x-2 text-lg font-medium text-gray-700">
          <button
            onClick={() => swiper?.slidePrev()}
            className="rounded px-2 py-1 transition-colors hover:bg-gray-200"
            aria-label="Previous slide"
          >
            &lt;
          </button>
          <span>
            {currentSlide}/{totalSlides}
          </span>
          <button
            onClick={() => swiper?.slideNext()}
            className="rounded px-2 py-1 transition-colors hover:bg-gray-200"
            aria-label="Next slide"
          >
            &gt;
          </button>
        </div>
      </div>
    </section>
  )
}
