'use client'
import { useState, useEffect, useRef } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import Image from 'next/image'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { dummyProducts as products } from '@/data/dummyProducts'
import { ActionButtons } from '@/components/common/ActionButtons'
import { IProduct } from '@/types'

export interface ISuggestion {
  type: 'product'
  _id: string
  name: string
  slug: string
  categoryId?: string
  categoryName?: string
  categorySlug?: string
  price: number
  stock: number
  image: string
  quantity?: number
  sku: string
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
  const closeViaCancel = useRef(false)

  // Fetch products and set initial 5 suggestions
  useEffect(() => {
    const fetchData = async () => {
      const allSuggestions = products.map((product: IProduct) => ({
        type: 'product' as const,
        _id: product.id,
        name: product.title,
        slug: product.slug,
        categoryId: undefined,
        categoryName: undefined,
        categorySlug: undefined,
        price: Number(product.price) || 0,
        stock: Number(product.currentStock) || 0,
        image: product.images[0] || '',
        sku: product.sku || '',
      }))

      setAllSuggestions(allSuggestions)
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
      setSelectedProducts([...selectedItems])
      closeViaCancel.current = false
    }
  }, [open, selectedItems])

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
          <button className="hover:text-Orange rounded-xl border border-neutral-300 bg-white px-4 py-2 text-sm text-nowrap shadow-md transition-colors lg:w-32 lg:text-base">
            Browse
          </button>
        </DialogTrigger>
        <DialogContent className="h-[80dvh] max-w-[95%] rounded-lg p-0 md:max-w-0 md:min-w-[40rem] [&>button]:hidden">
          <DialogTitle className="bg-LightGrey h-fit rounded-t-lg px-3 py-5">
            Add Products
          </DialogTitle>
          <div className="fixed top-16 m-2 flex h-[69dvh] w-[96%] flex-col items-start pb-4">
            <div className="w-full rounded-full border border-gray-800">
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

            {/* Product List */}
            <div className="my-4 w-full flex-1 space-y-2 overflow-y-auto">
              {suggestions.map((product) => (
                <div
                  key={product.slug}
                  className="flex items-center gap-4 rounded-lg border border-neutral-300 p-3 hover:bg-gray-50"
                >
                  <Checkbox
                    id={product.slug}
                    checked={selectedProducts.some(
                      (p) => p.slug === product.slug,
                    )}
                    onCheckedChange={() => handleProductSelect(product)}
                  />
                  <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        SKU: {product.sku}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="space-x-5 text-sm">
                        <span className="ml-2 text-gray-500">
                          {product.stock} available
                        </span>
                        <span className="font-medium text-gray-900">
                          Rs.{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>
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
