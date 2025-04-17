"use client";

import { RxHamburgerMenu } from "react-icons/rx";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminTabs } from "@/data/adminTabs";
import { useState } from "react";

export default function AdminMenu() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="lg:hidden">
          <RxHamburgerMenu className="text-2xl text-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="px-2">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="mt-5 flex h-full flex-col justify-between">
          <ul className="space-y-2">
            {adminTabs.map((tab) => (
              <li key={tab.name}>
                <Link
                  href={tab.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-x-2 px-4 py-2 transition-all hover:bg-gray-100 ${
                    pathname.startsWith(tab.href)
                      ? "border-l-4 border-orange-600 text-orange-600"
                      : "border-l-4 border-transparent text-neutral-600"
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* <ul className="mb-5 space-y-2">
            <li>
              <Link
                href={adminSettingsTab.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-x-2 px-4 py-2 transition-all hover:bg-gray-100 ${
                  pathname.startsWith(adminSettingsTab.href)
                    ? "border-l-4 border-orange-600 text-orange-600"
                    : "border-l-4 border-transparent text-neutral-600"
                }`}
              >
                <span>{adminSettingsTab.icon}</span>
                {adminSettingsTab.name}
              </Link>
            </li>
          </ul> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
