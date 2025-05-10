'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { customerSignIn, customerSignUp } from '@/app/actions/web/auth/webAuth'
import { VerificationForm } from '@/components/web/auth/VerificationForm'
import ForgotPasswordForm from '@/components/web/auth/ForgotPasswordForm'
import { ResetPasswordVerificationForm } from '@/components/web/auth/ResetPasswordVerificationForm'
import ChangePasswordForm from '@/components/web/auth/ChangePasswordForm'

// Add verification to the AuthMode options
type AuthMode =
  | 'signin'
  | 'signup'
  | 'verify'
  | 'forgot-password'
  | 'verify-reset'
  | 'change-password'

interface AuthContextType {
  isOpen: boolean
  mode: AuthMode
  openAuth: (mode?: AuthMode) => void
  closeAuth: () => void
  setMode: (mode: AuthMode) => void
  userEmail: string
  setUserEmail: (email: string) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<AuthMode>('signin')
  const [userEmail, setUserEmail] = useState('')

  const openAuth = (initialMode: AuthMode = 'signin') => {
    setMode(initialMode)
    setIsOpen(true)
  }

  const closeAuth = () => {
    setIsOpen(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isOpen,
        mode,
        openAuth,
        closeAuth,
        setMode,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
      <AuthModal />
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

function AuthModal() {
  const { isOpen, mode, closeAuth, setMode } = useAuth()

  return (
    <Dialog open={isOpen} onOpenChange={closeAuth}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'signin'
              ? 'Sign In'
              : mode === 'signup'
                ? 'Create Account'
                : mode === 'change-password'
                  ? 'Reset Password'
                  : mode === 'forgot-password'
                    ? 'Forgot Password'
                    : 'Verify Email'}
          </DialogTitle>
        </DialogHeader>

        {mode === 'signin' ? (
          <SignInForm />
        ) : mode === 'signup' ? (
          <SignUpForm />
        ) : mode === 'verify' ? (
          <VerificationForm />
        ) : mode === 'forgot-password' ? (
          <ForgotPasswordForm />
        ) : mode === 'verify-reset' ? (
          <ResetPasswordVerificationForm />
        ) : (
          <ChangePasswordForm />
        )}

        <div className="mt-4 text-center text-sm">
          {mode === 'signin' ? (
            <p>
              Don't have an account?{' '}
              <button
                onClick={() => setMode('signup')}
                className="text-primary hover:underline"
              >
                Sign up
              </button>
            </p>
          ) : mode === 'signup' ? (
            <p>
              Already have an account?{' '}
              <button
                onClick={() => setMode('signin')}
                className="text-primary hover:underline"
              >
                Sign in
              </button>
            </p>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { closeAuth, setMode, setUserEmail } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)

      const response = await customerSignIn(formData)

      if (response.error) {
        if (response.needsVerification) {
          // Switch to verification mode in the auth context
          setUserEmail(response.email || email)
          setMode('verify')
        } else {
          setError(response.error)
        }
      } else {
        closeAuth()
        // Optionally refresh the page or update UI
        window.location.reload()
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-500">{error}</div>}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-dark w-full rounded-md py-2 text-white transition disabled:opacity-50"
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>
      <div>
        <button
          onClick={() => setMode('forgot-password')}
          className="text-primary hover:underline"
        >
          Forget Password?
        </button>
      </div>
    </form>
  )
}

function SignUpForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { setMode, setUserEmail } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('email', email)
      formData.append('password', password)
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)

      // Create a server action for customer sign-up
      const response = await customerSignUp(formData)

      if (response.error) {
        setError(response.error)
      } else if (response.needsVerification) {
        // Switch to verification mode in the auth context
        setUserEmail(response.email || email)
        setMode('verify')
      } else {
        // Normal flow if no verification needed
        window.location.reload()
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-sm text-red-500">{error}</div>}

      <div className="space-y-2">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-md border p-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="bg-primary hover:bg-primary-dark w-full rounded-md py-2 text-white transition disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  )
}
