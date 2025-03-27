import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';

interface Tab {
  id: string;
  label: string;
  code: string;
}

interface TerminalCodeTabsProps {
  tabs: Tab[];
  title?: string;
  description?: string;
  className?: string;
}

const TerminalCodeTabs = ({
  tabs,
  title,
  description,
  className,
}: TerminalCodeTabsProps) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    const codeToDisplay = tabs.find(tab => tab.id === activeTab)?.code || '';
    navigator.clipboard.writeText(codeToDisplay);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCode = tabs.find(tab => tab.id === activeTab)?.code || '';

  return (
    <div className={cn(
      "terminal p-0 rounded-lg shadow-lg overflow-hidden",
      theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-gray-200",
      className
    )}>
      {title && (
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-medium mb-1 text-white">{title}</h3>
          {description && (
            <p className="text-sm text-gray-300">{description}</p>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 ml-2"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 ml-2"></div>
          <div className="ml-4 flex items-center">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-t transition-colors",
                  activeTab === tab.id
                    ? theme === 'dark' 
                      ? "bg-gray-800 text-white" 
                      : "bg-gray-700 text-white"
                    : "text-gray-400 hover:text-gray-200"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      
      <pre className="p-4 overflow-x-auto font-mono text-sm">
        <code>{activeCode}</code>
      </pre>
    </div>
  );
};

export default TerminalCodeTabs;