import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/contexts/ThemeContext";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const { theme } = useTheme();
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          
          // Variant styles
          variant === "default" && (
            theme === "dark" 
              ? "bg-[#40E0D0] text-gray-900 hover:bg-[#5FF4E4]" 
              : "bg-[#00BCD4] text-white hover:bg-[#00ACC1]"
          ),
          variant === "outline" && (
            theme === "dark" 
              ? "border border-gray-700 bg-transparent hover:bg-gray-800 text-gray-300" 
              : "border border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700"
          ),
          variant === "ghost" && (
            theme === "dark" 
              ? "bg-transparent hover:bg-gray-800 text-gray-300" 
              : "bg-transparent hover:bg-gray-100 text-gray-700"
          ),
          variant === "link" && (
            theme === "dark" 
              ? "bg-transparent underline-offset-4 hover:underline text-[#40E0D0]" 
              : "bg-transparent underline-offset-4 hover:underline text-[#00BCD4]"
          ),
          
          // Size styles
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-9 rounded-md px-3",
          size === "lg" && "h-11 rounded-md px-8",
          size === "icon" && "h-10 w-10",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }