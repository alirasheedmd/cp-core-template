'use client'

import { RxHamburgerMenu } from 'react-icons/rx'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useState, useEffect } from 'react'
import NavLinks from '@/components/layout/NavLinks'
import { IWebCategory } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function WebHamburgerMenu({
  categories,
}: {
  categories: IWebCategory[]
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHeaderBarVisible, setIsHeaderBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsHeaderBarVisible(currentScrollY <= lastScrollY)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <RxHamburgerMenu className="text-Red text-2xl" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className={`pb-3 ${
          isHeaderBarVisible
            ? 'top-[106px] h-[calc(100vh-106px)]'
            : 'top-[75px] h-[calc(100vh-75px)]'
        }`}
      >
        <ScrollArea>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="-mt-6 h-full px-5">
            <NavLinks categories={categories} />
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
