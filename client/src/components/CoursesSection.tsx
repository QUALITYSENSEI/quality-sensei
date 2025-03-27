import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowRight, Clock, Users, Award, Tag, Search, Filter, Globe, BarChart3 } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const courses = [
  {
    id: 1,
    title: "Automated Testing Mastery",
    description: "Learn to create robust automated test suites using Selenium, Cypress, and other industry-standard tools.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Selenium", "Cypress", "CI/CD"],
    price: "$129",
    badge: { text: "Bestseller", color: "green" },
    rating: 4.9,
    duration: "6 weeks",
    students: 1240,
    level: "Intermediate",
    category: "automation"
  },
  {
    id: 2,
    title: "API Testing & Integration",
    description: "Master RESTful API testing using Postman, JMeter, and integration with CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Postman", "REST", "JMeter"],
    price: "$149",
    badge: { text: "New", color: "blue" },
    rating: 4.7,
    duration: "5 weeks",
    students: 860,
    level: "Intermediate",
    category: "api"
  },
  {
    id: 3,
    title: "Performance Testing Fundamentals",
    description: "Learn to identify performance bottlenecks and ensure your applications can handle high loads.",
    image: "https://images.unsplash.com/photo-1560732488-7b5f5d8141f7?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["JMeter", "LoadRunner", "Gatling"],
    price: "$179",
    badge: { text: "Advanced", color: "purple" },
    rating: 4.8,
    duration: "8 weeks",
    students: 750,
    level: "Advanced",
    category: "performance"
  },
  {
    id: 4,
    title: "Software Testing Fundamentals",
    description: "Learn the core principles and practices of effective software testing for beginners.",
    image: "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Manual Testing", "QA Basics", "Test Plans"],
    price: "$99",
    badge: { text: "Beginner", color: "blue" },
    rating: 4.9,
    duration: "4 weeks",
    students: 2150,
    level: "Beginner",
    category: "fundamentals"
  },
  {
    id: 5,
    title: "Mobile App Testing",
    description: "Master testing techniques for iOS and Android applications with real-world examples.",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Appium", "Mobile", "Cross-platform"],
    price: "$159",
    badge: { text: "Popular", color: "green" },
    rating: 4.7,
    duration: "6 weeks",
    students: 920,
    level: "Intermediate",
    category: "mobile"
  },
  {
    id: 6,
    title: "Test-Driven Development",
    description: "Learn how to write tests before code and improve your software quality dramatically.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["TDD", "Unit Testing", "Jest"],
    price: "$169",
    badge: { text: "Hot", color: "purple" },
    rating: 4.8,
    duration: "7 weeks",
    students: 1080,
    level: "Advanced",
    category: "methodologies"
  }
];

// Course categories with icons
const categories = [
  { id: "all", label: "All Courses", icon: <Globe className="w-4 h-4" /> },
  { id: "fundamentals", label: "Fundamentals", icon: <Award className="w-4 h-4" /> },
  { id: "automation", label: "Automation", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "api", label: "API Testing", icon: <Tag className="w-4 h-4" /> },
  { id: "performance", label: "Performance", icon: <BarChart3 className="w-4 h-4" /> },
  { id: "mobile", label: "Mobile", icon: <Tag className="w-4 h-4" /> },
  { id: "methodologies", label: "Methodologies", icon: <Award className="w-4 h-4" /> }
];

export default function CoursesSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  const badgeColors = {
    green: {
      light: "bg-green-100 text-green-800",
      dark: "bg-green-900/50 text-green-300"
    },
    blue: {
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-900/50 text-blue-300"
    },
    purple: {
      light: "bg-purple-100 text-purple-800",
      dark: "bg-purple-900/50 text-purple-300"
    }
  };
  
  // Filter courses based on category and search term
  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === "all" || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });
  
  return (
    <section
      id="courses"
      className={cn(
        "py-20 transition-colors relative overflow-hidden",
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      )}
      ref={ref}
    >
      {/* Animated background element */}
      <div className="absolute inset-0 z-0">
        <div className={cn(
          "absolute rounded-full w-96 h-96 blur-3xl opacity-20",
          theme === "dark" ? "bg-[#40E0D0]" : "bg-[#00BCD4]"
        )} style={{ top: '10%', left: '10%' }}></div>
        <div className={cn(
          "absolute rounded-full w-96 h-96 blur-3xl opacity-10",
          theme === "dark" ? "bg-purple-500" : "bg-purple-400"
        )} style={{ bottom: '10%', right: '5%' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div className={cn(
            "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
            theme === "dark" ? "bg-cyan-900/30 text-cyan-400" : "bg-cyan-100 text-cyan-600"
          )}>
            <Award className="w-8 h-8" />
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold transition-colors",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Our Featured Courses
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
            Comprehensive courses designed to take you from beginner to expert in software testing and quality assurance.
          </p>
        </motion.div>
        
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Search and filter controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5",
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              )} />
              <Input 
                type="text"
                placeholder="Search courses..."
                className={cn(
                  "pl-10 h-12 rounded-lg",
                  theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
                )}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Category tabs */}
          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveCategory} value={activeCategory}>
            <TabsList 
              className={cn(
                "flex w-full h-auto flex-wrap justify-start p-1 rounded-lg",
                theme === "dark" ? "bg-gray-900" : "bg-white"
              )}
            >
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className={cn(
                    "flex items-center gap-1.5 py-2.5 px-3 rounded-md text-sm font-medium transition-all duration-200",
                    theme === "dark" 
                      ? "data-[state=active]:bg-gray-800 data-[state=active]:text-white"
                      : "data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900"
                  )}
                >
                  {category.icon}
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-6">
                <AnimatePresence mode="wait">
                  <motion.div 
                    key={category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {filteredCourses.length > 0 ? (
                      filteredCourses.map((course, index) => (
                        <motion.div
                          key={course.id}
                          className={cn(
                            "rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
                            theme === "dark" ? "bg-gray-900" : "bg-white"
                          )}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="relative h-48 overflow-hidden group">
                            <img 
                              src={`${course.image}&w=400&h=225&q=75&fit=crop&auto=format&fm=webp`}
                              alt={course.title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                              loading="lazy"
                              width={400}
                              height={225}
                              decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                                <div className="flex items-center text-white">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span className="text-sm">{course.duration}</span>
                                </div>
                                <div className="flex items-center text-white">
                                  <Users className="h-4 w-4 mr-1" />
                                  <span className="text-sm">{course.students.toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                            <div className="absolute top-2 right-2 z-10">
                              <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium shadow-md",
                                theme === "dark" 
                                  ? badgeColors[course.badge.color as keyof typeof badgeColors].dark
                                  : badgeColors[course.badge.color as keyof typeof badgeColors].light
                              )}>
                                {course.badge.text}
                              </span>
                            </div>
                          </div>
                          <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                              <span className={cn(
                                "px-2 py-1 rounded text-xs",
                                theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                              )}>
                                {course.level}
                              </span>
                              <div className="flex items-center">
                                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                                <span className={cn(
                                  "ml-1 text-sm font-medium",
                                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                                )}>
                                  {course.rating}
                                </span>
                              </div>
                            </div>
                            <h3 className={cn(
                              "text-xl font-semibold mb-2 transition-colors",
                              theme === "dark" ? "text-white" : "text-gray-900"
                            )}>
                              {course.title}
                            </h3>
                            <p className={cn(
                              "mb-4 text-sm transition-colors line-clamp-2",
                              theme === "dark" ? "text-gray-300" : "text-gray-700"
                            )}>
                              {course.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-4">
                              {course.tags.map((tag, tagIndex) => (
                                <span 
                                  key={tagIndex}
                                  className={cn(
                                    "px-2 py-1 rounded text-xs transition-colors",
                                    theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                                  )}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center mt-6">
                              <span className={cn(
                                "text-2xl font-bold transition-colors",
                                theme === "dark" ? "text-white" : "text-gray-900"
                              )}>
                                {course.price}
                              </span>
                              <a 
                                href="#" 
                                className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4] relative overflow-hidden group"
                              >
                                <span className="relative z-10">Enroll Now</span>
                                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="col-span-3 py-20 text-center">
                        <Search className={cn(
                          "w-16 h-16 mx-auto mb-4",
                          theme === "dark" ? "text-gray-600" : "text-gray-400"
                        )} />
                        <h3 className={cn(
                          "text-xl font-medium mb-2",
                          theme === "dark" ? "text-white" : "text-gray-900"
                        )}>
                          No courses found
                        </h3>
                        <p className={cn(
                          "text-base max-w-md mx-auto",
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        )}>
                          We couldn't find any courses matching your search criteria. Try adjusting your filters or search term.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a 
            href="/courses" 
            className={cn(
              "inline-flex items-center px-6 py-3 rounded-lg font-medium border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 group",
              theme === "dark" 
                ? "text-gray-200 border-gray-600 hover:border-[#40E0D0] focus:ring-[#40E0D0]" 
                : "text-gray-700 border-gray-300 hover:border-[#00BCD4] focus:ring-[#00BCD4]"
            )}
          >
            <span>View All Courses</span>
            <ArrowRight className={cn(
              "h-5 w-5 ml-2 transition-transform group-hover:translate-x-1",
              theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
            )} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
