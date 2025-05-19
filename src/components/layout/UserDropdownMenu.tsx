import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogOutIcon, UserRoundPenIcon } from 'lucide-react'
import { Suspense } from 'react'
import SignoutButton from './SignoutButton'
import Link from 'next/link'

interface UserDropdownMenuProps {
  user: {
    id: string
    email: string
    isAdmin: boolean
    firstName: string | null
    lastName: string | null
    profileImage: string | null
  }
}

const UserDropdownMenu = (props: UserDropdownMenuProps) => {
  const { user } = props
  const initials =
    (user?.firstName?.at(0) ?? '') + (user?.lastName?.at(0) ?? '')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar className="border-Red border-2">
          <AvatarImage src={user?.profileImage ?? undefined} alt="Avatar" />
          <AvatarFallback className="text-Red bg-white text-base font-semibold">
            {initials.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserRoundPenIcon className="text-Red mr-2 h-4 w-4" />
          <Link href="/account/profile">
            <button className="focus:outline-none">Profile</button>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOutIcon className="text-Red mr-2 h-4 w-4" />
          <Suspense>
            <SignoutButton />
          </Suspense>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu
