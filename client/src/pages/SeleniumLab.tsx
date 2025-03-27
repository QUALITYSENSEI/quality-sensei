import { useEffect, useState, useRef } from 'react';
import { Link } from 'wouter';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronLeft, BookOpen, Code, PlayCircle, CheckCircle, Info, Award, ArrowRight, Zap, Brain, Clock, FileBadge, User, Check, Search, FileTerminal, Terminal as TerminalIcon } from 'lucide-react';
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
import Terminal from "@/components/ui/Terminal";
import CodeExample from "@/components/ui/CodeExample";
import TerminalCodeTabs from "@/components/ui/TerminalCodeTabs";
import { TerminalLine } from "@/lib/types";

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

export default function SeleniumLab() {
  const { theme } = useTheme();
  const { toast } = useToast();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [activeModule, setActiveModule] = useState('intro');
  const [activeTab, setActiveTab] = useState(activeModule === 'intro' ? 'install' : 'learn');
  const [saveScrollPosition, setSaveScrollPosition] = useState(false);
  const [scrollPosition, setScrollPosition] = useState<number | null>(null);
  
  // Reset tab when module changes and set the value in the Tabs component
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
  }, [activeTab]);
  
  // Save scroll position when module changes
  useEffect(() => {
    if (saveScrollPosition && scrollPosition !== null) {
      window.scrollTo(0, scrollPosition);
      setSaveScrollPosition(false);
    }
  }, [saveScrollPosition, scrollPosition]);
  
  const handleModuleClick = (moduleId: string) => {
    // Save current scroll position before changing module
    setScrollPosition(window.scrollY);
    setActiveModule(moduleId);
    setSaveScrollPosition(true);
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
          <div className="mb-8">
            <Breadcrumbs items={[
              { label: 'Home', href: '/' },
              { label: 'Labs', href: '/labs' },
              { label: 'Automation Labs', href: '/automation-labs' },
              { label: 'Selenium WebDriver', href: '/selenium-lab', active: true }
            ]} />
            
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h1 className={cn(
                  "text-3xl md:text-4xl font-bold mt-4",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Selenium WebDriver Lab
                </h1>
                <p className={cn(
                  "text-lg mt-2 max-w-2xl",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  Master Selenium WebDriver through hands-on exercises and step-by-step guidance.
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>1,245 enrolled</span>
                </Button>
                <Button className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>Start Lab</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Module Sidebar */}
            <div>
              <div className={cn(
                "p-4 rounded-lg mb-4",
                theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"
              )}>
                <h2 className={cn(
                  "text-xl font-medium mb-4",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Lab Modules
                </h2>
                
                <div className="space-y-3">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all flex items-start gap-3",
                        activeModule === module.id
                          ? theme === "dark" 
                              ? "bg-cyan-900/30 text-white border-l-4 border-[#40E0D0]"
                              : "bg-cyan-50 text-cyan-800 border-l-4 border-[#00BCD4]"
                          : theme === "dark"
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                      )}
                      onClick={() => handleModuleClick(module.id)}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                        activeModule === module.id
                          ? theme === "dark" ? "bg-[#40E0D0] text-black" : "bg-[#00BCD4] text-white"
                          : theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"
                      )}>
                        {module.icon}
                      </div>
                      <div>
                        <span className="block font-medium">{module.title}</span>
                        <span className={cn(
                          "text-sm block",
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        )}>
                          {module.duration}
                        </span>
                        {module.badgeText && (
                          <Badge className="mt-2" variant={module.badgeText === 'Advanced' ? "destructive" : "default"}>
                            {module.badgeText}
                          </Badge>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Module Content */}
            <div className="lg:col-span-3">
              <div className={cn(
                "p-6 rounded-lg mb-6",
                theme === "dark" ? "bg-gray-800" : "bg-white border border-gray-200"
              )}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={cn(
                    "text-2xl font-bold",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    {modules.find(m => m.id === activeModule)?.title}
                  </h2>
                  <div>
                    <Badge variant="outline">
                      Beginner
                    </Badge>
                  </div>
                </div>
                
                <p className={cn(
                  "text-lg mb-6",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  {modules.find(m => m.id === activeModule)?.description}
                </p>
              </div>
            
              {/* Content Tabs */}
              <Tabs value={activeTab} className="w-full" onValueChange={setActiveTab}>
                {activeModule === 'intro' ? (
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="install" className="flex items-center gap-2">
                      <FileTerminal className="w-4 h-4" />
                      <span>Install Library</span>
                    </TabsTrigger>
                    <TabsTrigger value="first-script" className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <span>First Script</span>
                    </TabsTrigger>
                    <TabsTrigger value="using-selenium" className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4" />
                      <span>Using Selenium</span>
                    </TabsTrigger>
                  </TabsList>
                ) : (
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
                )}
                
                <TabsContent value="install" className="mt-0">
                  <div className={cn(
                    "prose prose-lg max-w-none",
                    theme === "dark" 
                      ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
                      : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
                  )}>
                    <h3>Install a Selenium Library</h3>
                    <p>
                      Setting up the Selenium library for your favorite programming language is the first step.
                      The installation process depends on the language you choose to use. Make sure to check the
                      <a href="https://www.selenium.dev/downloads/" target="_blank" rel="noopener noreferrer"> Selenium downloads page </a>
                      to ensure you're using the latest version.
                    </p>

                    <div className="my-8">
                      <h4>Requirements by Language</h4>
                      
                      <div className="flex flex-wrap gap-3 mb-4">
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <FileTerminal className="text-orange-500 h-4 w-4" /> <span>Java</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <SiPython className="text-blue-500" /> <span>Python</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <Code className="text-purple-500 h-4 w-4" /> <span>C#</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <FileTerminal className="text-red-500 h-4 w-4" /> <span>Ruby</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <SiJavascript className="text-yellow-500" /> <span>JavaScript</span>
                        </div>
                        <div className={cn(
                          "flex items-center gap-2 px-3 py-2 rounded-md",
                          theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
                        )}>
                          <Code className="text-blue-400 h-4 w-4" /> <span>Kotlin</span>
                        </div>
                      </div>
                      
                      <p>Java requires at least Java 8 for Selenium WebDriver (view the <a href="https://www.selenium.dev/documentation/webdriver/getting_started/install_library/" target="_blank" rel="noopener noreferrer">minimum supported Java version here</a>).</p>
                      <p>Installation of Selenium libraries for Java is accomplished using a build tool.</p>
                      
                      <TerminalCodeTabs 
                        title="Java Dependency Configuration" 
                        description="Choose your preferred build tool:"
                        tabs={[
                          {
                            id: "maven",
                            label: "Maven",
                            code: `<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>\${selenium.version}</version>
</dependency>`
                          },
                          {
                            id: "gradle",
                            label: "Gradle",
                            code: `testImplementation 'org.seleniumhq.selenium:selenium-java:4.29.0'
testImplementation 'org.junit.jupiter:junit-jupiter-engine:5.12.0'`
                          }
                        ]}
                        className="my-6"
                      />
                    </div>

                    <div className="mt-8">
                      <h3>Terminal Commands</h3>
                      <p>Here's how you can install Selenium using package managers in different languages:</p>
                      
                      <Terminal 
                        lines={[
                          { type: 'command', content: 'pip install selenium', delay: 500 },
                          { type: 'output', content: 'Collecting selenium', delay: 1000 },
                          { type: 'output', content: '  Downloading selenium-4.29.0.tar.gz (8.9 MB)', delay: 1500 },
                          { type: 'output', content: 'Installing collected packages: selenium', delay: 2000 },
                          { type: 'success', content: 'Successfully installed selenium-4.29.0', delay: 2500 },
                          { type: 'cursor', content: '', delay: 3000 }
                        ]}
                        language="Python"
                        className="mb-4"
                      />
                    </div>
                    
                    <div className={cn(
                      "p-4 rounded-lg mt-6",
                      theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                    )}>
                      <h4 className="flex items-center mt-0">
                        <Info className="w-5 h-5 mr-2" />
                        Pro Tip
                      </h4>
                      <p className="text-sm mb-0">
                        Always check the compatibility between your browser version and the WebDriver version you're using.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="first-script" className="mt-0">
                  <div className={cn(
                    "prose prose-lg max-w-none",
                    theme === "dark" 
                      ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
                      : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
                  )}>
                    <h3>Write your first Selenium script</h3>
                    <p>
                      Once you have Selenium installed, you're ready to write Selenium code. Everything Selenium does is 
                      send browser commands or request information. The following components make up the foundation of 
                      most Selenium scripts.
                    </p>

                    <h4 className="mt-6">Eight Basic Components</h4>
                    <p>
                      Most of what you'll do with Selenium is a combination of these basic commands:
                    </p>

                    <div className="space-y-8 mt-6">
                      <div>
                        <h5 className="flex items-center">
                          <span className="flex items-center justify-center bg-cyan-600 text-white rounded-full w-6 h-6 mr-2 text-sm">1</span>
                          Start the session
                        </h5>
                        <p className="text-sm ml-8">For more details on starting a session read our documentation on driver sessions</p>
                        <CodeExample 
                          examples={[
                            {
                              language: "java",
                              code: `WebDriver driver = new ChromeDriver();`,
                              label: "Java"
                            }
                          ]}
                          className="ml-8"
                        />
                      </div>

                      <div>
                        <h5 className="flex items-center">
                          <span className="flex items-center justify-center bg-cyan-600 text-white rounded-full w-6 h-6 mr-2 text-sm">2</span>
                          Take action on browser
                        </h5>
                        <p className="text-sm ml-8">In this example we are navigating to a web page.</p>
                        <CodeExample 
                          examples={[
                            {
                              language: "java",
                              code: `driver.get("https://www.selenium.dev/selenium/web/web-form.html");`,
                              label: "Java"
                            }
                          ]}
                          className="ml-8"
                        />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="using-selenium" className="mt-0">
                  <div className={cn(
                    "prose prose-lg max-w-none",
                    theme === "dark" 
                      ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
                      : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
                  )}>
                    <h3>Organizing and Executing Selenium Code</h3>
                    <p>
                      If you want to run more than a handful of one-off scripts, you need to be able to organize and work 
                      with your code effectively.
                    </p>

                    <div className="my-6">
                      <h4>Common Uses of Selenium</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                        )}>
                          <h5 className="text-lg font-semibold mb-2">Testing</h5>
                          <p className="text-sm">
                            Running Selenium for testing requires making assertions. A good assertion library and test runner are essential.
                          </p>
                        </div>
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                        )}>
                          <h5 className="text-lg font-semibold mb-2">Repetitive Tasks</h5>
                          <p className="text-sm">
                            Automate workflows like logging into websites, submitting forms, or downloading content on a schedule.
                          </p>
                        </div>
                        <div className={cn(
                          "p-4 rounded-lg",
                          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                        )}>
                          <h5 className="text-lg font-semibold mb-2">Web Scraping</h5>
                          <p className="text-sm">
                            Collect data from sites that don't have an API. Be sure to respect website terms of service.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="learn" className="mt-0">
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
                      <li>Advanced browser interactions and JavaScript execution</li>
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="practice" className="mt-0">
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
                  </div>
                </TabsContent>
                
                <TabsContent value="challenge" className="mt-0">
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
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}