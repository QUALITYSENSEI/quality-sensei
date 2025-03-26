import { useTheme } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useIntersectionObserver";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaLinkedin, FaTwitter, FaYoutube, FaFacebook } from "react-icons/fa";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Email",
    content: "info@qualitysensei.com",
    href: "mailto:info@qualitysensei.com"
  },
  {
    icon: <Phone className="h-5 w-5" />,
    title: "Phone",
    content: "+1 (234) 567-8900",
    href: "tel:+12345678900"
  },
  {
    icon: <MapPin className="h-5 w-5" />,
    title: "Location",
    content: "123 Quality Avenue, Suite 100\nSan Francisco, CA 94103",
    href: "#"
  }
];

export default function ContactSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    // Form submission logic would go here
    console.log("Form submitted:", formData);
    
    // Success message
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
      variant: "default"
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };
  
  return (
    <section 
      id="contact" 
      className={cn(
        "py-20 transition-colors",
        theme === "dark" ? "bg-gray-800" : "bg-gray-50"
      )}
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={cn(
            "text-3xl font-bold transition-colors",
            theme === "dark" ? "text-white" : "text-gray-900"
          )}>
            Get in Touch
          </h2>
          <p className={cn(
            "mt-4 text-lg max-w-3xl mx-auto transition-colors",
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          )}>
            Have questions about our courses or need personalized advice? Our team is here to help.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label 
                    htmlFor="name" 
                    className={cn(
                      "block text-sm font-medium mb-1 transition-colors",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name" 
                    className={cn(
                      "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="email" 
                    className={cn(
                      "block text-sm font-medium mb-1 transition-colors",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com" 
                    className={cn(
                      "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                    required
                  />
                </div>
                <div>
                  <label 
                    htmlFor="subject" 
                    className={cn(
                      "block text-sm font-medium mb-1 transition-colors",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    Subject
                  </label>
                  <select 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={cn(
                      "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                    required
                  >
                    <option value="" disabled>Select a subject</option>
                    <option value="course-inquiry">Course Inquiry</option>
                    <option value="corporate-training">Corporate Training</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label 
                    htmlFor="message" 
                    className={cn(
                      "block text-sm font-medium mb-1 transition-colors",
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    )}
                  >
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4} 
                    placeholder="Your message" 
                    className={cn(
                      "w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors",
                      theme === "dark" 
                        ? "bg-gray-800 border-gray-700 text-gray-100 focus:ring-[#40E0D0]" 
                        : "bg-white border-gray-300 text-gray-900 focus:ring-[#00BCD4]"
                    )}
                    required
                  />
                </div>
                <div>
                  <button 
                    type="submit" 
                    className="w-full px-6 py-3 rounded-lg font-medium text-white transition-all duration-300 bg-gradient-to-r from-[#00BCD4] to-[#40E0D0] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00BCD4]"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={cn(
              "rounded-xl h-full p-8 shadow-lg transition-colors",
              theme === "dark" ? "bg-gray-900" : "bg-white"
            )}>
              <h3 className={cn(
                "text-xl font-semibold mb-6 transition-colors",
                theme === "dark" ? "text-white" : "text-gray-900"
              )}>
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      theme === "dark" 
                        ? "bg-[#40E0D0] bg-opacity-20 text-[#40E0D0]" 
                        : "bg-[#00BCD4] bg-opacity-10 text-[#00BCD4]"
                    )}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 className={cn(
                        "font-medium transition-colors",
                        theme === "dark" ? "text-white" : "text-gray-900"
                      )}>
                        {item.title}
                      </h4>
                      <a 
                        href={item.href} 
                        className={cn(
                          "transition-colors hover:underline",
                          theme === "dark" ? "text-gray-300" : "text-gray-700"
                        )}
                      >
                        {item.content.split('\n').map((line, i) => (
                          <span key={i} className="block">{line}</span>
                        ))}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className={cn(
                  "font-medium mb-4 transition-colors",
                  theme === "dark" ? "text-white" : "text-gray-900"
                )}>
                  Follow Us
                </h4>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    aria-label="LinkedIn" 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      theme === "dark" 
                        ? "text-gray-300 hover:bg-gray-700" 
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    aria-label="Twitter" 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      theme === "dark" 
                        ? "text-gray-300 hover:bg-gray-700" 
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <FaTwitter className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    aria-label="YouTube" 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      theme === "dark" 
                        ? "text-gray-300 hover:bg-gray-700" 
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <FaYoutube className="h-5 w-5" />
                  </a>
                  <a 
                    href="#" 
                    aria-label="Facebook" 
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                      theme === "dark" 
                        ? "text-gray-300 hover:bg-gray-700" 
                        : "text-gray-700 hover:bg-gray-200"
                    )}
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
