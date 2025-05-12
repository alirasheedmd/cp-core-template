import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  fullWidth?: boolean
  className?: string
}

export default function PrimaryButton({
  children,
  variant = 'primary',
  fullWidth = false,
  className,
  ...props
}: PrimaryButtonProps) {
  const baseStyles =
    'rounded-full py-3 text-base font-semibold transition-all duration-300 hover:scale-105'

  const variants = {
    primary: 'bg-Red text-white',
    secondary: 'bg-Blue text-white hover:bg-Blue/90',
    outline: 'border-2 border-Red text-Red hover:bg-Red/10',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        fullWidth && 'w-full',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
