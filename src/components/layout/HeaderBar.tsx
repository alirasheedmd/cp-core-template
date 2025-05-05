'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

const data = [
  {
    id: 1,
    text: "You can now order and pay for your items online, and they'll be delivered right to your door!",
  },
  {
    id: 2,
    text: '📦 Free shipping in Riyadh, Dammam, Al-Khobar on all orders above 200 SAR 🔥',
  },
  { id: 3, text: 'Get 10% off your first order!' },
]

export default function HeaderBar() {
  return (
    <div className="bg-Red relative w-full py-2">
      <div className="container mx-auto">
        <Swiper
          modules={[Navigation, EffectFade]}
          loop={true}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={{
            prevEl: '.custom-prev',
            nextEl: '.custom-next',
          }}
          className="relative"
        >
          {data.map(({ id, text }) => (
            <SwiperSlide
              key={id}
              className="flex h-40 items-center justify-center"
            >
              <p className="text-center text-sm font-semibold tracking-wider text-white">
                {text}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom navigation buttons  */}
        <button
          className="custom-prev absolute top-1/2 left-4 z-20 -translate-y-1/2 text-white"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          className="custom-next absolute top-1/2 right-4 z-20 -translate-y-1/2 text-white"
          aria-label="Next Slide"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
