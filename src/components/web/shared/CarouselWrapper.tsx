import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { ReactNode } from 'react'

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
    <section className="py-4 md:py-10">
      <h2 className="mb-4 text-2xl font-bold md:mb-8 md:text-3xl">{title}</h2>

      <ScrollArea className="relative">
        <div className="flex gap-3 pb-4 md:gap-5">
          {data.slice(0, itemsToShow).map((item, index) => (
            <div key={index} className="min-w-1/5">
              {cardComponent(item)}
            </div>
          ))}
          {/* View More Items */}
          {viewMoreLink && remainingItems > 0 && (
            <Card className="group min-h-full min-w-1/5 border-2 border-black p-5 transition-all hover:shadow-lg">
              <Link
                href={viewMoreLink}
                className="flex h-full items-center justify-center"
              >
                <p className="text-Blue text-sm font-medium underline-offset-2 group-hover:underline">
                  View More ({remainingItems})
                </p>
              </Link>
            </Card>
          )}
          <ScrollBar orientation="horizontal" hidden />
        </div>
      </ScrollArea>
    </section>
  )
}
