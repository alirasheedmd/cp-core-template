import { routes } from '@/config/routes'
import HeaderBar from '@/components/layout/HeaderBar'
import HeaderIcons from '@/components/layout/HeaderIcons'
import Image from 'next/image'
import Link from 'next/link'
import NavLinks from '@/components/layout/NavLinks'
import WebHamburgerMenu from '@/components/layout/WebHamburgerMenu'
import { getAllCategories } from '@/lib/dal'
export default async function WebHeader() {
  const categories = await getAllCategories()
  const firstSixCategories = categories.slice(0, 6)

  return (
    <div className="fixed z-10 w-full border-b border-b-gray-200 bg-white shadow-sm">
      <HeaderBar />
      {/* Header */}
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-x-5 px-3 py-2 md:px-5">
        <WebHamburgerMenu categories={categories} />

        <Link
          href={routes.home}
          className="relative -mr-8 h-12 w-24 md:h-14 md:w-28 lg:mr-0"
        >
          <Image src={'/logo.svg'} alt="logo" fill className="shrink-0" />
        </Link>

        <NavLinks className="hidden lg:flex" categories={firstSixCategories} />

        {/* Icons */}
        <HeaderIcons />
      </div>
    </div>
  )
}
