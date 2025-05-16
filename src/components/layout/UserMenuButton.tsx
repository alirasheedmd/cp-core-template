'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import UserDropdownMenu from './UserDropdownMenu'
import { Avatar } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

export default function UserMenuButton() {
  const { isAuthenticated, user, isLoading, openAuth } = useAuth()

  if (isLoading) {
    return (
      <Avatar className="border-Red border-2">
        <Skeleton className="h-full w-full rounded-full bg-white" />
      </Avatar>
    )
  }

  if (isAuthenticated && user) {
    return (
      <UserDropdownMenu
        user={{
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin,
          firstName: user.email.split('@')[0], // Fallback display name
          lastName: '',
          profileImage: null,
        }}
      />
    )
  }

  return (
    <Button variant="outline" onClick={() => openAuth('signin')}>
      Sign In
    </Button>
  )
}
