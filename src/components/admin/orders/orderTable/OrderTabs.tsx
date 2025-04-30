import { orderTabs } from '@/data/tabs'

interface OrderTabsProps {
  tabs: typeof orderTabs
  selectedTab: string
  onSelectTab: (tabId: string) => void
  ordersCount: Record<string, number>
  isLoading?: boolean
}

export default function OrderTabs({
  tabs,
  selectedTab,
  onSelectTab,
  ordersCount,
  isLoading = false,
}: OrderTabsProps) {
  return (
    <div className="w-full overflow-x-auto pb-2 whitespace-nowrap lg:w-auto lg:pb-0">
      <ul className="flex justify-between lg:justify-center lg:space-x-1">
        {tabs.map((tab) => (
          <li key={tab.id} className="inline-block text-xs lg:text-sm">
            <button
              onClick={() => onSelectTab(tab.id)}
              className={`hover:bg-LightGrey relative block rounded-xl px-2 py-2 font-medium whitespace-nowrap transition-all xl:px-4 xl:py-2 ${
                selectedTab === tab.id ? 'bg-LightGrey text-Orange' : ''
              }`}
            >
              {tab.name} (
              {isLoading ? (
                <span className="animate-pulse rounded-full bg-gray-300 text-transparent">
                  0
                </span>
              ) : (
                <span className="text-xs lg:text-sm">
                  {ordersCount[tab.id]}
                </span>
              )}
              )
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
