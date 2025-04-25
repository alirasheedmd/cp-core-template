import type { Metadata } from 'next'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminSidebar from '@/components/layout/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="w-full bg-black">
      <AdminHeader />
      <div className="bg-LightWhite h-[calc(100vh-63px)] rounded-t-2xl">
        <div className="flex h-[calc(100vh-63px)] items-start">
          <AdminSidebar />
          <div className="h-[calc(100vh-63px)] w-full overflow-y-scroll rounded-t-2xl lg:p-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
