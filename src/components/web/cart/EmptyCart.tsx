'use client'

import { BsCartX } from 'react-icons/bs'
import Link from 'next/link'
import { routes } from '@/config/routes'
import PrimaryButton from '@/components/common/PrimaryButton'
import WebContainer from '@/components/web/shared/WebContainer'

export function EmptyCart() {
  return (
    <WebContainer className="py-8 lg:max-w-[64rem]">
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-y-6 py-12 text-center">
        <div className="relative">
          <BsCartX className="h-24 w-24 text-gray-400 transition-all duration-300 hover:scale-110" />
          <div className="absolute -top-2 -right-2 h-4 w-4 animate-ping rounded-full bg-red-500/30" />
        </div>
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>
          <p className="text-gray-500">
            Looks like you haven&apos;t added anything yet
          </p>
        </div>
        <Link href={routes.collections} className="w-full">
          <PrimaryButton className="max-w-80" fullWidth>
            Start Shopping
          </PrimaryButton>
        </Link>
      </div>
    </WebContainer>
  )
}
