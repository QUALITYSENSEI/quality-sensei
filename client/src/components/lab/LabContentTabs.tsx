import { useState, useEffect, useRef } from 'react';
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
  const [displayedTab, setDisplayedTab] = useState(activeTab);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Update tabs based on the active module
  useEffect(() => {
    if (activeModule === 'intro') {
      setCurrentTabs(introTabs);
    } else {
      setCurrentTabs(otherTabs);
    }
  }, [activeModule, introTabs, otherTabs]);

  // Sync displayed tab with active tab
  useEffect(() => {
    setDisplayedTab(activeTab);
  }, [activeTab]);
  
  // Direct DOM event handling for tab clicks
  useEffect(() => {
    const attachTabClickListeners = () => {
      if (!containerRef.current) return;
      
      const buttons = containerRef.current.querySelectorAll('[data-tab-id]');
      buttons.forEach(button => {
        button.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const tabId = button.getAttribute('data-tab-id');
          if (tabId) {
            console.log(`DOM click on tab: ${tabId}`);
            onTabChange(tabId);
            // Force a state update to ensure re-render
            setDisplayedTab(tabId);
            
            // Store the active tab in localStorage for persistence
            try {
              localStorage.setItem('seleniumLabActiveTab', tabId);
            } catch (e) {
              console.error("Failed to save tab state to localStorage", e);
            }
          }
        });
      });
    };
    
    // Run with a small timeout to ensure DOM is ready
    const timerId = setTimeout(() => {
      attachTabClickListeners();
    }, 100);
    
    return () => clearTimeout(timerId);
  }, [onTabChange, currentTabs]); // Re-attach listeners when tabs change

  return (
    <div 
      ref={containerRef}
      className={cn(
        "p-6 rounded-lg",
        theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
      )}
    >
      <div className="border-b pb-4 mb-4">
        {/* Direct HTML Tabs */}
        <div className="mb-2 px-1 text-center">
          <h4 className="text-sm font-medium text-gray-500">Click tabs to navigate (Fixed tabs)</h4>
        </div>
        <div className="flex justify-around mb-6 bg-gray-100 dark:bg-gray-800 rounded-md p-1">
          {currentTabs.map((tab) => {
            const isActive = displayedTab === tab.id;
            return (
              <a
                key={tab.id}
                href={`#${tab.id}`}
                data-tab-id={tab.id}
                onClick={(e) => {
                  e.preventDefault();
                  const tabId = tab.id;
                  console.log(`Direct anchor click: ${tabId}`);
                  onTabChange(tabId);
                  setDisplayedTab(tabId);
                }}
                className={cn(
                  "block py-2 px-4 rounded-md transition-all text-center",
                  isActive
                    ? theme === 'dark'
                      ? 'bg-gray-900 text-[#40E0D0] shadow-sm'
                      : 'bg-white text-[#00BCD4] shadow-sm'
                    : theme === 'dark'
                      ? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
                      : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
                )}
              >
                <div className="flex items-center justify-center gap-2">
                  {tab.icon && <span className="icon-container">{tab.icon}</span>}
                  <span>{tab.label}</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
        
      {/* Tab Content */}
      <div 
        className="tab-content mt-6" 
        id={`tab-panel-${displayedTab}`}
        role="tabpanel" 
        aria-labelledby={`tab-${displayedTab}`}
      >
        {renderTabContent(displayedTab)}
      </div>
    </div>
  );
}