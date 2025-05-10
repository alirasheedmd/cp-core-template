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
import useSWR from 'swr'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserIcon from '@/components/layout/UserIcon'
import { Separator } from '@/components/ui/separator'
import { IWebCategory } from '@/types'
import { getAllCategories } from '@/lib/dal'
import { Skeleton } from '@/components/ui/skeleton'

const fetcher = () => getAllCategories()

export default function WebHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const [isHeaderBarVisible, setIsHeaderBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { data: categories, isLoading } = useSWR<IWebCategory[]>(
    'categories',
    fetcher,
  )

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
            ? 'top-[93px] h-[calc(100vh-93px)]'
            : 'top-[65px] h-[calc(100vh-65px)]'
        }`}
      >
        <ScrollArea>
          <SheetHeader>
            <SheetTitle></SheetTitle>
          </SheetHeader>
          <div className="-mt-6 h-full px-5">
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(8)].map((_, index) => (
                  <Skeleton key={index} className="h-8 w-32" />
                ))}
              </div>
            ) : (
              categories && (
                <NavLinks
                  categories={categories}
                  onLinkClick={() => setIsOpen(false)}
                />
              )
            )}
          </div>
          <Separator className="my-4" />
          <UserIcon className="mx-5 md:hidden" />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
