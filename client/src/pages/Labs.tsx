import { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Beaker, Code, FileJson, Users, BookOpen, Play } from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useTheme } from "@/contexts/ThemeContext";

// Lab category type
interface LabCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  count: number;
  comingSoon?: boolean;
}

// All lab categories
const labCategories: LabCategory[] = [
  {
    id: 'manual',
    title: 'Manual Testing',
    description: 'Learn the fundamentals of manual testing with interactive exercises on test cases, bug reports, and more.',
    icon: <Beaker className="h-8 w-8" />,
    color: 'from-cyan-500 to-blue-500',
    route: '/labs/manual',
    count: 5,
    comingSoon: true
  },
  {
    id: 'automation',
    title: 'Automation Testing',
    description: 'Hands-on automation labs covering Selenium, TestNG, and other popular frameworks with real-world examples.',
    icon: <Code className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-500',
    route: '/labs/automation',
    count: 6
  },
  {
    id: 'api',
    title: 'API Testing',
    description: 'Practice API testing techniques using Postman, REST Assured, and other tools with guided exercises.',
    icon: <FileJson className="h-8 w-8" />,
    color: 'from-amber-500 to-orange-500',
    route: '/labs/api',
    count: 4,
    comingSoon: true
  },
  {
    id: 'performance',
    title: 'Performance Testing',
    description: 'Learn to measure application performance using JMeter, Gatling, and k6 with practical examples.',
    icon: <Play className="h-8 w-8" />,
    color: 'from-red-500 to-rose-500',
    route: '/labs/performance',
    count: 3,
    comingSoon: true
  },
  {
    id: 'agile',
    title: 'Agile & DevOps',
    description: 'Explore the quality assurance role in Agile teams and DevOps environments with practical exercises.',
    icon: <Users className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500',
    route: '/labs/agile',
    count: 2,
    comingSoon: true
  },
  {
    id: 'security',
    title: 'Security Testing',
    description: 'Master the theoretical foundations of security testing with interactive quizzes and scenarios.',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'from-blue-500 to-indigo-500',
    route: '/labs/security',
    count: 5,
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

export default function Labs() {
  const { theme } = useTheme();

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Interactive Labs | Quality Sensei</title>
        <meta name="description" content="Practice QA skills with our hands-on interactive labs. From manual testing to automation, API testing, and more." />
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
              { label: 'Labs', href: '/labs', active: true }
            ]}
          />
          
          <Separator className="my-6" />
          
          {/* Page Header */}
          <motion.div 
            className="max-w-3xl mx-auto text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className={cn(
              "inline-block px-4 py-2 rounded-full text-sm font-medium mb-4",
              theme === "dark" ? "bg-gray-800 text-[#40E0D0]" : "bg-gray-100 text-[#00BCD4]"
            )}>
              Learn by Doing
            </span>
            <h1 className={cn(
              "text-4xl md:text-5xl font-bold mb-4",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Interactive Quality Assurance Labs
            </h1>
            <p className={cn(
              "text-xl",
              theme === "dark" ? "text-gray-300" : "text-gray-600"
            )}>
              Put theory into practice with our hands-on lab environments designed for real-world skill building.
            </p>
          </motion.div>
          
          {/* Lab Categories Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {labCategories.map((category) => (
              <motion.div
                key={category.id}
                className="rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:-translate-y-2 relative"
                variants={itemVariants}
              >
                {category.comingSoon ? (
                  <div className="cursor-not-allowed h-full">
                    <div className={`h-full bg-gradient-to-br ${category.color} text-white p-8 opacity-80`}>
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center">
                          {category.icon}
                        </div>
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {category.count} Labs
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                      <p className="mb-6 text-white/90">{category.description}</p>
                      <div className="inline-flex items-center text-sm font-semibold">
                        Coming Soon
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                      <span className="bg-black/70 text-white px-4 py-2 rounded-full font-bold">Coming Soon</span>
                    </div>
                  </div>
                ) : (
                  <Link href={category.route}>
                    <div className="cursor-pointer h-full">
                      <div className={`h-full bg-gradient-to-br ${category.color} text-white p-8`}>
                        <div className="flex justify-between items-start mb-6">
                          <div className="bg-white/20 w-16 h-16 rounded-xl flex items-center justify-center">
                            {category.icon}
                          </div>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {category.count} Labs
                          </span>
                        </div>
                        <h3 className="text-2xl font-bold mb-4">{category.title}</h3>
                        <p className="mb-6 text-white/90">{category.description}</p>
                        <div className="inline-flex items-center text-sm font-semibold">
                          Explore Labs
                          <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
          
          {/* Benefits Section */}
          <motion.div
            className={cn(
              "max-w-4xl mx-auto mt-20 p-8 rounded-xl shadow-lg",
              theme === "dark" ? "bg-gray-800" : "bg-gray-50"
            )}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-6 text-center",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Why Our Interactive Labs?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                  theme === "dark" ? "bg-gray-700 text-[#40E0D0]" : "bg-[#00BCD4]/10 text-[#00BCD4]"
                )}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Learn by Doing
                </h3>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  Reinforce theory with practical exercises in real-world scenarios.
                </p>
              </div>
              <div className="p-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                  theme === "dark" ? "bg-gray-700 text-[#40E0D0]" : "bg-[#00BCD4]/10 text-[#00BCD4]"
                )}>
                  <Code className="w-6 h-6" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  No Setup Required
                </h3>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  All labs run in your browser - no downloads or configuration needed.
                </p>
              </div>
              <div className="p-4">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4",
                  theme === "dark" ? "bg-gray-700 text-[#40E0D0]" : "bg-[#00BCD4]/10 text-[#00BCD4]"
                )}>
                  <Users className="w-6 h-6" />
                </div>
                <h3 className={cn(
                  "text-lg font-semibold mb-2",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Expert Guidance
                </h3>
                <p className={cn(
                  "text-sm",
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                )}>
                  Follow structured exercises with tips from industry experts.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}