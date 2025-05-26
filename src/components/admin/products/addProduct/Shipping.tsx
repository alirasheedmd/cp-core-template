import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'

export default function Shipping() {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProductFormValues>()

  const trackProduct = watch('isPhysicalProduct', true)

  return (
    <AdminContainer>
      <h2 className="mb-4 text-sm font-semibold">Shipping</h2>

      <div className="flex items-center space-x-2">
        <FormField
          control={control}
          name="isPhysicalProduct"
          render={({ field }) => (
            <FormItem className="flex flex-row">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
                />
              </FormControl>
              <Label htmlFor="isPhysicalProduct" className="font-normal">
                Track physical product
              </Label>
              <input
                type="hidden"
                name="isPhysicalProduct"
                value={field.value ? 'true' : 'false'}
              />
            </FormItem>
          )}
        />
      </div>

      <div
        className={`overflow-hidden transition-all ease-in-out ${
          trackProduct
            ? 'max-h-[2000px] opacity-100 duration-300'
            : 'max-h-0 opacity-0 duration-75'
        }`}
      >
        <div className="mt-5 px-6">
          {/* First Row */}
          <div className="grid grid-cols-3 gap-10">
            <div className="space-y-2">
              <Label htmlFor="shippingPrice" className="text-sm">
                Shipping Price
              </Label>
              <Input
                id="shippingPrice"
                {...register('shippingPrice')}
                placeholder="Rs. 0.00"
                className={`${errors.shippingPrice ? 'border-destructive' : 'border-black'}`}
              />
              {errors.shippingPrice && (
                <p className="text-destructive text-sm">
                  {errors.shippingPrice?.message as string}
                </p>
              )}
            </div>

            {/* Checkbox */}
            <div className="mt-auto flex items-center space-x-2">
              <Checkbox id="freeShipping" />
              <Label htmlFor="freeShipping" className="font-normal">
                Free shipping
              </Label>
            </div>
          </div>

          {/* Second Row */}
          <div className="mt-5 grid grid-cols-3 gap-10">
            <div className="space-y-2">
              <Label htmlFor="weight" className="text-sm">
                Weight
              </Label>
              <Input
                id="weight"
                placeholder="0.0"
                {...register('weight')}
                className={`${errors.weight ? 'border-destructive' : 'border-black'}`}
              />
              {errors.weight && (
                <p className="text-destructive text-sm">
                  {errors.weight?.message as string}
                </p>
              )}
            </div>

            {/* Weight select */}
            <FormField
              control={control}
              name="weightUnit"
              render={({ field }) => (
                <FormItem className="mt-2 mr-1 w-full">
                  <FormLabel htmlFor="weightUnit" className="text-sm">
                    Weight Unit
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    {...field}
                    defaultValue="kg"
                  >
                    <FormControl>
                      <SelectTrigger
                        className={`${errors.weightUnit ? 'border-destructive' : 'border-black'} w-full`}
                      >
                        <SelectValue placeholder="Select weight unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="lb">lb</SelectItem>
                      <SelectItem value="litre">litre</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          {/* Third Row */}
          <div className="mt-5 grid grid-cols-3 gap-10">
            <div className="space-y-2">
              <Label htmlFor="height">
                Height<span className="text-sm text-gray-500">(optional)</span>
              </Label>
              <Input
                id="height"
                placeholder="0.0"
                {...register('height')}
                className={`${errors.height ? 'border-destructive' : 'border-black'}`}
              />
              {errors.height && (
                <p className="text-destructive text-sm">
                  {errors.height?.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="width" className="text-sm">
                Width<span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="width"
                placeholder="0.0"
                {...register('width')}
                className={`${errors.width ? 'border-destructive' : 'border-black'}`}
              />
              {errors.width && (
                <p className="text-destructive text-sm">
                  {errors.width?.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="length" className="text-sm">
                Length<span className="text-gray-500">(optional)</span>
              </Label>
              <Input
                id="length"
                placeholder="0.0"
                {...register('length')}
                className={`${errors.length ? 'border-destructive' : 'border-black'}`}
              />
              {errors.length && (
                <p className="text-destructive text-sm">
                  {errors.length?.message as string}
                </p>
              )}
            </div>
          </div>

          {/* HS Code */}
          <Accordion type="single" collapsible className="mt-5">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <p>
                  Add HS Code
                  <span className="ml-2 text-xs text-gray-500">(optional)</span>
                </p>
              </AccordionTrigger>
              <AccordionContent className="px-1">
                <div className="space-y-2">
                  <Label htmlFor="country" className="text-sm">
                    Country / Region
                  </Label>
                  <Input
                    id="country"
                    placeholder="0.0"
                    {...register('country')}
                    className={`${errors.country ? 'border-destructive' : 'border-black'}`}
                  />
                  {errors.country && (
                    <p className="text-destructive text-sm">
                      {errors.country?.message as string}
                    </p>
                  )}
                </div>

                <div className="mt-5 space-y-2">
                  <Label htmlFor="hsCode" className="text-sm">
                    HS Code
                  </Label>
                  <Input
                    id="hsCode"
                    placeholder="0.0"
                    {...register('hsCode')}
                    className={`${errors.hsCode ? 'border-destructive' : 'border-black'}`}
                  />
                  {errors.hsCode && (
                    <p className="text-destructive text-sm">
                      {errors.hsCode?.message as string}
                    </p>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </AdminContainer>
  )
}
