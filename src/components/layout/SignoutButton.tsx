import { customerSignOut } from "@/app/actions/web/auth/webAuth"

const SignoutButton = async () => {

    const handleLogout = async () => {
        await customerSignOut()
    }
  return (
     <button onClick={handleLogout}>
      Sign Out
    </button>
  )
}

export default SignoutButton