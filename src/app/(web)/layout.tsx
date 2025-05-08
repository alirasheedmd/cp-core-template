import WebFooter from '@/components/layout/WebFooter'
import WebHeader from '@/components/layout/WebHeader'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { Suspense } from 'react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Suspense fallback={<div className="h-[106px] w-full" />}>
        <WebHeader />
      </Suspense>
      <div className="pt-28">
        <div className="container mx-auto px-5 pt-4">
          <p className="text-center tracking-wide">
            <span className="text-Red font-medium">Safety Vision</span> provides
            comprehensive fire protection services including{' '}
            <span className="font-medium">
              system design, sales, installation, inspection, maintenance, and
              repair.
            </span>
            <Link
              className="text-Blue mx-1 underline-offset-2 hover:underline"
              href={routes.contact}
            >
              Contact us
            </Link>
            for your project&apos;s fire safety needs.
          </p>
        </div>
        <div className="container mx-auto px-3 pb-5">{children}</div>
      </div>
      <WebFooter />
    </div>
  )
}
