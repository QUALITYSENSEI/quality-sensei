import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Monitor, BookOpen, Zap } from "lucide-react";

const features = [
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Interactive Learning",
    description: "Engage with hands-on labs, real-world projects, and interactive quizzes that reinforce your understanding."
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: "Industry Certification",
    description: "Prepare for globally recognized certifications with our exam-aligned curriculum and practice tests."
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Career Advancement",
    description: "Gain skills that employers value, with curriculum designed around the latest industry trends and tools."
  }
];

export default function FeatureSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section
      id="features"
      className={cn(
        "py-20 transition-colors",
        theme === "dark" ? "bg-gray-900" : "bg-white"
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
            Why Choose Quality Sensei?
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
            Our curriculum is designed by industry experts to provide you with practical skills that you can apply immediately.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={cn(
                "rounded-xl p-8 shadow-lg transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300",
                theme === "dark" ? "bg-gray-800" : "bg-white"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors",
                theme === "dark" 
                  ? "bg-[#40E0D0] bg-opacity-20 text-[#40E0D0]" 
                  : "bg-[#00BCD4] bg-opacity-10 text-[#00BCD4]"
              )}>
                {feature.icon}
              </div>
              <h3 className={cn(
                "text-xl font-semibold mb-2 transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                {feature.title}
              </h3>
              <p className={cn(
                "transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
