import WebFooter from '@/components/layout/WebFooter'
import WebHeader from '@/components/layout/WebHeader'
import WebContainer from '@/components/web/shared/WebContainer'
import { routes } from '@/config/routes'
import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <WebHeader />
      <div className="pt-28">
        <WebContainer className="pt-4">
          <p className="text-center text-sm tracking-wide md:text-base">
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
        </WebContainer>
        <div className="pb-5">{children}</div>
      </div>
      <WebFooter />
    </div>
  )
}
