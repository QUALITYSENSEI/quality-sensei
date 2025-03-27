import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

// Add type definition for window object
declare global {
  interface Window {
    setTab: (tab: string) => void;
  }
}

export interface SimpleTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface SimpleTabsProps {
  tabs: SimpleTab[];
  activeTab: string;
  onChange: (tabId: string) => void;
  className?: string;
}

export const SimpleTabs: React.FC<SimpleTabsProps> = ({
  tabs,
  activeTab,
  onChange,
  className
}) => {
  const { theme } = useTheme();
  
  const handleClick = (tabId: string) => {
    console.log(`SimpleTabs - Clicked tab: ${tabId}`);
    // Add direct console log for debugging
    console.log('Current props:', { tabs, activeTab, className });
    
    // Use a direct state setter function to bypass any potential event issues
    // This will be a more reliable way to update the state
    if (typeof window !== 'undefined' && window.setTab) {
      window.setTab(tabId);
    } else {
      // Fallback to the original onChange prop
      onChange(tabId);
    }
  };
  
  return (
    <div className={cn("grid grid-cols-3 mb-6 bg-gray-100 dark:bg-gray-800 rounded-md p-1", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => handleClick(tab.id)}
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
  );
};

interface SimpleTabPanelsProps {
  activeTab: string;
  children: React.ReactNode;
}

export const SimpleTabPanels: React.FC<SimpleTabPanelsProps> = ({ activeTab, children }) => {
  // Filter React children to only show the matching tab panel
  const childrenArray = React.Children.toArray(children);
  
  const activeChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.props.tabId === activeTab
  );
  
  return <div className="tab-content">{activeChild}</div>;
};

interface SimpleTabPanelProps {
  tabId: string;
  children: React.ReactNode;
}

export const SimpleTabPanel: React.FC<SimpleTabPanelProps> = ({ children }) => {
  return <div className="tab-panel">{children}</div>;
};