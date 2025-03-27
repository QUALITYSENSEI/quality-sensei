import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { SimpleTabs } from '@/components/ui/SimpleTabs';

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

  // Debug tab changes
  useEffect(() => {
    // For testing purposes
    if (typeof window !== 'undefined') {
      // @ts-ignore - for testing purposes
      window.setTab = (tab: string) => {
        console.log(`Setting tab via global function to: ${tab}`);
        onTabChange(tab);
      };
    }
  }, [onTabChange]);

  return (
    <div className={cn(
      "p-6 rounded-lg",
      theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
    )}>
      <div className="border-b pb-4 mb-4">
        <SimpleTabs
          tabs={currentTabs}
          activeTab={activeTab}
          onChange={onTabChange}
        />
      </div>
        
      {/* Tab Content */}
      <div className="tab-content mt-6">
        {renderTabContent(activeTab)}
      </div>
    </div>
  );
}