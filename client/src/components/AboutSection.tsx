import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const stats = [
  { label: "10,000+ Students", icon: <CheckCircle className="h-5 w-5" /> },
  { label: "20+ Expert Instructors", icon: <CheckCircle className="h-5 w-5" /> },
  { label: "15+ Specialized Courses", icon: <CheckCircle className="h-5 w-5" /> },
  { label: "97% Satisfaction Rate", icon: <CheckCircle className="h-5 w-5" /> }
];

const images = [
  { 
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Team collaboration on software testing", 
    className: "rounded-xl overflow-hidden h-48 transform rotate-3 shadow-lg" 
  },
  { 
    src: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800&h=1000",
    alt: "Expert instructor teaching quality assurance", 
    className: "rounded-xl overflow-hidden h-64 transform -rotate-3 shadow-lg" 
  },
  { 
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800&h=1000",
    alt: "Student working on automated testing project", 
    className: "rounded-xl overflow-hidden h-64 transform -rotate-3 shadow-lg" 
  },
  { 
    src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800&h=600",
    alt: "Quality assurance team meeting", 
    className: "rounded-xl overflow-hidden h-48 transform rotate-3 shadow-lg" 
  }
];

export default function AboutSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
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
      id="about" 
      className={cn(
        "py-20 transition-colors",
        theme === "dark" ? "bg-gray-900" : "bg-white"
      )}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className={cn(
              "text-3xl font-bold mb-6 transition-colors",
              theme === "dark" ? "text-white" : "text-gray-900"
            )}>
              About Quality Sensei
            </h2>
            <p className={cn(
              "mb-4 transition-colors",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              We are a team of industry experts passionate about software quality and testing excellence. With decades of combined experience at leading tech companies, we've distilled our knowledge into comprehensive courses that prepare you for real-world challenges.
            </p>
            <p className={cn(
              "mb-8 transition-colors",
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            )}>
              Our mission is to empower the next generation of quality assurance professionals with the skills, tools, and confidence they need to excel in today's competitive tech landscape.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <span className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
                  )}>
                    {stat.icon}
                  </span>
                  <span className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  )}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className={image.className}
                  variants={floatAnimation}
                  initial="initial"
                  animate="animate"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
