'use client'

import { useEffect, useState } from 'react'
import { getUserStatus } from '@/app/actions/web/auth/getUserStatus'
import { useAuth } from '@/context/AuthContext'
import { customerSignOut } from '@/app/actions/web/auth/webAuth'

export function AuthStatus() {
  const [status, setStatus] = useState<{
    authenticated: boolean;
    user: { id: string; email: string } | null;
  }>({
    authenticated: false,
    user: null
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
    <div className="p-4 border rounded-md">
      <h2 className="text-lg font-semibold mb-2">Authentication Status</h2>
      <div>
        Status: {status.authenticated ? (
          <span className="text-green-600 font-medium">Authenticated</span>
        ) : (
          <span className="text-red-600 font-medium">Not Authenticated</span>
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Sign In
        </button>
        <button
          onClick={() => openAuth('signup')}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Sign Up
        </button>
        <button
          onClick={signOutHandler}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  )
} 