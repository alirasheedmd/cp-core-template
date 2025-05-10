import { ProductCardSkeleton } from '@/components/web/shared/ProductCardSkeleton'

export default function CarouselWrapperSkeleton() {
  return (
    <div className="space-y-0 md:space-y-8">
      {[1, 2, 3, 4].map((categoryIndex) => (
        <section key={categoryIndex} className="overflow-hidden py-4 md:py-10">
          {/* Category Title */}
          <div className="mx-auto mb-4 max-w-[1500px] px-3 md:mb-8 md:px-5">
            <div className="h-8 w-64 md:h-10 md:w-80">
              <div className="h-full w-full animate-pulse rounded-md bg-gray-100" />
            </div>
          </div>

          <div className="mx-auto max-w-[1500px]">
            <div className="relative -mx-3 overflow-x-auto pb-3 pl-6 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-5 md:pl-10 xl:pl-9 [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3 pb-4 md:gap-5">
                {[...Array(5)].map((_, index) => (
                  <div key={index} className="w-45 flex-shrink-0 md:w-57">
                    <ProductCardSkeleton />
                  </div>
                ))}
                <div className="w-3 flex-shrink-0 md:w-3" />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  )
}
