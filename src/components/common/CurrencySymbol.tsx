import Image from 'next/image'
import { formatCurrency, cn } from '@/lib/utils'

interface CurrencySymbolProps {
  amount: number | string
  className?: string
  symbolSize?: number
}

export default function CurrencySymbol({
  amount,
  className = '',
  symbolSize = 16,
}: CurrencySymbolProps) {
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Image
        src="/Saudi_Riyal_Symbol-2.svg"
        alt="SAR"
        width={symbolSize}
        height={symbolSize}
        className="inline-block"
      />
      <span>{formatCurrency(amount)}</span>
    </span>
  )
}
