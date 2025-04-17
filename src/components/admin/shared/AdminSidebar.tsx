"use client";
import { adminSettingsTab, adminTabs } from "@/utils/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden h-[calc(100vh-63px)] w-72 rounded-tl-2xl bg-neutral-50 px-3 py-5 lg:block">
      <div className="flex h-full flex-col justify-between">
        <ul className="space-y-2">
          {adminTabs.map((tab) => (
            <li key={tab.name}>
              <Link
                href={tab.href}
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

        <ul className="space-y-2">
          <li>
            <Link
              href={adminSettingsTab.href}
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
        </ul>
      </div>
    </aside>
  );
}
