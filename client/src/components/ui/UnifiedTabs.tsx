import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { Copy, Check } from 'lucide-react';

// Define common interfaces for all tab types
export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  code?: string; // Optional for code tabs
}

// Basic tab properties shared by all tab variants
interface BaseTabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  className?: string;
  variant?: 'default' | 'underlined' | 'pills' | 'terminal' | 'labContent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  contentClassName?: string;
  disableAnimation?: boolean;
  storageKey?: string; // For persisting active tab in localStorage
}

// Code-specific tab properties
interface CodeTabsProps extends BaseTabsProps {
  variant: 'terminal';
  title?: string;
  description?: string;
  showCopyButton?: boolean;
}

// Lab content-specific tab properties
interface LabContentTabsProps extends BaseTabsProps {
  variant: 'labContent';
  renderContent?: (tabId: string) => React.ReactNode;
}

// Combined props with all possible options
type UnifiedTabsProps = BaseTabsProps | CodeTabsProps | LabContentTabsProps;

// Helper to determine if props are CodeTabsProps
const isCodeTabs = (props: UnifiedTabsProps): props is CodeTabsProps => {
  return props.variant === 'terminal';
};

// Helper to determine if props are LabContentTabsProps
const isLabContentTabs = (props: UnifiedTabsProps): props is LabContentTabsProps => {
  return props.variant === 'labContent';
};

/**
 * Unified Tabs component that handles different tab styles with a consistent API
 */
const UnifiedTabs: React.FC<UnifiedTabsProps> = (props) => {
  const { theme } = useTheme();
  
  // Extract common props
  const {
    tabs,
    activeTab: propActiveTab,
    onChange,
    className,
    variant = 'default',
    size = 'md',
    fullWidth = false,
    contentClassName,
    disableAnimation = false,
    storageKey
  } = props;
  
  // Tab state
  const [activeTab, setActiveTab] = useState<string>(() => {
    // Initialize from props or localStorage if provided
    if (propActiveTab) return propActiveTab;
    if (storageKey && typeof window !== 'undefined') {
      const saved = localStorage.getItem(storageKey);
      if (saved && tabs.some(tab => tab.id === saved)) return saved;
    }
    return tabs.length > 0 ? tabs[0].id : '';
  });
  
  // Copy state for code tabs
  const [copied, setCopied] = useState(false);
  
  // Ref for direct DOM manipulation when needed
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Sync with prop changes
  useEffect(() => {
    if (propActiveTab && propActiveTab !== activeTab) {
      setActiveTab(propActiveTab);
    }
  }, [propActiveTab]);
  
  // Save to localStorage when tab changes
  useEffect(() => {
    if (storageKey && typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, activeTab);
      } catch (e) {
        console.error('Failed to save tab state to localStorage', e);
      }
    }
  }, [activeTab, storageKey]);
  
  // Handle tab change
  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
    setActiveTab(tabId);
    
    if (onChange) {
      onChange(tabId);
    }
    
    // No debugging global tab change function needed anymore
  };
  
  // Copy code to clipboard for code tabs
  const copyToClipboard = () => {
    if (isCodeTabs(props)) {
      const activeTabItem = tabs.find(tab => tab.id === activeTab);
      if (activeTabItem?.code) {
        navigator.clipboard.writeText(activeTabItem.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };
  
  // Determine style classes based on variant
  const getTabClassNames = (tab: TabItem) => {
    const isActive = tab.id === activeTab;
    const baseClasses = "flex items-center gap-2 transition-all";
    const activeBaseColor = theme === 'dark' ? 'text-[#40E0D0]' : 'text-[#00BCD4]';
    const inactiveBaseColor = theme === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900';
    
    // Size variations
    const sizeClasses = {
      sm: "text-xs py-1 px-2",
      md: "text-sm py-2 px-3",
      lg: "text-base py-2.5 px-4"
    }[size];
    
    // Width variations
    const widthClasses = fullWidth ? "justify-center flex-1" : "justify-center";
    
    // Variant-specific styles
    switch (variant) {
      case 'terminal':
        return cn(
          baseClasses,
          "px-3 py-1 text-xs font-medium rounded-t",
          isActive
            ? theme === 'dark' ? "bg-gray-800 text-white" : "bg-gray-700 text-white"
            : "text-gray-400 hover:text-gray-200"
        );
        
      case 'underlined':
        return cn(
          baseClasses,
          sizeClasses,
          widthClasses,
          "border-b-2 -mb-px",
          isActive
            ? `border-current ${activeBaseColor} font-medium`
            : `border-transparent ${inactiveBaseColor}`,
        );
        
      case 'pills':
        return cn(
          baseClasses,
          sizeClasses,
          widthClasses,
          "rounded-full font-medium",
          isActive
            ? theme === 'dark'
              ? "bg-gray-800 text-[#40E0D0] shadow-sm"
              : "bg-white text-[#00BCD4] shadow-sm"
            : theme === 'dark'
              ? "hover:bg-gray-700/50"
              : "hover:bg-gray-100/80",
          inactiveBaseColor
        );
        
      case 'labContent':
        return cn(
          baseClasses,
          "py-2 px-4 rounded-md text-center",
          isActive
            ? theme === 'dark'
              ? 'bg-gray-900 text-[#40E0D0] shadow-sm'
              : 'bg-white text-[#00BCD4] shadow-sm'
            : theme === 'dark'
              ? 'text-gray-400 hover:bg-gray-700/50 hover:text-gray-200'
              : 'text-gray-600 hover:bg-gray-200/50 hover:text-gray-900'
        );
        
      case 'default':
      default:
        return cn(
          baseClasses,
          sizeClasses,
          widthClasses,
          "rounded-md font-medium",
          isActive
            ? theme === 'dark'
              ? "bg-gray-800 text-[#40E0D0]"
              : "bg-white text-[#00BCD4] shadow-sm"
            : `${inactiveBaseColor} hover:bg-gray-100 dark:hover:bg-gray-800`
        );
    }
  };
  
  // Render tab containers based on variant
  const renderTabContainer = () => {
    const commonTabListClasses = "flex";
    
    // Variant specific container styles
    const containerClasses = {
      default: cn(
        commonTabListClasses,
        "mb-4 bg-gray-100 dark:bg-gray-800 rounded-md p-1",
        fullWidth ? "w-full" : "w-fit"
      ),
      underlined: cn(
        commonTabListClasses,
        "mb-4 border-b border-gray-200 dark:border-gray-700",
        fullWidth ? "w-full justify-around" : "w-fit"
      ),
      pills: cn(
        commonTabListClasses,
        "mb-4 bg-gray-100 dark:bg-gray-800 rounded-full p-1",
        fullWidth ? "w-full" : "w-fit"
      ),
      terminal: cn(
        commonTabListClasses,
        "items-center border-b border-gray-700",
        fullWidth ? "w-full" : "w-fit"
      ),
      labContent: cn(
        commonTabListClasses,
        "justify-around mb-6 bg-gray-100 dark:bg-gray-800 rounded-md p-1",
        fullWidth ? "w-full" : "w-fit"
      ),
    }[variant];
    
    return (
      <div className={containerClasses}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabChange(tab.id)}
            data-tab-id={tab.id}
            className={getTabClassNames(tab)}
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span>{tab.label}</span>
          </button>
        ))}
        
        {/* Copy button for terminal variant */}
        {isCodeTabs(props) && props.showCopyButton && (
          <button
            onClick={copyToClipboard}
            className="p-1.5 ml-auto rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
            title="Copy to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>
    );
  };
  
  // Render the active tab's content
  const renderContent = () => {
    const activeTabItem = tabs.find(tab => tab.id === activeTab);
    
    if (!activeTabItem) {
      return <div>No tab selected</div>;
    }
    
    // For code tabs, render the code
    if (isCodeTabs(props)) {
      return (
        <pre className="p-4 overflow-x-auto font-mono text-sm">
          <code>{activeTabItem.code}</code>
        </pre>
      );
    }
    
    // For lab content tabs, use the render function if provided
    if (isLabContentTabs(props) && props.renderContent) {
      return props.renderContent(activeTab);
    }
    
    // Default to using the tab's content prop
    return activeTabItem.content;
  };
  
  // Determine container classes based on variant
  const containerVariantClasses = {
    default: "",
    underlined: "",
    pills: "",
    terminal: cn(
      "terminal p-0 rounded-lg shadow-lg overflow-hidden",
      theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-gray-200"
    ),
    labContent: cn(
      "p-6 rounded-lg",
      theme === "dark" ? "bg-gray-800" : "bg-white shadow-sm"
    ),
  }[variant];
  
  return (
    <div 
      ref={containerRef}
      className={cn(containerVariantClasses, className)}
    >
      {/* Title and description for terminal variant */}
      {isCodeTabs(props) && (props.title || props.description) && (
        <div className="p-4 border-b border-gray-700">
          {props.title && <h3 className="text-lg font-medium mb-1 text-white">{props.title}</h3>}
          {props.description && <p className="text-sm text-gray-300">{props.description}</p>}
        </div>
      )}
      
      {/* Terminal header with dots for terminal variant */}
      {isCodeTabs(props) && (
        <div className="flex items-center px-4 py-2 border-b border-gray-700">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500 ml-2"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
            <div className="ml-4 flex items-center">
              {renderTabContainer()}
            </div>
          </div>
        </div>
      )}
      
      {/* Regular tab container for non-terminal variants */}
      {variant !== 'terminal' && renderTabContainer()}
      
      {/* Content area */}
      <div 
        className={cn(
          "tab-content transition-opacity",
          !disableAnimation && "duration-200",
          contentClassName
        )}
        id={`tab-panel-${activeTab}`}
        role="tabpanel" 
        aria-labelledby={`tab-${activeTab}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default UnifiedTabs;