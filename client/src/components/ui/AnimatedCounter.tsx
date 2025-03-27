import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

interface AnimatedCounterProps {
  value: number;
  label: string;
  duration?: number;
  prefix?: string;
  suffix?: string;
  icon?: React.ReactNode;
}

export default function AnimatedCounter({
  value,
  label,
  duration = 2.5,
  prefix = "",
  suffix = "",
  icon
}: AnimatedCounterProps) {
  const { theme } = useTheme();
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div 
      ref={ref} 
      className={cn(
        "flex flex-col items-center p-6 rounded-lg transition-all transform hover:scale-105",
        theme === "dark" 
          ? "bg-gray-800/50 hover:bg-gray-800" 
          : "bg-white/90 hover:bg-white shadow-md hover:shadow-lg"
      )}
    >
      {icon && (
        <div className={cn(
          "mb-4 p-3 rounded-full",
          theme === "dark" ? "bg-gray-700" : "bg-gray-100"
        )}>
          {icon}
        </div>
      )}
      
      <div className={cn(
        "text-3xl md:text-4xl font-bold mb-2",
        theme === "dark" 
          ? "text-[#40E0D0]" 
          : "text-[#00BCD4]"
      )}>
        {prefix}
        {inView ? (
          <CountUp 
            end={value} 
            duration={duration} 
            separator="," 
          />
        ) : '0'}
        {suffix}
      </div>
      
      <div className={cn(
        "text-sm md:text-base text-center",
        theme === "dark" ? "text-gray-300" : "text-gray-600"
      )}>
        {label}
      </div>
    </div>
  );
}