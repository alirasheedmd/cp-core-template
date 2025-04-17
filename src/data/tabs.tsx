///////////////////////////////////// Admin tabs //////////////////////////////////////
interface IAdminTab {
  name: string;
  icon: React.ReactNode;
  href: string;
}

// import { BiCart } from "react-icons/bi";
import { BsTag } from "react-icons/bs";
import { GoHome } from "react-icons/go";
import { IoSettingsOutline } from "react-icons/io5";

export const adminTabs: IAdminTab[] = [
  {
    name: "Dashboard",
    icon: <GoHome className="text-xl" />,
    href: "/dashboard",
  },
  // {
  //   name: "Orders",
  //   icon: <BiCart className="text-xl" />,
  //   href: "/orders",
  // },
  {
    name: "Products",
    icon: <BsTag className="text-xl" />,
    href: "/products",
  },
];

export const adminSettingsTab: IAdminTab = {
  name: "Settings",
  icon: <IoSettingsOutline className="text-xl" />,
  href: "/settings",
};

///////////////////////////////////// Product tabs //////////////////////////////////////
interface IProductTab {
  name: string;
  id: string;
}

export const productsTabs: IProductTab[] = [
  { name: "All products", id: "all-products" },
  { name: "Active", id: "active" },
  { name: "Draft", id: "draft" },
];

///////////////////////////////////// Order tabs //////////////////////////////////////
interface IOrderTab {
  name: string;
  id: string;
}

export const orderTabs: IOrderTab[] = [
  { name: "All orders", id: "all-orders" },
  { name: "Pending", id: "pending" },
  { name: "Confirmed", id: "confirmed" },
  { name: "Shipped", id: "shipped" },
  { name: "Delivered", id: "delivered" },
  { name: "Returned", id: "returned" },
  { name: "Cancelled", id: "cancelled" },
];
