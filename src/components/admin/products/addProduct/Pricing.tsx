import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import { Separator } from '@/components/ui/separator'

export default function Pricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductFormValues>()
  return (
    <div className="rounded-lg bg-white p-3">
      <h2 className="mb-4 text-sm font-semibold">Pricing</h2>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price" className="text-sm">
          Price
        </Label>
        <Input
          id="price"
          {...register('price')}
          placeholder="Enter product price"
          className={`${errors.price ? 'border-destructive' : 'border-black'}`}
        />
        {errors.price && (
          <p className="text-destructive text-sm">{errors.price.message}</p>
        )}
      </div>

      <p className="mt-8 text-sm">Customer cannot see this</p>
      <Separator className="my-3" />
      <div className="mt-2 grid grid-cols-3 gap-x-10 gap-y-5">
        {/* Cost per item */}

        <div className="space-y-2">
          <Label htmlFor="pricePerItem" className="text-sm">
            Price per item
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="pricePerItem"
            {...register('pricePerItem')}
            placeholder="Rs. 0.00"
            className={`${errors.pricePerItem ? 'border-destructive' : 'border-black'}`}
          />
          {errors.pricePerItem && (
            <p className="text-destructive text-sm">
              {errors.pricePerItem.message}
            </p>
          )}
        </div>

        {/* Profit */}
        <div className="space-y-2">
          <Label htmlFor="profit" className="text-sm">
            Profit
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="profit"
            {...register('profit')}
            placeholder="--"
            className={`${errors.profit ? 'border-destructive' : 'border-black'}`}
          />
          {errors.profit && (
            <p className="text-destructive text-sm">{errors.profit.message}</p>
          )}
        </div>

        {/* Margin */}
        <div className="space-y-2">
          <Label htmlFor="margin" className="text-sm">
            Margin
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="margin"
            {...register('margin')}
            placeholder="--"
            className={`${errors.margin ? 'border-destructive' : 'border-black'}`}
          />
          {errors.margin && (
            <p className="text-destructive text-sm">{errors.margin.message}</p>
          )}
        </div>

        {/* Default Price */}
        <div className="space-y-2">
          <Label htmlFor="defaultPrice" className="text-sm">
            Default Price
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="defaultPrice"
            {...register('defaultPrice')}
            placeholder="Rs. 0.00"
            className={`${errors.defaultPrice ? 'border-destructive' : 'border-black'}`}
          />
          {errors.defaultPrice && (
            <p className="text-destructive text-sm">
              {errors.defaultPrice.message}
            </p>
          )}
        </div>

        {/* Custom Price */}
        <div className="space-y-2">
          <Label htmlFor="customPrice" className="text-sm">
            Custom Price
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="customPrice"
            {...register('customPrice')}
            placeholder="Rs. 0.00"
            className={`${errors.customPrice ? 'border-destructive' : 'border-black'}`}
          />
          {errors.customPrice && (
            <p className="text-destructive text-sm">
              {errors.customPrice.message}
            </p>
          )}
        </div>

        {/* Tax */}
        <div className="space-y-2">
          <Label htmlFor="tax" className="text-sm">
            Tax
            <span className="text-xs text-gray-500">(optional)</span>
          </Label>
          <Input
            id="tax"
            {...register('tax')}
            placeholder="Rs. 0.00"
            className={`${errors.tax ? 'border-destructive' : 'border-black'}`}
          />
          {errors.tax && (
            <p className="text-destructive text-sm">{errors.tax.message}</p>
          )}
        </div>
      </div>
    </div>
  )
}
