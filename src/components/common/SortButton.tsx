'use client'

import { BiSortAlt2 } from 'react-icons/bi'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useState } from 'react'

interface SortConfig {
  type: 'date' | 'name'
  direction: 'asc' | 'desc'
}

interface SortButtonProps {
  sortConfig: SortConfig | null
  onSortChange: (newConfig: SortConfig) => void
}

export default function SortButton({
  sortConfig,
  onSortChange,
}: SortButtonProps) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          className={`hover:bg-LightGrey hover:text-Orange flex h-7 w-7 items-center justify-center rounded-lg border border-gray-300 bg-neutral-50 transition-colors`}
        >
          <BiSortAlt2 className="text-lg" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="mr-1 w-fit space-y-3 text-sm">
        <button
          className={`hover:text-Orange block w-full px-3 text-left ${
            sortConfig?.type === 'date' && sortConfig.direction === 'asc'
              ? 'text-Orange'
              : ''
          }`}
          onClick={() => {
            onSortChange({ type: 'date', direction: 'asc' })
            setOpen(false)
          }}
        >
          Orders (Oldest to Newest)
        </button>
        <button
          className={`hover:text-Orange block w-full px-3 text-left ${
            sortConfig?.type === 'date' && sortConfig.direction === 'desc'
              ? 'text-Orange'
              : ''
          }`}
          onClick={() => {
            onSortChange({ type: 'date', direction: 'desc' })
            setOpen(false)
          }}
        >
          Orders (Newest to Oldest)
        </button>
        <button
          className={`hover:text-Orange block w-full px-3 text-left ${
            sortConfig?.type === 'name' && sortConfig.direction === 'asc'
              ? 'text-Orange'
              : ''
          }`}
          onClick={() => {
            onSortChange({ type: 'name', direction: 'asc' })
            setOpen(false)
          }}
        >
          Customer Name (A to Z)
        </button>
        <button
          className={`hover:text-Orange block w-full px-3 text-left ${
            sortConfig?.type === 'name' && sortConfig.direction === 'desc'
              ? 'text-Orange'
              : ''
          }`}
          onClick={() => {
            onSortChange({ type: 'name', direction: 'desc' })
            setOpen(false)
          }}
        >
          Customer Name (Z to A)
        </button>
      </PopoverContent>
    </Popover>
  )
}
