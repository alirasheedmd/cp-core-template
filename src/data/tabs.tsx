///////////////////////////////////// Admin tabs //////////////////////////////////////
interface IAdminTab {
  name: string
  icon: React.ReactNode
  href: string
}

import { BiCart } from 'react-icons/bi'
import { BsTag } from 'react-icons/bs'
import { GoHome, GoStar } from 'react-icons/go'
import { HiOutlineUser } from 'react-icons/hi2'
import { IoSettingsOutline } from 'react-icons/io5'
import { routes } from '@/config/routes'

export const adminTabs: IAdminTab[] = [
  {
    name: 'Dashboard',
    icon: <GoHome className="text-xl" />,
    href: routes.admin.dashboard,
  },
  {
    name: 'Orders',
    icon: <BiCart className="text-xl" />,
    href: routes.admin.orders,
  },
  {
    name: 'Products',
    icon: <BsTag className="text-xl" />,
    href: routes.admin.products,
  },
  {
    name: 'Categories',
    icon: <GoStar className="text-xl" />,
    href: routes.admin.categories,
  },
  {
    name: 'Customers',
    icon: <HiOutlineUser className="text-xl" />,
    href: routes.admin.customers,
  },
]

export const adminSettingsTab: IAdminTab = {
  name: 'Settings',
  icon: <IoSettingsOutline className="text-xl" />,
  href: routes.admin.settings,
}

///////////////////////////////////// Product tabs //////////////////////////////////////
interface IProductTab {
  name: string
  id: string
}

export const productsTabs: IProductTab[] = [
  { name: 'All products', id: 'all-products' },
  { name: 'Active', id: 'active' },
  { name: 'Draft', id: 'draft' },
]

///////////////////////////////////// Order tabs //////////////////////////////////////
interface IOrderTab {
  name: string
  id: string
}

export const orderTabs: IOrderTab[] = [
  { name: 'All orders', id: 'all-orders' },
  { name: 'Pending', id: 'pending' },
  { name: 'Confirmed', id: 'confirmed' },
  { name: 'Shipped', id: 'shipped' },
  { name: 'Delivered', id: 'delivered' },
  { name: 'Returned', id: 'returned' },
  { name: 'Cancelled', id: 'cancelled' },
]

///////////////////////////////////// Category tabs //////////////////////////////////////
interface ICategoryTab {
  name: string
  id: string
}

export const categoriesTabs: ICategoryTab[] = [
  { name: 'All categories', id: 'all-categories' },
  { name: 'Enable', id: 'enable' },
  { name: 'Disable', id: 'disable' },
]
