import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { Link } from "wouter";
import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";

export default function Footer() {
  const { theme } = useTheme();
  
  return (
    <footer className={cn(
      "py-12 transition-colors",
      theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-gray-50 text-gray-700"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4" aria-label="Quality Sensei Home">
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
            <p className={cn(
              "transition-colors",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              Empowering the next generation of software testing professionals with world-class education.
            </p>
            <div className="mt-4 flex space-x-4">
              <a 
                href="#" 
                aria-label="LinkedIn" 
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter" 
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="YouTube" 
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                <FaYoutube className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                aria-label="Facebook" 
                className={cn(
                  "transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                <FaFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 transition-colors",
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            )}>
              Courses
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Automated Testing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  API Testing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Performance Testing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Security Testing
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Mobile Testing
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 transition-colors",
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            )}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#about" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Instructors
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Careers
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Blog
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className={cn(
              "text-lg font-semibold mb-4 transition-colors",
              theme === "dark" ? "text-gray-200" : "text-gray-900"
            )}>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Free Tutorials
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Community
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className={cn(
                    "transition-colors",
                    theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                  )}
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={cn(
          "mt-12 pt-8 border-t transition-colors",
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        )}>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className={cn(
              "transition-colors",
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            )}>
              © {new Date().getFullYear()} Quality Sensei. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a 
                href="#" 
                className={cn(
                  "text-sm transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                className={cn(
                  "text-sm transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                className={cn(
                  "text-sm transition-colors",
                  theme === "dark" ? "text-gray-400 hover:text-[#40E0D0]" : "text-gray-600 hover:text-[#00BCD4]"
                )}
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
