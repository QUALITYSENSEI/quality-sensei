import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, BookOpen, Code, PlayCircle, CheckCircle, Info, Award, ArrowRight, Zap, Brain, Clock, FileBadge, User, Check, Search } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { SiSelenium, SiJavascript, SiPython } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTheme } from "@/contexts/ThemeContext";
import { useToast } from "@/hooks/use-toast";
import FloatingCard from "@/components/ui/FloatingCard";
import ParticleBackground from "@/components/ui/ParticleBackground";

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
    description: 'Learn the basics of Selenium WebDriver and its architecture.',
    icon: <Info className="w-5 h-5" />,
    difficulty: 'beginner',
    duration: '1-2 hours',
    completionRate: 98,
    skills: ['Automation Basics', 'WebDriver Concepts'],
    languages: ['java', 'python', 'javascript'],
    badgeText: 'New'
  },
  {
    id: 'setup',
    title: 'Setting Up Selenium',
    description: 'Set up Selenium WebDriver with Java and configure your environment.',
    icon: <Zap className="w-5 h-5" />,
    difficulty: 'beginner',
    duration: '2-3 hours',
    completionRate: 92,
    skills: ['Environment Setup', 'Driver Configuration'],
    languages: ['java', 'python', 'javascript']
  },
  {
    id: 'locators',
    title: 'Element Locators',
    description: 'Master different locator strategies: ID, Name, Class, XPath, and CSS Selectors.',
    icon: <Search className="w-5 h-5" />,
    difficulty: 'beginner',
    duration: '3-4 hours',
    completionRate: 85,
    skills: ['XPath', 'CSS Selectors', 'Element Selection'],
    languages: ['java', 'python', 'javascript']
  },
  {
    id: 'actions',
    title: 'Browser Actions',
    description: 'Learn to interact with web elements: clicks, typing, scrolling, and more.',
    icon: <Code className="w-5 h-5" />,
    difficulty: 'intermediate',
    duration: '4-5 hours',
    completionRate: 80,
    skills: ['Element Interaction', 'Form Handling', 'Browser Navigation'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Element Locators']
  },
  {
    id: 'waits',
    title: 'Synchronization & Waits',
    description: 'Handle timing issues with implicit, explicit, and fluent waits.',
    icon: <Clock className="w-5 h-5" />,
    difficulty: 'intermediate',
    duration: '3-4 hours',
    completionRate: 75,
    skills: ['Explicit Waits', 'Implicit Waits', 'FluentWait'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Browser Actions']
  },
  {
    id: 'advanced',
    title: 'Advanced Interactions',
    description: 'Work with advanced scenarios: alerts, frames, windows, and drag-and-drop.',
    icon: <Zap className="w-5 h-5" />,
    difficulty: 'advanced',
    duration: '5-6 hours',
    completionRate: 65,
    skills: ['Alert Handling', 'Frames', 'Windows', 'Actions API'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Synchronization & Waits'],
    badgeText: 'Popular'
  },
  {
    id: 'framework',
    title: 'Building a Framework',
    description: 'Create a modular, maintainable test automation framework.',
    icon: <Brain className="w-5 h-5" />,
    difficulty: 'advanced',
    duration: '8-10 hours',
    completionRate: 55,
    skills: ['Page Object Model', 'Test Framework Design', 'Configuration Management'],
    languages: ['java', 'python'],
    prerequisites: ['Advanced Interactions'],
    badgeText: 'Advanced'
  },
  {
    id: 'reporting',
    title: 'Reporting & Logging',
    description: 'Implement comprehensive test reporting and logging mechanisms.',
    icon: <FileBadge className="w-5 h-5" />,
    difficulty: 'advanced',
    duration: '4-5 hours',
    completionRate: 60,
    skills: ['Extent Reports', 'Log4j', 'Screenshot Capture'],
    languages: ['java', 'python', 'javascript'],
    prerequisites: ['Building a Framework']
  }
];

export default function SeleniumLab() {
  const { theme } = useTheme();
  
  // Get the current URL
  const [location] = useLocation();
  const [match, params] = useRoute('/labs/automation/selenium/:moduleId');
  
  // Parse the moduleId from the URL or default to 'intro'
  const moduleId = match ? params.moduleId : 'intro';
  
  // Check if the moduleId is valid, otherwise use 'intro'
  const isValidModule = modules.some(m => m.id === moduleId);
  const [activeModule, setActiveModule] = useState<string>(isValidModule ? moduleId : 'intro');
  const [activeTab, setActiveTab] = useState<string>('learn');

  // Find current module
  const currentModule = modules.find(m => m.id === activeModule) || modules[0];

  // Update URL when active module changes (without page reload)
  useEffect(() => {
    // If we have a valid module in URL, update the active module
    if (isValidModule) {
      setActiveModule(moduleId);
    }
  }, [moduleId, isValidModule]);
  
  // Update browser URL when active module changes (without page reload)
  const setLocation = useLocation()[1];
  useEffect(() => {
    // Update URL to match the selected module (without causing navigation)
    if (activeModule !== moduleId) {
      setLocation(`/labs/automation/selenium/${activeModule}`, { replace: true });
    }
  }, [activeModule, moduleId, setLocation]);

  // Get SEO title and description based on active module
  const pageTitle = `${currentModule.title} | Selenium WebDriver Lab | Quality Sensei`;
  const pageDescription = `Learn ${currentModule.title.toLowerCase()} in our Selenium WebDriver interactive lab. ${currentModule.description}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>
      
      <Header />
      
      <main className={cn(
        "pt-28 md:pt-32 pb-16 relative",
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}>
        {/* Particle Background for top header section */}
        <div className="absolute top-0 left-0 right-0 h-96 overflow-hidden z-0">
          <ParticleBackground className="opacity-30" />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-b",
            theme === "dark" 
              ? "from-transparent via-transparent to-gray-900" 
              : "from-transparent via-transparent to-white"
          )} />
        </div>
        
        {/* Main Container */}
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: 'Labs', href: '/labs' },
              { label: 'Automation', href: '/labs/automation' },
              { label: 'Selenium', href: '/labs/automation/selenium' },
              ...(activeModule !== 'intro' ? [{ 
                label: currentModule.title, 
                href: `/labs/automation/selenium/${activeModule}`,
                active: true
              }] : [])
            ]}
          />
          
          <Separator className="my-6" />
          
          {/* Back link */}
          <Link href="/labs/automation" className={cn(
            "inline-flex items-center hover:underline mb-8",
            theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
          )}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Automation Labs
          </Link>
          
          {/* Lab Header with Interactive Elements */}
          <div className="relative max-w-5xl mx-auto mb-16">
            <FloatingCard className="overflow-visible">
              <motion.div 
                className="text-center p-8 relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className={cn(
                    "inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 shadow-lg",
                    theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
                  )}
                >
                  <SiSelenium className="w-14 h-14" />
                </motion.div>
                
                <motion.h1 
                  className={cn(
                    "text-4xl md:text-5xl lg:text-6xl font-bold mb-6",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Selenium WebDriver{" "}
                  <span className={cn(
                    "bg-clip-text text-transparent bg-gradient-to-r",
                    theme === "dark" 
                      ? "from-[#40E0D0] to-[#00BFFF]" 
                      : "from-[#00BCD4] to-[#0097A7]"
                  )}>
                    Interactive Lab
                  </span>
                </motion.h1>
                
                <motion.p 
                  className={cn(
                    "text-xl max-w-3xl mx-auto mb-8",
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  Master web automation with Selenium WebDriver through hands-on practice with our
                  interactive learning platform.
                </motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                  className="flex flex-wrap justify-center gap-6 mt-8"
                >
                  <div className={cn(
                    "flex flex-col items-center p-4 rounded-lg",
                    theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"
                  )}>
                    <Award className={cn(
                      "w-8 h-8 mb-2",
                      theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
                    )} />
                    <span className={cn(
                      "text-lg font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Beginner Friendly
                    </span>
                  </div>
                  
                  <div className={cn(
                    "flex flex-col items-center p-4 rounded-lg",
                    theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"
                  )}>
                    <Code className={cn(
                      "w-8 h-8 mb-2",
                      theme === "dark" ? "text-purple-400" : "text-purple-600"
                    )} />
                    <span className={cn(
                      "text-lg font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      Interactive Coding
                    </span>
                  </div>
                  
                  <div className={cn(
                    "flex flex-col items-center p-4 rounded-lg",
                    theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"
                  )}>
                    <User className={cn(
                      "w-8 h-8 mb-2",
                      theme === "dark" ? "text-orange-400" : "text-orange-600"
                    )} />
                    <span className={cn(
                      "text-lg font-bold",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      2,500+ Students
                    </span>
                  </div>
                </motion.div>
              </motion.div>
              
              {/* Animated decorative elements */}
              <motion.div
                className={cn(
                  "absolute top-8 right-8 w-16 h-16 rounded-full opacity-70",
                  theme === "dark" ? "bg-purple-600" : "bg-purple-200"
                )}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 180, 270, 360]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 20,
                  ease: "linear"
                }}
              />
              
              <motion.div
                className={cn(
                  "absolute bottom-12 left-12 w-12 h-12 rounded-full opacity-70",
                  theme === "dark" ? "bg-[#40E0D0]" : "bg-[#00BCD4]"
                )}
                animate={{ 
                  scale: [1, 1.3, 1],
                  x: [0, 30, 0],
                  y: [0, -20, 0]
                }}
                transition={{ 
                  repeat: Infinity,
                  duration: 15,
                  ease: "easeInOut"
                }}
              />
            </FloatingCard>
          </div>
          
          {/* Lab Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Sidebar - Module List */}
            <motion.div
              className={cn(
                "p-4 lg:col-span-1 rounded-xl",
                theme === "dark" ? "bg-gray-800" : "bg-gray-50 shadow-md"
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={cn(
                  "text-xl font-bold p-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Lab Modules
                </h2>
                
                <div className="flex items-center text-sm">
                  <span className={cn(
                    "inline-block w-3 h-3 rounded-full mr-1",
                    theme === "dark" ? "bg-green-400" : "bg-green-500"
                  )}></span>
                  <span className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>Live</span>
                </div>
              </div>
              
              <Input
                type="text"
                placeholder="Search modules..."
                className={cn(
                  "mb-4",
                  theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                )}
              />
              
              <div className="space-y-3 mt-4">
                {modules.map((module, idx) => (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <div
                      onClick={() => setActiveModule(module.id)}
                      className={cn(
                        "cursor-pointer",
                        "block w-full text-left p-3 rounded-lg transition-all duration-200 border",
                        activeModule === module.id 
                          ? (theme === "dark" 
                              ? "bg-gray-700 border-[#40E0D0] text-white shadow-lg" 
                              : "bg-white border-[#00BCD4] text-gray-900 shadow-lg")
                          : (theme === "dark" 
                              ? "bg-gray-800 border-gray-700 hover:bg-gray-700 text-gray-300" 
                              : "bg-white border-gray-200 hover:bg-gray-50 text-gray-700")
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-7 h-7 rounded-md flex items-center justify-center mr-2",
                            activeModule === module.id
                              ? (theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white")
                              : (theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")
                          )}>
                            {module.icon}
                          </div>
                          <span className="font-medium">{module.title}</span>
                        </div>
                        
                        {module.badgeText && (
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              theme === "dark" 
                                ? "border-gray-600 text-gray-300" 
                                : "border-gray-300 text-gray-700"
                            )}
                          >
                            {module.badgeText}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="text-xs flex items-center gap-3">
                        <div className={cn(
                          "flex items-center",
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        )}>
                          <Clock className="w-3 h-3 mr-1" />
                          {module.duration}
                        </div>
                        
                        <div className={cn(
                          "flex items-center",
                          module.difficulty === 'beginner' 
                            ? (theme === "dark" ? "text-green-400" : "text-green-600")
                            : module.difficulty === 'intermediate'
                              ? (theme === "dark" ? "text-orange-400" : "text-orange-600")
                              : (theme === "dark" ? "text-red-400" : "text-red-600")
                        )}>
                          <span className="capitalize">{module.difficulty}</span>
                        </div>
                      </div>
                      
                      {activeModule === module.id && (
                        <div className="mt-2">
                          <div className="flex justify-between items-center text-xs mb-1">
                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>Completion rate</span>
                            <span className={theme === "dark" ? "text-gray-300" : "text-gray-700"}>{module.completionRate}%</span>
                          </div>
                          <div className={cn(
                              "h-1 w-full overflow-hidden rounded-full",
                              theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                            )}>
                            <div 
                              className={cn(
                                "h-full transition-all duration-300 ease-in-out",
                                module.completionRate > 80 
                                  ? "bg-green-500" 
                                  : module.completionRate > 60 
                                    ? "bg-yellow-500" 
                                    : "bg-red-500"
                              )}
                              style={{ width: `${module.completionRate}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            {/* Main Content Area */}
            <div
              className={cn(
                "p-6 lg:col-span-3 rounded-xl",
                theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"
              )}
            >
              {/* Module Header with animation on module change */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeModule} // This forces re-render when module changes
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "border-b pb-4 mb-6",
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  )}
                >
                  <h2 className={cn(
                    "text-2xl font-bold",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    {modules.find(m => m.id === activeModule)?.title}
                  </h2>
                  <p className={cn(
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  )}>
                    {modules.find(m => m.id === activeModule)?.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {modules.find(m => m.id === activeModule)?.skills.map((skill, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className={cn(
                          "text-xs",
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        )}
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Content Tabs */}
              <Tabs defaultValue="learn" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="learn" className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>Learn</span>
                  </TabsTrigger>
                  <TabsTrigger value="practice" className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Practice</span>
                  </TabsTrigger>
                  <TabsTrigger value="challenge" className="flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    <span>Challenge</span>
                  </TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TabsContent value="learn" className="mt-0">
                      {/* Learn Content */}
                      <div className={cn(
                        "prose prose-lg max-w-none",
                        theme === "dark" 
                          ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
                          : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
                      )}>
                        <h3>What is Selenium WebDriver?</h3>
                        <p>
                          Selenium WebDriver is an open-source automation framework that allows you to control web browsers programmatically. It provides a consistent API that works across different browsers and platforms.
                        </p>
                        <h3>Key Features</h3>
                        <ul>
                          <li>Support for multiple programming languages (Java, Python, C#, etc.)</li>
                          <li>Native browser support without external dependencies</li>
                          <li>Rich set of selectors to locate elements</li>
                          <li>Advanced browser interactions and javascript execution</li>
                        </ul>
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          <h4 className="flex items-center mt-0">
                            <Info className="w-5 h-5 mr-2" />
                            Pro Tip
                          </h4>
                          <p className="text-sm mb-0">
                            Always use explicit waits instead of Thread.sleep() for better test stability and performance.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="practice" className="mt-0">
                      {/* Practice Content */}
                      <div className="space-y-6">
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          <h3 className={cn(
                            "text-lg font-medium mb-2",
                            theme === "dark" ? "text-white" : "text-gray-900"
                          )}>
                            Practice Exercise
                          </h3>
                          <p className={cn(
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          )}>
                            Create a Selenium script that navigates to a website, finds an element, and interacts with it.
                          </p>
                        </div>
                        
                        <div className={cn(
                          "border rounded-lg",
                          theme === "dark" ? "border-gray-700" : "border-gray-200"
                        )}>
                          <div className={cn(
                            "border-b p-3 flex justify-between items-center",
                            theme === "dark" ? "border-gray-700" : "border-gray-200"
                          )}>
                            <span className={cn(
                              "font-medium",
                              theme === "dark" ? "text-white" : "text-gray-900"
                            )}>
                              editor.java
                            </span>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm" className="h-8">
                                Reset
                              </Button>
                              <Button size="sm" className="h-8">
                                Run
                              </Button>
                            </div>
                          </div>
                          <div className={cn(
                            "p-4 font-mono text-sm rounded-b-lg overflow-auto h-64",
                            theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-800"
                          )}>
                            <pre>{`import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class Main {
    public static void main(String[] args) {
        // TODO: Initialize ChromeDriver
        
        // TODO: Navigate to a website
        
        // TODO: Find an element by ID
        
        // TODO: Interact with the element
        
        // TODO: Close the browser
    }
}`}</pre>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="challenge" className="mt-0">
                      {/* Challenge Content */}
                      <div className="space-y-6">
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                        )}>
                          <h3 className={cn(
                            "text-lg font-medium mb-2",
                            theme === "dark" ? "text-white" : "text-gray-900"
                          )}>
                            Challenge: Automate a Login Form
                          </h3>
                          <p className={cn(
                            "mb-4",
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          )}>
                            Create a Selenium script that:
                          </p>
                          <ol className={cn(
                            "list-decimal pl-5 space-y-2",
                            theme === "dark" ? "text-gray-300" : "text-gray-700"
                          )}>
                            <li>Navigates to a login page</li>
                            <li>Fills in username and password fields</li>
                            <li>Clicks the login button</li>
                            <li>Verifies successful login by checking for an element on the dashboard</li>
                          </ol>
                        </div>
                        
                        <div className={cn(
                          "p-4 rounded-lg border",
                          theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
                        )}>
                          <div className="flex items-center justify-between mb-4">
                            <h4 className={cn(
                              "font-medium",
                              theme === "dark" ? "text-white" : "text-gray-900"
                            )}>
                              Your Progress
                            </h4>
                            <span className={cn(
                              "text-sm",
                              theme === "dark" ? "text-gray-400" : "text-gray-600"
                            )}>
                              0/4 completed
                            </span>
                          </div>
                          <div className="space-y-2">
                            {["Navigate to login page", "Fill in credentials", "Submit login form", "Verify successful login"].map((step, i) => (
                              <div 
                                key={i} 
                                className={cn(
                                  "flex items-center p-2 rounded",
                                  theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                                )}
                              >
                                <div className={cn(
                                  "w-6 h-6 rounded-full mr-3 flex items-center justify-center",
                                  theme === "dark" ? "bg-gray-600" : "bg-gray-200"
                                )}>
                                  {i + 1}
                                </div>
                                <span>{step}</span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-6 flex justify-end">
                            <Button>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Submit Challenge
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </motion.div>
                </AnimatePresence>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}