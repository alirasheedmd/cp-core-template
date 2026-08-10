'use client'

import { useEffect, useState } from 'react'
import { getUserStatus } from '@/app/actions/web/auth/getUserStatus'
import { useAuth } from '@/context/AuthContext'
import { customerSignOut } from '@/app/actions/web/auth/webAuth'

export function AuthStatus() {
  const [status, setStatus] = useState<{
    authenticated: boolean
    user: { id: string; email: string } | null
  }>({
    authenticated: false,
    user: null,
  })

  const { openAuth } = useAuth()

  useEffect(() => {
    async function checkStatus() {
      const result = await getUserStatus()
      setStatus(result)
    }

    checkStatus()
  }, [])

  const signOutHandler = async () => {
    await customerSignOut()
  }

  return (
    <div className="rounded-md border p-4">
      <h2 className="mb-2 text-lg font-semibold">Authentication Status</h2>
      <div>
        Status:{' '}
        {status.authenticated ? (
          <span className="font-medium text-green-600">Authenticated</span>
        ) : (
          <span className="font-medium text-red-600">Not Authenticated</span>
        )}
      </div>

      {status.authenticated && status.user && (
        <div className="mt-2">
          <div>User ID: {status.user.id}</div>
          <div>Email: {status.user.email}</div>
        </div>
      )}

      <div className="mt-4">
        <button
          onClick={() => openAuth('signin')}
          className="mr-2 rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          Sign In
        </button>
        <button
          onClick={() => openAuth('signup')}
          className="rounded-md bg-green-500 px-4 py-2 text-white"
        >
          Sign Up
        </button>
        <button
          onClick={signOutHandler}
          className="rounded-md bg-red-500 px-4 py-2 text-white"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
}
