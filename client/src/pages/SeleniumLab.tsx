import { useEffect, useState } from 'react';
import { Link, useLocation, useRoute } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, BookOpen, Code, PlayCircle, CheckCircle, Info } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { SiSelenium } from 'react-icons/si';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { cn } from '@/lib/utils';
import { useTheme } from "@/contexts/ThemeContext";

// Module interface
interface Module {
  id: string;
  title: string;
  description: string;
}

// Modules available in the Selenium lab
const modules: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to Selenium',
    description: 'Learn the basics of Selenium WebDriver and its architecture.'
  },
  {
    id: 'setup',
    title: 'Setting Up Selenium',
    description: 'Set up Selenium WebDriver with Java and configure your environment.'
  },
  {
    id: 'locators',
    title: 'Element Locators',
    description: 'Master different locator strategies: ID, Name, Class, XPath, and CSS Selectors.'
  },
  {
    id: 'actions',
    title: 'Browser Actions',
    description: 'Learn to interact with web elements: clicks, typing, scrolling, and more.'
  },
  {
    id: 'waits',
    title: 'Synchronization & Waits',
    description: 'Handle timing issues with implicit, explicit, and fluent waits.'
  },
  {
    id: 'advanced',
    title: 'Advanced Interactions',
    description: 'Work with advanced scenarios: alerts, frames, windows, and drag-and-drop.'
  },
  {
    id: 'framework',
    title: 'Building a Framework',
    description: 'Create a modular, maintainable test automation framework.'
  },
  {
    id: 'reporting',
    title: 'Reporting & Logging',
    description: 'Implement comprehensive test reporting and logging mechanisms.'
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

  // Scroll to top and update module when URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
    // If we have a valid module in URL, update the active module
    if (isValidModule) {
      setActiveModule(moduleId);
    }
  }, [moduleId, isValidModule]);

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
        "pt-28 md:pt-32 pb-16",
        theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      )}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          
          {/* Lab Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn(
              "inline-flex items-center justify-center w-20 h-20 rounded-full mb-4",
              theme === "dark" ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"
            )}>
              <SiSelenium className="w-10 h-10" />
            </div>
            <h1 className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Selenium WebDriver Lab
            </h1>
            <p className={cn(
              "text-xl",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Master web automation with Selenium WebDriver through hands-on practice.
            </p>
          </motion.div>
          
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
              <h2 className={cn(
                "text-xl font-bold mb-4 p-2",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Lab Modules
              </h2>
              <div className="space-y-1">
                {modules.map((module) => (
                  <Link
                    key={module.id}
                    href={`/labs/automation/selenium/${module.id}`}
                    className={cn(
                      "block w-full text-left p-3 rounded-lg transition-colors",
                      activeModule === module.id 
                        ? (theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white")
                        : (theme === "dark" ? "hover:bg-gray-700 text-gray-300" : "hover:bg-gray-200 text-gray-700")
                    )}
                  >
                    {module.title}
                  </Link>
                ))}
              </div>
            </motion.div>
            
            {/* Main Content Area */}
            <motion.div
              className={cn(
                "p-6 lg:col-span-3 rounded-xl",
                theme === "dark" ? "bg-gray-800" : "bg-white shadow-md"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Module Header */}
              <div className={cn(
                "border-b pb-4 mb-6",
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              )}>
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
              </div>
              
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
            </motion.div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}