import React from 'react'
import CategoryCardSkeleton from '@/components/web/shared/CategoryCardSkeleton'
import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'
import { routes } from '@/config/routes'
import WebContainer from '@/components/web/shared/WebContainer'

export default function HomeCategorySkeleton() {
  return (
    <WebContainer className="my-10">
      {/* Heading */}
      <div className="mb-8 flex items-end justify-between">
        <p className="text-2xl font-bold md:text-3xl">Categories</p>
        <Link
          href={routes.collections}
          className="text-Blue hover:border-b-Blue flex items-center gap-x-1 border-b border-transparent transition-all"
        >
          <span>View All</span>
          <IoArrowForward />
        </Link>
      </div>

      {/* Category Cards Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-6">
        {[...Array(6)].map((_, index) => (
          <CategoryCardSkeleton key={index} />
        ))}
      </div>
    </WebContainer>
  )
}
