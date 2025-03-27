import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState, useCallback, memo, useEffect } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

function FloatingCard({ 
  children, 
  className,
  depth = 10
}: FloatingCardProps) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  // Use a ref for the throttle timer to avoid the type errors
  const throttleTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use throttling to improve performance by limiting the rate of mouse move updates
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reducedMotion) return;
    
    // Throttle mouse movement calculations
    if (!throttleTimerRef.current) {
      throttleTimerRef.current = setTimeout(() => {
        throttleTimerRef.current = null;
        
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;
        
        // Limit rotation to prevent excessive visual movement
        const maxRotation = Math.min(depth, 10); // Cap at 10 degrees
        const rotateXValue = (mouseY / (rect.height / 2)) * -maxRotation;
        const rotateYValue = (mouseX / (rect.width / 2)) * maxRotation;
        
        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
      }, 16); // ~60fps
    }
  }, [depth, reducedMotion]);

  // Memoize event handlers
  const handleMouseEnter = useCallback(() => {
    if (reducedMotion) return;
    setIsHovering(true);
  }, [reducedMotion]);
  
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotateX(0);
    setRotateY(0);
    
    // Clear any pending throttled updates
    if (throttleTimerRef.current) {
      clearTimeout(throttleTimerRef.current);
      throttleTimerRef.current = null;
    }
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "rounded-xl overflow-hidden shadow-lg",
        isHovering ? "shadow-xl" : "",
        theme === "dark" ? "bg-gray-800" : "bg-white",
        className
      )}
      style={{
        transformStyle: reducedMotion ? "flat" : "preserve-3d",
        willChange: reducedMotion ? "auto" : "transform" // Performance hint for browsers
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transition: { 
          type: "spring", 
          stiffness: 200, // Reduced for better performance 
          damping: 20 
        }
      }}
      whileHover={!reducedMotion ? {
        scale: 1.03, // Reduced scale effect for better performance
        transition: { duration: 0.3 }
      } : {}}
      onMouseMove={!reducedMotion ? handleMouseMove : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(FloatingCard);