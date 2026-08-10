import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@/config/routes'

const currentYear = new Date().getFullYear()

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`flex min-h-screen flex-col bg-neutral-950`}>
      {/* Header with logo */}
      <header className="bg-black py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Link href={routes.home} className="shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={130}
                height={45}
                className="h-auto w-32 object-contain"
                unoptimized
              />
            </Link>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <div className="overflow-hidden rounded-xl bg-white shadow-lg">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-4">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {currentYear} Curious Packet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
