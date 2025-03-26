import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useIntersectionObserver";
import { CheckCircle, Users } from "lucide-react";

export default function HeroSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const floatAnimation = {
    initial: { y: 0 },
    animate: { 
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  };

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden"
      ref={ref}
    >
      <div 
        className={cn(
          "absolute inset-0 z-0 animate-gradient-xy bg-gradient-to-br",
          theme === "dark" 
            ? "from-[rgba(64,224,208,0.2)] via-[rgba(0,188,212,0.3)] to-[rgba(64,224,208,0.2)]" 
            : "from-[rgba(0,188,212,0.1)] via-[rgba(0,188,212,0.2)] to-[rgba(64,224,208,0.1)]"
        )}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.h1 
              variants={item}
              className={cn(
                "text-4xl md:text-5xl font-bold leading-tight transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Master Software Testing with Quality Sensei
            </motion.h1>
            
            <motion.p 
              variants={item}
              className={cn(
                "mt-6 text-lg transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}
            >
              Elevate your QA skills with our expert-led courses. Learn modern testing techniques, automation frameworks, and best practices that industry leaders demand.
            </motion.p>
            
            <motion.div 
              variants={item}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#courses" 
                className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
              >
                Explore Courses
              </a>
              <a 
                href="#about" 
                className={cn(
                  "inline-block px-6 py-3 rounded-lg font-medium border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" 
                    ? "text-gray-200 border-gray-600 hover:border-[#40E0D0] focus:ring-[#40E0D0]" 
                    : "text-gray-700 border-gray-300 hover:border-[#00BCD4] focus:ring-[#00BCD4]"
                )}
              >
                Learn More
              </a>
            </motion.div>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="relative">
              <motion.div 
                className="w-full h-80 rounded-xl overflow-hidden shadow-2xl"
                variants={floatAnimation}
                initial="initial"
                animate="animate"
              >
                <img 
                  src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=800&h=600" 
                  alt="Software testing professional analyzing test results" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </motion.div>
              
              <motion.div 
                className={cn(
                  "absolute -bottom-5 -left-5 p-4 rounded-lg shadow-lg",
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                )}
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className={cn(
                    "font-medium text-sm",
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  )}>
                    98% Pass Rate
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                className={cn(
                  "absolute -top-5 -right-5 p-4 rounded-lg shadow-lg",
                  theme === "dark" ? "bg-gray-800" : "bg-white"
                )}
                variants={floatAnimation}
                initial="initial"
                animate="animate"
                transition={{ delay: 1 }}
              >
                <div className="flex items-center space-x-2">
                  <Users className={cn(
                    "h-5 w-5",
                    theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
                  )} />
                  <span className={cn(
                    "font-medium text-sm",
                    theme === "dark" ? "text-gray-200" : "text-gray-800"
                  )}>
                    10,000+ Students
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
