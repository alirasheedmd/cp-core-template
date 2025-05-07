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
  return (
    <div className="fixed z-100 w-full border-b border-b-gray-200 bg-white shadow-sm">
      <HeaderBar />
      {/* Header */}
      <div className="container mx-auto flex items-center justify-between gap-x-5 px-3 py-2">
        <WebHamburgerMenu categories={categories} />

        <Link href={routes.home}>
          <Image src={'/logo.svg'} alt="logo" width={120} height={120} />
        </Link>

        <NavLinks className="hidden lg:flex" categories={categories} />

        {/* Icons */}
        <HeaderIcons />
      </div>
    </div>
  )
}
