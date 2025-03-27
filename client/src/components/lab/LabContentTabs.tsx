import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface TabConfig {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export interface LabContentTabsProps {
  introTabs: TabConfig[];
  otherTabs: TabConfig[];
  activeModule: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  renderTabContent: (tabId: string) => React.ReactNode;
}

export default function LabContentTabs({
  introTabs,
  otherTabs,
  activeModule,
  activeTab,
  onTabChange,
  renderTabContent
}: LabContentTabsProps) {
  const { theme } = useTheme();
  const [currentTabs, setCurrentTabs] = useState<TabConfig[]>(introTabs);
  
  // Update tabs based on the active module
  useEffect(() => {
    if (activeModule === 'intro') {
      setCurrentTabs(introTabs);
    } else {
      setCurrentTabs(otherTabs);
    }
  }, [activeModule, introTabs, otherTabs]);

  // Handle tab click directly
  const handleTabClick = (tabId: string) => {
    console.log(`Tab clicked: ${tabId}`);
    onTabChange(tabId);
  };

  return (
    <div className={cn(
      "p-6 rounded-lg",
      theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
    )}>
      <div className="border-b pb-4 mb-4">
        {/* Custom tabs implementation without using SimpleTabs */}
        <div className="grid grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          {currentTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={cn(
                "flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all",
                activeTab === tab.id
                  ? theme === 'dark'
                    ? 'bg-gray-900 text-[#40E0D0] shadow-sm'
                    : 'bg-white text-[#00BCD4] shadow-sm'
                  : theme === 'dark'
                    ? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                    : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
              )}
            >
              {tab.icon && tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
        
      {/* Tab Content */}
      <div className="tab-content mt-6">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
}