// Lucide Icons
import { Search, ShoppingBag, User } from 'lucide-react'

export default function HeaderIcons() {
  return (
    <div className="text-Red flex gap-x-2 lg:gap-x-5">
      <button>
        <Search className="transition-all hover:scale-105" />
      </button>
      <button className="hidden lg:block">
        <User className="transition-all hover:scale-105" />
      </button>
      <button>
        <ShoppingBag className="transition-all hover:scale-105" />
      </button>
    </div>
  )
}
