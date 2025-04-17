import Link from "next/link";
import Image from "next/image";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import AdminMenu from "./AdminMenu";

export default function AdminHeader() {
  return (
    <nav className="h-[63px] w-full bg-black">
      <div className="mx-auto my-auto flex items-center justify-between gap-x-3 px-5 py-4 lg:gap-x-0 lg:px-16 lg:py-2">
        {/* Logo */}
        <Link href="/" className="hidden shrink-0 rounded-sm lg:block">
          <Image
            src="/logo.png"
            alt="logo"
            height={40}
            width={110}
            className="h-auto w-[4.5rem] object-contain p-1 md:w-20"
            unoptimized
          />
        </Link>
        {/* Hamburger */}
        <AdminMenu />

        {/* Icons */}
        <div className="flex gap-x-4">
          {/* Bell */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 hover:bg-orange-700 lg:h-10 lg:w-10">
            <FaBell className="text-white lg:text-lg" />
          </button>
          {/* Profile */}
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 hover:bg-orange-700 lg:h-10 lg:w-10">
            <FaUser className="text-white lg:text-lg" />
          </button>
        </div>
      </div>
      {/* <div className="flex h-full w-full items-center justify-between px-3 lg:justify-center">
        <HamburgerMenu />
        <Link href="/" className="my-auto shrink-0">
          <Image
            src="/logo.png"
            alt="logo"
            height={40}
            width={110}
            className="h-auto w-[4.5rem] object-contain p-1 md:w-20"
            unoptimized
          />
        </Link>
        <div className="text-transparent lg:hidden">AB</div>
      </div> */}
    </nav>
  );
}
