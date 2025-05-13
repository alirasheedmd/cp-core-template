import CustomerInfo, { CustomerInfoFormValues } from '@/components/web/customer/CustomerInfo'
import { getCurrentUser, getCustomerProfileInfo } from '@/lib/dal'
import { redirect } from 'next/navigation'

const Profile = async () => {
  const user = await getCurrentUser()

  if (!user) {
    return redirect('/')
  }

    const data = await getCustomerProfileInfo(user.id as string)
    const customerInfo = data as unknown as CustomerInfoFormValues
    console.log(customerInfo)

  return (
    <div>
      <h1>Customer Profile Info</h1>
        <CustomerInfo data={customerInfo} />
    </div>
  )
}

export default Profile
