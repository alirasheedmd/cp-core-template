import { useState, useRef } from 'react'
import { Command, CommandEmpty, CommandGroup } from '@/components/ui/command'
import { ProductCard } from './ProductCard'
import { dummyProducts } from '@/data/dummyProducts'
import { IProduct } from '@/types'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import AdminContainer from '@/components/admin/shared/AdminContainer'
import { ActionButtons } from '@/components/common/ActionButtons'

export default function RecommendedProduct() {
  const { setValue } = useFormContext<ProductFormValues>()
  const [selectedProducts, setSelectedProducts] = useState<IProduct[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [displayedProducts, setDisplayedProducts] = useState<IProduct[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredProducts = searchQuery
    ? dummyProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.variants.some((variant) =>
            variant.sku.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
      )
    : dummyProducts

  const handleSelect = (product: IProduct, checked: boolean) => {
    if (checked) {
      setSelectedProducts([...selectedProducts, product])
    } else {
      setSelectedProducts(selectedProducts.filter((p) => p._id !== product._id))
    }
  }

  const handleDelete = (productId: string) => {
    setDisplayedProducts(displayedProducts.filter((p) => p._id !== productId))
    setSelectedProducts(selectedProducts.filter((p) => p._id !== productId))
    // Update form value
    setValue(
      'recommendedProducts',
      displayedProducts
        .filter((p) => p._id !== productId)
        .map((p) => ({ _id: p._id, name: p.name })),
    )
  }

  const handleAdd = () => {
    setDisplayedProducts(selectedProducts)
    setSelectedProducts([])
    setSearchQuery('')
    setIsOpen(false)
    // Update form value
    setValue(
      'recommendedProducts',
      selectedProducts.map((p) => ({ _id: p._id, name: p.name })),
    )
  }

  const handleCancel = () => {
    setSelectedProducts([])
    setSearchQuery('')
    setIsOpen(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (open) {
      setSelectedProducts(displayedProducts)
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
      <h2 className="mb-4 text-sm font-semibold">Add Recommended Products</h2>
      <p className="my-3 text-xs">Add 5 recommended products</p>

      {/* Displayed Products */}
      {displayedProducts.length > 0 && (
        <div className="mb-4 space-y-2">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product._id}
              name={product.name}
              sku={product.variants[0].sku}
              price={
                product.variants[0].discountPrice ||
                product.variants[0].originalPrice
              }
              image={product.images[0]}
              variant="delete"
              onDelete={() => handleDelete(product._id)}
            />
          ))}
        </div>
      )}

      {/* Add Recommended Products */}
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
                        key={product._id}
                        name={product.name}
                        sku={product.variants[0].sku}
                        price={
                          product.variants[0].discountPrice ||
                          product.variants[0].originalPrice
                        }
                        image={product.images[0]}
                        isSelected={selectedProducts.some(
                          (p) => p._id === product._id,
                        )}
                        onSelect={(checked) => handleSelect(product, checked)}
                      />
                    ))}
                  </div>
                </CommandGroup>
              )}
            </div>

            <div className="mt-4">
              <ActionButtons
                onCancel={handleCancel}
                onSave={handleAdd}
                saveDisabled={selectedProducts.length === 0}
                saveText="Add"
              />
            </div>
          </Command>
        </PopoverContent>
      </Popover>
    </AdminContainer>
  )
}
