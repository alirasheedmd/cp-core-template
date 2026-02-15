'use client'

import { sendEmailForResetPassword } from '@/app/actions/web/auth/email-verification'
import { useAuth } from '@/context/AuthContext'
import { useState } from 'react'

const ResetPasswordForm = () => {
  const { setUserEmail, setMode } = useAuth()
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState<string>('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setIsLoading(true)
    setError('')

    try {
      const result = await sendEmailForResetPassword(email)

      if (result.success) {
        setUserEmail(email)
        setMode('verify-reset')
      } else {
        setError(result.error || 'Failed to send verification code')
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
        We’ll send a verification code to this email address if it matches an
        existing account
      </p>
      <div className="space-y-2">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-md border p-2 text-lg"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-dark w-full rounded-md py-2 text-white transition disabled:opacity-50"
      >
        Reset password
      </button>
    </form>
  )
}

export default ResetPasswordForm
