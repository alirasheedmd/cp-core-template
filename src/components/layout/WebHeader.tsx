import { routes } from '@/config/routes'
import HeaderBar from './HeaderBar'
import Image from 'next/image'
import Link from 'next/link'
import HeaderIcons from './HeaderIcons'

const links = [
  {
    id: 1,
    name: 'Fire Fighting',
    href: routes.fireFighting,
  },
  {
    id: 2,
    name: 'Fire Alarm',
    href: routes.fireAlarm,
  },
  {
    id: 3,
    name: 'Fire Exit Doors',
    href: routes.fireExitDoors,
  },
  {
    id: 4,
    name: 'Safety Equipment',
    href: routes.safetyEquipment,
  },
  {
    id: 5,
    name: 'Life Safety',
    href: routes.lifeSafety,
  },
  {
    id: 6,
    name: 'Traffic Safety',
    href: routes.trafficSafety,
  },
  {
    id: 7,
    name: 'Catalog',
    href: routes.catalog,
  },
  {
    id: 8,
    name: 'Contact',
    href: routes.contact,
  },
]

export default function WebHeader() {
  return (
    <div className="fixed z-100 w-full border-b border-b-gray-200 bg-white shadow-sm">
      <HeaderBar />
      {/* Header */}
      <div className="container mx-auto flex items-center justify-between gap-x-5 py-2">
        <Link href={routes.home}>
          <Image src={'/logo.svg'} alt="logo" width={120} height={120} />
        </Link>

        {/* Links */}
        <div className="flex gap-x-5">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="text-Red font-medium underline-offset-2 hover:underline"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <HeaderIcons />
      </div>
    </div>
  )
}
