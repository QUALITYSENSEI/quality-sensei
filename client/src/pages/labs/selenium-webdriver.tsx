import React, { useEffect } from 'react';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { BsArrowLeft } from 'react-icons/bs';
import { Badge } from '@/components/ui/badge';
import rawLabData from '@/data/labs/selenium-webdriver.json';
import LabContentRenderer, { LabData } from '@/components/labs/LabContentRenderer';
import { SiSelenium } from '@/components/IconImports';
import MainLayout from '@/layouts/MainLayout';

// Type the imported JSON data
const labData = rawLabData as unknown as LabData;

const SeleniumWebDriverLab: React.FC = () => {
  // Add scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout
      title="Selenium WebDriver Lab | Quality Sensei"
      description="Learn Selenium WebDriver through hands-on practical exercises. This lab covers element locators, browser actions, synchronization, and more."
      keywords="selenium webdriver, test automation, QA testing, browser automation, web testing"
    >
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <Link href="/practical-labs" className="flex items-center text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
            <BsArrowLeft className="mr-2" />
            <span>Back to Labs</span>
          </Link>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex items-center mb-4">
            <div className="mr-4 bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <SiSelenium className="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{labData.title}</h1>
          </div>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{labData.description}</p>
          
          <div className="flex flex-wrap gap-2">
            {labData.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className={`bg-${tag.color}-100 dark:bg-${tag.color}-900/30 text-${tag.color}-800 dark:text-${tag.color}-300 border-${tag.color}-200 dark:border-${tag.color}-800`}>
                {tag.text}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Lab Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <LabContentRenderer labData={labData} />
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SeleniumWebDriverLab;