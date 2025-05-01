import Link from 'next/link'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { BiArrowBack } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import PrintOrderButton from './PrintOrderButton'
import { IOrder } from '@/types'

interface MobileHeaderProps {
  orderId: string
  order: IOrder
}

export default function MobileHeader({ orderId, order }: MobileHeaderProps) {
  return (
    <div className="flex items-center justify-between p-5 lg:hidden">
      <Link href={`/admin/orders`}>
        <BiArrowBack className="text-lg" />
      </Link>
      <Popover>
        <PopoverTrigger asChild>
          <button className="hover:bg-LightGrey rounded-lg p-1 font-bold transition-colors">
            <BsThreeDots className="text-lg" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-44 space-y-3 text-sm" align="end">
          <Link
            href={`/admin/orders/${orderId}/edit`}
            className="bg-LightGrey hover:text-Orange block w-full rounded-lg px-3 py-1.5 transition-colors"
          >
            Edit
          </Link>
          <PrintOrderButton
            order={order}
            orderId={orderId}
            className="w-full rounded-lg px-3 text-left font-normal"
          />
          <Link
            href="#"
            className="bg-LightGrey hover:text-Orange block w-full rounded-lg px-3 py-1.5 transition-colors"
          >
            View order status
          </Link>
        </PopoverContent>
      </Popover>
    </div>
  )
}
