// Lucide Icons
'use client'
import { useAuth } from '@/context/AuthContext'
import { Search, ShoppingBag, User } from 'lucide-react'

export default function HeaderIcons() {
  const { openAuth } = useAuth()
  return (
    <div className="text-Red flex gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>
      <button onClick={() => openAuth('signin')}>
        <User className="transition-all hover:scale-105" />
      </button>
      <button>
        <ShoppingBag className="transition-all hover:scale-105" />
      </button>
    </div>
  )
}
