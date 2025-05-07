'use client'

import { RxHamburgerMenu } from 'react-icons/rx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState } from 'react'
import NavLinks from '@/components/layout/NavLinks'
import { IWebCategory } from '@/types'

export default function WebHamburgerMenu({
  categories,
}: {
  categories: IWebCategory[]
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <RxHamburgerMenu className="text-Red text-2xl" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="mt-20 px-2">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="mt-5 h-full">
          <NavLinks categories={categories} />
        </div>
      </SheetContent>
    </Sheet>
  )
}
