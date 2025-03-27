import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronLeft, Code } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { SiSelenium, SiTestinglibrary, SiCucumber, SiAppium, SiJenkins } from 'react-icons/si';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTheme } from "@/contexts/ThemeContext";

// Lab card type
interface LabCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  route: string;
  modules: number;
  duration: string;
  comingSoon?: boolean;
}

// Automation lab cards
const automationLabs: LabCard[] = [
  {
    id: 'selenium',
    title: 'Selenium WebDriver',
    description: 'Learn to automate web browsers with the most popular automation framework.',
    icon: <SiSelenium className="h-10 w-10" />,
    level: 'Beginner',
    color: 'from-green-500 to-emerald-700',
    route: '/labs/automation/selenium',
    modules: 8,
    duration: '6 hours'
  },
  {
    id: 'testng',
    title: 'TestNG Framework',
    description: 'Master test organization, parallelization, and reporting with TestNG.',
    icon: <SiTestinglibrary className="h-10 w-10" />,
    level: 'Intermediate',
    color: 'from-blue-500 to-indigo-700',
    route: '/labs/automation/testng',
    modules: 6,
    duration: '4 hours',
    comingSoon: true
  },
  {
    id: 'cucumber',
    title: 'Cucumber BDD',
    description: 'Practice behavior-driven development with Gherkin syntax and Cucumber.',
    icon: <SiCucumber className="h-10 w-10" />,
    level: 'Intermediate',
    color: 'from-lime-500 to-green-700',
    route: '/labs/automation/cucumber',
    modules: 5,
    duration: '3 hours',
    comingSoon: true
  },
  {
    id: 'shaft',
    title: 'SHAFT Engine',
    description: 'Learn this test automation engine built on top of Selenium WebDriver.',
    icon: <Code className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-purple-500 to-purple-900',
    route: '/labs/automation/shaft',
    modules: 7,
    duration: '5 hours',
    comingSoon: true
  },
  {
    id: 'appium',
    title: 'Appium Mobile',
    description: 'Automate mobile applications on Android and iOS platforms.',
    icon: <SiAppium className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-purple-500 to-pink-700',
    route: '/labs/automation/appium',
    modules: 9,
    duration: '7 hours',
    comingSoon: true
  },
  {
    id: 'ci-cd',
    title: 'CI/CD Integration',
    description: 'Integrate test automation into CI/CD pipelines with Jenkins.',
    icon: <SiJenkins className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-red-500 to-rose-700',
    route: '/labs/automation/ci-cd',
    modules: 4,
    duration: '3 hours',
    comingSoon: true
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 }
  }
};

// Loading skeleton component for lab cards
function LabCardSkeleton() {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "overflow-hidden transition-all duration-300 border-2 rounded-xl relative",
        theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-md"
      )}
      aria-hidden="true"
    >
      <div className="h-28 sm:h-32 bg-gradient-to-r animate-pulse">
        <div className={cn(
          "h-full w-full",
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        )}></div>
      </div>
      <div className="p-4 sm:p-6 space-y-3">
        <div className={cn(
          "h-6 w-24 rounded animate-pulse",
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        )}></div>
        <div className={cn(
          "h-8 w-3/4 rounded animate-pulse",
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        )}></div>
        <div className={cn(
          "h-16 w-full rounded animate-pulse",
          theme === "dark" ? "bg-gray-700" : "bg-gray-200"
        )}></div>
        <div className="flex justify-between">
          <div className={cn(
            "h-5 w-20 rounded animate-pulse",
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          )}></div>
          <div className={cn(
            "h-5 w-16 rounded animate-pulse",
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          )}></div>
        </div>
      </div>
    </div>
  );
}

export default function AutomationLabs() {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  // Scroll to top on load and simulate loading state
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Simulate loading for better user experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Badge color based on level
  const getLevelBadgeColor = (level: string) => {
    if (theme === "dark") {
      switch (level) {
        case 'Beginner':
          return 'bg-green-900/30 text-green-400';
        case 'Intermediate':
          return 'bg-blue-900/30 text-blue-400';
        case 'Advanced':
          return 'bg-purple-900/30 text-purple-400';
        default:
          return 'bg-gray-900/30 text-gray-400';
      }
    } else {
      switch (level) {
        case 'Beginner':
          return 'bg-green-100 text-green-800';
        case 'Intermediate':
          return 'bg-blue-100 text-blue-800';
        case 'Advanced':
          return 'bg-purple-100 text-purple-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Automation Testing Labs | Quality Sensei</title>
        <meta name="description" content="Practice automation testing with our interactive labs. Learn Selenium, TestNG, Cucumber BDD, and more." />
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
              { label: 'Automation', href: '/labs/automation', active: true }
            ]}
          />
          
          <Separator className="my-6" />
          
          {/* Back link */}
          <Link href="/labs" className={cn(
            "inline-flex items-center hover:underline mb-8",
            theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
          )}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to All Labs
          </Link>
          
          {/* Page Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className={cn(
              "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
              theme === "dark" ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"
            )}>
              <Code className="w-8 h-8" />
            </div>
            <h1 className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Automation Testing Labs
            </h1>
            <p className={cn(
              "text-xl",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Hands-on automation labs to master various automation frameworks and tools.
            </p>
          </motion.div>
          
          {/* Lab Cards Grid */}
          {isLoading ? (
            // Loading Skeleton
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-7xl mx-auto">
              {Array.from({ length: 6 }).map((_, index) => (
                <LabCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            // Actual Content
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 max-w-7xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {automationLabs.map(lab => {
                return (
                  <motion.div
                    key={lab.id}
                    className={cn(
                      "overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lg border-2 rounded-xl relative",
                      "touch-manipulation active:scale-[0.98]", // Better touch handling
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 hover:border-[#40E0D0]/30 focus-within:border-[#40E0D0]/50" 
                        : "bg-white border-gray-200 hover:border-[#00BCD4]/30 focus-within:border-[#00BCD4]/50 shadow-md"
                    )}
                    variants={itemVariants}
                    tabIndex={0} // Enable keyboard focus
                    role="article"
                    aria-labelledby={`lab-title-${lab.id}`}
                  >
                    {lab.comingSoon ? (
                      <div className="cursor-not-allowed">
                        <div className={`h-28 sm:h-32 bg-gradient-to-r ${lab.color} flex items-center justify-center opacity-70`}>
                          <div className="bg-white/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                            {lab.icon}
                          </div>
                        </div>
                        <div className="p-4 sm:p-6">
                          <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getLevelBadgeColor(lab.level)}`}>
                            {lab.level}
                          </span>
                          <h3 
                            id={`lab-title-${lab.id}`}
                            className={cn(
                              "text-lg sm:text-xl font-bold mb-2",
                              theme === "dark" ? "text-white" : "text-gray-900"
                            )}
                          >
                            {lab.title}
                          </h3>
                          <p className={cn(
                            "text-sm mb-3 sm:mb-4",
                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                          )}>
                            {lab.description}
                          </p>
                          <div className={cn(
                            "flex flex-wrap gap-2 sm:justify-between text-sm",
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          )}>
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              {lab.modules} Modules
                            </span>
                            <span className="flex items-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {lab.duration}
                            </span>
                          </div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                          <span className="bg-black/70 text-white px-4 py-2 rounded-full font-bold">Coming Soon</span>
                        </div>
                      </div>
                    ) : (
                      <Link href={lab.route} className="focus:outline-none" aria-labelledby={`lab-title-${lab.id}`}>
                        <div className="cursor-pointer">
                          <div className={`h-28 sm:h-32 bg-gradient-to-r ${lab.color} flex items-center justify-center`}>
                            <div className="bg-white/20 w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center">
                              {lab.icon}
                            </div>
                          </div>
                          <div className="p-4 sm:p-6">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-3 ${getLevelBadgeColor(lab.level)}`}>
                              {lab.level}
                            </span>
                            <h3 
                              id={`lab-title-${lab.id}`}
                              className={cn(
                                "text-lg sm:text-xl font-bold mb-2",
                                theme === "dark" ? "text-white" : "text-gray-900"
                              )}
                            >
                              {lab.title}
                            </h3>
                            <p className={cn(
                              "text-sm mb-3 sm:mb-4",
                              theme === "dark" ? "text-gray-300" : "text-gray-600"
                            )}>
                              {lab.description}
                            </p>
                            <div className={cn(
                              "flex flex-wrap gap-2 sm:justify-between text-sm",
                              theme === "dark" ? "text-gray-400" : "text-gray-500"
                            )}>
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                                {lab.modules} Modules
                              </span>
                              <span className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {lab.duration}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </main>
      
      <Footer />
    </>
  );
}

