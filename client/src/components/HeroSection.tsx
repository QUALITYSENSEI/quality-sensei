import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useIntersectionObserver";
import { CheckCircle, Users, Code, Database, Trophy } from "lucide-react";
import ParticleBackground from "@/components/ui/ParticleBackground";
import TypewriterText from "@/components/ui/TypewriterText";
import FloatingCard from "@/components/ui/FloatingCard";

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

  const typewriterStrings = [
    "Selenium WebDriver",
    "API Testing",
    "Performance Testing",
    "Behavior-Driven Development",
    "Continuous Integration"
  ];

  return (
    <section 
      id="hero" 
      className="relative overflow-hidden min-h-[85vh] flex items-center"
      ref={ref}
    >
      {/* Interactive Particle Animation Background */}
      <ParticleBackground className="opacity-50" />
      
      <div 
        className={cn(
          "absolute inset-0 z-0 animate-gradient-xy bg-gradient-to-br",
          theme === "dark" 
            ? "from-[rgba(64,224,208,0.15)] via-[rgba(0,188,212,0.25)] to-[rgba(64,224,208,0.15)]" 
            : "from-[rgba(0,188,212,0.08)] via-[rgba(0,188,212,0.15)] to-[rgba(64,224,208,0.08)]"
        )}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 relative z-10 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
          >
            <motion.div variants={item} className="flex flex-wrap items-center gap-2 mb-6">
              <span 
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  theme === "dark" 
                    ? "bg-purple-900/30 text-purple-400" 
                    : "bg-purple-100 text-purple-800"
                )}
              >
                #1 Platform
              </span>
              <span 
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  theme === "dark" 
                    ? "bg-green-900/30 text-green-400" 
                    : "bg-green-100 text-green-800"
                )}
              >
                Interactive Learning
              </span>
            </motion.div>
            
            <motion.h1 
              variants={item}
              className={cn(
                "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}
            >
              Master Software Testing with{" "}
              <span className={cn(
                "bg-clip-text text-transparent bg-gradient-to-r",
                theme === "dark" 
                  ? "from-[#40E0D0] to-[#00BFFF]" 
                  : "from-[#00BCD4] to-[#0097A7]"
              )}>
                Quality Sensei
              </span>
            </motion.h1>
            
            <motion.div variants={item} className="mt-4">
              <div className={cn(
                "text-xl md:text-2xl transition-colors font-medium flex gap-2 items-center",
                theme === "dark" ? "text-gray-200" : "text-gray-700"
              )}>
                <span>Learn</span>
                <TypewriterText 
                  strings={typewriterStrings}
                  className={cn(
                    "inline-block min-w-52",
                    theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
                  )}
                  delay={50}
                />
              </div>
            </motion.div>
            
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
                className="inline-block px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4] relative overflow-hidden group"
              >
                <span className="relative z-10">Explore Courses</span>
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
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
            
            <motion.div
              variants={item}
              className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
            >
              <div className={cn(
                "flex flex-col items-center py-3 px-3 rounded-lg text-center",
                theme === "dark" ? "bg-gray-800/50" : "bg-white/80"
              )}>
                <Trophy className={cn(
                  "h-6 w-6 mb-2",
                  theme === "dark" ? "text-yellow-400" : "text-yellow-500"
                )} />
                <div className={cn(
                  "text-xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  98%
                </div>
                <div className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Pass Rate
                </div>
              </div>
              
              <div className={cn(
                "flex flex-col items-center py-3 px-3 rounded-lg text-center",
                theme === "dark" ? "bg-gray-800/50" : "bg-white/80"
              )}>
                <Users className={cn(
                  "h-6 w-6 mb-2",
                  theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
                )} />
                <div className={cn(
                  "text-xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  10,000+
                </div>
                <div className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Students
                </div>
              </div>
              
              <div className={cn(
                "flex flex-col items-center py-3 px-3 rounded-lg text-center col-span-2 md:col-span-1",
                theme === "dark" ? "bg-gray-800/50" : "bg-white/80"
              )}>
                <Code className={cn(
                  "h-6 w-6 mb-2",
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                )} />
                <div className={cn(
                  "text-xl font-bold",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  15+
                </div>
                <div className={cn(
                  "text-xs",
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                )}>
                  Courses
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          <div className="hidden md:block relative">
            <FloatingCard className="w-full h-96 overflow-visible">
              <div className="relative p-6 h-full">
                <motion.div 
                  className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=70&w=600&h=450&fm=webp" 
                    alt="Software testing professional analyzing test results" 
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={600}
                    height={450}
                    decoding="async"
                    sizes="(max-width: 768px) 100vw, 600px"
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
                
                <motion.div 
                  className={cn(
                    "absolute top-1/2 -right-10 p-4 rounded-lg shadow-lg",
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  )}
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 1.5 }}
                >
                  <div className="flex items-center space-x-2">
                    <Database className={cn(
                      "h-5 w-5",
                      theme === "dark" ? "text-orange-400" : "text-orange-500"
                    )} />
                    <span className={cn(
                      "font-medium text-sm",
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    )}>
                      Real Projects
                    </span>
                  </div>
                </motion.div>
              </div>
            </FloatingCard>
          </div>
        </div>
      </div>
    </section>
  );
}
