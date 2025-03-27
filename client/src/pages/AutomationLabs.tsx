import { useState } from 'react';
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Bot,
  PlayCircle,
  Code,
  Terminal,
  Cloud,
  Smartphone,
  Search,
  MousePointer,
  FileCheck
} from "lucide-react";
import { SiSelenium, SiPlaywright, SiCypress, SiAppium } from "@/components/IconImports";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

// Base animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  },
};

const AutomationLabs = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const labPathways = [
    {
      id: "web-ui",
      title: "Web UI Automation",
      technologies: ["selenium", "playwright", "cypress"],
      description: "Master web UI automation with industry-standard tools and frameworks",
      icon: <Bot className="h-8 w-8" />,
      color: "from-purple-500 to-indigo-600",
      difficulty: "beginner-to-advanced",
      popular: true,
      modules: 12,
      completionTime: "12-15 hours",
      skills: ["Element Selection", "Action Chains", "Waits", "Cross-browser Testing"]
    },
    {
      id: "api",
      title: "API Automation",
      technologies: ["postman", "rest-assured", "supertest"],
      description: "Build robust API test automation frameworks from the ground up",
      icon: <Cloud className="h-8 w-8" />,
      color: "from-blue-500 to-cyan-500",
      difficulty: "intermediate",
      popular: false,
      modules: 8,
      completionTime: "8-10 hours",
      skills: ["Request Building", "Response Validation", "Authentication", "Mocking"]
    },
    {
      id: "mobile",
      title: "Mobile Automation",
      technologies: ["appium", "espresso", "xcuitest"],
      description: "Automate testing for iOS and Android applications",
      icon: <Smartphone className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600",
      difficulty: "intermediate",
      popular: false,
      modules: 10,
      completionTime: "10-12 hours",
      skills: ["Native App Testing", "Mobile Gestures", "Device Farms", "Emulators"]
    },
    {
      id: "codeless",
      title: "Codeless Automation",
      technologies: ["testproject", "katalon", "ranorex"],
      description: "Learn powerful no-code and low-code automation approaches",
      icon: <MousePointer className="h-8 w-8" />,
      color: "from-pink-500 to-rose-500",
      difficulty: "beginner",
      popular: true,
      modules: 6,
      completionTime: "5-7 hours",
      skills: ["Record & Playback", "Test Case Design", "Hybrid Approaches", "Reporting"]
    },
    {
      id: "ci-cd",
      title: "CI/CD Automation",
      technologies: ["jenkins", "github-actions", "circleci"],
      description: "Integrate test automation into modern CI/CD pipelines",
      icon: <Terminal className="h-8 w-8" />,
      color: "from-amber-500 to-orange-600",
      difficulty: "advanced",
      popular: false,
      modules: 8,
      completionTime: "8-10 hours",
      skills: ["Pipeline Configuration", "Parallel Execution", "Docker", "Reporting"]
    },
    {
      id: "advanced",
      title: "Advanced Techniques",
      technologies: ["selenium", "playwright", "cypress"],
      description: "Master advanced automation patterns and practices",
      icon: <Code className="h-8 w-8" />,
      color: "from-violet-500 to-purple-600",
      difficulty: "advanced",
      popular: false,
      modules: 10,
      completionTime: "12-15 hours",
      skills: ["Page Objects", "Data-Driven Testing", "Visual Testing", "Performance"]
    },
  ];

  const featuredLabs = [
    {
      id: "selenium",
      title: "Selenium WebDriver Masterclass",
      description: "Master Selenium WebDriver for robust web application testing",
      icon: <SiSelenium className="h-10 w-10" />,
      color: "from-green-400 to-emerald-600",
      languages: ["JavaScript", "Java", "Python", "C#"],
      modules: 12, 
      students: 15432,
      level: "All Levels",
      route: "/labs/automation/selenium",
      comingSoon: false
    },
    {
      id: "playwright",
      title: "Playwright Testing Workshop",
      description: "Modern end-to-end testing with Microsoft's Playwright",
      icon: <SiPlaywright className="h-10 w-10" />,
      color: "from-purple-500 to-violet-600",
      languages: ["TypeScript", "JavaScript", "Python", "Java"],
      modules: 10,
      students: 8745,
      level: "Intermediate",
      route: "/labs/automation/playwright",
      comingSoon: true
    },
    {
      id: "cypress",
      title: "Cypress.io Testing Framework",
      description: "Component and E2E testing with the Cypress testing framework",
      icon: <SiCypress className="h-10 w-10" />,
      color: "from-slate-600 to-gray-800",
      languages: ["JavaScript", "TypeScript"],
      modules: 8,
      students: 7321,
      level: "Beginner-Intermediate",
      route: "/labs/automation/cypress",
      comingSoon: true
    },
    {
      id: "appium",
      title: "Appium Mobile Testing",
      description: "Cross-platform mobile app testing with Appium",
      icon: <SiAppium className="h-10 w-10" />,
      color: "from-purple-400 to-indigo-500",
      languages: ["Java", "JavaScript", "Python", "Ruby"],
      modules: 10,
      students: 5867,
      level: "Intermediate-Advanced",
      route: "/labs/automation/appium",
      comingSoon: true
    }
  ];

  // Filter labs based on active filter
  const filteredPathways = activeFilter === "all" 
    ? labPathways 
    : labPathways.filter(lab => {
        if (activeFilter === "beginner") return lab.difficulty.includes("beginner");
        if (activeFilter === "intermediate") return lab.difficulty.includes("intermediate");
        if (activeFilter === "advanced") return lab.difficulty.includes("advanced");
        if (activeFilter === "popular") return lab.popular;
        return true;
      });

  return (
    <>
      <Helmet>
        <title>Test Automation Labs | Quality Sensei</title>
        <meta name="description" content="Interactive test automation labs covering Selenium, Playwright, Cypress, Appium and more. Hands-on learning for all skill levels." />
      </Helmet>

      <Header />

      <main className="min-h-screen relative">
        <ParticleBackground className="absolute inset-0 opacity-30" />

        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-block mb-4 px-4 py-1 bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200 rounded-full font-medium">
                    <Bot className="inline-block h-4 w-4 mr-1" />
                    Test Automation
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-cyan-500">
                    Automation Testing Labs
                  </h1>
                  <p className="text-lg mb-8 text-gray-600 dark:text-gray-300">
                    Master test automation with hands-on interactive labs. Build real automation frameworks, solve challenges, and gain practical skills that employers demand.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link href="/labs/automation/selenium">
                      <a className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                        <PlayCircle className="h-5 w-5 mr-2" />
                        Start Learning
                      </a>
                    </Link>
                    <a 
                      href="#pathways" 
                      className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Explore Labs
                    </a>
                  </div>
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <div className="relative bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                    MOST POPULAR
                  </div>
                  
                  {/* Code snippet */}
                  <div className="bg-gray-900 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto mb-6">
                    <pre>{`import { Builder, By, Key, until } from 'selenium-webdriver';

async function runTest() {
  // Launch browser
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to site
    await driver.get('https://qualitysensei.dev');
    
    // Find search input and enter text
    await driver.findElement(By.name('q')).sendKeys('automation', Key.RETURN);
    
    // Wait for results page
    await driver.wait(until.titleContains('automation'), 5000);
    
    // Get and log results count
    const results = await driver.findElements(By.css('.result-item'));
    console.log(\`Found \${results.length} results\`);
    
  } finally {
    // Close browser
    await driver.quit();
  }
}

runTest();`}</pre>
                  </div>
                  
                  {/* Feature bullets */}
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full">
                        <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">Run real tests in simulated browser environments</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full">
                        <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">Learn multiple languages with side-by-side examples</p>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-green-100 dark:bg-green-900 p-1 rounded-full">
                        <FileCheck className="h-4 w-4 text-green-600 dark:text-green-400" />
                      </div>
                      <p className="ml-3 text-sm text-gray-600 dark:text-gray-300">Tackle real-world testing scenarios and challenges</p>
                    </div>
                  </div>
                </div>
                
                {/* Abstract decorative elements */}
                <div className="absolute -z-10 -bottom-6 -right-6 w-64 h-64 bg-gradient-to-r from-purple-200 to-cyan-200 dark:from-purple-900 dark:to-cyan-900 rounded-2xl opacity-50"></div>
                <div className="absolute -z-10 -top-6 -left-6 w-32 h-32 bg-gradient-to-r from-amber-200 to-rose-200 dark:from-amber-900 dark:to-rose-900 rounded-2xl opacity-50"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Top Labs Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Featured Automation Labs</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Start your automation journey with our most popular interactive labs
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredLabs.map((lab) => (
                <motion.div 
                  key={lab.id}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn(
                    "rounded-xl shadow-lg overflow-hidden",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  )}
                >
                  {/* Coming Soon overlay */}
                  {lab.comingSoon && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
                      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full font-bold transform -rotate-12 shadow-lg">
                        Coming Soon
                      </div>
                    </div>
                  )}
                
                  <Link href={lab.comingSoon ? "#" : lab.route}>
                    <a className="block relative">
                      {/* Header with icon */}
                      <div className={cn(
                        "h-24 flex items-center justify-center bg-gradient-to-r",
                        lab.color
                      )}>
                        <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                          {lab.icon}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-lg mb-2">{lab.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{lab.description}</p>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Modules</p>
                            <p className="font-bold">{lab.modules}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Students</p>
                            <p className="font-bold">{lab.students.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Languages</p>
                            <p className="font-bold">{lab.languages.length}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 dark:text-gray-400">Level</p>
                            <p className="font-bold">{lab.level}</p>
                          </div>
                        </div>
                        
                        {/* Languages */}
                        <div className="flex flex-wrap gap-2">
                          {lab.languages.map((lang, i) => (
                            <span 
                              key={i}
                              className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                    </a>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Learning Pathways */}
        <section id="pathways" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Automation Learning Pathways</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose your learning path based on your interests and career goals
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button 
                onClick={() => setActiveFilter("all")}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeFilter === "all" 
                    ? "bg-purple-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                All Pathways
              </button>
              <button 
                onClick={() => setActiveFilter("beginner")}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeFilter === "beginner" 
                    ? "bg-green-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Beginner Friendly
              </button>
              <button 
                onClick={() => setActiveFilter("intermediate")}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeFilter === "intermediate" 
                    ? "bg-blue-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Intermediate
              </button>
              <button 
                onClick={() => setActiveFilter("advanced")}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeFilter === "advanced" 
                    ? "bg-red-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Advanced
              </button>
              <button 
                onClick={() => setActiveFilter("popular")}
                className={cn(
                  "px-4 py-2 rounded-full font-medium transition-all",
                  activeFilter === "popular" 
                    ? "bg-amber-600 text-white shadow-md" 
                    : "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                )}
              >
                Most Popular
              </button>
            </div>

            {/* Pathways Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeFilter} // Re-run animation when filter changes
            >
              {filteredPathways.map((pathway) => (
                <motion.div
                  key={pathway.id}
                  variants={itemVariants}
                  className={cn(
                    "rounded-xl overflow-hidden shadow-md transition-all",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  )}
                >
                  {/* Card header */}
                  <div className={cn(
                    "h-20 flex items-center px-6 bg-gradient-to-r",
                    pathway.color
                  )}>
                    <div className="bg-white/20 p-2 rounded-lg mr-4">
                      {pathway.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg">{pathway.title}</h3>
                      {pathway.popular && (
                        <span className="inline-block px-2 py-0.5 bg-white/30 text-white text-xs rounded-full">
                          Popular Choice
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Card content */}
                  <div className="p-6">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {pathway.description}
                    </p>
                    
                    {/* Technology badges */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies:</p>
                      <div className="flex flex-wrap gap-2">
                        {pathway.technologies.map((tech, i) => (
                          <span 
                            key={i}
                            className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full capitalize"
                          >
                            {tech.replace('-', ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Difficulty</p>
                        <p className="font-bold capitalize">{pathway.difficulty.replace('-to-', ' to ')}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Modules</p>
                        <p className="font-bold">{pathway.modules} modules</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Completion Time</p>
                        <p className="font-bold">{pathway.completionTime}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                        <p className="text-gray-500 dark:text-gray-400">Skills</p>
                        <p className="font-bold">{pathway.skills.length}+ skills</p>
                      </div>
                    </div>
                    
                    {/* Skills preview */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {pathway.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs text-gray-600 dark:text-gray-400">
                          • {skill}
                        </span>
                      ))}
                      {pathway.skills.length > 3 && (
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          • +{pathway.skills.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <Link href={`/labs/automation/${pathway.id}`}>
                        <a className={cn(
                          "inline-block w-full text-center py-2 rounded-lg font-medium transition-all",
                          "bg-gradient-to-r from-gray-800 to-gray-700 text-white hover:shadow-md",
                          "dark:from-gray-700 dark:to-gray-600"
                        )}>
                          Explore Pathway
                        </a>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className={cn(
              "rounded-3xl shadow-xl overflow-hidden",
              theme === 'dark' ? 'bg-gray-800' : 'bg-white'
            )}>
              <div className="relative">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-cyan-500/10"></div>
                
                <div className="relative p-8 md:p-12">
                  <div className="md:max-w-lg">
                    <h2 className="text-3xl font-bold mb-4">Ready to become an automation expert?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Start your journey with our comprehensive Selenium WebDriver lab - the perfect first step for aspiring automation engineers.
                    </p>
                    
                    <div className="flex flex-wrap gap-4">
                      <Link href="/labs/automation/selenium">
                        <a className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300">
                          Start Selenium Lab
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="px-6 py-3 border border-gray-300 dark:border-gray-700 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300">
                          View Prerequisites
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Decorative code element */}
                <div className="hidden md:block absolute top-8 right-8 max-w-xs">
                  <div className="bg-gray-900 rounded-lg p-4 text-gray-300 font-mono text-xs transform rotate-2 shadow-xl">
                    <pre>{`driver.findElement(By.id("success"))
  .getText()
  .then(text => {
    expect(text).toEqual(
      "You're on your way to 
       becoming an expert!"
    );
  });`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default AutomationLabs;