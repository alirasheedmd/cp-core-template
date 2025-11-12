'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'
import {
  verifyEmailOTP,
  resendVerificationOTP,
} from '@/app/actions/web/auth/email-verification'
import { getUserByEmail } from '@/lib/dal'
import { createSession } from '@/lib/auth'

export function VerificationForm() {
  const { userEmail, closeAuth } = useAuth()
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [countdown, setCountdown] = useState(0)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp) {
      setError('Please enter the verification code')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const result = await verifyEmailOTP(userEmail, otp)

      if (result.success) {
        // Find user by email
        const user = await getUserByEmail(userEmail)

        // Create session (isAdmin is false for regular customers)
        await createSession(user?.id as string, user?.isAdmin || false)

        // Close the modal and refresh to update auth state
        closeAuth()
        window.location.reload()
      } else {
        setError(result.error || 'Failed to verify email')
      }
    } catch (err) {
      console.log(err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    setError('')

    try {
      const result = await resendVerificationOTP(userEmail)

      if (result.success) {
        setCountdown(60) // Start 60 second countdown
      } else {
        setError(result.error || 'Failed to resend verification code')
      }
    } catch (err) {
      console.log(err)
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-500">{error}</div>}

      <p className="text-md mb-4 text-center">
        We have sent a 6-digit code to <strong>{userEmail}</strong>.<br />
        Enter the code below to verify your email.
      </p>

      <div className="space-y-2">
        <input
          type="text"
          value={otp}
          onChange={(e) => {
            // Only allow 6 digits
            const value = e.target.value.replace(/\D/g, '').slice(0, 6)
            setOtp(value)
          }}
          className="w-full rounded-md border p-3 text-center text-2xl tracking-widest"
          placeholder="000000"
          required
          maxLength={6}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || otp.length !== 6}
        className="bg-primary hover:bg-primary-dark w-full rounded-md py-2 text-white transition disabled:opacity-50"
      >
        {isLoading ? 'Verifying...' : 'Verify Email'}
      </button>

      <div className="mt-2 text-center">
        <p>
          Did not receive a code?{' '}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading || countdown > 0}
            className="text-primary text-sm hover:underline disabled:text-gray-400"
          >
            {countdown > 0
              ? `Resend code in ${countdown}s`
              : 'Resend verification code'}
          </button>
        </p>
      </div>
    </form>
  )
}
