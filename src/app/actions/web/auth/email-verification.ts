'use server'

import { verifyOTP, storeVerificationOTP } from '@/lib/auth'
import { sendVerificationEmail } from '@/lib/email'
import { getUserByEmail } from '@/lib/dal'

// Verify OTP action
export async function verifyEmailOTP(email: string, otp: string) {
  if (!email || !otp) {
    return {
      success: false,
      error: 'Email and verification code are required'
    }
  }

  try {
    const result = await verifyOTP(email, otp)
    return result
  } catch (error) {
    console.error('Error verifying email:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}

// Resend OTP action
export async function resendVerificationOTP(email: string) {
  if (!email) {
    return {
      success: false,
      error: 'Email is required'
    }
  }

  try {
    // Find the user
    const user = await getUserByEmail(email)
    
    if (!user) {
      // Don't reveal if the user exists for security
      return { success: true }
    }
    
    if (user.isVerified) {
      return {
        success: false,
        error: 'Email is already verified'
      }
    }
    
    // Generate new OTP
    const otp = await storeVerificationOTP(user.id)
    
    if (!otp) {
      return {
        success: false,
        error: 'Failed to generate verification code'
      }
    }
    
    // Send the email
    await sendVerificationEmail(email, otp)
    
    return { success: true }
  } catch (error) {
    console.error('Error resending verification code:', error)
    return {
      success: false,
      error: 'An unexpected error occurred'
    }
  }
}