import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalLine } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface TerminalProps {
  lines: TerminalLine[];
  language?: string;
  className?: string;
}

const Terminal = ({ lines, language = 'bash', className }: TerminalProps) => {
  const { theme } = useTheme();
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([]);
  const [cursorBlinking, setCursorBlinking] = useState(false);

  useEffect(() => {
    setVisibleLines([]);
    setCursorBlinking(false);

    const timeouts: NodeJS.Timeout[] = [];

    lines.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (line.type === 'cursor') setCursorBlinking(true);
      }, line.delay ?? index * 500);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, [lines]);

  const renderLine = (line: TerminalLine, index: number) => {
    switch (line.type) {
      case 'command':
        return (
          <motion.div 
            key={index} 
            className="flex"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={theme === 'dark' ? "text-cyan-400 mr-2" : "text-cyan-600 mr-2"}>$</span>
            <span>{line.content}</span>
          </motion.div>
        );
      case 'output':
        return (
          <motion.div 
            key={index} 
            className={theme === 'dark' ? "text-gray-300 mt-1" : "text-gray-700 mt-1"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {line.content}
          </motion.div>
        );
      case 'success':
        return (
          <motion.div 
            key={index} 
            className="text-green-500 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {line.content}
          </motion.div>
        );
      case 'comment':
        return (
          <motion.div 
            key={index} 
            className={theme === 'dark' ? "text-gray-400 mt-1 italic" : "text-gray-500 mt-1 italic"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {line.content}
          </motion.div>
        );
      case 'cursor':
        return (
          <motion.div 
            key={index} 
            className="flex mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className={theme === 'dark' ? "text-cyan-400 mr-2" : "text-cyan-600 mr-2"}>$</span>
            <span className={`${cursorBlinking ? 'cursor-blink' : ''}`}>{line.content}</span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={cn(
      "terminal p-5 rounded-lg shadow-lg w-full overflow-x-auto",
      theme === 'dark' ? "bg-gray-900 text-gray-100" : "bg-gray-800 text-gray-200",
      className
    )}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-4 text-xs uppercase tracking-wide opacity-70">{language}</div>
      </div>
      
      <div className="terminal-text space-y-1 font-mono text-sm">
        <AnimatePresence>
          {visibleLines.map((line, index) => renderLine(line, index))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Terminal;