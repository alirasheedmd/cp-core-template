'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ActionButtons } from '@/components/common/ActionButtons'
import { useState } from 'react'
import { IVariant } from '@/types'

export default function SelectVariantButton({
  variants,
  onVariantSelect,
}: {
  variants: IVariant[]
  onVariantSelect: (selectedVariant: IVariant) => void
}) {
  const [open, setOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState(variants[0]?.color || '')

  const handleSave = () => {
    const selectedVariant = variants.find((v) => v.color === selectedColor)
    if (selectedVariant) {
      onVariantSelect(selectedVariant) // Send the selected variant back to parent
      setOpen(false) // Close the dialog
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="text-sm text-blue-500 hover:text-blue-600 hover:underline hover:underline-offset-4">
          Select variant
        </button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg p-0 lg:w-full [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="rounded-t-lg bg-[#E7E7E7] px-3 py-5 text-left">
            Select variant
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-5 p-4">
          <div className="space-y-2">
            <p>Color</p>
            <Select value={selectedColor} onValueChange={setSelectedColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem key={variant.color} value={variant.color}>
                    {variant.color}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <ActionButtons
            onCancel={() => setOpen(false)}
            onSave={handleSave}
            disabled={variants.length === 0}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
