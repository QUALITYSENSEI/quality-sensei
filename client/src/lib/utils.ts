import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation utility to handle scroll-triggered animations
export function animateOnScroll(element: HTMLElement, threshold = 0.1) {
  if (!window.IntersectionObserver) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );
  
  observer.observe(element);
  
  return () => observer.disconnect();
}

// Utility to generate gradient backgrounds
export function generateGradient(theme: 'light' | 'dark') {
  return theme === 'dark'
    ? 'bg-gradient-to-br from-[rgba(64,224,208,0.2)] via-[rgba(0,188,212,0.3)] to-[rgba(64,224,208,0.2)]'
    : 'bg-gradient-to-br from-[rgba(0,188,212,0.1)] via-[rgba(0,188,212,0.2)] to-[rgba(64,224,208,0.1)]';
}

// Get theme color based on current theme
export function getThemeColor(theme: 'light' | 'dark') {
  return theme === 'dark' ? '#40E0D0' : '#00BCD4';
}

// Debounce function for performance optimization
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}
