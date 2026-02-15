/* eslint-disable react-hooks/rules-of-hooks */
'use client'

import { useState, useRef } from 'react'
import { Command, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { ProductCard } from '../../shared/ProductCard'
import { IProduct } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useFormContext, Controller } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { ActionButtons } from '@/components/common/ActionButtons'

interface RecommendedProductProps {
  recommendedProducts: IProduct[]
}

export default function RecommendedProduct({
  recommendedProducts,
}: RecommendedProductProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductFormValues>()
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredProducts = searchQuery
    ? recommendedProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : recommendedProducts

  return (
    <Controller
      control={control}
      name="recommendedProducts"
      render={({ field }) => {
        const selectedProductIds = (field.value || []).map(
          (p: { id: string; name: string }) => p.id,
        )
        const displayedProducts = recommendedProducts.filter((p) =>
          selectedProductIds.includes(p.id),
        )
        const [tempSelectedProducts, setTempSelectedProducts] =
          useState<IProduct[]>(displayedProducts)

        const handleSelect = (product: IProduct, checked: boolean) => {
          if (checked && tempSelectedProducts.length >= 5) {
            setIsOpen(false)
            return
          }
          const newTempSelected = checked
            ? [...tempSelectedProducts, product]
            : tempSelectedProducts.filter((p) => p.id !== product.id)
          setTempSelectedProducts(newTempSelected)
        }

        const handleDelete = (productId: string) => {
          const newSelected = (field.value || []).filter(
            (p: { id: string; name: string }) => p.id !== productId,
          )
          field.onChange(newSelected)
        }

        const handleAdd = () => {
          const newSelected = tempSelectedProducts.map((p) => ({
            id: p.id,
            name: p.title,
          }))
          field.onChange(newSelected)
          setTempSelectedProducts([])
          setSearchQuery('')
          setIsOpen(false)
        }

        const handleCancel = () => {
          setTempSelectedProducts(displayedProducts)
          setSearchQuery('')
          setIsOpen(false)
        }

        const handleOpenChange = (open: boolean) => {
          setIsOpen(open)
          if (open) {
            setTempSelectedProducts(displayedProducts)
            setTimeout(() => {
              inputRef.current?.focus()
            }, 0)
          }
        }

        const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchQuery(e.target.value)
          if (!isOpen) {
            setIsOpen(true)
          }
        }

        return (
          <AdminContainer>
            <h2 className="mb-4 text-sm font-semibold">
              Add Recommended Products
            </h2>
            <p className="my-3 text-xs">Add up to 5 recommended products</p>

            {displayedProducts.length > 0 && (
              <div className="mb-4 space-y-2">
                {displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    name={product.title}
                    sku={product.sku}
                    price={Number(product.price)}
                    image={product.images[0]}
                    onDelete={() => handleDelete(product.id)}
                  />
                ))}
              </div>
            )}

            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    placeholder="Search products by name or SKU..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full"
                  />
                </div>
              </PopoverTrigger>
              <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-3 duration-75"
                align="start"
                side="bottom"
                sideOffset={4}
              >
                <Command>
                  <div className="max-h-[300px] overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                      <CommandEmpty>No products found.</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        <div className="space-y-2">
                          {filteredProducts.map((product) => (
                            <ProductCard
                              key={product.id}
                              name={product.title}
                              sku={product.sku}
                              price={Number(product.price)}
                              image={product.images[0]}
                              isSelected={tempSelectedProducts.some(
                                (p) => p.id === product.id,
                              )}
                              onSelect={(checked) =>
                                handleSelect(product, checked)
                              }
                            />
                          ))}
                        </div>
                      </CommandGroup>
                    )}
                  </div>

                  {selectedProductIds.length >= 5 && (
                    <p className="mt-2 text-xs text-red-500">
                      You can select up to 5 products only.
                    </p>
                  )}
                  <div className="mt-4">
                    <ActionButtons
                      onCancel={handleCancel}
                      onSave={handleAdd}
                      saveDisabled={tempSelectedProducts.length === 0}
                      saveText="Add"
                    />
                  </div>
                </Command>
              </PopoverContent>
            </Popover>

            <input
              type="hidden"
              name="recommendedProducts"
              value={JSON.stringify(field.value || [])}
            />
            {errors.recommendedProducts && (
              <p className="text-destructive text-sm">
                {errors.recommendedProducts.message}
              </p>
            )}
          </AdminContainer>
        )
      }}
    />
  )
}
