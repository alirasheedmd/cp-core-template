'use client'

import { useState, useEffect } from 'react'
import { TbLoader2 } from 'react-icons/tb'

interface ResetPasswordFormProps {
  onBackToLogin: () => void
  initialEmail?: string // Allow passing initial email from parent
}

export default function ResetPasswordForm({
  onBackToLogin,
  initialEmail = '',
}: ResetPasswordFormProps) {
  const [email, setEmail] = useState(initialEmail)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  // When cooldown is active, count down every second.
  useEffect(() => {
    if (cooldown > 0) {
      const interval = setInterval(() => {
        setCooldown((prev) => prev - 1)
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [cooldown])

  // Update email if initialEmail changes (e.g., from parent)
  useEffect(() => {
    if (initialEmail && initialEmail !== email) {
      setEmail(initialEmail)
    }
  }, [initialEmail, email])

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccessMessage('')

    // Client-side validation
    if (!email.trim()) {
      setError('Please enter your email address')
      return
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    try {
      setIsSubmitting(true)
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccessMessage(
          data.message ||
            'Password reset email sent successfully. Please check your inbox.',
        )
        // Start a cooldown of 60 seconds after a successful send.
        setCooldown(60)
      } else {
        // Use a friendly error message or the server's error message
        const errorMessage = getFriendlyErrorMessage(data.error)
        setError(
          errorMessage ||
            data.error ||
            'Failed to send reset email. Please try again.',
        )
      }
    } catch (err) {
      console.error('Password reset error:', err)
      setError('An unexpected error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Returns a user-friendly error message
  const getFriendlyErrorMessage = (errorCode: string): string => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account exists with this email address. Please check and try again.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later.'
      default:
        return ''
    }
  }

  return (
    <div className="w-full">
      <h1 className="text-center text-2xl font-medium text-gray-700">
        Forgot Password
      </h1>
      <p className="my-2 text-center text-sm text-gray-700">
        Enter your email address below to receive a password reset link.
      </p>
      <form onSubmit={handlePasswordReset} className="mt-8 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your.email@example.com"
            disabled={isSubmitting || cooldown > 0}
            className="focus:ring-Orange w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-1 focus:outline-hidden disabled:bg-gray-100 disabled:text-gray-500"
          />
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {successMessage && (
          <p className="text-sm text-green-500">{successMessage}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || cooldown > 0}
          className={`bg-Orange focus:ring-Orange w-full rounded-full px-4 py-2 font-semibold text-white transition-all focus:ring-2 focus:outline-hidden ${
            isSubmitting || cooldown > 0
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-Orange/80'
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <TbLoader2 className="mr-2 animate-spin" /> Sending...
            </span>
          ) : cooldown > 0 ? (
            <span>
              Resend link in {cooldown} second{cooldown !== 1 ? 's' : ''}
            </span>
          ) : (
            'Send Reset Email'
          )}
        </button>
      </form>

      <div className="my-4 flex items-center justify-center">
        <div className="grow border-t border-gray-300"></div>
        <span className="mx-4 font-medium text-gray-400">OR</span>
        <div className="grow border-t border-gray-300"></div>
      </div>

      <button
        onClick={onBackToLogin}
        className="w-full rounded-full border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-all hover:border-gray-800 hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:outline-hidden"
      >
        Back to sign in page
      </button>
    </div>
  )
}
