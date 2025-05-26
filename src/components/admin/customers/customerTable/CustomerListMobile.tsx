import Link from 'next/link'
import { ICustomerDetails } from '@/types' // Make sure ICustomer type path is correct
import { routes } from '@/config/routes'
import { formatCurrency2 } from '@/lib/utils'

interface CustomerListMobileProps {
  customers: ICustomerDetails[]
}

const CustomerListMobile: React.FC<CustomerListMobileProps> = ({ customers }) => {
  return (
    <div className="space-y-4 p-2">
      {customers.map((customer) => (
        <div
          key={customer.id} // Assuming _id is the unique identifier
          className="rounded-lg bg-white p-4 shadow-sm"
        >
          <Link href={routes.admin.customerEdit(customer.id)}>
            <h3 className="text-lg font-semibold">{customer.firstName}{' '}{customer.lastName}</h3>
            </Link>
          <div className=" flex items-start">
            <span className="text-sm font-medium">
              {customer.city || ''}{customer.city && customer.country ? ', ' : ''}{customer.country || ''}
            </span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-900 mr-5">
              {customer.ordersCount} orders 
            </span>
            <span className="text-sm font-medium text-gray-900">
              {customer.totalAmount ? formatCurrency2(customer.totalAmount) : formatCurrency2(0)} 
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CustomerListMobile
