'use client'
import { ProductFormProps } from './LeftSideForm'
import { MultiSelect, Option } from '@/components/common/MultiSelect'

export default function Categories({ categories }: ProductFormProps) {
  const selectedCategories: Option[] = []
  const subcategoryOptions: Option[] = categories.map((sub) => ({
    value: sub.id,
    label: sub.name,
  }))

  console.log('selected categories', selectedCategories)

  return (
    <div className="relative">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-sm font-semibold">Categories</h2>
      </div>
      {/* Vertical line for the entire list */}
      <div className="absolute top-[3.4rem] bottom-[18px] left-0 w-px bg-black"></div>
      <MultiSelect
        options={subcategoryOptions}
        // selected={selectedCategories}
        // onSelectedChange={handleCategoryChange}
        placeholder="Select categories..."
      />
    </div>
  )
}
