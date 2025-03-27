import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, PlayCircle, AlertCircle, FileCheck } from 'lucide-react';
import CodeExample from '@/components/ui/CodeExample';
import Terminal from '@/components/ui/Terminal';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalLine } from '@/lib/types';

export default function FirstScriptContent() {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  const languageOptions = [
    { name: 'Java', value: 'java' },
    { name: 'Python', value: 'python' },
    { name: 'JavaScript', value: 'javascript' },
    { name: 'C#', value: 'csharp' }
  ];

  // Example first scripts for each language
  const firstScripts = {
    java: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class FirstSeleniumTest {
    public static void main(String[] args) {
        // Initialize ChromeDriver
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to website
            driver.get("https://www.google.com");
            
            // Get and print the title
            String title = driver.getTitle();
            System.out.println("Page title is: " + title);
            
            // Verify the title contains expected text
            if (title.contains("Google")) {
                System.out.println("Test passed: Title contains 'Google'");
            } else {
                System.out.println("Test failed: Title doesn't contain 'Google'");
            }
        } finally {
            // Always close the browser
            driver.quit();
        }
    }
}`,
    python: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service

# Initialize ChromeDriver
driver = webdriver.Chrome()

try:
    # Navigate to website
    driver.get("https://www.google.com")
    
    # Get and print the title
    title = driver.title
    print(f"Page title is: {title}")
    
    # Verify the title contains expected text
    if "Google" in title:
        print("Test passed: Title contains 'Google'")
    else:
        print("Test failed: Title doesn't contain 'Google'")
finally:
    # Always close the browser
    driver.quit()`,
    javascript: `const { Builder } = require('selenium-webdriver');

(async function firstSeleniumTest() {
    // Initialize ChromeDriver
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Navigate to website
        await driver.get('https://www.google.com');
        
        // Get and print the title
        const title = await driver.getTitle();
        console.log('Page title is:', title);
        
        // Verify the title contains expected text
        if (title.includes('Google')) {
            console.log("Test passed: Title contains 'Google'");
        } else {
            console.log("Test failed: Title doesn't contain 'Google'");
        }
    } finally {
        // Always close the browser
        await driver.quit();
    }
})();`,
    csharp: `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

class FirstSeleniumTest {
    static void Main() {
        // Initialize ChromeDriver
        IWebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to website
            driver.Navigate().GoToUrl("https://www.google.com");
            
            // Get and print the title
            string title = driver.Title;
            Console.WriteLine("Page title is: " + title);
            
            // Verify the title contains expected text
            if (title.Contains("Google")) {
                Console.WriteLine("Test passed: Title contains 'Google'");
            } else {
                Console.WriteLine("Test failed: Title doesn't contain 'Google'");
            }
        } 
        finally {
            // Always close the browser
            driver.Quit();
        }
    }
}`
  };

  // Terminal output simulation
  const terminalOutput: TerminalLine[] = [
    { type: 'command', content: '# Running first Selenium test' },
    { type: 'command', content: 'java FirstSeleniumTest.java', delay: 500 },
    { type: 'output', content: 'Starting ChromeDriver 118.0.5993.70...', delay: 700 },
    { type: 'output', content: 'ChromeDriver started successfully.', delay: 500 },
    { type: 'output', content: 'Page title is: Google', delay: 1000 },
    { type: 'success', content: 'Test passed: Title contains \'Google\'', delay: 500 },
    { type: 'output', content: 'Chrome browser closed.', delay: 300 },
    { type: 'success', content: 'Test completed successfully!', delay: 200 }
  ];

  return (
    <div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Writing Your First Selenium Script</h3>
        <p>
          Now that you've set up Selenium WebDriver, let's write a simple script to open a web browser, navigate to a website, and verify its title.
        </p>
      </div>

      {/* Language selector */}
      <div className="mt-6 mb-8">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Choose your programming language:</h4>
        <div className="flex flex-wrap gap-3">
          {languageOptions.map((language) => (
            <button
              key={language.value}
              onClick={() => setSelectedLanguage(language.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                selectedLanguage === language.value
                  ? "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {language.name}
            </button>
          ))}
        </div>
      </div>

      {/* First Script Example */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-3">Basic Selenium Test</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          This script demonstrates the fundamental structure of a Selenium test. It opens Google, retrieves the page title, and verifies it contains the expected text.
        </p>
        
        <CodeExample
          examples={[
            {
              language: selectedLanguage,
              code: firstScripts[selectedLanguage as keyof typeof firstScripts],
              label: `${languageOptions.find(l => l.value === selectedLanguage)?.name || 'Java'} Example`
            }
          ]}
        />
      </div>

      {/* Key Components Explanation */}
      <div className={cn(
        "rounded-xl p-6 mb-8",
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      )}>
        <h4 className="text-lg font-medium mb-3 flex items-center">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Key Components Explained
        </h4>
        
        <div className="space-y-4">
          <div>
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">WebDriver Initialization</h5>
            <p className="text-gray-600 dark:text-gray-400">
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">WebDriver driver = new ChromeDriver()</code> - Creates a new instance of ChromeDriver that controls Chrome browser.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Navigation</h5>
            <p className="text-gray-600 dark:text-gray-400">
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">driver.get("https://www.google.com")</code> - Tells WebDriver to navigate to the specified URL.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Page Interaction</h5>
            <p className="text-gray-600 dark:text-gray-400">
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">driver.getTitle()</code> - Retrieves the title of the current page.
            </p>
          </div>
          
          <div>
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Browser Cleanup</h5>
            <p className="text-gray-600 dark:text-gray-400">
              <code className="px-1 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">driver.quit()</code> - Closes the browser and ends the WebDriver session. Always include this to prevent orphaned browser processes.
            </p>
          </div>
        </div>
      </div>

      {/* Running the script */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-3 flex items-center">
          <PlayCircle className="h-5 w-5 mr-2 text-green-500" />
          Running Your First Script
        </h4>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          When you run your first Selenium script, you'll see Chrome launch automatically, navigate to Google, and then close after the test completes.
        </p>
        
        <div className="mb-6">
          <Terminal 
            lines={terminalOutput}
            showCopyButton={false}
          />
        </div>
      </div>

      {/* Common Issues */}
      <div className={cn(
        "rounded-xl p-6 border-l-4 border-amber-500 mb-8",
        theme === 'dark' ? 'bg-amber-900/20' : 'bg-amber-50'
      )}>
        <h4 className="text-lg font-medium mb-3 flex items-center text-amber-800 dark:text-amber-300">
          <AlertCircle className="h-5 w-5 mr-2" />
          Common Issues and Solutions
        </h4>
        
        <ul className="space-y-3 text-amber-700 dark:text-amber-300">
          <li>
            <strong>Driver Not Found:</strong> Make sure the WebDriver executable is in your PATH or specify its location explicitly.
          </li>
          <li>
            <strong>Browser Version Mismatch:</strong> Ensure your ChromeDriver version matches your Chrome browser version.
          </li>
          <li>
            <strong>Connection Refused:</strong> Check if another instance of ChromeDriver is already running or if a firewall is blocking it.
          </li>
          <li>
            <strong>Element Not Found:</strong> Use explicit waits to ensure elements are present before interacting with them (covered in later modules).
          </li>
        </ul>
      </div>

      {/* Next Steps */}
      <div className={cn(
        "rounded-xl p-6 border",
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <h4 className="text-lg font-medium mb-3 flex items-center">
          <FileCheck className="h-5 w-5 mr-2 text-cyan-500" />
          What You've Learned
        </h4>
        
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Creating a WebDriver instance</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Navigating to a web page</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Getting page information (title)</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
              <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span>Proper cleanup with driver.quit()</span>
          </li>
        </ul>
        
        <div className="mt-6">
          <p className="font-medium">In the next section, you'll learn how to:</p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Find elements on web pages, interact with them, and structure more complex tests.
          </p>
        </div>
      </div>
    </div>
  );
}