import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, UserRoundPenIcon } from 'lucide-react'
import { User } from '@/db/schema'
import { Suspense } from 'react'
import SignoutButton from './SignoutButton'
import Link from 'next/link'

interface UserDropdownMenuProps {
  user: User
}

const UserDropdownMenu = (props: UserDropdownMenuProps) => {
  const { user } = props

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <Avatar>
          <AvatarImage src={user?.profileImage ?? undefined} alt="Avatar" />
          <AvatarFallback className="font-semibold text-black">
            {user.firstName?.at(0)}
            {user.lastName?.at(0)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOutIcon className="mr-2 h-4 w-4" />
          <Suspense>
            <SignoutButton />
          </Suspense>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserRoundPenIcon className="mr-2 h-4 w-4" />
          <Link href="/account/profile">
            <button className="focus:outline-none">Profile</button>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserDropdownMenu