interface Props {
  type: 'product' | 'summary' | 'payment'
}

export default function LoadingSkeletons({ type }: Props) {
  switch (type) {
    case 'product':
      return (
        <div className="my-2 flex justify-between gap-x-3 px-2 pb-2 lg:px-4">
          <div className="flex gap-x-3">
            <div className="h-[50px] w-[50px] animate-pulse rounded-md bg-gray-200 lg:h-[60px] lg:w-[60px]" />
            <div className="space-y-1.5 lg:space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-40" />
              <div className="h-2.5 w-20 animate-pulse rounded bg-gray-200 lg:h-3 lg:w-24" />
              <div className="h-2.5 w-24 animate-pulse rounded bg-gray-200 lg:h-3 lg:w-32" />
            </div>
          </div>
          <div className="flex items-center gap-x-3 lg:gap-x-6">
            <div className="h-3 w-16 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />
            <div className="h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-20" />
          </div>
        </div>
      )

    case 'summary':
      return (
        <>
          {/* Shimmer header */}
          <div className="h-5 w-20 animate-pulse rounded bg-gray-200 lg:h-6 lg:w-24" />

          {/* Shimmer content */}
          <div className="my-3 h-4 w-32 animate-pulse rounded bg-gray-200 lg:my-4 lg:h-5 lg:w-36" />
          <div className="grid grid-cols-2 gap-y-1.5 lg:gap-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-28" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-24" />
            <div className="h-4 w-20 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-24" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-20" />
            <div className="h-4 w-16 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-20" />
            <div className="h-4 w-24 animate-pulse rounded bg-gray-200 lg:h-5 lg:w-28" />
          </div>

          {/* Shimmer button */}
          <div className="mt-3 h-9 w-full animate-pulse rounded bg-gray-200 lg:mt-4 lg:h-10" />
        </>
      )

    case 'payment':
      return (
        <>
          {/* Shimmer Row 1 */}
          <div className="h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
          <div className="h-3 w-16 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-20" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

          {/* Shimmer Row 2 */}
          <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />

          {/* Shimmer Row 3 */}
          <div className="col-span-2 h-3 w-14 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-16" />
          <div className="h-3 w-20 animate-pulse rounded bg-gray-200 lg:h-4 lg:w-24" />
        </>
      )

    default:
      return null
  }
}
