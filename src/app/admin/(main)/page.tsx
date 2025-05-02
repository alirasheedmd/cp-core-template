import { redirect } from 'next/navigation'
import { routes } from '@/config/routes'

export default function AdminPage() {
  redirect(routes.admin.dashboard)

  // This is just a fallback, but since the user is redirected, this code should not run
  return null
}
