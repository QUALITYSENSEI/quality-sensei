import { 
  BookOpen, 
  Code, 
  Search, 
  Zap, 
  PlayCircle, 
  FileTerminal
} from "lucide-react";
import { SiSelenium } from "@/components/IconImports";
import { Helmet } from "react-helmet-async";
import { useState, useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";

// Import our reusable lab components
import LabHero from "@/components/lab/LabHero";
import LabModulesSidebar from "@/components/lab/LabModulesSidebar";
import LabContentTabs from "@/components/lab/LabContentTabs";

// Import tab content components
import InstallLibraryTab from "@/components/lab/tabs/InstallLibraryTab";
import FirstScriptTab from "@/components/lab/tabs/FirstScriptTab";
import UsingSeleniumTab from "@/components/lab/tabs/UsingSeleniumTab";

// Module interface
interface Module {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  completionRate: number;
  skills: string[];
  languages: ('java' | 'python' | 'javascript')[];
  prerequisites?: string[];
  badgeText?: string;
}

// Modules available in the Selenium lab
const modules: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to Selenium',
    description: 'Learn the fundamentals of Selenium WebDriver and how to set up your development environment.',
    icon: <SiSelenium />,
    difficulty: 'beginner',
    duration: '30 minutes',
    completionRate: 92,
    skills: ['Selenium Basics', 'Environment Setup', 'WebDriver Fundamentals'],
    languages: ['java', 'python', 'javascript'],
    badgeText: 'Essential'
  },
  {
    id: 'locators',
    title: 'Locating Elements',
    description: 'Master different strategies for finding elements on a web page.',
    icon: <Search />,
    difficulty: 'beginner',
    duration: '45 minutes',
    completionRate: 85,
    skills: ['CSS Selectors', 'XPath', 'ID & Name Selectors'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Introduction to Selenium']
  },
  {
    id: 'interactions',
    title: 'Interacting with Elements',
    description: 'Learn how to click, type, select and perform other interactions with web elements.',
    icon: <Zap />,
    difficulty: 'beginner',
    duration: '1 hour',
    completionRate: 78,
    skills: ['Click Operations', 'Text Input', 'Dropdown Selection'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Locating Elements']
  }
];

// Add type definition for window object
declare global {
  interface Window {
    setTab: (tab: string) => void;
  }
}

// Expose this function to the window object for testing in console
let setActiveTabForTesting: (tab: string) => void;

export default function SeleniumLab() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [activeModule, setActiveModule] = useState('intro');
  const [activeTab, setActiveTab] = useState(activeModule === 'intro' ? 'install' : 'learn');
  
  // Reset tab when module changes
  useEffect(() => {
    // Set default tab based on module
    if (activeModule === 'intro') {
      setActiveTab('install');
    } else {
      setActiveTab('learn');
    }
  }, [activeModule]);
  
  // Debug tab changes
  useEffect(() => {
    console.log(`Tab changed to: ${activeTab}`);
    
    // Expose the setter to window for testing
    setActiveTabForTesting = (tab: string) => {
      console.log(`Setting tab via global function to: ${tab}`);
      setActiveTab(tab);
    };
    
    // @ts-ignore - for testing purposes
    window.setTab = setActiveTabForTesting;
  }, [activeTab]);
  
  // Tab change handler 
  const handleTabChange = (value: string) => {
    console.log(`SeleniumLab - Tab changed to: ${value}`);
    // Force immediate state update
    setTimeout(() => {
      setActiveTab(value);
    }, 0);
  };
  
  // Define the intro tab configurations
  const introTabs = [
    { id: 'install', label: 'Install Library', icon: <FileTerminal className="w-4 h-4" /> },
    { id: 'first-script', label: 'First Script', icon: <Code className="w-4 h-4" /> },
    { id: 'using-selenium', label: 'Using Selenium', icon: <PlayCircle className="w-4 h-4" /> }
  ];
  
  // Define the other tab configurations
  const otherTabs = [
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Code className="w-4 h-4" /> },
    { id: 'challenge', label: 'Challenge', icon: <PlayCircle className="w-4 h-4" /> }
  ];
  
  // Render the appropriate tab content
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'install':
        return <InstallLibraryTab />;
      case 'first-script':
        return <FirstScriptTab />;
      case 'using-selenium':
        return <UsingSeleniumTab />;
      case 'learn':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Learning Content</h3>
            <p>This is the learning content for the {modules.find(m => m.id === activeModule)?.title} module.</p>
            <p>This will be expanded in future iterations.</p>
          </div>
        );
      case 'practice':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Practice Exercises</h3>
            <p>Practice exercises for the {modules.find(m => m.id === activeModule)?.title} module.</p>
            <p>This will be expanded in future iterations.</p>
          </div>
        );
      case 'challenge':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Challenge Task</h3>
            <p>A challenge for the {modules.find(m => m.id === activeModule)?.title} module.</p>
            <p>This will be expanded in future iterations.</p>
          </div>
        );
      default:
        return <div>Content not found for tab: {tabId}</div>;
    }
  };

  return (
    <>
      <Helmet>
        <title>Selenium WebDriver Lab | Quality Sensei</title>
        <meta name="description" content="Learn Selenium WebDriver automation through interactive tutorials and exercises." />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen pt-16">
        <ParticleBackground className="opacity-20" />
        
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <LabHero 
            title="Selenium WebDriver Lab"
            icon={<SiSelenium />}
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Labs', href: '/labs' },
              { label: 'Automation', href: '/labs/automation' },
              { label: 'Selenium', href: '/labs/automation/selenium', active: true }
            ]}
            studentCount={15432}
            certificateAvailable={true}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Modules */}
            <div>
              <LabModulesSidebar 
                modules={modules}
                activeModule={activeModule}
                onModuleChange={setActiveModule}
              />
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {modules.find(m => m.id === activeModule)?.title}
                </h2>
                
                <p className="text-base mb-6 text-gray-700 dark:text-gray-300">
                  {modules.find(m => m.id === activeModule)?.description}
                </p>
                
                {/* Content Tabs */}
                <LabContentTabs 
                  introTabs={introTabs}
                  otherTabs={otherTabs}
                  activeModule={activeModule}
                  activeTab={activeTab}
                  onTabChange={handleTabChange}
                  renderTabContent={renderTabContent}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}