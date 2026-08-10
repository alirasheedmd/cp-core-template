import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { routes } from '@/config/routes'
import { Cart } from '@/db/schema'

export default function CartButton({ cart }: { cart: Cart }) {
  return (
    <Link href={routes.cart}>
      <ShoppingBag className="mr-1" />
      {cart && cart.items.length > 0 && (
        <Badge variant="destructive" className="ml-1">
          {cart.items.reduce((a, c) => a + c.qty, 0)}
        </Badge>
      )}
    </Link>
  )
}
