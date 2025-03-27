import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface CodeExample {
  language: string;
  code: string;
  label?: string;
}

export interface CodeExampleProps {
  examples: CodeExample[];
  title?: string;
  description?: string;
  className?: string;
  defaultTab?: string;
}

const CodeExample: React.FC<CodeExampleProps> = ({
  examples,
  title,
  description,
  className,
  defaultTab
}) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(defaultTab || examples[0].language);
  const [copied, setCopied] = useState(false);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeExample = examples.find(example => example.language === activeTab) || examples[0];

  return (
    <div className={cn("rounded-lg overflow-hidden", className)}>
      {(title || description) && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      )}
      
      {examples.length > 1 && (
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 overflow-x-auto">
          {examples.map((example) => (
            <button
              key={example.language}
              onClick={() => setActiveTab(example.language)}
              className={cn(
                "px-4 py-2 text-sm font-medium focus:outline-none whitespace-nowrap",
                activeTab === example.language
                  ? "border-b-2 border-cyan-500 text-cyan-600 dark:text-cyan-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
              )}
            >
              {example.label || example.language}
            </button>
          ))}
        </div>
      )}
      
      <div className="relative">
        <pre className={cn(
          "px-4 py-3 overflow-x-auto text-sm font-mono",
          theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-800 text-gray-300'
        )}>
          <code>{activeExample.code}</code>
        </pre>
        
        <button
          onClick={() => handleCopy(activeExample.code)}
          className={cn(
            "absolute top-2 right-2 p-2 rounded-md transition-colors",
            "bg-gray-700/50 hover:bg-gray-700 text-gray-300"
          )}
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CodeExample;