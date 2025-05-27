import { getCustomer } from '@/lib/dal'
import CustomerInfo, { CustomerFormValues } from './CustomerInfo'

interface EditCustomerProps {
  customerId: string
}

const EditCustomerComponent = async ({ customerId }: EditCustomerProps) => {
  const customer = await getCustomer(customerId)
  return (
    <CustomerInfo
      id={customerId}
      data={customer as CustomerFormValues}
      isEditing
    />
  )
}

export default EditCustomerComponent
