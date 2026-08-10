import CheckoutForm from '@/components/web/checkout/CheckoutForm'
import { Cart, User } from '@/db/schema'
import { getCurrentUser, getMyCart } from '@/lib/dal'
import { redirect } from 'next/navigation'

const Checkout = async () => {
  const user = await getCurrentUser()
  const cart = await getMyCart()

  if (!cart || !cart?.items.length) {
    console.log('Your cart is empty, please select items first then checkout')
    redirect('/')
  }

  return <CheckoutForm user={user as User} cart={cart as Cart} />
}

export default Checkout
