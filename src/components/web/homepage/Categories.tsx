import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { IoArrowForward } from 'react-icons/io5'
import { getAllCategories } from '@/lib/dal'

export default async function Categories() {
  const categories = await getAllCategories()

  return (
    <div className="container mx-auto my-10 flex flex-wrap justify-center gap-4">
      {categories.slice(0, 6).map((category) => (
        <Link href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}`} key={category.id}>
          <Card className="group flex h-[280px] w-50 flex-1 flex-col justify-between border-2 border-black p-5 hover:shadow-lg">
            <div className="mx-auto overflow-hidden rounded-lg">
              {category.image ? (
                <Image
                  src={category.image}
                  alt={category.name}
                  width={170}
                  height={170}
                  className="transition-all duration-500 ease-in-out group-hover:scale-103"
                />
              ) : (
                <Image
                  src={'/products/backpack-1.webp'}
                  alt={category.name}
                  width={170}
                  height={170}
                  className="transition-all duration-500 ease-in-out group-hover:scale-103"
                />
              )}
            </div>

            <div className="flex items-center justify-center gap-x-1">
              <p className="text-center text-xl font-semibold">
                {category.name}
              </p>
              <IoArrowForward className="mt-1.5 text-xl" />
            </div>
          </Card>
        </Link>
      ))}
    </div>
  )
}
