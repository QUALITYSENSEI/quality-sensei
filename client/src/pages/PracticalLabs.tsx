import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { SiPostman, SiSelenium, SiJira, SiOwasp } from "react-icons/si";
import { TbGauge } from "react-icons/tb";
import { useInView } from "react-intersection-observer";
import { Link } from "wouter";
import { FiArrowRight, FiArrowLeft } from "react-icons/fi";
import { Helmet } from "react-helmet-async";
import MainLayout from "@/layouts/MainLayout";

interface LabCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
  status?: "Coming Soon" | "Available";
}

const LabCard = ({ title, description, icon, delay, color, status = "Available" }: LabCardProps) => {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="w-full"
    >
      <Card className={`h-full overflow-hidden relative group ${theme === 'dark' ? 'border-gray-800 bg-gray-900' : 'border-gray-200 bg-white'} p-6 hover:shadow-lg transition-all duration-300`}>
        <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: color }}></div>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white`} style={{ backgroundColor: color }}>
          {icon}
        </div>
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {status === "Coming Soon" && (
            <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">Coming Soon</span>
          )}
        </div>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{description}</p>
        {status === "Available" ? (
          <Link href={`/labs/${title.toLowerCase().replace(/\s+/g, '-')}`}>
            <Button variant="link" className="group-hover:translate-x-1 transition-transform duration-300 p-0">
              Explore lab <FiArrowRight className="ml-2" />
            </Button>
          </Link>
        ) : (
          <Button variant="link" className="cursor-not-allowed opacity-50 p-0">
            Coming Soon
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default function PracticalLabs() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Selenium Labs data
  const seleniumLabs = [
    {
      title: "Selenium WebDriver",
      description: "Master Selenium WebDriver for browser automation with hands-on exercises in Java, Python, and JavaScript.",
      icon: <SiSelenium className="w-8 h-8" />,
      color: "#43B02A", // Selenium green
      status: "Available" as const
    },
    {
      title: "Selenium Grid",
      description: "Learn to set up and use Selenium Grid for distributed testing across multiple browsers and operating systems.",
      icon: <SiSelenium className="w-8 h-8" />,
      color: "#43B02A", // Selenium green
      status: "Available" as const
    },
    {
      title: "Selenium IDE",
      description: "Quick introduction to browser test automation using the Selenium IDE browser extension for record and playback testing.",
      icon: <SiSelenium className="w-8 h-8" />,
      color: "#43B02A", // Selenium green
      status: "Available" as const
    }
  ];

  // Other Labs data
  const otherLabs = [
    {
      title: "Manual Testing",
      description: "Learn systematic test case design, exploratory testing, and defect reporting with real-world examples.",
      icon: <SiJira className="w-8 h-8" />,
      color: "#0052CC", // Jira blue
      status: "Available" as const
    },
    {
      title: "API Testing",
      description: "Practice API validation using Postman, RestAssured, and other tools with interactive request-response scenarios.",
      icon: <SiPostman className="w-8 h-8" />,
      color: "#FF6C37", // Postman orange
      status: "Available" as const
    },
    {
      title: "Performance Testing",
      description: "Learn load testing, stress testing, and performance analysis with JMeter and other performance testing tools.",
      icon: <TbGauge className="w-8 h-8" />,
      color: "#D33724", // Performance red
      status: "Coming Soon" as const
    },
    {
      title: "Security Testing",
      description: "Practice identifying security vulnerabilities using OWASP tools and methodologies with practical examples.",
      icon: <SiOwasp className="w-8 h-8" />,
      color: "#5B5B5B", // OWASP dark gray
      status: "Coming Soon" as const
    }
  ];

  return (
    <MainLayout title="Practical Labs - Quality Sensei" description="Gain hands-on experience with our interactive testing labs. Practice automation, API, and more with real-world scenarios.">
      <div className="pt-20 pb-24">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="mb-8">
              <FiArrowLeft className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Practical Labs
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Gain real-world experience with our hands-on interactive labs designed by industry experts. 
              Practice your skills in a safe, guided environment.
            </p>
          </motion.div>
          
          {/* Selenium Labs Section */}
          <div className="mb-16">
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Selenium Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {seleniumLabs.map((lab, index) => (
                <LabCard
                  key={lab.title}
                  title={lab.title}
                  description={lab.description}
                  icon={lab.icon}
                  delay={index + 1}
                  color={lab.color}
                  status={lab.status}
                />
              ))}
            </div>
          </div>
          
          {/* Other Labs Section */}
          <div>
            <h2 className={`text-3xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Other Testing Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherLabs.map((lab, index) => (
                <LabCard
                  key={lab.title}
                  title={lab.title}
                  description={lab.description}
                  icon={lab.icon}
                  delay={index + 1}
                  color={lab.color}
                  status={lab.status}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}