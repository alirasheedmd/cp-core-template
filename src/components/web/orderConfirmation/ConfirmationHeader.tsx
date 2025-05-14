import { IoIosCheckmarkCircleOutline } from 'react-icons/io'

interface ConfirmationHeaderProps {
  firstName: string
  lastName: string
  orderNumber: string
}

export default function ConfirmationHeader({
  firstName,
  lastName,
  orderNumber,
}: ConfirmationHeaderProps) {
  return (
    <div className="flex flex-col items-start gap-y-2">
      <div className="flex items-center gap-2">
        <IoIosCheckmarkCircleOutline className="text-Red h-7 w-7" />
        <span className="text-lg font-semibold">
          Thank you, {firstName} {lastName}!
        </span>
      </div>
      <span className="text-sm text-gray-500">Order #{orderNumber}</span>
    </div>
  )
}
