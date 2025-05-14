import Link from 'next/link'
import PrimaryButton from '@/components/common/PrimaryButton'
import { routes } from '@/config/routes'

export default function OrderConfirmationButtons({
  className = '',
}: {
  className?: string
}) {
  return (
    <div className={`flex w-full flex-col justify-between gap-3 ${className}`}>
      <div className="flex items-center gap-1">
        <p className="text-sm">Need Help?</p>
        <Link href={routes.contact} className="text-Red text-sm">
          Contact Us
        </Link>
      </div>
      <Link href={routes.collections} className="sm:w-auto">
        <PrimaryButton fullWidth>Continue shopping</PrimaryButton>
      </Link>
    </div>
  )
}
