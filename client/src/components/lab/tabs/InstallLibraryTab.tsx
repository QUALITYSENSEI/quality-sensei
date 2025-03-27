import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileTerminal, Check, CopyIcon, CheckIcon } from 'lucide-react';
import Terminal from '@/components/ui/Terminal';
import CodeExample from '@/components/ui/CodeExample';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

interface LanguageOption {
  name: string;
  value: string;
  installCommand: string;
  importCode: string;
}

export default function InstallLibraryContent() {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [copied, setCopied] = useState(false);

  const languageOptions: LanguageOption[] = [
    {
      name: 'Java',
      value: 'java',
      installCommand: 'mvn dependency:get -Dartifact=org.seleniumhq.selenium:selenium-java:4.15.0',
      importCode: `import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;`
    },
    {
      name: 'Python',
      value: 'python',
      installCommand: 'pip install selenium',
      importCode: `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.keys import Keys`
    },
    {
      name: 'JavaScript',
      value: 'javascript',
      installCommand: 'npm install selenium-webdriver',
      importCode: `const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');`
    },
    {
      name: 'C#',
      value: 'csharp',
      installCommand: 'dotnet add package Selenium.WebDriver',
      importCode: `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using System.Collections.Generic;`
    }
  ];

  const currentLanguage = languageOptions.find(l => l.value === selectedLanguage) || languageOptions[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLanguage.installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Setting Up Selenium WebDriver</h3>
        <p>
          Before you can start automating web browsers with Selenium, you need to install the Selenium libraries for your programming language of choice.
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

      {/* Installation instructions */}
      <div className={cn(
        "rounded-xl shadow-sm overflow-hidden mb-8 border",
        theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      )}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileTerminal className="h-5 w-5 mr-2 text-cyan-500" />
            <h4 className="font-medium">Installation Command</h4>
          </div>
          <button 
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            {copied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
          </button>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 font-mono text-sm overflow-x-auto">
          {currentLanguage.installCommand}
        </div>
      </div>

      {/* Import statements */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-3">Required Imports</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          After installing Selenium, you'll need to import the necessary classes in your code:
        </p>
        <CodeExample
          examples={[
            {
              language: currentLanguage.value,
              code: currentLanguage.importCode,
              label: `${currentLanguage.name} imports`
            }
          ]}
          className="mt-4"
        />
      </div>

      {/* WebDriver Manager Instructions */}
      <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
        <h4>WebDriver Installation</h4>
        <p>
          Selenium requires browser-specific WebDriver executables to communicate with browsers. For Chrome, you'll need ChromeDriver.
        </p>

        <div className={cn(
          "p-4 border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/30 rounded-r-lg",
          "text-amber-800 dark:text-amber-300"
        )}>
          <h5 className="mt-0 font-medium">Tip: WebDriver Manager</h5>
          <p className="mt-2">
            Modern Selenium versions (4.x+) include WebDriver Manager functionality that can automatically download the appropriate driver for your browser. This is recommended over manual installation.
          </p>
        </div>
      </div>

      {/* Example using WebDriverManager */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-3">Example Using WebDriver Manager</h4>
        
        <CodeExample
          examples={[
            {
              language: 'java',
              code: `// No need for System.setProperty() with Selenium 4.x
WebDriver driver = new ChromeDriver();
driver.get("https://qualitysensei.dev");
System.out.println("Page title: " + driver.getTitle());
driver.quit();`,
              label: 'Java'
            },
            {
              language: 'python',
              code: `# Selenium 4 handles driver management automatically
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

driver = webdriver.Chrome()  # No service object needed
driver.get("https://qualitysensei.dev")
print("Page title:", driver.title)
driver.quit()`,
              label: 'Python'
            },
            {
              language: 'javascript',
              code: `// Selenium 4 WebDriver with automatic driver management
const { Builder } = require('selenium-webdriver');

(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://qualitysensei.dev');
    const title = await driver.getTitle();
    console.log('Page title:', title);
  } finally {
    await driver.quit();
  }
})();`,
              label: 'JavaScript'
            },
            {
              language: 'csharp',
              code: `// C# with Selenium 4
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;

class Program {
    static void Main() {
        IWebDriver driver = new ChromeDriver();
        driver.Navigate().GoToUrl("https://qualitysensei.dev");
        Console.WriteLine("Page title: " + driver.Title);
        driver.Quit();
    }
}`,
              label: 'C#'
            }
          ]}
          defaultTab={selectedLanguage}
        />
      </div>

      {/* Next steps */}
      <div className={cn(
        "rounded-xl p-6",
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      )}>
        <h4 className="text-lg font-medium mb-2">Next Steps</h4>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Now that you've installed Selenium WebDriver, you're ready to write your first automation script.
        </p>
        <ul className="space-y-2">
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2 mt-0.5">
              <Check className="h-3 w-3 text-white" />
            </div>
            <span>Install Selenium WebDriver</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-cyan-500 flex items-center justify-center mr-2 mt-0.5">
              <span className="text-white text-xs font-bold">2</span>
            </div>
            <span className="font-medium">Write your first script</span>
          </li>
          <li className="flex items-start">
            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-2 mt-0.5">
              <span className="text-gray-700 dark:text-gray-300 text-xs font-bold">3</span>
            </div>
            <span className="text-gray-500">Learn basic Selenium commands</span>
          </li>
        </ul>
      </div>
    </div>
  );
}