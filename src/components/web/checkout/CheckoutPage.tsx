import CheckoutForm from '@/components/web/checkout/CheckoutForm'
import { User } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'

const Checkout = async () => {
  const user = await getCurrentUser()

  return <CheckoutForm user={user as User} />
}

export default Checkout
