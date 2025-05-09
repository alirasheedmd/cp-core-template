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
    <div className="fixed w-full border-b border-b-gray-200 bg-white shadow-sm">
      <HeaderBar />
      {/* Header */}
      <div className="container mx-auto flex items-center justify-between gap-x-5 px-3 py-2">
        <WebHamburgerMenu categories={categories} />

        <Link href={routes.home}>
          <Image src={'/logo.svg'} alt="logo" width={100} height={100} />
        </Link>

        <NavLinks className="hidden lg:flex" categories={firstSixCategories} />

        {/* Icons */}
        <HeaderIcons />
      </div>
    </div>
  )
}
