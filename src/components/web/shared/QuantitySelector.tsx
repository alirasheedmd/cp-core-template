'use client'

import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  quantity: number
  onQuantityChange: (quantity: number) => void
  min?: number
}

export function QuantitySelector({
  quantity,
  onQuantityChange,
  min = 1,
}: QuantitySelectorProps) {
  const handleDecrement = () =>
    onQuantityChange(quantity > min ? quantity - 1 : min)
  const handleIncrement = () => onQuantityChange(quantity + 1)

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm">Quantity</span>
      <div className="ml-2 flex items-center overflow-hidden rounded-md border">
        <Button
          type="button"
          variant="ghost"
          aria-label="Decrease quantity"
          className="text-DarkGrey hover:bg-LightGrey rounded-r-none px-2 py-0.5 text-base"
          onClick={handleDecrement}
        >
          <Minus className="h-3.5 w-3.5" />
        </Button>
        <input
          type="number"
          className="mx-auto w-10 [appearance:textfield] border-0 text-center text-sm focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          value={quantity}
          min={min}
          readOnly
        />
        <Button
          type="button"
          variant="ghost"
          aria-label="Increase quantity"
          className="text-DarkGrey hover:bg-LightGrey rounded-l-none px-2 py-0.5 text-base"
          onClick={handleIncrement}
        >
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  )
}
