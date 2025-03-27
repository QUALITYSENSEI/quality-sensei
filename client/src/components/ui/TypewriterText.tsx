import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import Typewriter from "typewriter-effect";

interface TypewriterTextProps {
  className?: string;
  strings: string[];
  loop?: boolean;
  cursorClassName?: string;
  delay?: number;
}

export default function TypewriterText({ 
  className, 
  strings, 
  loop = true, 
  cursorClassName,
  delay = 75
}: TypewriterTextProps) {
  const { theme } = useTheme();
  
  return (
    <div className={cn("font-medium", className)}>
      <Typewriter
        options={{
          strings,
          autoStart: true,
          loop,
          delay,
          wrapperClassName: "typewriter-wrapper",
          cursorClassName: cn(
            "typewriter-cursor",
            cursorClassName,
            theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
          ),
        }}
      />
    </div>
  );
}