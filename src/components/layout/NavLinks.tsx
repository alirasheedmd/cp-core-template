import Link from 'next/link'
import { routes } from '@/config/routes'
import { cn } from '@/lib/utils'
import { IWebCategory } from '@/types'

interface NavLinksProps {
  className?: string
  categories: IWebCategory[]
}

const staticLinks = [
  {
    id: 1,
    name: 'Catalog',
    href: routes.collections,
  },
  {
    id: 2,
    name: 'Contact',
    href: routes.contact,
  },
]

export default function NavLinks({ className, categories }: NavLinksProps) {
  return (
    <div
      className={cn('flex flex-col gap-x-3 lg:flex-row xl:gap-x-5', className)}
    >
      {categories.slice(0, 6).map((category) => (
        <Link
          key={category.id}
          href={routes.dynamicCategory.category(category.slug)}
          className="text-Red font-medium underline-offset-2 hover:underline"
        >
          {category.name}
        </Link>
      ))}
      {staticLinks.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          className="text-Red font-medium underline-offset-2 hover:underline"
        >
          {link.name}
        </Link>
      ))}
    </div>
  )
}
