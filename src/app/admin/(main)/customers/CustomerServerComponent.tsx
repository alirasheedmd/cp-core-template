import { customersColumns } from './customers-columns'
import CustomerClientContainer from './customer-client-container'
import { getAllCustomers, getOrdersByUserId } from '@/lib/dal'
import { ICustomerDetails } from '@/types'

// Function to fetch customers with caching
async function getCustomers() {
  const customers = await getAllCustomers()
  const customersWithMeta = await Promise.all(
    customers.map(async (customer) => {
      const orders = await getOrdersByUserId(customer.id)
      const ordersCount = orders.length
      const totalAmount = orders.reduce(
        (sum, order) =>
          sum +
          (typeof order.totalPrice === 'string'
            ? parseFloat(order.totalPrice)
            : order.totalPrice || 0),
        0,
      )

      return {
        ...customer,
        ordersCount,
        totalAmount,
      }
    }),
  )
  return customersWithMeta
}

// Function to get columns with caching
async function getColumns() {
  return customersColumns
}

// This is a server component (the page)
export default async function CustomerServerComponent() {
  // Get data with caching
  const customers = await getCustomers()
  const columns = await getColumns()

  return (
    <CustomerClientContainer
      customers={customers as ICustomerDetails[]}
      columns={columns}
    />
  )
}
