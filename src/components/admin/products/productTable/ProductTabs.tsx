interface Tab {
  id: string;
  name: string;
}

interface ProductTabsProps {
  tabs: Tab[];
  selectedTab: string;
  onSelectTab: (tabId: string) => void;
  productsCount: Record<string, number>;
}

const ProductTabs: React.FC<ProductTabsProps> = ({
  tabs,
  selectedTab,
  onSelectTab,
  productsCount,
}) => {
  return (
    <div className="w-full overflow-x-auto pb-2 whitespace-nowrap lg:w-auto lg:pb-0">
      <ul className="flex justify-between lg:justify-center lg:space-x-1">
        {tabs.map((tab) => (
          <li key={tab.id} className="inline-block text-xs lg:text-sm">
            <button
              onClick={() => onSelectTab(tab.id)}
              className={`hover:bg-LightGrey relative block cursor-pointer rounded-xl px-2 py-2 font-medium whitespace-nowrap transition-all xl:px-4 xl:py-2 ${
                selectedTab === tab.id
                  ? "bg-LightGrey text-orange-600"
                  : "text-black"
              }`}
            >
              {tab.name} (
              <span className="text-xs lg:text-sm">
                {productsCount[tab.id]}
              </span>
              )
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductTabs;
