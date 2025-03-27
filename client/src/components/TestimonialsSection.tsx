import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Star, Users, Award, ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCarousel from "@/components/ui/TestimonialCarousel";
import { Parallax } from "react-parallax";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "QA Lead",
    company: "TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    content: "Quality Sensei's Automated Testing Mastery course was exactly what I needed to level up my career. The hands-on labs and real-world examples helped me implement robust testing practices at my company immediately.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Test Engineer",
    company: "InnovateTech",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    content: "I was impressed by the depth of content in the Performance Testing course. The instructors are clearly experts in their field and the curriculum is constantly updated with the latest tools and techniques.",
    rating: 5
  },
  {
    id: 3,
    name: "Jessica Roberts",
    role: "SDET",
    company: "FinTech Solutions",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150",
    content: "The Selenium WebDriver Lab was outstanding! The interactive sessions and community support made learning so much more engaging than other platforms I've tried. Worth every penny.",
    rating: 5
  },
  {
    id: 4,
    name: "David Kim",
    role: "DevOps Engineer",
    company: "CloudFirst",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
    content: "As someone focused on DevOps, the CI/CD integration course helped me bridge the gap between development and testing. I especially appreciated the practical Jenkins integration examples.",
    rating: 4
  },
  {
    id: 5,
    name: "Emma Watson",
    role: "Test Automation Lead",
    company: "RetailTech",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
    content: "I've recommended Quality Sensei to my entire team. Their API Testing course transformed how we approach our microservices testing strategy. The instructors are responsive and knowledgeable.",
    rating: 5
  }
];

const stats = [
  { value: 15, label: "Expert Courses", icon: <Award className="h-8 w-8" /> },
  { value: 10000, label: "Happy Students", icon: <Users className="h-8 w-8" /> },
  { value: 98, label: "Success Rate", suffix: "%", icon: <Star className="h-8 w-8" /> }
];

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section
      id="testimonials"
      className={cn(
        "py-20 transition-colors relative overflow-hidden",
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      )}
      ref={ref}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
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
            theme === "dark" ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"
          )}>
            <Users className="w-8 h-8" />
          </div>
          
          <h2 className={cn(
            "text-3xl md:text-4xl font-bold transition-colors",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            What Our Students Say
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <TestimonialCarousel testimonials={testimonials} />
        </motion.div>
        
        {/* Stats with optimized background */}
        <Parallax
          bgImage={theme === "dark" 
            ? "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=60&w=1200&h=400&sat=-100"
            : "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=60&w=1200&h=400"
          }
          strength={100}
          bgImageStyle={{ opacity: theme === "dark" ? 0.2 : 0.1 }}
          className="rounded-xl overflow-hidden shadow-lg"
          bgImageSizes="(max-width: 768px) 100vw, 1200px"
          lazy
        >
          <div className={cn(
            "py-16 px-8",
            theme === "dark" ? "bg-gray-800/80" : "bg-white/80"
          )}>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-10">
                <h3 className={cn(
                  "text-2xl md:text-3xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Our Impact in Numbers
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
                  >
                    <AnimatedCounter
                      value={stat.value}
                      label={stat.label}
                      suffix={stat.suffix}
                      icon={stat.icon}
                    />
                  </motion.div>
                ))}
              </div>
              
              <motion.div 
                className="mt-12 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <a 
                  href="#courses" 
                  className={cn(
                    "inline-flex items-center text-lg font-medium",
                    theme === "dark" ? "text-[#40E0D0] hover:text-[#40E0D0]/80" : "text-[#00BCD4] hover:text-[#00BCD4]/80"
                  )}
                >
                  Start Your Learning Journey
                  <ChevronRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </Parallax>
      </div>
    </section>
  );
}
