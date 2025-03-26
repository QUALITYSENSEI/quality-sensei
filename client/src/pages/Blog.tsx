import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useIntersectionObserver";
import { useState } from "react";
import { ArrowRight, Calendar, User, Tag, Search } from "lucide-react";
import { Link } from "wouter";

// Sample blog data - in a real application, this would come from an API or backend
const blogPosts = [
  {
    id: 1,
    title: "Best Practices for Automated Testing in 2025",
    excerpt: "Discover the latest strategies and tools for implementing automated testing pipelines that improve quality and reduce time-to-market.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Automation",
    author: "Sarah Chen",
    date: "March 22, 2025",
    tags: ["Selenium", "CI/CD", "Test Automation"]
  },
  {
    id: 2,
    title: "The Role of AI in Modern Software Testing",
    excerpt: "Explore how artificial intelligence is revolutionizing quality assurance and how testing professionals can adapt to this changing landscape.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Innovation",
    author: "Michael Rivera",
    date: "March 18, 2025",
    tags: ["AI", "Machine Learning", "Future of Testing"]
  },
  {
    id: 3,
    title: "Performance Testing Fundamentals for High-Traffic Applications",
    excerpt: "Learn essential techniques to ensure your applications maintain optimal performance even under extreme user loads.",
    image: "https://images.unsplash.com/photo-1527219525722-f9767a7f2884?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Performance",
    author: "Priya Sharma",
    date: "March 15, 2025",
    tags: ["JMeter", "Load Testing", "Optimization"]
  },
  {
    id: 4,
    title: "Security Testing: Protecting User Data in Modern Applications",
    excerpt: "Discover the crucial security testing methodologies every QA professional should know to prevent vulnerabilities and data breaches.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Security",
    author: "James Wilson",
    date: "March 10, 2025",
    tags: ["OWASP", "Penetration Testing", "Data Protection"]
  },
  {
    id: 5,
    title: "Mobile Testing Strategies for Cross-Platform Applications",
    excerpt: "Master the art of testing applications across multiple mobile platforms and devices to ensure consistent quality everywhere.",
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Mobile",
    author: "Elena Rodriguez",
    date: "March 5, 2025",
    tags: ["Appium", "Cross-Platform", "Mobile Testing"]
  },
  {
    id: 6,
    title: "API Testing: Ensuring Robust Integrations in Microservices",
    excerpt: "Learn effective strategies for testing APIs in complex microservice architectures to prevent integration issues.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800&h=400",
    category: "Integration",
    author: "David Kim",
    date: "March 1, 2025",
    tags: ["Postman", "REST", "GraphQL"]
  }
];

// Featured blog post (the first one in our list)
const featuredPost = blogPosts[0];

// Categories for filtering
const categories = ["All", "Automation", "Performance", "Security", "Mobile", "Integration", "Innovation"];

export default function Blog() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter posts based on search term and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <>
      <Helmet>
        <title>Blog - Quality Sensei</title>
        <meta name="description" content="Explore our latest articles, tutorials, and insights on software testing, QA, and automation." />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={cn(
          "py-16 md:py-24 relative overflow-hidden",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}>
          <div 
            className={cn(
              "absolute inset-0 z-0 opacity-20",
              theme === "dark" 
                ? "bg-gradient-to-br from-[#40E0D0] via-[rgba(0,188,212,0.3)] to-[#40E0D0]" 
                : "bg-gradient-to-br from-[#00BCD4] via-[rgba(0,188,212,0.2)] to-[#00BCD4]"
            )}
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className={cn(
                "text-4xl md:text-5xl font-bold mb-4 transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Quality Sensei Blog
              </h1>
              <p className={cn(
                "text-lg md:text-xl max-w-3xl mx-auto transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Insights, tutorials, and best practices from the frontiers of software testing and quality assurance
              </p>
            </motion.div>
          </div>
        </section>
        
        {/* Featured Post Section */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}
        ref={ref}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <span className={cn(
                "inline-block text-sm font-semibold mb-2 uppercase tracking-wider transition-colors",
                theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
              )}>
                Featured Article
              </span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn(
                "grid md:grid-cols-5 gap-8 rounded-xl overflow-hidden shadow-lg",
                theme === "dark" ? "bg-gray-900" : "bg-white"
              )}
            >
              <div className="md:col-span-3 h-64 md:h-auto">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title} 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="md:col-span-2 p-8 flex flex-col justify-center">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-medium mb-4",
                  theme === "dark" ? "bg-gray-800 text-[#40E0D0]" : "bg-gray-100 text-[#00BCD4]"
                )}>
                  {featuredPost.category}
                </span>
                <h2 className={cn(
                  "text-2xl md:text-3xl font-bold mb-4 transition-colors",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  {featuredPost.title}
                </h2>
                <p className={cn(
                  "mb-6 transition-colors",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center mb-6">
                  <div className={cn(
                    "flex items-center mr-6 transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{featuredPost.date}</span>
                  </div>
                  <div className={cn(
                    "flex items-center transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    <User className="h-4 w-4 mr-2" />
                    <span className="text-sm">{featuredPost.author}</span>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.id}`} className={cn(
                  "flex items-center font-medium transition-colors",
                  theme === "dark" ? "text-[#40E0D0] hover:text-[#5FF4E4]" : "text-[#00BCD4] hover:text-[#00ACC1]"
                )}>
                  Read article
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Search and Filter Section */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
              {/* Search */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={cn(
                      "w-full px-4 py-2 pl-10 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                  />
                  <Search className={cn(
                    "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )} />
                </div>
              </div>
              
              {/* Category Filter */}
              <div className="w-full md:w-2/3 flex overflow-x-auto pb-2 md:justify-end space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      "px-4 py-2 rounded-lg whitespace-nowrap transition-colors",
                      selectedCategory === category 
                        ? (theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white")
                        : (theme === "dark" ? "bg-gray-800 text-gray-300 hover:bg-gray-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Posts Grid */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.slice(1).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
                    className={cn(
                      "rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl",
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    )}
                  >
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-medium",
                          theme === "dark" ? "bg-gray-700 text-[#40E0D0]" : "bg-gray-100 text-[#00BCD4]"
                        )}>
                          {post.category}
                        </span>
                        <span className={cn(
                          "text-sm transition-colors",
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>
                          {post.date}
                        </span>
                      </div>
                      <h3 className={cn(
                        "text-xl font-bold mb-2 line-clamp-2 transition-colors",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}>
                        {post.title}
                      </h3>
                      <p className={cn(
                        "mb-4 line-clamp-3 transition-colors",
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      )}>
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className={cn(
                              "flex items-center px-2 py-1 rounded text-xs transition-colors",
                              theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700"
                            )}
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className={cn(
                          "flex items-center transition-colors",
                          theme === "dark" ? "text-gray-400" : "text-gray-600"
                        )}>
                          <User className="h-4 w-4 mr-2" />
                          <span className="text-sm">{post.author}</span>
                        </div>
                        <Link href={`/blog/${post.id}`} className={cn(
                          "flex items-center font-medium transition-colors",
                          theme === "dark" ? "text-[#40E0D0] hover:text-[#5FF4E4]" : "text-[#00BCD4] hover:text-[#00ACC1]"
                        )}>
                          Read more
                          <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className={cn(
                "text-center py-12 transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                <p className="text-lg">No articles found matching your search criteria.</p>
                <button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className={cn(
                    "mt-4 px-4 py-2 rounded-lg font-medium transition-colors",
                    theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white"
                  )}
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className={cn(
          "py-16 transition-colors",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className={cn(
                  "text-2xl md:text-3xl font-bold mb-4 transition-colors",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Subscribe to our newsletter
                </h2>
                <p className={cn(
                  "mb-6 transition-colors",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  Get the latest articles, tutorials, and insights delivered to your inbox. Stay updated with the latest trends in software testing and quality assurance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className={cn(
                      "flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-700 border-gray-600 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                  />
                  <button 
                    className="px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
                  >
                    Subscribe
                  </button>
                </div>
                <p className={cn(
                  "mt-4 text-sm transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="hidden md:block">
                <div className={cn(
                  "rounded-xl p-8 transition-colors",
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                )}>
                  <h3 className={cn(
                    "text-xl font-bold mb-4 transition-colors",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    What you'll get:
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Weekly testing tips and best practices",
                      "Exclusive tutorials and case studies",
                      "Early access to our webinars and events",
                      "Special discounts on our premium courses"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-1 mr-3",
                          theme === "dark" ? "bg-[#40E0D0] bg-opacity-20 text-[#40E0D0]" : "bg-[#00BCD4] bg-opacity-10 text-[#00BCD4]"
                        )}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className={cn(
                          "transition-colors",
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        )}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}