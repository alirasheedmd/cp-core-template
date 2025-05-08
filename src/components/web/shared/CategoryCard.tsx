import { Card } from '@/components/ui/card'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Image from 'next/image'
import { IoArrowForward } from 'react-icons/io5'
import { IWebCategory } from '@/types'

export default function CategoryCard({ category }: { category: IWebCategory }) {
  const { id, name, slug, image } = category
  return (
    <Link
      href={routes.dynamicCategory.category(slug)}
      key={id}
      className="mx-auto h-full min-w-full"
    >
      <Card className="group flex h-full flex-1 flex-col justify-between gap-0 border-2 border-black p-3 transition-all hover:shadow-xl md:p-5">
        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-lg md:h-40 md:w-40">
          <Image
            src={image || '/default-image.png'}
            alt={name}
            fill
            className="shrink-0 object-contain transition-all duration-500 ease-in-out group-hover:scale-103"
          />
        </div>

        <div className="flex items-center justify-center gap-x-1">
          <p className="group-hover:text-muted-foreground text-center text-base font-semibold md:text-xl">
            {name}
          </p>
          <IoArrowForward className="mt-1.5 shrink-0 text-base md:text-xl" />
        </div>
      </Card>
    </Link>
  )
}
