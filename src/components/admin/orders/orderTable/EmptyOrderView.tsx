import { PiPackageThin } from 'react-icons/pi'

interface EmptyOrderViewProps {
  message: string
}

export default function EmptyOrderView({ message }: EmptyOrderViewProps) {
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
      <PiPackageThin className="text-[6rem] text-gray-300" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
