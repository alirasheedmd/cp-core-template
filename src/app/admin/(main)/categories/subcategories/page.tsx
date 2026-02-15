import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

export default function Subcategorypage() {
  redirect(routes.admin.categories)

  // This is just a fallback, but since the user is redirected, this code should not run
  return null
}
