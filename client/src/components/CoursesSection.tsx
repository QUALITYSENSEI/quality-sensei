import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Automated Testing Mastery",
    description: "Learn to create robust automated test suites using Selenium, Cypress, and other industry-standard tools.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Selenium", "Cypress", "CI/CD"],
    price: "$129",
    badge: { text: "Bestseller", color: "green" },
    rating: 4.9
  },
  {
    id: 2,
    title: "API Testing & Integration",
    description: "Master RESTful API testing using Postman, JMeter, and integration with CI/CD pipelines.",
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["Postman", "REST", "JMeter"],
    price: "$149",
    badge: { text: "New", color: "blue" },
    rating: 4.7
  },
  {
    id: 3,
    title: "Performance Testing Fundamentals",
    description: "Learn to identify performance bottlenecks and ensure your applications can handle high loads.",
    image: "https://images.unsplash.com/photo-1560732488-7b5f5d8141f7?auto=format&fit=crop&q=80&w=800&h=400",
    tags: ["JMeter", "LoadRunner", "Gatling"],
    price: "$179",
    badge: { text: "Advanced", color: "purple" },
    rating: 4.8
  }
];

export default function CoursesSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const badgeColors = {
    green: {
      light: "bg-green-100 text-green-800",
      dark: "bg-green-900 text-green-200"
    },
    blue: {
      light: "bg-blue-100 text-blue-800",
      dark: "bg-blue-900 text-blue-200"
    },
    purple: {
      light: "bg-purple-100 text-purple-800",
      dark: "bg-purple-900 text-purple-200"
    }
  };
  
  return (
    <section
      id="courses"
      className={cn(
        "py-20 transition-colors",
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      )}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={cn(
            "text-3xl font-bold transition-colors",
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
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className={cn(
                "rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
                theme === "dark" ? "bg-gray-900" : "bg-white"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-xs font-medium",
                    theme === "dark" 
                      ? badgeColors[course.badge.color as keyof typeof badgeColors].dark
                      : badgeColors[course.badge.color as keyof typeof badgeColors].light
                  )}>
                    {course.badge.text}
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
                  "mb-4 transition-colors",
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
                        theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-700"
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
                    className="px-4 py-2 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
                  >
                    Enroll Now
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <a 
            href="#" 
            className={cn(
              "inline-block px-6 py-3 rounded-lg font-medium border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 group",
              theme === "dark" 
                ? "text-gray-200 border-gray-600 hover:border-[#40E0D0] focus:ring-[#40E0D0]" 
                : "text-gray-700 border-gray-300 hover:border-[#00BCD4] focus:ring-[#00BCD4]"
            )}
          >
            View All Courses
            <ArrowRight className={cn(
              "h-5 w-5 inline-block ml-1 transition-transform group-hover:translate-x-1",
              theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
            )} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
