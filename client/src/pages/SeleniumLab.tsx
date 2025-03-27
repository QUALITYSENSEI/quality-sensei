import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useLocation } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Code, 
  Search, 
  Zap, 
  PlayCircle, 
  FileTerminal,
  BookOpenCheck,
  ChevronRight,
  ChevronDown,
  Check,
  LucideIcon,
  Trophy,
  Github,
  Menu,
  XIcon,
  ArrowLeft,
  FileQuestion,
  MousePointerClick,
  EyeIcon
} from "lucide-react";
import { SiSelenium, SiJava, SiJavascript, SiPython, SiCsharp } from "@/components/IconImports";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from "@/hooks/use-toast";
import Terminal from '@/components/ui/Terminal';
import CodeExample from '@/components/ui/CodeExample';

// Constants and Types
interface Module {
  id: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  order: number;
  completionRate?: number;
  skills: string[];
  languages: string[];
  prerequisites?: string[];
  badgeText?: string;
}

// Tab content pages
import InstallLibraryContent from '@/components/lab/tabs/InstallLibraryTab';
import FirstScriptContent from '@/components/lab/tabs/FirstScriptTab';
import UsingSeleniumContent from '@/components/lab/tabs/UsingSeleniumTab';

// Animation variants
const slideIn = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 0.6 } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } }
};

const SeleniumLab = () => {
  const { theme } = useTheme();
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const { moduleId } = useParams();
  
  // State management
  const [activeModule, setActiveModule] = useState('intro');
  const [activeTab, setActiveTab] = useState('install');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Define modules
  const modules: Module[] = [
    {
      id: 'intro',
      title: 'Introduction to Selenium',
      shortTitle: 'Introduction',
      description: 'Learn the fundamentals of Selenium WebDriver and set up your development environment.',
      icon: <SiSelenium />,
      difficulty: 'beginner',
      duration: '30 minutes',
      order: 1,
      completionRate: 92,
      skills: ['Selenium Basics', 'Environment Setup', 'WebDriver Fundamentals'],
      languages: ['java', 'python', 'javascript'],
      badgeText: 'Start Here'
    },
    {
      id: 'locators',
      title: 'Locating Elements',
      shortTitle: 'Locators',
      description: 'Master different strategies for finding elements on web pages.',
      icon: <Search />,
      difficulty: 'beginner',
      duration: '45 minutes',
      order: 2,
      completionRate: 85,
      skills: ['CSS Selectors', 'XPath', 'ID & Name Selectors'],
      languages: ['java', 'python', 'javascript'],
      prerequisites: ['Introduction to Selenium']
    },
    {
      id: 'interactions',
      title: 'Interacting with Elements',
      shortTitle: 'Interactions',
      description: 'Learn how to click, type, select and perform other interactions with web elements.',
      icon: <Zap />,
      difficulty: 'beginner',
      duration: '1 hour',
      order: 3,
      completionRate: 78,
      skills: ['Click Operations', 'Text Input', 'Dropdown Selection'],
      languages: ['java', 'python', 'javascript'],
      prerequisites: ['Locating Elements']
    },
    {
      id: 'waits',
      title: 'Synchronization & Waits',
      shortTitle: 'Waits',
      description: 'Master synchronization techniques to handle dynamic web elements.',
      icon: <MousePointerClick />,
      difficulty: 'intermediate',
      duration: '1 hour',
      order: 4,
      completionRate: 71,
      skills: ['Explicit Waits', 'Implicit Waits', 'Fluent Waits', 'Expected Conditions'],
      languages: ['java', 'python', 'javascript'],
      prerequisites: ['Interacting with Elements']
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      shortTitle: 'Advanced',
      description: 'Advanced Selenium techniques including JavaScript execution, iframes, and alerts.',
      icon: <Code />,
      difficulty: 'intermediate',
      duration: '1.5 hours',
      order: 5,
      completionRate: 65,
      skills: ['JavaScript Execution', 'iFrames', 'Alerts & Popups', 'Screenshots'],
      languages: ['java', 'python', 'javascript'],
      prerequisites: ['Synchronization & Waits']
    },
    {
      id: 'frameworks',
      title: 'Test Frameworks',
      shortTitle: 'Frameworks',
      description: 'Build robust test frameworks using Page Object Model and other design patterns.',
      icon: <FileQuestion />,
      difficulty: 'advanced',
      duration: '2 hours',
      order: 6,
      completionRate: 59,
      skills: ['Page Object Model', 'Data-Driven Testing', 'Test Reporting', 'CI/CD Integration'],
      languages: ['java', 'python', 'javascript'],
      prerequisites: ['Advanced Techniques']
    },
  ];
  
  // Define tab configurations
  const introTabs = [
    { id: 'install', label: 'Install Library', icon: <FileTerminal className="w-4 h-4" /> },
    { id: 'first-script', label: 'First Script', icon: <Code className="w-4 h-4" /> },
    { id: 'using-selenium', label: 'Using Selenium', icon: <PlayCircle className="w-4 h-4" /> }
  ];
  
  const otherTabs = [
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'practice', label: 'Practice', icon: <Code className="w-4 h-4" /> },
    { id: 'challenge', label: 'Challenge', icon: <Trophy className="w-4 h-4" /> }
  ];
  
  // Initialize states based on URL params
  useEffect(() => {
    if (moduleId) {
      const validModule = modules.find(m => m.id === moduleId);
      if (validModule) {
        setActiveModule(moduleId);
        
        // Set initial tab based on module
        if (moduleId === 'intro') {
          setActiveTab('install');
        } else {
          setActiveTab('learn');
        }
      }
    }
  }, [moduleId]);
  
  // Tab change handler
  const handleTabChange = (tabId: string) => {
    console.log(`Tab changed to: ${tabId}`);
    setActiveTab(tabId);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('seleniumLabActiveTab', tabId);
    } catch (e) {
      console.error("Could not save tab state to localStorage", e);
    }
    
    // Smooth scroll to content area on mobile
    if (window.innerWidth < 768 && contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Module change handler
  const handleModuleChange = (moduleId: string) => {
    console.log(`Module changed to: ${moduleId}`);
    
    // Update URL without forcing a page reload
    setLocation(`/labs/automation/selenium/${moduleId}`);
    
    // Update state
    setActiveModule(moduleId);
    setMobileNavOpen(false);
    
    // Reset tab when module changes
    if (moduleId === 'intro') {
      setActiveTab('install');
    } else {
      setActiveTab('learn');
    }
  };
  
  // Get current module details
  const currentModule = modules.find(m => m.id === activeModule) || modules[0];
  
  // Determine current tabs based on active module
  const currentTabs = activeModule === 'intro' ? introTabs : otherTabs;
  
  // Render the appropriate tab content
  const renderTabContent = (tabId: string) => {
    switch (tabId) {
      case 'install':
        return <InstallLibraryContent />;
      case 'first-script':
        return <FirstScriptContent />;
      case 'using-selenium':
        return <UsingSeleniumContent />;
      case 'learn':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Learning Content for {currentModule.title}</h3>
            <p>
              This module covers {currentModule.description.toLowerCase()}
            </p>
            
            <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 my-6">
              <h4 className="flex items-center text-amber-800 dark:text-amber-300 mt-0">
                <BookOpenCheck className="mr-2 h-5 w-5" />
                Learning Objectives
              </h4>
              <ul className="mt-2">
                {currentModule.skills.map((skill, i) => (
                  <li key={i} className="text-amber-700 dark:text-amber-300">{skill}</li>
                ))}
              </ul>
            </div>
            
            <p>Detailed content for this module is under development and will be available soon. In the meantime, please explore the Introduction module to get started with Selenium.</p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mt-8">
              <h4 className="mt-0">Available Programming Languages</h4>
              <div className="flex gap-6 mt-4">
                {currentModule.languages.includes('java') && (
                  <div className="flex flex-col items-center">
                    <SiJava className="h-10 w-10 text-blue-600 dark:text-blue-400" />
                    <span className="mt-2">Java</span>
                  </div>
                )}
                {currentModule.languages.includes('python') && (
                  <div className="flex flex-col items-center">
                    <SiPython className="h-10 w-10 text-yellow-600 dark:text-yellow-400" />
                    <span className="mt-2">Python</span>
                  </div>
                )}
                {currentModule.languages.includes('javascript') && (
                  <div className="flex flex-col items-center">
                    <SiJavascript className="h-10 w-10 text-yellow-400 dark:text-yellow-300" />
                    <span className="mt-2">JavaScript</span>
                  </div>
                )}
                {currentModule.languages.includes('csharp') && (
                  <div className="flex flex-col items-center">
                    <SiCsharp className="h-10 w-10 text-purple-600 dark:text-purple-400" />
                    <span className="mt-2">C#</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'practice':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Practice Exercises for {currentModule.title}</h3>
            <p>
              Test your knowledge of {currentModule.title.toLowerCase()} with these practical exercises.
            </p>
            
            <div className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 rounded-r-lg my-6">
              <p className="font-medium text-blue-800 dark:text-blue-300">
                Try to solve these exercises before looking at the solutions. Practice is essential for mastering Selenium WebDriver!
              </p>
            </div>
            
            <div className="mt-8 space-y-12">
              <div>
                <h4>Exercise 1: Basic Setup</h4>
                <p>Coming soon...</p>
              </div>
              
              <div>
                <h4>Exercise 2: Element Locators</h4>
                <p>Coming soon...</p>
              </div>
              
              <div>
                <h4>Exercise 3: Interactions</h4>
                <p>Coming soon...</p>
              </div>
            </div>
          </div>
        );
      case 'challenge':
        return (
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h3>Challenge: {currentModule.title}</h3>
            <p>
              Ready to put your skills to the test? Complete this challenge to demonstrate mastery of {currentModule.title.toLowerCase()}.
            </p>
            
            <div className="bg-purple-50 dark:bg-purple-900/30 border-l-4 border-purple-500 p-4 rounded-r-lg my-6">
              <h4 className="mt-0 flex items-center text-purple-800 dark:text-purple-300">
                <Trophy className="mr-2 h-5 w-5" />
                Challenge Overview
              </h4>
              <p className="text-purple-800 dark:text-purple-300">
                This challenge will test your understanding of {currentModule.title.toLowerCase()} and your ability to apply these concepts in a practical scenario.
              </p>
            </div>
            
            <p>Detailed challenge content is coming soon. Check back later or start with the Introduction module.</p>
            
            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg flex gap-4 items-center mt-8">
              <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-full">
                <Github className="h-6 w-6" />
              </div>
              <div>
                <h4 className="m-0">Repository Available</h4>
                <p className="m-0">Starter code and solution templates are available on GitHub</p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Content not found for tab: {tabId}</div>;
    }
  };

  // Calculate progress based on the current module
  const calculateProgress = () => {
    const currentModuleOrder = currentModule.order;
    return Math.round((currentModuleOrder - 1) / (modules.length - 1) * 100);
  };
  
  // For logging and debugging
  useEffect(() => {
    console.log(`Active tab is now: ${activeTab}`);
  }, [activeTab]);

  return (
    <>
      <Helmet>
        <title>{currentModule.title} | Selenium WebDriver Lab | Quality Sensei</title>
        <meta name="description" content={`Learn ${currentModule.title} in Selenium WebDriver through interactive tutorials and exercises.`} />
      </Helmet>

      <Header />

      <main className="min-h-screen pt-16 pb-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">

        {/* Mobile Navigation Toggle */}
        <div className="fixed bottom-4 right-4 md:hidden z-50">
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white p-4 rounded-full shadow-lg"
          >
            {mobileNavOpen ? <XIcon className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ type: "spring", bounce: 0.25 }}
              className="fixed inset-0 bg-gray-900/80 z-40 md:hidden"
              onClick={() => setMobileNavOpen(false)}
            >
              <motion.div
                className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl p-6 max-h-[80vh] overflow-auto"
                onClick={e => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold mb-4">Selenium WebDriver Lab</h3>
                
                {/* Module List */}
                <div className="space-y-2 mb-6">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleChange(module.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg flex items-center",
                        activeModule === module.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-[#40E0D0]/20 border-l-4 border-[#40E0D0]"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      )}
                    >
                      <span className="h-8 w-8 flex items-center justify-center mr-3 text-cyan-600 dark:text-cyan-400">
                        {module.icon}
                      </span>
                      <div className="flex-1">
                        <h4 className="font-medium">{module.shortTitle || module.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{module.duration}</p>
                      </div>
                      {activeModule === module.id && (
                        <Check className="h-5 w-5 text-cyan-500" />
                      )}
                    </button>
                  ))}
                </div>
                
                {/* Tab Selection */}
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Current Topic</h4>
                  <div className="flex flex-wrap gap-2">
                    {currentTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => handleTabChange(tab.id)}
                        className={cn(
                          "px-4 py-2 rounded-full text-sm font-medium",
                          activeTab === tab.id
                            ? "bg-cyan-500 text-white"
                            : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
                        )}
                      >
                        <div className="flex items-center">
                          {tab.icon}
                          <span className="ml-1">{tab.label}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6 flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span 
              className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
              onClick={() => window.location.href = '/labs'}
            >
              Labs
            </span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span 
              className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer" 
              onClick={() => window.location.href = '/labs/automation'}
            >
              Automation
            </span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span 
              className="hover:text-gray-900 dark:hover:text-gray-100 cursor-pointer"
              onClick={() => window.location.href = '/labs/automation/selenium'}
            >
              Selenium
            </span>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 dark:text-gray-100 font-medium">{currentModule.shortTitle || currentModule.title}</span>
          </nav>

          {/* Page Title & Progress Bar */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center">
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center mr-3",
                  theme === 'dark' ? 'bg-cyan-900/50 text-cyan-400' : 'bg-cyan-100 text-cyan-700'
                )}>
                  <SiSelenium className="h-6 w-6" />
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">Selenium WebDriver Lab</h1>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <EyeIcon className="h-5 w-5 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-500">15.4K students</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-500">Progress:</span>
                  <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-[#40E0D0]" 
                      style={{ width: `${calculateProgress()}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{calculateProgress()}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Modules - Hidden on Mobile */}
            <div className="hidden md:block">
              <div className={cn(
                "rounded-xl shadow-sm overflow-hidden p-1",
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              )}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold text-lg">Learning Path</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Complete all modules to master Selenium</p>
                </div>
                
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {modules.map((module, index) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleChange(module.id)}
                      className={cn(
                        "w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                        activeModule === module.id && "bg-cyan-50 dark:bg-cyan-900/20"
                      )}
                    >
                      <div className="flex items-start">
                        <div className={cn(
                          "h-8 w-8 rounded-full flex items-center justify-center mr-3 flex-shrink-0",
                          activeModule === module.id
                            ? "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white"
                            : theme === 'dark' 
                              ? "bg-gray-700 text-gray-300" 
                              : "bg-gray-100 text-gray-500"
                        )}>
                          {index < currentModule.order ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <span>{index + 1}</span>
                          )}
                        </div>
                        
                        <div>
                          <div className="flex items-center">
                            <h4 className={cn(
                              "font-medium",
                              activeModule === module.id ? "text-cyan-700 dark:text-cyan-300" : ""
                            )}>
                              {module.shortTitle || module.title}
                            </h4>
                            
                            {module.badgeText && (
                              <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded-full">
                                {module.badgeText}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                            <span className="mr-2 flex items-center">
                              {module.difficulty === 'beginner' ? (
                                <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                              ) : module.difficulty === 'intermediate' ? (
                                <span className="inline-block h-2 w-2 rounded-full bg-yellow-500 mr-1"></span>
                              ) : (
                                <span className="inline-block h-2 w-2 rounded-full bg-red-500 mr-1"></span>
                              )}
                              {module.difficulty}
                            </span>
                            <span>|</span>
                            <span className="mx-2">{module.duration}</span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Additional resources section */}
              <div className={cn(
                "mt-6 rounded-xl shadow-sm overflow-hidden",
                theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              )}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="font-bold">Resources</h3>
                </div>
                <div className="p-4 space-y-4">
                  <a 
                    href="https://www.selenium.dev/documentation/en/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Official Documentation
                  </a>
                  <a 
                    href="https://github.com/SeleniumHQ/selenium" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    GitHub Repository
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center text-sm text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    <FileTerminal className="h-4 w-4 mr-2" />
                    Code Examples
                  </a>
                </div>
              </div>
            </div>
            
            {/* Main Content Area */}
            <div ref={contentRef} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeModule}-${activeTab}`}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={fadeIn}
                  className={cn(
                    "rounded-xl overflow-hidden shadow-sm mb-6",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  )}
                >
                  {/* Module Header */}
                  <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-start">
                      <div className={cn(
                        "h-12 w-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0",
                        "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white"
                      )}>
                        {currentModule.icon}
                      </div>
                      
                      <div>
                        <h2 className="text-2xl font-bold">{currentModule.title}</h2>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{currentModule.description}</p>
                        
                        {/* Skills Tags */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {currentModule.skills.map((skill, i) => (
                            <span 
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Tab Navigation */}
                  <div className="border-b border-gray-200 dark:border-gray-700">
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Select Content Type</h4>
                      <div className="flex space-x-2 overflow-x-auto pb-1">
                        {currentTabs.map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => handleTabChange(tab.id)}
                            className={cn(
                              "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap",
                              activeTab === tab.id
                                ? "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white shadow-sm"
                                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                            )}
                          >
                            <div className="flex items-center">
                              {tab.icon}
                              <span className="ml-1.5">{tab.label}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Tab Content */}
                  <div className="p-6">
                    {renderTabContent(activeTab)}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6">
                {/* Previous Module Button */}
                {currentModule.order > 1 && (
                  <button
                    onClick={() => {
                      const prevModule = modules.find(m => m.order === currentModule.order - 1);
                      if (prevModule) handleModuleChange(prevModule.id);
                    }}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg text-sm font-medium",
                      "border border-gray-300 dark:border-gray-700",
                      "hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    )}
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous: {modules.find(m => m.order === currentModule.order - 1)?.shortTitle || modules.find(m => m.order === currentModule.order - 1)?.title}
                  </button>
                )}
                
                <div className="flex-1"></div>
                
                {/* Next Module Button */}
                {currentModule.order < modules.length && (
                  <button
                    onClick={() => {
                      const nextModule = modules.find(m => m.order === currentModule.order + 1);
                      if (nextModule) handleModuleChange(nextModule.id);
                    }}
                    className={cn(
                      "flex items-center px-4 py-2 rounded-lg text-sm font-medium",
                      "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white shadow-sm",
                      "hover:shadow transition-all"
                    )}
                  >
                    Next: {modules.find(m => m.order === currentModule.order + 1)?.shortTitle || modules.find(m => m.order === currentModule.order + 1)?.title}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default SeleniumLab;