import Link from 'next/link'
import { BiArrowBack } from 'react-icons/bi'
import { routes } from '@/config/routes'
import EditCustomerComponent from '@/components/admin/customers/addCustomer/EditCustomerComponent'
import { Suspense } from 'react'

export default async function EditCustomerPage({
  params,
}: {
  params: Promise<{
    customerId: string
  }>
}) {
  const { customerId } = await params
  return (
    <div className="mx-auto max-w-6xl lg:my-4">
      <div className="flex items-center gap-2">
        <Link href={routes.admin.customers}>
          <BiArrowBack className="text-xl" />
        </Link>
        <h3 className="text-2xl font-semibold">Edit Customer {customerId}</h3>
      </div>
      <Suspense>
        <EditCustomerComponent customerId={customerId} />
      </Suspense>
    </div>
  )
}
