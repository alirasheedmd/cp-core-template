import WebHeader from '@/components/layout/WebHeader'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <WebHeader />
      <div className="pt-32">{children}</div>
    </div>
  )
}
