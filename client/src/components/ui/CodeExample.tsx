import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import UnifiedTabs from './UnifiedTabs';

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

/**
 * A component for displaying code examples with syntax highlighting in multiple languages
 */
export default function CodeExample({
  examples,
  title,
  description,
  className,
  defaultTab
}: CodeExampleProps) {
  const { theme } = useTheme();
  
  // Create tabs from examples
  const tabs = examples.map(example => ({
    id: example.language,
    label: example.label || example.language,
    code: example.code
  }));
  
  // Set default active tab
  const initialTab = defaultTab || (tabs.length > 0 ? tabs[0].id : '');
  
  return (
    <div className={cn('code-example', className)}>
      <UnifiedTabs
        tabs={tabs}
        variant="terminal"
        title={title}
        description={description}
        activeTab={initialTab}
        showCopyButton={true}
        storageKey={title ? `code-example-${title}` : undefined}
      />
    </div>
  );
}