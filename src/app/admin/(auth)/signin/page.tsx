'use client'

import { useActionState } from 'react'

import {
  createNewAdminUser,
  CreateUserState,
} from '../../../actions/admin/auth/adminAuth'
import { adminSignIn } from '../../../actions/admin/auth/adminAuth'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, Mail, LogIn } from 'lucide-react'

// Define types for our state
interface SignInState {
  error: string
}

// Initial states
const initialSignInState: SignInState = {
  error: '',
}

export default function AdminSignInPage() {
  const [signInState, signInAction, isPending] = useActionState<
    SignInState,
    FormData
  >(adminSignIn, initialSignInState)

  function SignInButton() {
    return (
      <Button
        type="submit"
        className="bg-Orange hover:bg-Orange/80 w-full"
        disabled={isPending}
      >
        {isPending ? (
          'Signing in...'
        ) : (
          <span className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign in
          </span>
        )}
      </Button>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Admin Sign In</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign in to access the admin dashboard
        </p>
      </div>

      {/* Sign In Form */}
      <div>
        {signInState.error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive mb-4 rounded-md border p-3 text-sm">
            {signInState.error}
          </div>
        )}

        <form action={signInAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                className="pl-10"
              />
            </div>
          </div>
          <SignInButton />
        </form>
      </div>
      <AdminSignUpPage />
    </div>
  )
}

// Initial states
const initialSignUpState: CreateUserState = {
  success: false,
  error: '',
  fields: {
    email: [],
    password: [],
  },
  user: {
    id: '',
    email: '',
  },
}

export function AdminSignUpPage() {
  const [signUpState, signUpAction, isPending] = useActionState<
    CreateUserState,
    FormData
  >(createNewAdminUser, initialSignUpState)

  function SignUpButton() {
    return (
      <Button
        type="submit"
        className="bg-Orange hover:bg-Orange/80 w-full"
        disabled={isPending}
      >
        {isPending ? (
          'Signing up...'
        ) : (
          <span className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            Sign Up
          </span>
        )}
      </Button>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Admin Sign Up</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Sign up to access the admin dashboard
        </p>
      </div>

      {/* Sign Up Form */}
      <div>
        {signUpState.error && (
          <div className="bg-destructive/10 border-destructive/30 text-destructive mb-4 rounded-md border p-3 text-sm">
            {signUpState.error}
          </div>
        )}

        <form action={signUpAction} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Mail className="h-4 w-4" />
              </div>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                autoComplete="email"
                required
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <div className="text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2">
                <Lock className="h-4 w-4" />
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                className="pl-10"
              />
            </div>
          </div>
          <SignUpButton />
        </form>
      </div>
    </div>
  )
}

