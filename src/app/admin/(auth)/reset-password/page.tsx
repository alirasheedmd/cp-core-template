import ChangePasswordForm from "@/components/ChangePasswordForm"
import ResetPasswordForm from "@/components/ResetPasswordForm"
import { db } from "@/db"

interface ResetPasswordPageProps {
  searchParams: { token: string }
}
const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {

  const { token } = await searchParams

  console.log("token",token)
  if (token) {
    const user = await db
      .query.users.findFirst({
        where: ((users, { eq }) =>eq(users.resetPasswordToken, token ))
      })
    
    if (!user) {
      return <div>Invalid token</div>
    }

    return <ChangePasswordForm resetPasswordToken={token} />
  } else {
    return <ResetPasswordForm />
  }
}

export default ResetPasswordPage
