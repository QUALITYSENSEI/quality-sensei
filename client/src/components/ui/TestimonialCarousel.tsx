import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoPlayInterval?: number;
}

export default function TestimonialCarousel({ 
  testimonials, 
  autoPlayInterval = 5000 
}: TestimonialCarouselProps) {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  // Auto-advance testimonials
  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, autoPlayInterval);
    
    return () => clearTimeout(timer);
  }, [current, isPlaying, testimonials.length, autoPlayInterval]);
  
  // Pause auto-play on hover
  const handleMouseEnter = () => setIsPlaying(false);
  const handleMouseLeave = () => setIsPlaying(true);
  
  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "rounded-xl shadow-lg p-6 md:p-8",
              theme === "dark" ? "bg-gray-800" : "bg-white"
            )}
          >
            {/* Quotation mark decoration */}
            <div className="absolute top-4 left-4 opacity-10 text-6xl font-serif">
              "
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 items-center">
              {testimonials[current].image && (
                <div className="flex-shrink-0">
                  <img
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-cyan-300"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < testimonials[current].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      )}
                    />
                  ))}
                </div>
                
                <p className={cn(
                  "text-lg mb-4 italic",
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                )}>
                  "{testimonials[current].content}"
                </p>
                
                <div>
                  <p className={cn(
                    "font-bold",
                    theme === "dark" ? "text-white" : "text-gray-900"
                  )}>
                    {testimonials[current].name}
                  </p>
                  <p className={cn(
                    "text-sm",
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  )}>
                    {testimonials[current].role}, {testimonials[current].company}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation buttons */}
      <button
        onClick={goToPrevious}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 transition-all",
          theme === "dark" 
            ? "bg-gray-700 text-white hover:bg-gray-600" 
            : "bg-white text-gray-800 hover:bg-gray-100"
        )}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      <button
        onClick={goToNext}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-10 transition-all",
          theme === "dark" 
            ? "bg-gray-700 text-white hover:bg-gray-600" 
            : "bg-white text-gray-800 hover:bg-gray-100"
        )}
        aria-label="Next testimonial"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
      
      {/* Indicator dots */}
      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index
                ? theme === "dark" ? "bg-[#40E0D0]" : "bg-[#00BCD4]"
                : theme === "dark" ? "bg-gray-600" : "bg-gray-300"
            )}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}