import { Resend } from 'resend'

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

// Email verification template with OTP
export async function sendVerificationEmail(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Store <noreply@paklitz.com>',
      to: email,
      subject: 'Your Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            Thank you for signing up! Please use the verification code below to complete your registration:
          </p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
            <h2 style="letter-spacing: 5px; font-size: 32px; color: #333; margin: 0;">${otp}</h2>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            This code will expire in 10 minutes.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            If you did not sign up for an account, you can ignore this email.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending verification email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}

//Forget Password Email verfication template with OTP
export async function sendVerificationCodeForResetPassword(email: string, otp: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Your Store <noreply@paklitz.com>',
      to: email,
      subject: 'Reset Your Password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            We received a request to reset the password for your YourShop account.
          </p>
          <p>Use the verification code below to continue:</p>
          <div style="background-color: #f4f4f4; padding: 15px; text-align: center; margin: 20px 0;">
            <h2 style="letter-spacing: 5px; font-size: 32px; color: #333; margin: 0;">${otp}</h2>
          </div>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            This code will expire in 10 minutes.
          </p>
          <p style="font-size: 16px; line-height: 1.5; color: #666;">
            If you did not request a password reset, you can safely ignore this email.
          </p>
        </div>
      `,
    })

    if (error) {
      console.error('Error sending verification email:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}

