import { routes } from '@/config/routes'
import HeaderBar from '@/components/layout/HeaderBar'
import HeaderIcons from '@/components/layout/HeaderIcons'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import WebContainer from '@/components/web/shared/WebContainer'
import NavLinksWithData from '@/components/layout/NavLinksWithData'
import NavLinksSkeleton from '@/components/layout/NavLinksSkeleton'
import WebHamburgerMenu from '@/components/layout/WebHamburgerMenu'
import { getCurrentUser } from '@/lib/dal'
import { User } from '@/db/schema'
export default async function WebHeader() {
  const user = await getCurrentUser()
  return (
    <div className="fixed z-10 w-full border-b border-b-gray-200 bg-white shadow-sm">
      <HeaderBar />
      {/* Header */}
      <WebContainer className="flex items-center justify-between gap-x-5 py-2">
        <WebHamburgerMenu />

        <Link
          href={routes.home}
          className="relative -mr-8 h-12 w-24 md:h-14 md:w-28 lg:mr-0"
        >
          <Image src={'/logo.svg'} alt="logo" fill className="shrink-0" />
        </Link>

        <Suspense fallback={<NavLinksSkeleton className="hidden lg:flex" />}>
          <NavLinksWithData className="hidden lg:flex" />
        </Suspense>

        {/* Icons */}
        <HeaderIcons user={user as User} />
      </WebContainer>
    </div>
  )
}
