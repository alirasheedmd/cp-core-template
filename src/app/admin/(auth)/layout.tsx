import Image from 'next/image'
import Link from 'next/link'
import { Nunito_Sans } from 'next/font/google'
import '../../globals.css'

const NunitoSans = Nunito_Sans({
  variable: '--font-NunitoSans',
  subsets: ['latin'],
})

export default function AdminAuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen flex flex-col bg-neutral-950 ${NunitoSans.variable}`}>
      {/* Header with logo */}
      <header className="py-6 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <Link href="/" className="shrink-0">
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
      <main className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md px-4 py-8">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {children}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 bg-black">
        <div className="container mx-auto px-4">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Curious Packet. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
