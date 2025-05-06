// Lucide Icons
import { Search, ShoppingBag, User } from 'lucide-react'

export default function HeaderIcons() {
  return (
    <div className="text-Red flex gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>
      <button>
        <User className="transition-all hover:scale-105" />
      </button>
      <button>
        <ShoppingBag className="transition-all hover:scale-105" />
      </button>
    </div>
  )
}
