import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  SiSelenium,
  SiCypress,
  SiApachejmeter,
  SiPostman,
  SiK6,
  SiTestcafe,
  SiAppium,
  SiPuppeteer,
  SiGatling,
  SiJest,
  SiMocha,
  SiChai,
  SiJasmine,
  SiTestinglibrary,
  SiDocker,
  SiKubernetes,
  SiGraphql,
  SiWebdriverio,
  SiProtractor,
  SiSaucelabs,
  SiCodecov,
  SiCodeclimate,
  SiJenkins,
  SiTravisci,
  SiCircleci,
  SiEslint,
  SiSonarqube,
  SiCucumber,
} from 'react-icons/si';

const marqueeTools = [
  { name: 'Selenium', icon: SiSelenium },
  { name: 'Cypress', icon: SiCypress },
  { name: 'TestCafe', icon: SiTestcafe },
  { name: 'Puppeteer', icon: SiPuppeteer },
  { name: 'JMeter', icon: SiApachejmeter },
  { name: 'K6', icon: SiK6 },
  { name: 'Gatling', icon: SiGatling },
  { name: 'Postman', icon: SiPostman },
  { name: 'Appium', icon: SiAppium },
  { name: 'Jest', icon: SiJest },
  { name: 'Mocha', icon: SiMocha },
  { name: 'Chai', icon: SiChai },
  { name: 'Jasmine', icon: SiJasmine },
  { name: 'Testing Library', icon: SiTestinglibrary },
  { name: 'WebdriverIO', icon: SiWebdriverio },
  { name: 'Protractor', icon: SiProtractor },
  { name: 'SauceLabs', icon: SiSaucelabs },
  { name: 'Codecov', icon: SiCodecov },
  { name: 'Code Climate', icon: SiCodeclimate },
  { name: 'Jenkins', icon: SiJenkins },
  { name: 'Travis CI', icon: SiTravisci },
  { name: 'CircleCI', icon: SiCircleci },
  { name: 'ESLint', icon: SiEslint },
  { name: 'SonarQube', icon: SiSonarqube },
  { name: 'Cucumber', icon: SiCucumber },
  { name: 'Docker', icon: SiDocker },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'GraphQL', icon: SiGraphql },
];

const AutomationSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const duplicatedTools = [...marqueeTools, ...marqueeTools];

  return (
    <section id="tools" className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-100 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="absolute inset-0 opacity-10 dark:opacity-20 -z-10 bg-gradient-to-b from-[#00BCD4] to-[#40E0D0]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#00BCD4] dark:text-[#40E0D0] uppercase tracking-wider font-medium relative inline-block">
            Technology Stack
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-[#00BCD4] dark:via-[#40E0D0] to-transparent"></span>
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-800 dark:text-white">
            Automation Tools
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Glide through the industry's leading automation tools in motion.
          </p>
        </motion.div>

        {/* Marquee */}
        <div
          className="overflow-hidden relative my-12 w-full"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="flex items-center justify-start gap-4 sm:gap-6 md:gap-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 80,
                ease: 'linear',
              },
            }}
            style={{
              width: 'max-content',
              animationPlayState: isHovered ? 'paused' : 'running',
            }}
          >
            {duplicatedTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <div
                  key={`${tool.name}-${index}`}
                  className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 flex-shrink-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg flex flex-col items-center justify-center text-center shadow-md hover:shadow-lg transition-all hover:border-[#00BCD4] dark:hover:border-[#40E0D0]"
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#00BCD4] dark:text-[#40E0D0]" />
                  <span className="mt-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 text-center px-1">
                    {tool.name}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AutomationSection;