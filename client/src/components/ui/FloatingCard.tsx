import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

interface FloatingCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
}

export default function FloatingCard({ 
  children, 
  className,
  depth = 10
}: FloatingCardProps) {
  const { theme } = useTheme();
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -depth;
    const rotateYValue = (mouseX / (rect.width / 2)) * depth;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

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
        transformStyle: "preserve-3d",
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transition: { type: "spring", stiffness: 300, damping: 30 }
      }}
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setRotateX(0);
        setRotateY(0);
      }}
    >
      {children}
    </motion.div>
  );
}