interface ResetPasswordEmailTemplateProps {
    email: string
    resetPasswordToken: string
}

const ResetPasswordEmailTemplate = (props: ResetPasswordEmailTemplateProps) => {
    const { email , resetPasswordToken } = props
  return (
      <div>
          <h1>Reset Password for <b>{email}</b></h1>
          <p>
              To reset password, click on this link and follow the instructions:
          </p>
          <a href={`http:localhost:3000/admin/reset-password?token=${resetPasswordToken}`}>
              Click here to reset Password
          </a>
          
    </div>
  )
}

export default ResetPasswordEmailTemplate