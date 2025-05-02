'use client'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ShoppingCart, Users, DollarSign } from 'lucide-react'
import dynamic from 'next/dynamic'

const data = [
  { name: 'Electronics', value: 400 },
  { name: 'Fashion', value: 300 },
  { name: 'Home Appliances', value: 300 },
  { name: 'Others', value: 200 },
]

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

const PieChartComponent = dynamic(
  () => import('@/components/admin/dashboard/PieChartComponent'),
  { ssr: false },
)

export default function AdminDashboardPage() {
  const orders = 1240
  const users = 980
  const revenue = 85640

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <ShoppingCart className="text-blue-500" size={28} />
              <h2 className="text-lg font-semibold">Total Orders</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{orders}</p>
            <p className="text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Users className="text-green-500" size={28} />
              <h2 className="text-lg font-semibold">Total Users</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{users}</p>
            <p className="text-gray-500">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <DollarSign className="text-yellow-500" size={28} />
              <h2 className="text-lg font-semibold">Revenue</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              Rs. {revenue.toLocaleString('en-PK')}
            </p>
            <p className="text-gray-500">This month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Sales Breakdown</h2>
          </CardHeader>
          <CardContent>
            <PieChartComponent data={data} colors={COLORS} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Recent Activities</h2>
          </CardHeader>
          <CardContent className="scrollbar max-h-[19rem] overflow-y-auto">
            <ul className="space-y-3">
              <li className="rounded border border-gray-200 bg-white p-2 shadow-sm">
                New order placed by John Doe
              </li>
              <li className="rounded border border-gray-200 bg-white p-2 shadow-sm">
                Sarah Smith registered as a new user
              </li>
              <li className="rounded border border-gray-200 bg-white p-2 shadow-sm">
                Product &quot;Smartphone`&quot; was updated
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
