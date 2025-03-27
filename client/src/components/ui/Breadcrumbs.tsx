import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const { theme } = useTheme();
  
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center flex-wrap">
        <li className="inline-flex items-center">
          <Link 
            href="/" 
            className={cn(
              "text-sm font-medium hover:underline transition-colors",
              theme === "dark" ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
            )}
          >
            Home
          </Link>
        </li>
        
        {items.map((item, i) => (
          <li key={i} className="flex items-center">
            <ChevronRight className={cn(
              "mx-2 h-4 w-4",
              theme === "dark" ? "text-gray-500" : "text-gray-400"
            )} />
            {item.active ? (
              <span className={cn(
                "text-sm font-medium",
                theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
              )}>
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href} 
                className={cn(
                  "text-sm font-medium hover:underline transition-colors",
                  theme === "dark" ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}