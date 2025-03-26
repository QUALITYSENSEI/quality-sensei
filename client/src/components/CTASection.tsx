import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function CTASection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section 
      className={cn(
        "py-20 transition-colors",
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      )}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className={cn(
            "rounded-2xl overflow-hidden shadow-xl relative",
            theme === "dark" ? "bg-gray-900" : "bg-white"
          )}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <div 
            className={cn(
              "absolute inset-0 z-0 bg-gradient-to-br",
              theme === "dark" 
                ? "from-gray-800 to-gray-900" 
                : "from-[rgba(0,188,212,0.1)] to-[rgba(64,224,208,0.1)]"
            )}
          />
          <div className="relative z-10 p-8 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className={cn(
                "text-3xl md:text-4xl font-bold mb-6 transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Ready to Transform Your Testing Skills?
              </h2>
              <p className={cn(
                "text-lg mb-8 transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Join thousands of successful students who have advanced their careers with Quality Sensei's industry-leading courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="#courses" 
                  className="inline-block px-8 py-4 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
                >
                  Browse Courses
                </a>
                <a 
                  href="#contact" 
                  className={cn(
                    "inline-block px-8 py-4 rounded-lg font-medium border transition-all duration-300 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2",
                    theme === "dark" 
                      ? "text-gray-200 border-gray-600 hover:border-[#40E0D0] focus:ring-[#40E0D0]" 
                      : "text-gray-700 border-gray-300 hover:border-[#00BCD4] focus:ring-[#00BCD4]"
                  )}
                >
                  Contact Us
                </a>
              </div>
              <div className="mt-8 flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                )}>
                  30-day money-back guarantee
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
