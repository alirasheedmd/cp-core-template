import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

interface ProductCardProps {
  name: string
  sku: string
  price: number
  image: string
  isSelected?: boolean
  onSelect?: (checked: boolean) => void
  onDelete?: () => void
  variant?: 'select' | 'delete'
}

export function ProductCard({
  name,
  sku,
  price,
  image,
  isSelected,
  onSelect,
  onDelete,
  variant = 'select',
}: ProductCardProps) {
  return (
    <div className="bg-LightWhite border-LightWhite flex items-center justify-between rounded-md border p-2 transition-colors hover:bg-neutral-50">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10 rounded-md object-cover"
        />
        <div>
          <h3 className="text-xs font-semibold">{name}</h3>
          <p className="text-xs">SKU: {sku}</p>
          <p className="text-xs">Price: ${price.toLocaleString()}</p>
        </div>
      </div>
      {variant === 'select' ? (
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
          className="ml-2 bg-white"
        />
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="h-8 w-8"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
