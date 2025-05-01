'use client'
import { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { dummyProducts as products } from '@/data/dummyProducts'
import { ActionButtons } from '@/components/common/ActionButtons'
import { IProduct, IVariant } from '@/types'

export interface ISuggestion {
  type: 'product'
  _id: string
  name: string
  slug: string
  categoryId?: string
  categoryName?: string
  categorySlug?: string
  variantKey: string
  sku?: string
  price: number
  stock: number
  color?: string
  image: string
  quantity?: number
  variants: {
    variantKey: string
    sku?: string
    _key: string
    images: string[]
    originalPrice: number
    discountPrice?: number
    stock: number
    color?: string
    variantImages?: string[]
    _id?: string // Add _id to the variant (if not already present)
  }[]
  variant?: IVariant
}

interface SearchProductsProps {
  onProductsSelected: (products: ISuggestion[]) => void
  selectedItems: ISuggestion[]
}

const SearchProducts = ({
  onProductsSelected,
  selectedItems,
}: SearchProductsProps) => {
  const [query, setQuery] = useState('')
  const [allSuggestions, setAllSuggestions] = useState<ISuggestion[]>([])
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([])
  const [open, setOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<ISuggestion[]>([])
  const innerInputRef = useRef<HTMLInputElement>(null)
  // Add this to track how dialog was closed

  const closeViaCancel = useRef(false)

  // Fetch products and set initial 5 suggestions
  useEffect(() => {
    const fetchData = async () => {
      const allSuggestions = products.map((product: IProduct) => ({
        type: 'product' as const,
        _id: product._id || '',
        name: product.name,
        slug: product.slug.current,
        categoryId: product.category?._id,
        categoryName: product.category?.name,
        categorySlug: product.category?.slug.current,
        variantKey: product.variants[0]._key,
        sku: product.variants[0]?.sku,
        price:
          product.variants[0]?.discountPrice ||
          product.variants[0]?.originalPrice,
        stock: product.variants[0]?.stock,
        color: product.variants[0]?.color,
        image: product.images[0] || product.variants[0]?.images[0],
        variants: product.variants.map((variant: IVariant) => ({
          variantKey: variant._key,
          sku: variant.sku,
          _key: variant._key,
          images: variant.images || [],
          originalPrice: variant.originalPrice,
          discountPrice: variant.discountPrice,
          stock: variant.stock,
          color: variant.color,
          variantImages: variant.images,
        })),
      }))

      // console.log("allSuggestions", allSuggestions);
      setAllSuggestions(allSuggestions)
      // Show first 5 products initially
      setSuggestions(allSuggestions.slice(0, 5))
    }

    fetchData()
  }, [])

  // Filter suggestions based on query
  useEffect(() => {
    if (query.length > 0) {
      const filtered = allSuggestions.filter((item) =>
        item?.name?.toLowerCase().includes(query?.toLowerCase()),
      )
      setSuggestions(filtered)
    } else {
      // Show first 5 when query is empty
      setSuggestions(allSuggestions.slice(0, 5))
    }
  }, [query, allSuggestions])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const clearInput = () => {
    setQuery('')
  }

  const handleProductSelect = (product: ISuggestion) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.some((p) => p.slug === product.slug)
        ? prevSelected.filter((p) => p.slug !== product.slug)
        : [...prevSelected, product],
    )
  }

  const handleSave = () => {
    closeViaCancel.current = false
    onProductsSelected(selectedProducts)
    setOpen(false)
  }

  const handleCancel = () => {
    closeViaCancel.current = true
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      if (innerInputRef.current) {
        innerInputRef.current.focus()
      }
    } else if (closeViaCancel.current) {
      // Reset selections to parent's selected items when closed via cancel
      setSelectedProducts([...selectedItems])
      closeViaCancel.current = false
    }
  }, [open, selectedItems])

  // Add this effect to sync with parent's selected items
  useEffect(() => {
    setSelectedProducts((prev) =>
      prev.filter((product) =>
        selectedItems.some((item) => item.slug === product.slug),
      ),
    )
  }, [selectedItems])

  return (
    <div className="flex items-center justify-between">
      <div className="mr-2 w-full flex-1 rounded-full border border-gray-800">
        <div className="flex items-center">
          <input
            type="text"
            onFocus={() => setOpen(true)}
            placeholder="Search products"
            className="w-full rounded-l-full bg-white px-3 py-2 text-xs outline-hidden focus:border-none focus:ring-0 focus:outline-hidden lg:px-4 lg:text-sm"
          />
          <div className="flex h-6 items-center justify-center gap-x-1 rounded-r-full bg-white pr-1 lg:h-9 lg:pr-2">
            {query && (
              <button className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500">
                <FaTimes
                  onClick={clearInput}
                  className="text-[10px] text-white"
                />
              </button>
            )}
            <button className="flex h-5 w-5 cursor-default items-center justify-center rounded-full bg-black lg:h-7 lg:w-7">
              <FaSearch className="text-xs text-white lg:text-sm" />
            </button>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-nowrap shadow-md transition-colors hover:text-orange-600 lg:w-32 lg:text-base">
            Browse
          </button>
        </DialogTrigger>
        <DialogContent className="h-[80dvh] max-w-[95%] rounded-lg p-0 md:max-w-0 md:min-w-[40rem] [&>button]:hidden">
          <DialogTitle className="h-fit rounded-t-lg bg-[#E7E7E7] px-3 py-5">
            Add Products
          </DialogTitle>
          <div className="fixed top-16 m-2 flex h-[69dvh] w-[96%] flex-col items-start justify-between">
            <div className="max-h-10 w-full flex-1 rounded-full border border-gray-800">
              <div className="flex items-center">
                <input
                  type="text"
                  value={query}
                  onChange={handleChange}
                  placeholder="Search products"
                  ref={innerInputRef}
                  className="w-full rounded-l-full bg-white px-3 py-2 text-xs outline-hidden focus:border-none focus:ring-0 focus:outline-hidden lg:px-4 lg:text-sm"
                />
                <div className="flex h-6 items-center justify-center gap-x-1 rounded-r-full bg-white pr-1 lg:h-9 lg:pr-2">
                  {query && (
                    <button className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-500">
                      <FaTimes
                        onClick={clearInput}
                        className="text-[10px] text-white"
                      />
                    </button>
                  )}
                  <button className="flex h-5 w-5 cursor-default items-center justify-center rounded-full bg-black lg:h-7 lg:w-7">
                    <FaSearch className="text-xs text-white lg:text-sm" />
                  </button>
                </div>
              </div>
            </div>

            {/* Always show suggestions */}
            <div className="flex flex-col gap-y-2">
              {suggestions.map((product) => (
                <div
                  key={product.slug}
                  className="flex items-center justify-between rounded-lg border border-neutral-300 p-2"
                >
                  <div className="flex items-center gap-x-2">
                    <Checkbox
                      id={product.slug}
                      checked={selectedProducts.some(
                        (p) => p.slug === product.slug,
                      )}
                      onCheckedChange={() => handleProductSelect(product)}
                    />
                    <label
                      htmlFor={product.slug}
                      className="text-sm text-black"
                    >
                      {product.name}
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <ActionButtons onCancel={handleCancel} onSave={handleSave} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SearchProducts
