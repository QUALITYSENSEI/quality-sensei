import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import { MenuIcon, SunIcon, MoonIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update header style when scrolled
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id') || 'home');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        theme === "dark" ? "bg-gray-900 border-b border-gray-800" : "bg-white border-b border-gray-200",
        isScrolled && "shadow-md"
      )}
    >
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center" aria-label="Quality Sensei Home">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center mr-2 transition-colors",
                  theme === "dark" ? "bg-[#40E0D0] text-gray-900" : "bg-[#00BCD4] text-white"
                )}>
                  <span className="text-2xl font-bold">QS</span>
                </div>
                <span className={cn(
                  "text-xl font-bold transition-colors",
                  theme === "dark" ? "text-gray-100" : "text-gray-900"
                )}>Quality Sensei</span>
              </Link>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a 
                href="#courses" 
                className={cn(
                  "font-medium transition-colors",
                  theme === "dark" ? "text-gray-300 hover:text-[#40E0D0]" : "text-gray-700 hover:text-[#00BCD4]",
                  activeSection === "courses" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
              >
                Courses
              </a>
              <a 
                href="#testimonials" 
                className={cn(
                  "font-medium transition-colors",
                  theme === "dark" ? "text-gray-300 hover:text-[#40E0D0]" : "text-gray-700 hover:text-[#00BCD4]",
                  activeSection === "testimonials" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
              >
                Testimonials
              </a>
              <a 
                href="#about" 
                className={cn(
                  "font-medium transition-colors",
                  theme === "dark" ? "text-gray-300 hover:text-[#40E0D0]" : "text-gray-700 hover:text-[#00BCD4]",
                  activeSection === "about" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
              >
                About
              </a>
              <a 
                href="#contact" 
                className={cn(
                  "font-medium transition-colors",
                  theme === "dark" ? "text-gray-300 hover:text-[#40E0D0]" : "text-gray-700 hover:text-[#00BCD4]",
                  activeSection === "contact" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
              >
                Contact
              </a>
              <button 
                onClick={toggleTheme}
                aria-label="Toggle dark mode" 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"} 
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                )}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className={cn(
            "px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-colors",
            theme === "dark" ? "bg-gray-900" : "bg-white"
          )}>
            <a 
              href="#courses" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                theme === "dark" ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800" : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Courses
            </a>
            <a 
              href="#testimonials" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                theme === "dark" ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800" : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <a 
              href="#about" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                theme === "dark" ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800" : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                theme === "dark" ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800" : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </a>
            <div className="flex items-center px-3 py-2">
              <span className={cn(
                "mr-2 text-sm transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}>
                Toggle Theme
              </span>
              <button 
                onClick={toggleTheme}
                aria-label="Toggle dark mode" 
                className={cn(
                  "p-2 rounded-full transition-colors",
                  theme === "dark" ? "text-gray-200 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Breadcrumb navigation */}
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-sm transition-colors",
        theme === "dark" ? "text-gray-400 bg-gray-800" : "text-gray-500 bg-gray-50"
      )}>
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a 
                href="#" 
                className={cn(
                  "hover:underline transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                )}
              >
                Home
              </a>
            </li>
            {activeSection !== "home" && (
              <li className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <a 
                  href={`#${activeSection}`} 
                  className={cn(
                    "hover:underline transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-gray-300" : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
                </a>
              </li>
            )}
          </ol>
        </nav>
      </div>
    </header>
  );
}
