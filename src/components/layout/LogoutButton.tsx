import { customerSignOut } from "@/app/actions/web/auth/webAuth"

const LogoutButton = async () => {

    const handleLogout = async () => {
        await customerSignOut()
    }
  return (
     <button onClick={handleLogout}>
      Logout
    </button>
  )
}

export default LogoutButton