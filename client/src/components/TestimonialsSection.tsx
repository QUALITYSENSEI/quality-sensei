import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "QA Lead at TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
    text: "Quality Sensei's Automated Testing Mastery course was exactly what I needed to level up my career. The hands-on labs and real-world examples helped me implement robust testing practices at my company immediately.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Senior Test Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
    text: "I was impressed by the depth of content in the Performance Testing course. The instructors are clearly experts in their field and the curriculum is constantly updated with the latest tools and techniques.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  
  return (
    <section
      id="testimonials"
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
            What Our Students Say
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
            Join thousands of professionals who have transformed their careers with our courses.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={cn(
                "rounded-xl p-8 shadow-lg",
                theme === "dark" ? "bg-gray-800" : "bg-white"
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full overflow-hidden mr-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h4 className={cn(
                    "font-semibold transition-colors",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    {testimonial.name}
                  </h4>
                  <p className={cn(
                    "text-sm transition-colors",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="mb-4 flex">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className={cn(
                "transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
