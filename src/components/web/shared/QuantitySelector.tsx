'use client'

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
        <button
          className="text-DarkGrey hover:bg-LightGrey px-3 py-1 text-lg"
          onClick={handleDecrement}
          aria-label="Decrease quantity"
          type="button"
        >
          -
        </button>
        <input
          type="number"
          className="mx-auto w-12 border-0 text-center focus:ring-0"
          value={quantity}
          min={min}
          readOnly
        />
        <button
          className="text-DarkGrey hover:bg-LightGrey px-3 py-1 text-lg"
          onClick={handleIncrement}
          aria-label="Increase quantity"
          type="button"
        >
          +
        </button>
      </div>
    </div>
  )
}
