import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { lazy, Suspense, memo, useEffect, useState } from "react";

// Lazy load Typewriter for better first load performance
const Typewriter = lazy(() => 
  import(/* webpackChunkName: "typewriter-effect" */ "typewriter-effect")
);

interface TypewriterTextProps {
  className?: string;
  strings: string[];
  loop?: boolean;
  cursorClassName?: string;
  delay?: number;
}

// Simple placeholder while Typewriter loads
function TypewriterPlaceholder({ text, className }: { text: string, className?: string }) {
  return (
    <div className={cn("font-medium typewriter-placeholder min-h-[1.5em]", className)}>
      {text}
      <span className="animate-pulse">|</span>
    </div>
  );
}

function TypewriterText({ 
  className, 
  strings, 
  loop = true, 
  cursorClassName,
  delay = 75
}: TypewriterTextProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  
  // Check for reduced motion preference and delay load for better initial performance
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReducedMotion(prefersReducedMotion);
    
    // Delay typewriter initialization slightly for better initial page load
    const timer = setTimeout(() => {
      setMounted(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // For users who prefer reduced motion or before component is mounted,
  // just show the first string without animation
  if (reducedMotion || !mounted) {
    return <TypewriterPlaceholder text={strings[0]} className={className} />;
  }
  
  // Optimize typewriter settings based on device capabilities
  const optimizedDelay = delay < 50 ? 50 : delay; // Don't allow too fast typing for performance
  
  return (
    <div className={cn("font-medium", className)}>
      <Suspense fallback={<TypewriterPlaceholder text={strings[0]} className={className} />}>
        <Typewriter
          options={{
            strings,
            autoStart: true,
            loop,
            delay: optimizedDelay,
            wrapperClassName: "typewriter-wrapper",
            cursorClassName: cn(
              "typewriter-cursor",
              cursorClassName,
              theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
            ),
            // Disable cursor blinking for better performance
            cursor: '|',
          }}
        />
      </Suspense>
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
export default memo(TypewriterText);