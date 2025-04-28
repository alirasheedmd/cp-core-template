'use client'

import Link from 'next/link'
import Image from 'next/image'
import { FaBell, FaUser, FaSignOutAlt } from 'react-icons/fa'
import AdminMenu from './AdminMenu'
import { useState, useRef, useEffect } from 'react'
import { logout } from '@/app/actions/admin/auth/adminAuth'

export default function AdminHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="h-[63px] w-full bg-black">
      <div className="mx-auto my-auto flex items-center justify-between gap-x-3 px-5 py-4 lg:gap-x-0 lg:px-16 lg:py-2">
        {/* Logo */}
        <Link href="/" className="hidden shrink-0 rounded-sm lg:block">
          <Image
            src="/logo.svg"
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
          {/* Profile with Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 hover:bg-orange-700 lg:h-10 lg:w-10"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <FaUser className="text-white lg:text-lg" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
                <div className="py-1">
                  <form action={logout}>
                    <button
                      type="submit"
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FaSignOutAlt className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
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
  )
}
