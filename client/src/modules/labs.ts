import { Beaker, Code, FileJson, Users, BookOpen, Play } from 'lucide-react';
import { SiSelenium, SiTestinglibrary, SiCucumber, SiAppium, SiJenkins } from 'react-icons/si';
import React from 'react';

// Lab category type
export interface LabCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  route: string;
  count: number;
  comingSoon?: boolean;
}

// All lab categories
export const labCategories: LabCategory[] = [
  {
    id: 'manual',
    title: 'Manual Testing',
    description: 'Learn the fundamentals of manual testing with interactive exercises on test cases, bug reports, and more.',
    icon: <Beaker className="h-8 w-8" />,
    color: 'from-cyan-500 to-blue-500',
    route: '/labs/manual',
    count: 5,
    comingSoon: true
  },
  {
    id: 'automation',
    title: 'Automation Testing',
    description: 'Hands-on automation labs covering Selenium, TestNG, and other popular frameworks with real-world examples.',
    icon: <Code className="h-8 w-8" />,
    color: 'from-purple-500 to-pink-500',
    route: '/labs/automation',
    count: 6
  },
  {
    id: 'api',
    title: 'API Testing',
    description: 'Practice API testing techniques using Postman, REST Assured, and other tools with guided exercises.',
    icon: <FileJson className="h-8 w-8" />,
    color: 'from-amber-500 to-orange-500',
    route: '/labs/api',
    count: 4,
    comingSoon: true
  },
  {
    id: 'performance',
    title: 'Performance Testing',
    description: 'Learn to measure application performance using JMeter, Gatling, and k6 with practical examples.',
    icon: <Play className="h-8 w-8" />,
    color: 'from-red-500 to-rose-500',
    route: '/labs/performance',
    count: 3,
    comingSoon: true
  },
  {
    id: 'agile',
    title: 'Agile & DevOps',
    description: 'Explore the quality assurance role in Agile teams and DevOps environments with practical exercises.',
    icon: <Users className="h-8 w-8" />,
    color: 'from-green-500 to-emerald-500',
    route: '/labs/agile',
    count: 2,
    comingSoon: true
  },
  {
    id: 'security',
    title: 'Security Testing',
    description: 'Master the theoretical foundations of security testing with interactive quizzes and scenarios.',
    icon: <BookOpen className="h-8 w-8" />,
    color: 'from-blue-500 to-indigo-500',
    route: '/labs/security',
    count: 5,
    comingSoon: true
  }
];

// Lab card type
export interface LabCard {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  route: string;
  modules: number;
  duration: string;
  comingSoon?: boolean;
}

// Automation lab cards
export const automationLabs: LabCard[] = [
  {
    id: 'selenium',
    title: 'Selenium WebDriver',
    description: 'Learn to automate web browsers with the most popular automation framework.',
    icon: <SiSelenium className="h-10 w-10" />,
    level: 'Beginner',
    color: 'from-green-500 to-emerald-700',
    route: '/labs/automation/selenium',
    modules: 8,
    duration: '6 hours'
  },
  {
    id: 'testng',
    title: 'TestNG Framework',
    description: 'Master test organization, parallelization, and reporting with TestNG.',
    icon: <SiTestinglibrary className="h-10 w-10" />,
    level: 'Intermediate',
    color: 'from-blue-500 to-indigo-700',
    route: '/labs/automation/testng',
    modules: 6,
    duration: '4 hours',
    comingSoon: true
  },
  {
    id: 'cucumber',
    title: 'Cucumber BDD',
    description: 'Practice behavior-driven development with Gherkin syntax and Cucumber.',
    icon: <SiCucumber className="h-10 w-10" />,
    level: 'Intermediate',
    color: 'from-lime-500 to-green-700',
    route: '/labs/automation/cucumber',
    modules: 5,
    duration: '3 hours',
    comingSoon: true
  },
  {
    id: 'shaft',
    title: 'SHAFT Engine',
    description: 'Learn this test automation engine built on top of Selenium WebDriver.',
    icon: <Code className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-purple-500 to-purple-900',
    route: '/labs/automation/shaft',
    modules: 7,
    duration: '5 hours',
    comingSoon: true
  },
  {
    id: 'appium',
    title: 'Appium Mobile',
    description: 'Automate mobile applications on Android and iOS platforms.',
    icon: <SiAppium className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-purple-500 to-pink-700',
    route: '/labs/automation/appium',
    modules: 9,
    duration: '7 hours',
    comingSoon: true
  },
  {
    id: 'ci-cd',
    title: 'CI/CD Integration',
    description: 'Integrate test automation into CI/CD pipelines with Jenkins.',
    icon: <SiJenkins className="h-10 w-10" />,
    level: 'Advanced',
    color: 'from-red-500 to-rose-700',
    route: '/labs/automation/ci-cd',
    modules: 4,
    duration: '3 hours',
    comingSoon: true
  }
];

// Module interface
export interface Module {
  id: string;
  title: string;
  description: string;
}

// Modules available in the Selenium lab
export const seleniumModules: Module[] = [
  {
    id: 'intro',
    title: 'Introduction to Selenium',
    description: 'Learn the basics of Selenium WebDriver and its architecture.'
  },
  {
    id: 'setup',
    title: 'Setting Up Selenium',
    description: 'Set up Selenium WebDriver with Java and configure your environment.'
  },
  {
    id: 'locators',
    title: 'Element Locators',
    description: 'Master different locator strategies: ID, Name, Class, XPath, and CSS Selectors.'
  },
  {
    id: 'actions',
    title: 'Browser Actions',
    description: 'Learn to interact with web elements: clicks, typing, scrolling, and more.'
  },
  {
    id: 'waits',
    title: 'Synchronization & Waits',
    description: 'Handle timing issues with implicit, explicit, and fluent waits.'
  },
  {
    id: 'advanced',
    title: 'Advanced Interactions',
    description: 'Work with advanced scenarios: alerts, frames, windows, and drag-and-drop.'
  },
  {
    id: 'framework',
    title: 'Building a Framework',
    description: 'Create a modular, maintainable test automation framework.'
  },
  {
    id: 'reporting',
    title: 'Reporting & Logging',
    description: 'Implement comprehensive test reporting and logging mechanisms.'
  }
];