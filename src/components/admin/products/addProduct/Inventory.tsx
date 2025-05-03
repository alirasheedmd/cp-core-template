'use client'

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Info } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { ActionButtons } from '@/components/common/ActionButtons'

export default function Inventory() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>()

  const [open, setOpen] = useState(false)
  const [trackInventory, setTrackInventory] = useState(false)
  const [trackingLevel, setTrackingLevel] = useState<'product' | 'variant'>(
    'product',
  )

  return (
    <AdminContainer>
      <h2 className="mb-4 text-sm font-semibold">Inventory</h2>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="trackInventory"
            checked={trackInventory}
            onCheckedChange={(checked) => setTrackInventory(checked as boolean)}
          />
          <Label htmlFor="trackInventory" className="font-normal">
            Track inventory
          </Label>
        </div>

        <div
          className={`space-y-4 overflow-hidden px-6 transition-all ease-in-out ${
            trackInventory
              ? 'max-h-[1000px] opacity-100 duration-300'
              : 'max-h-0 opacity-0 duration-75'
          }`}
        >
          <RadioGroup
            value={trackingLevel}
            onValueChange={(value) =>
              setTrackingLevel(value as 'product' | 'variant')
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="product" id="productLevel" />
              <Label htmlFor="productLevel" className="text-sm font-normal">
                On the product level
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="variant" id="variantLevel" />
              <Label htmlFor="variantLevel" className="text-sm font-normal">
                On the variant level
              </Label>
            </div>
          </RadioGroup>

          <div
            className={`overflow-hidden transition-all ease-in-out ${
              trackingLevel === 'product'
                ? 'max-h-[1000px] opacity-100 duration-300'
                : 'max-h-0 opacity-0 duration-75'
            }`}
          >
            <div className="mt-3 space-y-6">
              <div className="grid grid-cols-2 gap-10 px-1">
                <div className="space-y-2">
                  <Label htmlFor="currentStock" className="text-sm">
                    Current stock
                  </Label>
                  <Input
                    id="currentStock"
                    {...register('currentStock')}
                    className={`${errors.currentStock ? 'border-destructive' : 'border-black'} text-sm`}
                  />
                  {errors.currentStock && (
                    <p className="text-destructive text-sm">
                      {errors.currentStock?.message as string}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lowStock"
                    className={`${errors.lowStock ? 'border-destructive' : 'border-black'} text-sm`}
                  >
                    Low stock threshold
                  </Label>
                  <Input
                    id="lowStock"
                    {...register('lowStock')}
                    className={`${errors.lowStock ? 'border-destructive' : 'border-black'} `}
                  />
                  {errors.lowStock && (
                    <p className="text-destructive text-sm">
                      {errors.lowStock?.message as string}
                    </p>
                  )}
                </div>
              </div>

              {/* Add field */}
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="flex items-center">
                  <Info className="mr-2 h-4 w-4" />
                  <p className="text-sm">Add field like damage product etc.</p>
                </PopoverTrigger>
                <PopoverContent
                  className="rounded-lg bg-white p-3"
                  align="start"
                >
                  <h2 className="mb-4 text-sm font-semibold">Add field</h2>
                  <div className="space-y-2">
                    <Label htmlFor="damageProduct" className="text-sm">
                      Damage product
                    </Label>
                    <Input
                      id="damageProduct"
                      {...register('damageProduct')}
                      className={`${errors.damageProduct ? 'border-destructive' : 'border-black'}`}
                    />
                    {errors.damageProduct && (
                      <p className="text-destructive text-sm">
                        {errors.damageProduct?.message as string}
                      </p>
                    )}
                  </div>

                  <ActionButtons
                    onCancel={() => setOpen(false)}
                    onSave={() => {
                      // Handle save
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all ease-in-out ${
              trackingLevel === 'variant'
                ? 'max-h-[1000px] opacity-100 duration-300'
                : 'max-h-0 opacity-0 duration-75'
            }`}
          >
            <div className="text-muted-foreground text-sm">
              Add variant options to create variants and manage inventory below
            </div>
          </div>
        </div>
      </div>
    </AdminContainer>
  )
}
