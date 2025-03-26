import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, User, Tag, Share2, BookmarkPlus, ThumbsUp, MessageCircle } from "lucide-react";
import { Link, useRoute, useLocation } from "wouter";

// Sample blog data - in a real application, this would come from an API or backend
const blogPosts = [
  {
    id: 1,
    title: "Best Practices for Automated Testing in 2025",
    excerpt: "Discover the latest strategies and tools for implementing automated testing pipelines that improve quality and reduce time-to-market.",
    content: `
      <p>Automated testing has become a cornerstone of modern software development, enabling teams to deliver high-quality applications with confidence. As we move further into 2025, several key trends and best practices have emerged that are reshaping how organizations approach test automation.</p>
      
      <h2>1. AI-Powered Test Generation and Maintenance</h2>
      
      <p>One of the most significant advancements in automated testing is the integration of artificial intelligence. AI-powered tools can now analyze your application and automatically generate test cases, reducing the manual effort required to maintain comprehensive test coverage. These systems can also adapt tests as your application evolves, significantly reducing test maintenance overhead.</p>
      
      <p>Key benefits include:</p>
      <ul>
        <li>Automatic identification of critical test scenarios based on user behavior patterns</li>
        <li>Self-healing tests that adapt to UI changes without manual intervention</li>
        <li>Intelligent test prioritization based on risk analysis and code changes</li>
      </ul>
      
      <h2>2. Shift-Right Testing with Production Monitoring</h2>
      
      <p>While "shift-left" testing (moving testing earlier in the development cycle) has been popular for years, "shift-right" approaches that extend testing into production environments are gaining traction. This involves implementing sophisticated monitoring and testing in production to catch issues that might only appear in real-world scenarios.</p>
      
      <p>Effective shift-right practices include:</p>
      <ul>
        <li>Canary deployments with automated rollback based on error thresholds</li>
        <li>Synthetic transaction monitoring to continuously verify critical user journeys</li>
        <li>Chaos engineering to proactively identify resilience issues</li>
      </ul>
      
      <h2>3. Containerized Test Environments</h2>
      
      <p>Containerization technologies like Docker and Kubernetes have revolutionized how test environments are created and managed. By packaging applications and their dependencies into containers, teams can ensure consistent testing environments that closely match production.</p>
      
      <p>Benefits of containerized testing include:</p>
      <ul>
        <li>Elimination of "works on my machine" problems through environment consistency</li>
        <li>Faster test execution by running multiple containerized tests in parallel</li>
        <li>More efficient resource utilization compared to traditional virtual machines</li>
      </ul>
      
      <h2>4. Test Automation in CI/CD Pipelines</h2>
      
      <p>Integrating automated tests into continuous integration and delivery pipelines has become a standard practice. However, the sophistication of these integrations has increased, with more teams implementing quality gates that prevent low-quality code from progressing through the pipeline.</p>
      
      <p>Advanced CI/CD testing practices include:</p>
      <ul>
        <li>Automated quality gates based on code coverage, security scans, and performance benchmarks</li>
        <li>Progressive delivery with automated A/B testing in production</li>
        <li>Deployment verification testing to confirm successful releases</li>
      </ul>
      
      <h2>5. Test Data Management Automation</h2>
      
      <p>Managing test data remains one of the biggest challenges in automated testing. Modern approaches focus on automating the creation, provisioning, and cleanup of test data to ensure tests have the right data available without manual intervention.</p>
      
      <p>Effective test data strategies include:</p>
      <ul>
        <li>Data virtualization to create lightweight copies of production data structures</li>
        <li>On-demand test data generation with realistic patterns based on production analysis</li>
        <li>Automated data masking and anonymization for compliance with privacy regulations</li>
      </ul>
      
      <h2>Conclusion</h2>
      
      <p>As automated testing continues to evolve, the focus is shifting from simply automating test execution to creating intelligent, self-maintaining test suites that provide meaningful insights into application quality. By adopting these best practices, organizations can build more resilient applications while reducing the manual effort required to maintain test coverage.</p>
      
      <p>The most successful testing teams in 2025 will be those that embrace these trends while keeping focus on what matters most: delivering high-quality software that meets user needs and business objectives.</p>
    `,
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Automation",
    author: "Sarah Chen",
    authorRole: "Senior QA Engineer",
    authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 22, 2025",
    readTime: "8 min read",
    tags: ["Selenium", "CI/CD", "Test Automation"],
    relatedPosts: [2, 3, 5]
  },
  {
    id: 2,
    title: "The Role of AI in Modern Software Testing",
    excerpt: "Explore how artificial intelligence is revolutionizing quality assurance and how testing professionals can adapt to this changing landscape.",
    content: `<p>AI is transforming software testing in profound ways...</p>`,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Innovation",
    author: "Michael Rivera",
    authorRole: "AI Research Lead",
    authorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 18, 2025",
    readTime: "6 min read",
    tags: ["AI", "Machine Learning", "Future of Testing"],
    relatedPosts: [1, 3, 6]
  },
  {
    id: 3,
    title: "Performance Testing Fundamentals for High-Traffic Applications",
    excerpt: "Learn essential techniques to ensure your applications maintain optimal performance even under extreme user loads.",
    content: `<p>Performance testing is critical for high-traffic applications...</p>`,
    image: "https://images.unsplash.com/photo-1527219525722-f9767a7f2884?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Performance",
    author: "Priya Sharma",
    authorRole: "Performance Engineering Lead",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 15, 2025",
    readTime: "10 min read",
    tags: ["JMeter", "Load Testing", "Optimization"],
    relatedPosts: [1, 5, 6]
  },
  {
    id: 4,
    title: "Security Testing: Protecting User Data in Modern Applications",
    excerpt: "Discover the crucial security testing methodologies every QA professional should know to prevent vulnerabilities and data breaches.",
    content: `<p>Security testing is more important than ever...</p>`,
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Security",
    author: "James Wilson",
    authorRole: "Security Testing Expert",
    authorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 10, 2025",
    readTime: "7 min read",
    tags: ["OWASP", "Penetration Testing", "Data Protection"],
    relatedPosts: [2, 3, 6]
  },
  {
    id: 5,
    title: "Mobile Testing Strategies for Cross-Platform Applications",
    excerpt: "Master the art of testing applications across multiple mobile platforms and devices to ensure consistent quality everywhere.",
    content: `<p>Mobile testing presents unique challenges...</p>`,
    image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Mobile",
    author: "Elena Rodriguez",
    authorRole: "Mobile QA Lead",
    authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 5, 2025",
    readTime: "9 min read",
    tags: ["Appium", "Cross-Platform", "Mobile Testing"],
    relatedPosts: [1, 3, 6]
  },
  {
    id: 6,
    title: "API Testing: Ensuring Robust Integrations in Microservices",
    excerpt: "Learn effective strategies for testing APIs in complex microservice architectures to prevent integration issues.",
    content: `<p>API testing is crucial in microservice architectures...</p>`,
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600&h=900",
    category: "Integration",
    author: "David Kim",
    authorRole: "API Testing Specialist",
    authorImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
    date: "March 1, 2025",
    readTime: "8 min read",
    tags: ["Postman", "REST", "GraphQL"],
    relatedPosts: [1, 2, 3]
  }
];

export default function BlogPost() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [, setLocation] = useLocation();
  const [match, params] = useRoute("/blog/:id");
  
  if (!match) {
    // Redirect to blog page if no valid ID
    setLocation("/blog");
    return null;
  }
  
  const postId = parseInt(params.id as string, 10);
  const post = blogPosts.find(p => p.id === postId);
  
  if (!post) {
    // Redirect to blog page if post not found
    setLocation("/blog");
    return null;
  }
  
  // Get related posts based on the current post's relatedPosts array
  const relatedPosts = post.relatedPosts
    .map(id => blogPosts.find(p => p.id === id))
    .filter(Boolean) as typeof blogPosts;
  
  return (
    <>
      <Helmet>
        <title>{post.title} - Quality Sensei Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className={cn(
          "pt-16 pb-8 relative overflow-hidden",
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link href="/blog" className={cn(
              "inline-flex items-center mb-6 transition-colors",
              theme === "dark" ? "text-gray-300 hover:text-[#40E0D0]" : "text-gray-700 hover:text-[#00BCD4]"
            )}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4 space-x-2">
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-medium",
                  theme === "dark" ? "bg-gray-800 text-[#40E0D0]" : "bg-gray-100 text-[#00BCD4]"
                )}>
                  {post.category}
                </span>
                <span className={cn(
                  "text-sm transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  {post.readTime}
                </span>
              </div>
              
              <h1 className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {post.title}
              </h1>
              
              <p className={cn(
                "text-lg mb-8 transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <h4 className={cn(
                      "font-medium transition-colors",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      {post.author}
                    </h4>
                    <p className={cn(
                      "text-sm transition-colors",
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    )}>
                      {post.authorRole}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className={cn(
                    "flex items-center transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{post.date}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    )}>
                      <Share2 className={cn(
                        "h-5 w-5 transition-colors",
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      )} />
                    </button>
                    <button className={cn(
                      "p-2 rounded-full transition-colors",
                      theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    )}>
                      <BookmarkPlus className={cn(
                        "h-5 w-5 transition-colors",
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      )} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
        
        {/* Featured Image */}
        <section className={cn(
          "py-8 transition-colors",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl overflow-hidden shadow-lg h-72 md:h-96 lg:h-[500px]">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>
        
        {/* Article Content */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}
        ref={ref}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="prose max-w-none prose-lg"
              style={{
                color: theme === "dark" ? "rgb(209 213 219)" : "rgb(55 65 81)",
              }}
            >
              <div 
                className={cn(
                  "prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-p:mb-4 prose-ul:my-4 prose-li:ml-4 prose-img:rounded-lg transition-colors",
                  theme === "dark" 
                    ? "prose-headings:text-white prose-a:text-[#40E0D0] prose-strong:text-white" 
                    : "prose-headings:text-gray-900 prose-a:text-[#00BCD4] prose-strong:text-gray-900"
                )}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>
            
            {/* Tags */}
            <div className="mt-12 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <span 
                  key={index}
                  className={cn(
                    "flex items-center px-3 py-1 rounded-full text-sm transition-colors",
                    theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-100 text-gray-700"
                  )}
                >
                  <Tag className="h-4 w-4 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Post Actions */}
            <div className="mt-12 border-t border-b py-6 flex justify-between items-center flex-wrap gap-4" 
              style={{
                borderColor: theme === "dark" ? "rgb(75 85 99)" : "rgb(229 231 235)",
              }}
            >
              <div className="flex items-center space-x-6">
                <button className="flex items-center group">
                  <ThumbsUp className={cn(
                    "h-6 w-6 mr-2 transition-colors",
                    theme === "dark" ? "text-gray-400 group-hover:text-[#40E0D0]" : "text-gray-600 group-hover:text-[#00BCD4]"
                  )} />
                  <span className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-300 group-hover:text-[#40E0D0]" : "text-gray-700 group-hover:text-[#00BCD4]"
                  )}>
                    Like
                  </span>
                </button>
                <button className="flex items-center group">
                  <MessageCircle className={cn(
                    "h-6 w-6 mr-2 transition-colors",
                    theme === "dark" ? "text-gray-400 group-hover:text-[#40E0D0]" : "text-gray-600 group-hover:text-[#00BCD4]"
                  )} />
                  <span className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-300 group-hover:text-[#40E0D0]" : "text-gray-700 group-hover:text-[#00BCD4]"
                  )}>
                    Comment
                  </span>
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className={cn(
                  "text-sm transition-colors",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Share:
                </span>
                <div className="flex space-x-2">
                  {["twitter", "facebook", "linkedin"].map((platform) => (
                    <button 
                      key={platform}
                      className={cn(
                        "p-2 rounded-full transition-colors",
                        theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                      )}
                    >
                      <span className={cn(
                        "h-5 w-5 transition-colors block capitalize",
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      )}>
                        {platform.charAt(0).toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Author Bio */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn(
              "rounded-xl p-8 transition-colors",
              theme === "dark" ? "bg-gray-900" : "bg-white"
            )}>
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="w-24 h-24 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={post.authorImage} 
                    alt={post.author} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className={cn(
                    "text-xl font-bold mb-2 text-center md:text-left transition-colors",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    About {post.author}
                  </h3>
                  <p className={cn(
                    "text-sm mb-4 text-center md:text-left transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    {post.authorRole} at Quality Sensei
                  </p>
                  <p className={cn(
                    "mb-4 transition-colors",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    {post.author} is a seasoned testing professional with over 10 years of experience in software quality assurance. 
                    Specializing in {post.category.toLowerCase()} testing, they have helped numerous organizations implement efficient testing processes.
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4">
                    {["linkedin", "twitter", "github"].map((platform) => (
                      <a 
                        key={platform}
                        href="#" 
                        className={cn(
                          "p-2 rounded-full transition-colors",
                          theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                        )}
                        aria-label={platform}
                      >
                        <span className="capitalize">{platform.charAt(0).toUpperCase()}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Posts */}
        <section className={cn(
          "py-12 transition-colors",
          theme === "dark" ? "bg-gray-900" : "bg-white"
        )}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={cn(
              "text-2xl font-bold mb-8 transition-colors",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Related Articles
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={cn(
                    "rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-medium mb-3",
                      theme === "dark" ? "bg-gray-700 text-[#40E0D0]" : "bg-gray-100 text-[#00BCD4]"
                    )}>
                      {relatedPost.category}
                    </span>
                    <h3 className={cn(
                      "text-lg font-bold mb-2 line-clamp-2 transition-colors",
                      theme === "dark" ? "text-white" : "text-gray-900"
                    )}>
                      {relatedPost.title}
                    </h3>
                    <p className={cn(
                      "mb-4 text-sm line-clamp-2 transition-colors",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}>
                      {relatedPost.excerpt}
                    </p>
                    <Link href={`/blog/${relatedPost.id}`} className={cn(
                      "flex items-center font-medium transition-colors",
                      theme === "dark" ? "text-[#40E0D0] hover:text-[#5FF4E4]" : "text-[#00BCD4] hover:text-[#00ACC1]"
                    )}>
                      Read article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Newsletter CTA */}
        <section className={cn(
          "py-16 transition-colors",
          theme === "dark" ? "bg-gray-800" : "bg-gray-50"
        )}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className={cn(
              "text-2xl md:text-3xl font-bold mb-4 transition-colors",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              Enjoyed this article?
            </h2>
            <p className={cn(
              "mb-8 text-lg transition-colors max-w-2xl mx-auto",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              Subscribe to our newsletter to receive the latest testing insights and tutorials directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
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
          </div>
        </section>
      </main>
      
      <Footer />
    </>
  );
}