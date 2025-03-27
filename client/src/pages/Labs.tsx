import { useState, useEffect } from 'react';
import { Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { useInView } from '@/hooks/useIntersectionObserver';
import {
  Beaker,
  Code,
  Brain,
  Network,
  BarChart3,
  Shield,
  LineChart,
  Workflow,
  CpuIcon, 
  FileJson,
  Bot
} from "lucide-react";

// Components
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ParticleBackground from "@/components/ui/ParticleBackground";
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

const LabsPage = () => {
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref: heroRef, inView: heroInView } = useInView({ triggerOnce: true });
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const labCategories = [
    {
      id: 'automation',
      title: 'Automation Labs',
      description: 'Master test automation with hands-on practice in Selenium, Playwright, Cypress and other popular frameworks.',
      icon: <Bot className="h-10 w-10" />,
      color: 'from-purple-500 to-indigo-600',
      textColor: 'text-purple-100',
      featured: true,
      tags: ['Selenium', 'Playwright', 'Cypress', 'Appium'],
      levels: {
        beginner: 4,
        intermediate: 6,
        advanced: 3
      }
    },
    {
      id: 'api',
      title: 'API Testing Dojo',
      description: 'Learn to test REST, GraphQL and gRPC APIs using modern tools like Postman, RestAssured, and SuperTest.',
      icon: <Network className="h-10 w-10" />,
      color: 'from-blue-500 to-cyan-500',
      textColor: 'text-blue-100',
      featured: false,
      tags: ['REST', 'GraphQL', 'Postman', 'Contract Testing'],
      levels: {
        beginner: 3,
        intermediate: 4,
        advanced: 2
      }
    },
    {
      id: 'performance',
      title: 'Performance Arena',
      description: 'Master load testing, stress testing and performance optimization with JMeter, k6, and Gatling.',
      icon: <LineChart className="h-10 w-10" />,
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-100',
      featured: false,
      tags: ['JMeter', 'k6', 'Gatling', 'LoadRunner'],
      levels: {
        beginner: 2,
        intermediate: 3,
        advanced: 4
      }
    },
    {
      id: 'security',
      title: 'Security Testing Vault',
      description: 'Learn to identify and test for security vulnerabilities in web applications and APIs.',
      icon: <Shield className="h-10 w-10" />,
      color: 'from-green-500 to-emerald-600',
      textColor: 'text-green-100',
      featured: false,
      tags: ['OWASP', 'ZAP', 'Burp Suite', 'Penetration Testing'],
      levels: {
        beginner: 2,
        intermediate: 4,
        advanced: 5
      }
    },
    {
      id: 'devops',
      title: 'DevOps Test Pipeline',
      description: 'Build and maintain robust CI/CD pipelines with integrated testing at every stage.',
      icon: <Workflow className="h-10 w-10" />,
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-100',
      featured: false,
      tags: ['CI/CD', 'Jenkins', 'GitHub Actions', 'Docker'],
      levels: {
        beginner: 2,
        intermediate: 5,
        advanced: 4
      }
    },
    {
      id: 'ai',
      title: 'AI Testing Lab',
      description: 'Explore the cutting-edge intersection of AI and testing, from test generation to result analysis.',
      icon: <Brain className="h-10 w-10" />,
      color: 'from-violet-500 to-purple-600',
      textColor: 'text-violet-100',
      featured: true,
      comingSoon: true,
      tags: ['ML Models', 'Neural Networks', 'AI-Powered Testing', 'Generative AI'],
      levels: {
        beginner: 3,
        intermediate: 4,
        advanced: 3
      }
    }
  ];

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

  const LevelIndicator = ({ level, count }: { level: string; count: number }) => {
    const dots = Array.from({ length: count }, (_, i) => i);
    return (
      <div className="flex flex-col items-center">
        <span className="text-xs mb-1 opacity-70">{level}</span>
        <div className="flex space-x-1">
          {dots.map((dot, i) => (
            <div 
              key={i} 
              className={cn(
                "w-1.5 h-1.5 rounded-full",
                level === 'beginner' ? 'bg-green-400' : 
                level === 'intermediate' ? 'bg-yellow-400' :
                'bg-red-400'
              )}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <Helmet>
        <title>Interactive Testing Labs | Quality Sensei</title>
        <meta name="description" content="Hands-on interactive testing labs covering automation, API, performance, security and more. Learn by doing with real-world projects." />
      </Helmet>

      <Header />

      <main className="min-h-screen relative">
        <ParticleBackground className="absolute inset-0 opacity-30" />

        {/* Hero Section */}
        <section 
          ref={heroRef}
          className="relative py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-[#40E0D0] dark:from-[#40E0D0] dark:to-cyan-300">
                Interactive Testing Labs
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-600 dark:text-gray-300">
                Put your skills to the test with our hands-on interactive labs. Learn by doing in real-world testing environments.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => window.location.href = '/labs/automation'}>
                    Explore Labs
                  </div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700 rounded-lg font-medium shadow hover:shadow-md transition-all duration-300 cursor-pointer" onClick={() => {
                    const categoriesSection = document.getElementById('categories');
                    if (categoriesSection) categoriesSection.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    View Categories
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Stats Banner */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#00BCD4] dark:text-[#40E0D0]">20+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Interactive Labs</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#00BCD4] dark:text-[#40E0D0]">6</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#00BCD4] dark:text-[#40E0D0]">120+</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Exercises</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#00BCD4] dark:text-[#40E0D0]">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Lab Access</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Lab Categories Grid */}
        <section 
          id="categories"
          ref={gridRef}
          className="py-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Lab Categories</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Choose from a variety of specialized testing labs designed to build your skills in different areas
              </p>
            </div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate={gridInView ? "visible" : "hidden"}
            >
              {labCategories.map((category) => (
                <motion.div
                  key={category.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={cn(
                    "relative overflow-hidden rounded-2xl shadow-lg transition-all",
                    theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                  )}
                >
                  {/* Card background gradient */}
                  <div className={cn(
                    "absolute inset-0 opacity-30 bg-gradient-to-br",
                    category.color
                  )} />
                  
                  {/* Featured badge */}
                  {category.featured && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-yellow-500 text-yellow-900 text-xs font-bold px-3 py-1 transform rotate-45 translate-x-7 translate-y-0 shadow-sm">
                        FEATURED
                      </div>
                    </div>
                  )}
                  
                  {/* Coming Soon overlay */}
                  {category.comingSoon && (
                    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
                      <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full font-bold transform -rotate-12 shadow-lg">
                        Coming Soon
                      </div>
                    </div>
                  )}
                  
                  <div 
                    className="block p-6 h-full relative z-0 cursor-pointer"
                    onClick={() => {
                      if (!category.comingSoon) {
                        window.location.href = `/labs/${category.id}`;
                      }
                    }}
                  >
                    <div className="flex items-start">
                      <div className={cn(
                        "p-3 rounded-lg bg-gradient-to-br",
                        category.color
                      )}>
                        {category.icon}
                      </div>
                      <div className="ml-5">
                        <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{category.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {category.tags.map((tag, i) => (
                            <span 
                              key={i}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Difficulty levels */}
                        <div className="flex justify-between items-center">
                          <LevelIndicator level="beginner" count={category.levels.beginner} />
                          <LevelIndicator level="intermediate" count={category.levels.intermediate} />
                          <LevelIndicator level="advanced" count={category.levels.advanced} />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent to-gray-100 dark:to-gray-900">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Our Labs?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Our interactive labs provide a unique learning experience that traditional courses can't match
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-cyan-100 dark:bg-cyan-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <Beaker className="h-7 w-7 text-cyan-600 dark:text-cyan-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Hands-on Experience</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn by doing with real-world projects and challenges that mirror industry scenarios.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <Code className="h-7 w-7 text-purple-600 dark:text-purple-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interactive Code Challenges</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Write and execute real test code with instant feedback and guided solutions.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <BarChart3 className="h-7 w-7 text-orange-600 dark:text-orange-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Monitor your skill development with detailed analytics and achievement badges.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <CpuIcon className="h-7 w-7 text-green-600 dark:text-green-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Live Environment</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Work in fully configured testing environments with all necessary tools pre-installed.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-pink-100 dark:bg-pink-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <FileJson className="h-7 w-7 text-pink-600 dark:text-pink-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-world Test Cases</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Practice with authentic scenarios derived from actual industry testing challenges.
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg w-14 h-14 flex items-center justify-center mb-4">
                  <Bot className="h-7 w-7 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Assistance</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Get intelligent hints and personalized suggestions when you're stuck on a challenge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-cyan-500 to-[#40E0D0] dark:from-[#40E0D0] dark:to-cyan-600 rounded-3xl p-12 shadow-2xl relative overflow-hidden"
            >
              {/* Abstract shapes */}
              <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
                <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white"></div>
                <div className="absolute top-32 -right-32 w-80 h-80 rounded-full bg-white"></div>
                <div className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full bg-white"></div>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                  Ready to level up your testing skills?
                </h2>
                <p className="text-xl text-white opacity-90 mb-8 max-w-3xl mx-auto">
                  Join thousands of testers mastering QA skills through our interactive labs. Start your journey today!
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <div
                    className="inline-block px-8 py-4 bg-white text-cyan-600 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                    onClick={() => window.location.href = '/labs/automation'}
                  >
                    Start Learning Now
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default LabsPage;