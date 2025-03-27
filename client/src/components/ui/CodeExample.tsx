import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CodeExample {
  language: string;
  code: string;
  label?: string;
}

interface CodeExampleProps {
  examples: CodeExample[];
  title?: string;
  description?: string;
  className?: string;
  defaultTab?: string;
}

const CodeExample = ({ 
  examples,
  title,
  description,
  className,
  defaultTab
}: CodeExampleProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopied(language);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className={cn(
      "rounded-lg overflow-hidden",
      theme === 'dark' ? "bg-gray-800 border border-gray-700" : "bg-white border border-gray-200 shadow-sm",
      className
    )}>
      {(title || description) && (
        <div className={cn(
          "p-4 border-b",
          theme === 'dark' ? "border-gray-700" : "border-gray-200"
        )}>
          {title && (
            <h3 className={cn(
              "text-lg font-medium mb-1",
              theme === 'dark' ? "text-white" : "text-gray-900"
            )}>
              {title}
            </h3>
          )}
          {description && (
            <p className={cn(
              "text-sm",
              theme === 'dark' ? "text-gray-300" : "text-gray-600"
            )}>
              {description}
            </p>
          )}
        </div>
      )}

      <Tabs defaultValue={defaultTab || examples[0].language} className="w-full">
        <div className={cn(
          "flex justify-between items-center border-b px-4",
          theme === 'dark' ? "border-gray-700" : "border-gray-200"
        )}>
          <TabsList className="h-10">
            {examples.map((example) => (
              <TabsTrigger 
                key={example.language} 
                value={example.language}
                className={cn(
                  "text-xs px-3 py-1 rounded data-[state=active]:shadow-none",
                  theme === 'dark' 
                    ? "data-[state=active]:bg-gray-700 data-[state=active]:text-white" 
                    : "data-[state=active]:bg-gray-100"
                )}
              >
                {example.label || example.language}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {examples.map((example) => (
          <TabsContent key={example.language} value={example.language} className="mt-0">
            <div className="relative">
              <pre className={cn(
                "p-4 overflow-x-auto text-sm font-mono",
                theme === 'dark' ? "bg-gray-900 text-gray-200" : "bg-gray-50 text-gray-800"
              )}>
                <code>{example.code}</code>
              </pre>
              <button
                onClick={() => copyToClipboard(example.code, example.language)}
                className={cn(
                  "absolute top-2 right-2 p-2 rounded-md",
                  theme === 'dark' ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-900 hover:bg-gray-200"
                )}
              >
                {copied === example.language ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default CodeExample;