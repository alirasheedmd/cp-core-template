import WebFooter from '@/components/layout/WebFooter'
import WebHeader from '@/components/layout/WebHeader'
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
        <div className="mx-auto max-w-[1500px] px-5 pt-4">
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
        <div className="pb-5">{children}</div>
      </div>
      <WebFooter />
    </div>
  )
}
