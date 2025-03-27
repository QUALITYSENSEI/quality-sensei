import { useState, useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "wouter";
import { MenuIcon, SunIcon, MoonIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  
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
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
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
  
  // Close mobile menu with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        mobileMenuButtonRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);
  
  // Trap focus within mobile menu when open
  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current) return;
    
    const menuElement = mobileMenuRef.current;
    const focusableElements = menuElement.querySelectorAll(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    // Focus on first element when menu opens
    firstElement.focus();
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      // Shift + Tab on first element goes to last element
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
      // Tab on last element goes to first element
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };
    
    menuElement.addEventListener('keydown', handleTabKey);
    return () => {
      menuElement.removeEventListener('keydown', handleTabKey);
    };
  }, [mobileMenuOpen]);

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
            
            <div className="hidden md:flex items-center space-x-8" role="navigation" aria-label="Main navigation">
              <a 
                href="#courses" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70",
                  activeSection === "courses" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
                aria-current={activeSection === "courses" ? "page" : undefined}
              >
                Courses
              </a>
              <Link 
                href="/labs" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70"
                )}
              >
                Labs
              </Link>
              <Link 
                href="/blog" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70"
                )}
              >
                Blog
              </Link>
              <a 
                href="#testimonials" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70",
                  activeSection === "testimonials" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
                aria-current={activeSection === "testimonials" ? "page" : undefined}
              >
                Testimonials
              </a>
              <Link
                href="/about" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70"
                )}
              >
                About
              </Link>
              <a 
                href="#contact" 
                className={cn(
                  "font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-2 py-1",
                  theme === "dark" 
                    ? "text-gray-300 hover:text-[#40E0D0] focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:text-[#00BCD4] focus:ring-[#00BCD4]/70",
                  activeSection === "contact" && (theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]")
                )}
                aria-current={activeSection === "contact" ? "page" : undefined}
              >
                Contact
              </a>
              <button 
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
                className={cn(
                  "p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" 
                    ? "text-gray-200 hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:bg-gray-100 focus:ring-[#00BCD4]/70"
                )}
              >
                {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
            
            <div className="md:hidden flex items-center">
              <button 
                ref={mobileMenuButtonRef}
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"} 
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" 
                    ? "text-gray-200 focus:ring-[#40E0D0]" 
                    : "text-gray-700 focus:ring-[#00BCD4]"
                )}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <div 
          id="mobile-menu"
          className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}
          ref={mobileMenuRef}
          role="navigation"
          aria-label="Mobile navigation"
        >
          <div className={cn(
            "px-2 pt-2 pb-3 space-y-1 sm:px-3 transition-colors",
            theme === "dark" ? "bg-gray-900" : "bg-white"
          )}>
            <a 
              href="#courses" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={activeSection === "courses" ? "page" : undefined}
            >
              Courses
            </a>
            <Link
              href="/labs"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Labs
            </Link>
            <Link
              href="/blog"
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <a 
              href="#testimonials" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={activeSection === "testimonials" ? "page" : undefined}
            >
              Testimonials
            </a>
            <a 
              href="#about" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={activeSection === "about" ? "page" : undefined}
            >
              About
            </a>
            <a 
              href="#contact" 
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                theme === "dark" 
                  ? "text-gray-300 hover:text-[#40E0D0] hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                  : "text-gray-700 hover:text-[#00BCD4] hover:bg-gray-100 focus:ring-[#00BCD4]/70"
              )}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={activeSection === "contact" ? "page" : undefined}
            >
              Contact
            </a>
            <div className="flex items-center px-3 py-2">
              <span className={cn(
                "mr-2 text-sm transition-colors",
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              )}
                id="toggle-theme-label"
              >
                Toggle Theme
              </span>
              <button 
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                aria-pressed={theme === "dark"}
                aria-labelledby="toggle-theme-label"
                className={cn(
                  "p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
                  theme === "dark" 
                    ? "text-gray-200 hover:bg-gray-800 focus:ring-[#40E0D0]/70" 
                    : "text-gray-700 hover:bg-gray-100 focus:ring-[#00BCD4]/70"
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
        <nav aria-label="Breadcrumb" className="flex">
          <ol 
            className="flex items-center space-x-1 md:space-x-3"
            role="list"
          >
            <li className="inline-flex items-center">
              <a 
                href="#" 
                className={cn(
                  "hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1",
                  theme === "dark" 
                    ? "text-gray-400 hover:text-gray-300 focus:ring-[#40E0D0]/70" 
                    : "text-gray-500 hover:text-gray-700 focus:ring-[#00BCD4]/70"
                )}
                aria-label="Home page"
                aria-current={activeSection === "home" ? "page" : undefined}
              >
                Home
              </a>
            </li>
            {activeSection !== "home" && (
              <li className="flex items-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 mx-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <a 
                  href={`#${activeSection}`} 
                  className={cn(
                    "hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 rounded px-1",
                    theme === "dark" 
                      ? "text-gray-400 hover:text-gray-300 focus:ring-[#40E0D0]/70" 
                      : "text-gray-500 hover:text-gray-700 focus:ring-[#00BCD4]/70"
                  )}
                  aria-current="page"
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
