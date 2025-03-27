import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { SiPostman, SiSelenium, SiJira } from "react-icons/si";
import { useInView } from "react-intersection-observer";
import { FiArrowRight } from "react-icons/fi";

interface LabCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
  color: string;
}

const LabCard = ({ title, description, icon, delay, color }: LabCardProps) => {
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
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-4`}>{description}</p>
        <Link href={`/labs/${title.toLowerCase().replace(/\s+/g, '-')}`}>
          <Button variant="link" className="group-hover:translate-x-1 transition-transform duration-300 p-0">
            Explore lab <FiArrowRight className="ml-2" />
          </Button>
        </Link>
      </Card>
    </motion.div>
  );
};

export default function FreePracticalLabsSection() {
  const { theme } = useTheme();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Lab data
  const labs = [
    {
      title: "Automation Testing",
      description: "Master test automation using Selenium, Playwright and other popular frameworks through hands-on exercises.",
      icon: <SiSelenium className="w-8 h-8" />,
      color: "#43B02A" // Selenium green
    },
    {
      title: "Manual Testing",
      description: "Learn systematic test case design, exploratory testing, and defect reporting with real-world examples.",
      icon: <SiJira className="w-8 h-8" />,
      color: "#0052CC" // Jira blue
    },
    {
      title: "API Testing",
      description: "Practice API validation using Postman, RestAssured, and other tools with interactive request-response scenarios.",
      icon: <SiPostman className="w-8 h-8" />,
      color: "#FF6C37" // Postman orange
    }
  ];

  return (
    <section className={`py-20 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Free Practical Labs
          </h2>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
            Gain real-world experience with our hands-on interactive labs designed by industry experts.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {labs.map((lab, index) => (
            <LabCard
              key={lab.title}
              title={lab.title}
              description={lab.description}
              icon={lab.icon}
              delay={index + 1}
              color={lab.color}
            />
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <Link href="/practical-labs">
            <Button 
              size="lg" 
              className={`font-semibold ${theme === 'dark' ? 'bg-[#40E0D0] hover:bg-[#3BCDC0] text-gray-900' : 'bg-[#00BCD4] hover:bg-[#00ACC1] text-white'}`}
            >
              View All Labs
              <FiArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}