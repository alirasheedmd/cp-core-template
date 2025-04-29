'use client'

import * as React from 'react'
import { X } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Command as CommandPrimitive } from 'cmdk'

export type Option = {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: Option[]
  onSelectedChange: (selected: Option[]) => void
  placeholder?: string
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onSelectedChange,
  placeholder = 'Select options...',
  className = '',
}: MultiSelectProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState('')

  const handleUnselect = React.useCallback(
    (option: Option) => {
      onSelectedChange(selected.filter((s) => s.value !== option.value))
    },
    [selected, onSelectedChange],
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (e.key === 'Delete' || e.key === 'Backspace') {
          if (input.value === '') {
            onSelectedChange(selected.slice(0, -1))
          }
        }
        if (e.key === 'Escape') {
          input.blur()
        }
      }
    },
    [selected, onSelectedChange],
  )

  const selectables = options.filter(
    (option) => !selected.some((s) => s.value === option.value),
  )

  return (
    <Command
      onKeyDown={handleKeyDown}
      className={`overflow-visible bg-transparent ${className}`}
    >
      <div className="group ring-offset-background focus-within:ring-ring rounded-md border border-black px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="secondary">
                {option.label}
                <button
                  className="ring-offset-background focus:ring-ring ml-1 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option)
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                </button>
              </Badge>
            )
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="placeholder:text-muted-foreground ml-2 flex-1 bg-transparent text-[15px] outline-none"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="bg-popover text-popover-foreground animate-in absolute top-0 z-10 w-full rounded-md border shadow-md outline-none">
              <CommandGroup className="max-h-40 overflow-y-auto">
                {selectables.map((option) => {
                  return (
                    <CommandItem
                      key={option.value}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                      }}
                      onSelect={() => {
                        setInputValue('')
                        onSelectedChange([...selected, option])
                      }}
                      className={'cursor-pointer'}
                    >
                      {option.label}
                    </CommandItem>
                  )
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  )
}
