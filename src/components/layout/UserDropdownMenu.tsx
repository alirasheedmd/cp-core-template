import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { User } from "@/db/schema";

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
                            <AvatarFallback className="text-black">BT</AvatarFallback>
                        </Avatar>
                </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOutIcon className="w-4 h-4 mr-2"/>
                            <LogoutButton/>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
  )
}

export default UserDropdownMenu