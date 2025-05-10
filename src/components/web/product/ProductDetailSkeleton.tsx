import WebContainer from '@/components/web/shared/WebContainer'

export default function ProductDetailSkeleton() {
  return (
    <WebContainer>
      <div className="mx-auto max-w-5xl py-8">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2">
          {/* Left Column - Product Image Skeleton */}
          <div className="space-y-4">
            {/* Main Image Skeleton */}
            <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200" />

            {/* Thumbnail Images Skeleton */}
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-square animate-pulse rounded-lg bg-gray-200"
                />
              ))}
            </div>
          </div>

          {/* Right Column - Product Info Skeleton */}
          <div className="space-y-6">
            {/* Title Skeleton */}
            <div className="h-8 w-3/4 animate-pulse rounded bg-gray-200" />

            {/* SKU Skeleton */}
            <div className="h-4 w-1/4 animate-pulse rounded bg-gray-200" />

            {/* Price Skeleton */}
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200" />

            {/* Description Skeleton */}
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full animate-pulse rounded bg-gray-200"
                />
              ))}
            </div>

            {/* Status Badge Skeleton */}
            <div className="h-8 w-24 animate-pulse rounded-full bg-gray-200" />
          </div>
        </div>

        {/* Product Specifications Skeleton */}
        <div className="mt-12 space-y-6">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-6 w-full animate-pulse rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </WebContainer>
  )
}
