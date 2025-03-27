import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import UnifiedTabs from '@/components/ui/UnifiedTabs';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

// Import TabItem type manually since it's an exported interface from UnifiedTabs
interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content?: React.ReactNode;
  code?: string;
}

// Import icons that may be used in JSON
import { 
  BsBriefcase, BsSearch, BsCursor, BsClock, BsGear, BsCodeSlash, 
  BsCheck2, BsBoxArrowUpRight, BsArrowsAngleExpand 
} from 'react-icons/bs';
import { SiSelenium, SiJava, SiJavascript, SiPython } from '@/components/IconImports';

// Define type for lab module content sections
type LabSection = {
  type: string;
  level?: number;
  text?: string;
  content?: string;
  style?: 'bullet' | 'ordered' | string;
  items?: string[] | any[];
  columns?: number;
  language?: string;
  title?: string;
  description?: string;
  steps?: string[];
  color?: string;
  code?: string;
  note?: string;
  className?: string;
};

// Define module content structure
type ModuleContent = {
  title: string;
  description: string;
  sections: LabSection[];
};

// Define module structure
export type LabModule = {
  id: string;
  label: string;
  icon: string;
  content: ModuleContent;
};

// Define lab data structure
export type LabData = {
  title: string;
  description: string;
  tags: {
    text: string;
    color: string;
  }[];
  icon: string;
  modules: LabModule[];
};

// Props for the LabContentRenderer component
interface LabContentRendererProps {
  labData: LabData;
}

// Helper function to get the icon component by name
const getIconComponent = (iconName: string, className: string = 'mr-2 h-4 w-4') => {
  const icons: Record<string, React.ReactNode> = {
    BsBriefcase: <BsBriefcase className={className} />,
    BsSearch: <BsSearch className={className} />,
    BsCursor: <BsCursor className={className} />,
    BsClock: <BsClock className={className} />,
    BsGear: <BsGear className={className} />,
    BsCodeSlash: <BsCodeSlash className={className} />,
    BsCheck2: <BsCheck2 className={className} />,
    BsBoxArrowUpRight: <BsBoxArrowUpRight className={className} />,
    BsArrowsAngleExpand: <BsArrowsAngleExpand className={className} />,
    SiSelenium: <SiSelenium className={className} />,
    SiJava: <SiJava className={className} />,
    SiJavascript: <SiJavascript className={className} />,
    SiPython: <SiPython className={className} />
  };

  return icons[iconName] || null;
};

// Component to render a single section based on its type
const SectionRenderer = ({ section, theme }: { section: LabSection, theme: 'light' | 'dark' }) => {
  switch (section.type) {
    case 'heading':
      const HeadingTag = `h${section.level}` as keyof JSX.IntrinsicElements;
      const headingClass = section.level === 2 
        ? "text-2xl font-bold" 
        : section.level === 3 
          ? "text-xl font-semibold mt-6" 
          : "text-lg font-semibold mt-4";
      
      return <HeadingTag className={headingClass}>{section.text}</HeadingTag>;
    
    case 'text':
      return <p className="mt-2">{section.content}</p>;
    
    case 'list':
      const ListTag = section.style === 'ordered' ? 'ol' : 'ul';
      const listClass = section.style === 'ordered' 
        ? "list-decimal pl-6 space-y-2 mt-2" 
        : "list-disc pl-6 space-y-2 mt-2";
      
      return (
        <ListTag className={listClass}>
          {section.items?.map((item, index) => (
            <li key={index} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ListTag>
      );
    
    case 'code':
      return (
        <pre className={`bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-4 ${section.language === 'multi' ? 'font-mono' : ''}`}>
          <code>{section.content}</code>
        </pre>
      );
    
    case 'grid':
      const gridColumns = section.columns || 2;
      const gridClass = `grid grid-cols-1 md:grid-cols-${gridColumns} gap-6 mt-6`;
      
      return (
        <div className={gridClass}>
          {section.items?.map((item: any, index) => (
            <Card key={index} className={`p-4 h-full ${item.className || ''}`}>
              {item.title && <h4 className="font-semibold text-lg mb-2">{item.title}</h4>}
              {item.content && (
                item.content.startsWith('<') 
                  ? <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  : <p className="mb-3 text-sm">{item.content}</p>
              )}
              {item.code && (
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
                  <code>{item.code}</code>
                </pre>
              )}
              {item.note && (
                <div className={`mt-2 text-${item.color || 'blue'}-600 dark:text-${item.color || 'blue'}-400 text-xs`}>
                  {item.note}
                </div>
              )}
            </Card>
          ))}
        </div>
      );
    
    case 'cards':
      const cardsColumns = section.columns || 2;
      const cardsClass = `grid grid-cols-1 md:grid-cols-${cardsColumns} gap-4 mt-4`;
      
      return (
        <div className={cardsClass}>
          {section.items?.map((item: any, index) => (
            <Card key={index} className="p-4 h-full">
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="mb-3 text-sm">{item.description}</p>
              {item.code && (
                <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
                  <code>{item.code}</code>
                </pre>
              )}
              {item.note && (
                <div className={`mt-2 text-${item.color || 'blue'}-600 dark:text-${item.color || 'blue'}-400 text-xs`}>
                  {item.note}
                </div>
              )}
            </Card>
          ))}
        </div>
      );
    
    case 'exerciseBox':
      return (
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-green-800 dark:text-green-400">{section.title}</h4>
          <p className="text-green-800 dark:text-green-300">{section.content}</p>
          {section.steps && (
            <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
              {section.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      );
    
    case 'alert':
      const alertColor = section.color || 'blue';
      const alertColorClasses = {
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
        green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
        amber: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300',
        red: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300',
      };
      
      return (
        <div className={`${alertColorClasses[alertColor as keyof typeof alertColorClasses]} p-4 rounded-lg mt-6`}>
          <h4 className="font-semibold mb-2">{section.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: section.content as string }} />
        </div>
      );
    
    default:
      return <div>Unknown section type: {section.type}</div>;
  }
};

// Main component to render module content
const ModuleContentRenderer = ({ content, theme }: { content: ModuleContent, theme: 'light' | 'dark' }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{content.title}</h2>
      <p className="text-lg">{content.description}</p>
      
      {content.sections.map((section, index) => (
        <SectionRenderer key={index} section={section} theme={theme} />
      ))}
    </div>
  );
};

// Main LabContentRenderer component
const LabContentRenderer: React.FC<LabContentRendererProps> = ({ labData }) => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState(labData.modules[0]?.id || '');

  // Map modules to tab items
  const tabItems: TabItem[] = labData.modules.map(module => ({
    id: module.id,
    label: module.label,
    icon: getIconComponent(module.icon),
    content: <ModuleContentRenderer content={module.content} theme={theme} />
  }));

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left sidebar with module tabs */}
      <div className="w-full md:w-64 flex-shrink-0 mb-6 md:mb-0 md:mr-8 border-b md:border-b-0 border-gray-200 dark:border-gray-800">
        <div className="sticky top-24">
          <UnifiedTabs
            tabs={tabItems}
            activeTab={activeTab}
            onChange={setActiveTab}
            variant="labContent"
            fullWidth
            contentClassName="hidden"
            className="flex-col"
          />
        </div>
      </div>
      
      {/* Right content area */}
      <div className="flex-1">
        <Card className={cn("bg-white dark:bg-gray-900", theme === 'dark' ? 'border-gray-800' : 'border-gray-200')}>
          <CardContent className="p-6">
            {tabItems.find(tab => tab.id === activeTab)?.content}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LabContentRenderer;