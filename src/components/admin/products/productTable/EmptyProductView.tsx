import { PiPackageThin } from 'react-icons/pi'

interface EmptyProductViewProps {
  message: string
}

const EmptyProductView: React.FC<EmptyProductViewProps> = ({ message }) => {
  return (
    <div className="flex h-[40vh] flex-col items-center justify-center gap-3">
      <PiPackageThin className="text-[6rem] text-gray-300" />
      <p className="text-sm">{message}</p>
    </div>
  )
}

export default EmptyProductView
