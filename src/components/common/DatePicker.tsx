'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DatePickerProps {
  date?: Date
  onChange: (date?: Date) => void
  label?: string
  className?: string
}

export function DatePicker({
  date,
  onChange,
  label = 'Pick a date',
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [selected, setSelected] = React.useState<Date | undefined>(date)

  // Convert the date to UTC to avoid timezone issues
  const displayDate = date
    ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    : undefined

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {displayDate ? format(displayDate, 'PPP') : <span>{label}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarComponent
          mode="single"
          selected={selected}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              // Create a UTC date to avoid timezone issues
              const newDate = new Date(
                Date.UTC(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  selectedDate.getDate(),
                ),
              )
              setSelected(newDate)
              onChange(newDate)
            } else {
              setSelected(undefined)
              onChange(undefined)
            }
            setOpen(false)
          }}
          disabled={(date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  )
}
