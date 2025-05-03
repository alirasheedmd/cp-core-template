'use client'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { ProductFormValues } from './ProductInfo'
import { Button } from '@/components/ui/button'
import CategoryItem from './CategoryItem'
import AddCategory from './AddCategory'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { dummyCategories } from '@/data/dummyCategories'

export default function Categories() {
  const { setValue, watch } = useFormContext<ProductFormValues>()
  const selectedCategories = watch('categories') || []
  const [open, setOpen] = useState(false)

  const handleCategoryChange = (categoryName: string) => {
    const currentCategories = selectedCategories || []
    if (currentCategories.includes(categoryName)) {
      setValue(
        'categories',
        currentCategories.filter((cat) => cat !== categoryName),
      )
    } else {
      setValue('categories', [...currentCategories, categoryName])
    }
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-sm font-semibold">Categories</h2>
        {/* Add Category Button */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="text-Blue px-2 text-xs font-semibold"
            >
              +ADD CATEGORIES
            </Button>
          </DialogTrigger>
          <DialogContent className="min-w-[50rem] p-0 [&>button]:hidden">
            <DialogHeader>
              <DialogTitle className="bg-LightGrey rounded-t-lg px-3 py-3 text-xl font-semibold">
                Add Categories
              </DialogTitle>
            </DialogHeader>
            <AddCategory setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      {/* Vertical line for the entire list */}
      <div className="absolute top-[3.4rem] bottom-[18px] left-0 w-px bg-black"></div>
      <ul className="space-y-2">
        {dummyCategories.map((category) => (
          <CategoryItem
            key={category._id}
            name={category.name}
            isSelected={selectedCategories.includes(category.name)}
            onChange={() => handleCategoryChange(category.name)}
          />
        ))}
      </ul>
    </div>
  )
}
