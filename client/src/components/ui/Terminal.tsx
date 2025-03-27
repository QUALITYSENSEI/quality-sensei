import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalLine } from '@/lib/types';
import UnifiedTabs from './UnifiedTabs';

interface TerminalLineProps {
  line: TerminalLine;
  index: number;
  isVisible: boolean;
}

const TerminalLineComponent: React.FC<TerminalLineProps> = ({ line, index, isVisible }) => {
  const getLineStyle = () => {
    switch (line.type) {
      case 'command':
        return 'text-cyan-400';
      case 'output':
        return 'text-gray-300';
      case 'success':
        return 'text-green-400';
      case 'error':
        return 'text-red-400';
      case 'comment':
        return 'text-gray-500 italic';
      case 'cursor':
        return 'text-gray-300 animate-pulse';
      default:
        return 'text-gray-300';
    }
  };

  const linePrefix = line.type === 'command' ? '$ ' : line.type === 'comment' ? '# ' : '';

  return (
    <div 
      className={cn(
        'font-mono text-sm transition-opacity duration-300',
        getLineStyle(),
        isVisible ? 'opacity-100' : 'opacity-0'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {linePrefix}{line.content}
    </div>
  );
};

interface TerminalProps {
  lines: TerminalLine[];
  title?: string;
  className?: string;
  autoType?: boolean;
  typingSpeed?: number;
  initialDelay?: number;
  tabs?: Array<{id: string; label: string; lines: TerminalLine[]}>;
}

const Terminal: React.FC<TerminalProps> = ({
  lines: propLines,
  title = 'Terminal',
  className,
  autoType = true,
  typingSpeed = 50,
  initialDelay = 500,
  tabs
}) => {
  const { theme } = useTheme();
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].id : '');
  const [currentLines, setCurrentLines] = useState<TerminalLine[]>(tabs ? tabs[0].lines : propLines);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoType) {
      // Make all lines visible immediately
      setVisibleLines(currentLines.map((_, index) => index));
      return;
    }

    // Reset visible lines when content changes
    setVisibleLines([]);
    
    // Animate lines with typing effect
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    
    const showNextLine = () => {
      if (currentIndex < currentLines.length) {
        setVisibleLines(prev => [...prev, currentIndex]);
        const nextDelay = currentLines[currentIndex].delay || typingSpeed;
        currentIndex++;
        timeout = setTimeout(showNextLine, nextDelay);
      }
    };
    
    // Start with initial delay
    timeout = setTimeout(showNextLine, initialDelay);
    
    return () => clearTimeout(timeout);
  }, [currentLines, autoType, typingSpeed, initialDelay]);

  // Update current lines when tab changes
  useEffect(() => {
    if (tabs) {
      const selectedTab = tabs.find(tab => tab.id === activeTab);
      if (selectedTab) {
        setCurrentLines(selectedTab.lines);
      }
    }
  }, [activeTab, tabs]);

  // Scroll to bottom when new lines appear
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLines]);

  // Handle tab change
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (tabs && tabs.length > 0) {
    // Convert to the format expected by UnifiedTabs
    const tabItems = tabs.map(tab => ({
      id: tab.id,
      label: tab.label,
      code: tab.lines.map(line => {
        const prefix = line.type === 'command' ? '$ ' : line.type === 'comment' ? '# ' : '';
        return `${prefix}${line.content}`;
      }).join('\n')
    }));

    return (
      <UnifiedTabs
        tabs={tabItems}
        variant="terminal"
        title={title}
        activeTab={activeTab}
        onChange={handleTabChange}
        showCopyButton={true}
        className={className}
      />
    );
  }

  return (
    <div 
      className={cn(
        'terminal bg-gray-900 rounded-lg p-4 text-white shadow-lg overflow-hidden',
        className
      )}
    >
      {/* Terminal header */}
      <div className="flex items-center border-b border-gray-700 pb-2 mb-3">
        <div className="flex space-x-2 mr-4">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs font-semibold">{title}</div>
      </div>
      
      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="terminal-content space-y-1 max-h-96 overflow-y-auto py-2 font-mono text-sm"
      >
        {currentLines.map((line, index) => (
          <TerminalLineComponent
            key={index}
            line={line}
            index={index}
            isVisible={visibleLines.includes(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Terminal;