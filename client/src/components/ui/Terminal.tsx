import React, { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalLine } from '@/lib/types';

interface TerminalProps {
  lines: TerminalLine[];
  language?: string;
  className?: string;
  showCopyButton?: boolean;
}

const Terminal = ({ lines, language = 'bash', className, showCopyButton = true }: TerminalProps) => {
  const { theme } = useTheme();
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (lines.length === 0) {
      setIsTyping(false);
      return;
    }

    let currentIndex = 0;
    setVisibleLines([]);
    setIsTyping(true);

    const showNextLine = () => {
      if (currentIndex < lines.length) {
        const line = lines[currentIndex];
        const delay = line.delay || 200;

        setVisibleLines(prev => [...prev, line]);
        currentIndex++;

        if (currentIndex < lines.length) {
          setTimeout(showNextLine, delay);
        } else {
          setIsTyping(false);
        }
      }
    };

    showNextLine();

    return () => {
      setVisibleLines([]);
    };
  }, [lines]);

  const handleCopy = () => {
    const text = lines.map(line => line.content).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: TerminalLine, index: number) => {
    switch (line.type) {
      case 'command':
        return (
          <div key={index} className="flex">
            <span className="text-green-500 mr-2">$</span>
            <span className="text-gray-200">{line.content}</span>
          </div>
        );
      case 'output':
        return (
          <div key={index} className="text-gray-400">{line.content}</div>
        );
      case 'success':
        return (
          <div key={index} className="text-green-400">{line.content}</div>
        );
      case 'error':
        return (
          <div key={index} className="text-red-400">{line.content}</div>
        );
      case 'comment':
        return (
          <div key={index} className="text-blue-400">{line.content}</div>
        );
      case 'cursor':
        return (
          <div key={index} className="flex">
            <span className="text-gray-400">{line.content}</span>
            <span className="w-2 h-4 bg-gray-400 ml-1 animate-blink"></span>
          </div>
        );
      default:
        return (
          <div key={index} className="text-gray-400">{line.content}</div>
        );
    }
  };

  return (
    <div 
      className={cn(
        "rounded-lg overflow-hidden",
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-800',
        className
      )}
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 dark:bg-gray-950 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">terminal</div>
        {showCopyButton && (
          <button 
            onClick={handleCopy}
            disabled={isTyping}
            className={cn(
              "text-gray-400 hover:text-gray-200 transition-colors focus:outline-none", 
              isTyping && "opacity-50 cursor-not-allowed"
            )}
            aria-label="Copy code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}
      </div>

      {/* Terminal Content */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        {visibleLines.map((line, index) => renderLine(line, index))}
        {isTyping && (
          <div className="inline-block w-2 h-4 bg-gray-400 animate-blink"></div>
        )}
      </div>
    </div>
  );
};

export default Terminal;