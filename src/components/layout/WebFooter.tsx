'use client'
import { FaFacebook } from 'react-icons/fa'
import { GrInstagram } from 'react-icons/gr'
import { BsTwitterX } from 'react-icons/bs'
import { Separator } from '@/components/ui/separator'
import { useState, useEffect } from 'react'
import { routes } from '@/config/routes'
import Link from 'next/link'
import { LuDot } from 'react-icons/lu'

const footerLinks = [
  {
    label: 'Refund Policy',
    href: routes.footer.refundPolicy,
  },
  {
    label: 'Privacy Policy',
    href: routes.footer.privacyPolicy,
  },
  {
    label: 'Terms of Service',
    href: routes.footer.termsOfService,
  },
  {
    label: 'Shipping Policy',
    href: routes.footer.shippingPolicy,
  },
  {
    label: 'Contact Information',
    href: routes.footer.contactInformation,
  },
]

export default function WebFooter() {
  const [year, setYear] = useState<number>(2025)

  useEffect(() => {
    setYear(new Date().getFullYear())
  }, [])

  return (
    <div className="my-10 w-full">
      <div className="text-Red mb-10 flex items-center justify-center gap-x-5 text-xl">
        <FaFacebook />
        <GrInstagram />
        <BsTwitterX />
      </div>

      {/* Footer Links */}
      <Separator className="my-5" />
      <div className="container mx-auto px-2">
        <div className="text-Red flex flex-wrap items-center justify-center gap-2 text-sm">
          <p className="text-center">&copy; {year} Safety Vision</p>
          {footerLinks.map((link) => (
            <div key={link.label} className="flex items-center">
              <LuDot />
              <Link
                href={link.href}
                className="underline-offset-2 hover:underline"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* CR - VAT */}
        <div className="mt-5 flex items-center justify-center gap-x-10">
          <p className="text-Red">
            <span className="mr-2 font-semibold">CR</span>1113003154
          </p>
          <p className="text-Red">
            <span className="mr-2 font-semibold">VAT</span>311188513200003
          </p>
        </div>
      </div>
    </div>
  )
}
