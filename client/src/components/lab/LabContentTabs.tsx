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
  const [currentTabs, setCurrentTabs] = useState<TabConfig[]>(activeModule === 'intro' ? introTabs : otherTabs);
  
  // Update tabs based on the active module
  useEffect(() => {
    if (activeModule === 'intro') {
      setCurrentTabs(introTabs);
    } else {
      setCurrentTabs(otherTabs);
    }
  }, [activeModule, introTabs, otherTabs]);

  function handleDirectTabClick(tabId: string) {
    // Handle tab change directly without any intermediary
    console.log(`Direct tab click: ${tabId}`);
    onTabChange(tabId);
  }

  return (
    <div className={cn(
      "p-6 rounded-lg",
      theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
    )}>
      <div className="border-b pb-4 mb-4">
        {/* Direct tab implementation without any subcomponents */}
        <div className="grid grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          {currentTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                data-tab-id={tab.id}
                aria-selected={isActive}
                aria-controls={`tab-panel-${tab.id}`}
                onClick={() => handleDirectTabClick(tab.id)}
                className={cn(
                  "flex items-center justify-center gap-2 py-2 px-3 rounded-md transition-all",
                  isActive
                    ? theme === 'dark'
                      ? 'bg-gray-900 text-[#40E0D0] shadow-sm'
                      : 'bg-white text-[#00BCD4] shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                      : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                )}
              >
                {tab.icon && <span className="icon-container">{tab.icon}</span>}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
        
      {/* Tab Content */}
      <div 
        className="tab-content mt-6" 
        id={`tab-panel-${activeTab}`}
        role="tabpanel" 
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
}