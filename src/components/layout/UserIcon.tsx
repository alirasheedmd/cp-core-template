'use client'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'
import { User } from 'lucide-react'

export default function UserIcon({ className }: { className?: string }) {
  const { openAuth } = useAuth()
  return (
    <button
      onClick={() => openAuth('signin')}
      className={cn('flex items-center justify-center gap-x-2', className)}
    >
      <User className="text-Red transition-all hover:scale-105" />
      <p className="text-Red font-medium md:hidden">Account</p>
    </button>
  )
}
