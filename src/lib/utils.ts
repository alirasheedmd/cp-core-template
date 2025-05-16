import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import prettyBytes from 'pretty-bytes'
import { CartItem } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertToMb = (bytes: number) => {
  return prettyBytes(bytes, {
    bits: false,
    maximumFractionDigits: 1,
    space: false,
  })
}

export const formatCurrency = (amount: number | string) => {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount
  return numericAmount?.toFixed(2)
}

const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'SAR',
  style: 'currency',
  minimumFractionDigits: 2,
})

export function formatCurrency2(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount)
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount))
  } else {
    return 'NaN'
  }
}

export const round2 = (value: number | string) => {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100 // avoid rounding errors
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100
  } else {
    throw new Error('value is not a number nor a string')
  }
}

export const formatError = (error: any): string => {
  if (error.name === 'ZodError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return `${error.errors[field].path}: ${errorMessage}` // field: errorMessage
    })
    return fieldErrors.join('. ')
  } else if (error.name === 'ValidationError') {
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const errorMessage = error.errors[field].message
      return errorMessage
    })
    return fieldErrors.join('. ')
  } else {
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message)
  }
}

export const calcPrice = (items: CartItem[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + item.price * item.qty, 0),
    ),
    shippingPrice = round2(itemsPrice > 500 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice)
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  }
}