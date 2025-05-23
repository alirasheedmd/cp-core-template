import { Card } from '@/components/ui/card'
import { routes } from '@/config/routes'
import Link from 'next/link'
import Image from 'next/image'
import { IoArrowForward } from 'react-icons/io5'
import { IWebCategory } from '@/types'

interface CategoryCardProps {
  category: IWebCategory
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { id, name, slug, images } = category
  return (
    <Link
      href={routes.dynamicCategory.category(slug)}
      key={id}
      className="mx-auto h-full min-w-full"
    >
      <Card className="group flex h-full flex-1 flex-col justify-between gap-2 border-2 border-gray-200 p-3 transition-all hover:shadow-xl md:p-5">
        <div className="relative mx-auto h-28 w-28 overflow-hidden rounded-lg md:h-36 md:w-36">
          <Image
            src={images?.[0] || '/default-image.png'}
            alt={name}
            fill
            sizes="(max-width: 768px) 7rem, 9rem"
            className="shrink-0 object-contain transition-all duration-500 ease-in-out group-hover:scale-103"
          />
        </div>

        <div className="flex items-center justify-center gap-x-1 transition-all duration-500">
          <p className="group-hover:text-muted-foreground text-center text-base font-semibold md:text-xl">
            {name}
          </p>
          <IoArrowForward className="group-hover:text-muted-foreground mt-1.5 shrink-0 text-base md:text-xl" />
        </div>
      </Card>
    </Link>
  )
}
