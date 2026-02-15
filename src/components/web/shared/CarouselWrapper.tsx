import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ReactNode } from 'react'
import WebContainer from '@/components/web/shared/WebContainer'

interface CarouselWrapperProps<T> {
  title: string
  data: T[]
  cardComponent: (item: T) => ReactNode
  viewMoreLink?: string
  itemsToShow?: number
}

export default function CarouselWrapper<T>({
  title,
  data,
  cardComponent,
  viewMoreLink,
  itemsToShow = 5,
}: CarouselWrapperProps<T>) {
  const remainingItems = data.length - itemsToShow

  return (
    <section className="overflow-hidden py-4 md:py-10">
      <WebContainer className="mb-4 text-2xl font-bold md:mb-8 md:text-3xl">
        {title}
      </WebContainer>

      <div className="w-full">
        <div className="mx-auto max-w-[1365px] overflow-visible">
          <div className="relative -mx-3 overflow-x-auto pb-3 pl-6 [-ms-overflow-style:none] [scrollbar-width:none] md:-mx-5 md:pl-12 [&::-webkit-scrollbar]:hidden">
            <div className="flex gap-3 pb-4 md:gap-5">
              {data.slice(0, itemsToShow).map((item, index) => (
                <div key={index} className="w-45 flex-shrink-0 md:w-57">
                  {cardComponent(item)}
                </div>
              ))}
              {/* View More Items */}
              {viewMoreLink && remainingItems > 0 && (
                <Card className="group min-h-full w-45 flex-shrink-0 border-2 border-gray-200 p-5 transition-all hover:shadow-lg md:w-57">
                  <Link
                    href={viewMoreLink}
                    className="flex h-full items-center justify-center"
                  >
                    <p className="text-Blue max-w-40 text-center text-base font-medium underline-offset-2 group-hover:underline">
                      Explore {remainingItems} More{' '}
                      {remainingItems === 1 ? 'Product' : 'Products'} in {title}{' '}
                      →
                    </p>
                  </Link>
                </Card>
              )}
              <div className="w-3 flex-shrink-0 md:w-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
