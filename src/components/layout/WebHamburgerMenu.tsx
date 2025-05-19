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
import { Separator } from '@/components/ui/separator'
import { IWebCategory } from '@/types'
import { getAllCategories } from '@/lib/dal'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'

const fetcher = () => getAllCategories()

export default function WebHamburgerMenu() {
  const router = useRouter()
  const { isAuthenticated, user, isLoading: authLoading, openAuth } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isHeaderBarVisible, setIsHeaderBarVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { data: categories, isLoading: categoriesLoading } = useSWR<
    IWebCategory[]
  >('categories', fetcher)

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
            {categoriesLoading ? (
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
          <div className="mx-5 md:hidden">
            {authLoading ? (
              <Avatar className="border-Red border-2">
                <Skeleton className="h-full w-full rounded-full bg-white" />
              </Avatar>
            ) : isAuthenticated && user ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="border-Red border-2">
                    <div className="flex h-full w-full items-center justify-center bg-gray-100 text-sm font-medium">
                      {user.email.split('@')[0].charAt(0).toUpperCase()}
                    </div>
                  </Avatar>
                  <button
                    onClick={() => {
                      router.push('/profile')
                      setIsOpen(false)
                    }}
                    className="hover:text-Red text-sm font-medium transition-colors"
                  >
                    {user.email.split('@')[0]}
                  </button>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    // Add logout functionality here
                    setIsOpen(false)
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  openAuth('signin')
                  setIsOpen(false)
                }}
              >
                Sign In
              </Button>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
