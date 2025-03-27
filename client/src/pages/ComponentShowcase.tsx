import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { TerminalLine } from '@/lib/types';
import UnifiedTabs from '@/components/ui/UnifiedTabs';
import Terminal from '@/components/ui/Terminal';
import CodeExample from '@/components/ui/CodeExample';
import MainLayout from '@/layouts/MainLayout';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';

export default function ComponentShowcase() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('unified-tabs');
  
  // Sample terminal lines for demo
  const terminalLines: TerminalLine[] = [
    { type: 'comment' as const, content: 'Installing dependencies', delay: 500 },
    { type: 'command' as const, content: 'npm install selenium-webdriver', delay: 1000 },
    { type: 'output' as const, content: 'added 125 packages in 4.2s', delay: 800 },
    { type: 'command' as const, content: 'npm install @types/selenium-webdriver --save-dev', delay: 1200 },
    { type: 'output' as const, content: 'added 3 packages in 1.8s', delay: 800 },
    { type: 'success' as const, content: 'All dependencies installed successfully!', delay: 500 },
    { type: 'command' as const, content: 'npx selenium-webdriver --version', delay: 1000 },
    { type: 'output' as const, content: 'Selenium WebDriver 4.10.0', delay: 500 },
    { type: 'cursor' as const, content: '', delay: 300 }
  ];
  
  // Sample terminal tabs for demo
  const terminalTabs: Array<{id: string; label: string; lines: TerminalLine[]}> = [
    {
      id: 'install',
      label: 'Installation',
      lines: [
        { type: 'comment' as const, content: 'Installing Selenium WebDriver', delay: 500 },
        { type: 'command' as const, content: 'npm install selenium-webdriver', delay: 1000 },
        { type: 'output' as const, content: 'added 125 packages in 4.2s', delay: 800 },
        { type: 'success' as const, content: 'Selenium WebDriver installed successfully!', delay: 500 }
      ]
    },
    {
      id: 'typescript',
      label: 'TypeScript',
      lines: [
        { type: 'comment' as const, content: 'Adding TypeScript types', delay: 500 },
        { type: 'command' as const, content: 'npm install @types/selenium-webdriver --save-dev', delay: 1000 },
        { type: 'output' as const, content: 'added 3 packages in 1.8s', delay: 800 },
        { type: 'success' as const, content: 'TypeScript definitions installed!', delay: 500 }
      ]
    },
    {
      id: 'browser',
      label: 'Browser Setup',
      lines: [
        { type: 'comment' as const, content: 'Setting up browser drivers', delay: 500 },
        { type: 'command' as const, content: 'npx selenium-manager --browser chrome', delay: 1000 },
        { type: 'output' as const, content: 'Chrome driver 114.0.5735.90 installed', delay: 800 },
        { type: 'command' as const, content: 'npx selenium-manager --browser firefox', delay: 1000 },
        { type: 'output' as const, content: 'Firefox driver 0.33.0 installed', delay: 800 },
        { type: 'success' as const, content: 'Browser drivers ready!', delay: 500 }
      ]
    }
  ];
  
  // Code examples for various languages
  const seleniumExamples = [
    {
      language: 'javascript',
      label: 'JavaScript',
      code: `// Simple Selenium test in JavaScript
const { Builder, By, Key, until } = require('selenium-webdriver');

async function runTest() {
  // Create a new WebDriver instance
  const driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to Google
    await driver.get('https://www.google.com');
    
    // Type "Selenium WebDriver" into the search box
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
    
    // Wait for the results page
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
    
    // Get and print the title
    console.log('Page title is:', await driver.getTitle());
    
  } finally {
    // Close the browser
    await driver.quit();
  }
}

runTest();`
    },
    {
      language: 'python',
      label: 'Python',
      code: `# Simple Selenium test in Python
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Create a new WebDriver instance
driver = webdriver.Chrome()

try:
    # Navigate to Google
    driver.get("https://www.google.com")
    
    # Type "Selenium WebDriver" into the search box
    search_box = driver.find_element(By.NAME, "q")
    search_box.send_keys("Selenium WebDriver" + Keys.RETURN)
    
    # Wait for the results page
    WebDriverWait(driver, 5).until(
        EC.title_contains("Selenium WebDriver")
    )
    
    # Get and print the title
    print("Page title is:", driver.title)
    
finally:
    # Close the browser
    driver.quit()`
    },
    {
      language: 'java',
      label: 'Java',
      code: `// Simple Selenium test in Java
import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class SimpleSeleniumTest {
    public static void main(String[] args) {
        // Create a new WebDriver instance
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            
            // Type "Selenium WebDriver" into the search box
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver" + Keys.RETURN);
            
            // Wait for the results page
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(5));
            wait.until(ExpectedConditions.titleContains("Selenium WebDriver"));
            
            // Get and print the title
            System.out.println("Page title is: " + driver.getTitle());
            
        } finally {
            // Close the browser
            driver.quit();
        }
    }
}`
    },
    {
      language: 'csharp',
      label: 'C#',
      code: `// Simple Selenium test in C#
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class SimpleSeleniumTest {
    static void Main() {
        // Create a new WebDriver instance
        IWebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to Google
            driver.Navigate().GoToUrl("https://www.google.com");
            
            // Type "Selenium WebDriver" into the search box
            IWebElement searchBox = driver.FindElement(By.Name("q"));
            searchBox.SendKeys("Selenium WebDriver" + Keys.Return);
            
            // Wait for the results page
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(5));
            wait.Until(d => d.Title.Contains("Selenium WebDriver"));
            
            // Get and print the title
            Console.WriteLine("Page title is: " + driver.Title);
            
        } finally {
            // Close the browser
            driver.Quit();
        }
    }
}`
    }
  ];
  
  // Unified Tabs examples
  const unifiedTabItems = [
    {
      id: 'tab1',
      label: 'First Tab',
      icon: <span className="w-4 h-4 rounded-full bg-blue-500 mr-1" />,
      content: <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium mb-2">First Tab Content</h3>
        <p>This is the content for the first tab. It demonstrates the UnifiedTabs component.</p>
      </div>
    },
    {
      id: 'tab2',
      label: 'Second Tab',
      icon: <span className="w-4 h-4 rounded-full bg-green-500 mr-1" />,
      content: <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium mb-2">Second Tab Content</h3>
        <p>This tab shows different content. The tabs are persistent and maintain state.</p>
      </div>
    },
    {
      id: 'tab3',
      label: 'Third Tab',
      icon: <span className="w-4 h-4 rounded-full bg-purple-500 mr-1" />,
      content: <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
        <h3 className="text-lg font-medium mb-2">Third Tab Content</h3>
        <p>You can add as many tabs as needed. Each tab can contain any React component.</p>
      </div>
    }
  ];
  
  // Set up different tab variants
  const tabVariants = [
    { id: 'default', label: 'Default' },
    { id: 'pills', label: 'Pills' },
    { id: 'underlined', label: 'Underlined' }
  ];
  
  const [activeVariant, setActiveVariant] = useState('default');
  
  return (
    <MainLayout title="Component Showcase - Quality Sensei">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-8 text-center">Quality Sensei Component Showcase</h1>
        <p className="text-lg text-center mb-10 max-w-3xl mx-auto">
          This page demonstrates the reusable UI components created for the Quality Sensei platform.
          These components provide a consistent user experience throughout the application.
        </p>
        
        <Tabs defaultValue="unified-tabs" className="mb-10">
          <TabsList className="mb-6 mx-auto">
            <TabsTrigger value="unified-tabs">UnifiedTabs</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
            <TabsTrigger value="code-example">Code Example</TabsTrigger>
            <TabsTrigger value="live-chat">Live Chat</TabsTrigger>
          </TabsList>
          
          <TabsContent value="unified-tabs" className="mb-8">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold mb-4">UnifiedTabs Component</h2>
                <p className="mb-6">
                  A versatile tabs component that supports multiple styles and variants.
                  The UnifiedTabs component replaces multiple specialized tab components
                  with a single, flexible implementation.
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-3">Tab Variants</h3>
                  <div className="flex items-center gap-4 mb-4">
                    {tabVariants.map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => setActiveVariant(variant.id)}
                        className={`px-4 py-2 rounded-md ${
                          activeVariant === variant.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      >
                        {variant.label}
                      </button>
                    ))}
                  </div>
                  
                  <UnifiedTabs 
                    tabs={unifiedTabItems}
                    variant={activeVariant as any}
                    className="mb-10"
                    storageKey="showcase-tab-state"
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="terminal" className="mb-8">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Terminal Component</h2>
                <p className="mb-6">
                  An animated terminal component that simulates command execution with typing effects.
                  It supports different line types (command, output, success, error) and can be configured
                  with tabs for different command sets.
                </p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Single Terminal</h3>
                    <Terminal 
                      lines={terminalLines}
                      title="Selenium WebDriver Setup"
                      className="mb-6"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Terminal with Tabs</h3>
                    <Terminal 
                      lines={terminalLines}
                      tabs={terminalTabs}
                      title="Selenium WebDriver Setup"
                      className="mb-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="code-example" className="mb-8">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Code Example Component</h2>
                <p className="mb-6">
                  A component for displaying code examples in multiple programming languages.
                  It uses UnifiedTabs with the terminal variant to show syntax-highlighted code
                  with copy functionality.
                </p>
                
                <CodeExample
                  examples={seleniumExamples}
                  title="Selenium WebDriver Basic Test"
                  description="A simple test that opens Google, searches for 'Selenium WebDriver', and verifies the page title."
                  className="mb-6"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="live-chat" className="mb-8">
            <div className="space-y-10">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Live Chat Component</h2>
                <p className="mb-6">
                  The Live Chat feature has been removed from this application.
                </p>
                
                <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-6">
                  <h3 className="text-xl font-medium mb-3">Chat Alternatives</h3>
                  <p>
                    Instead of a real-time chat, consider the following alternatives for customer support:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 mt-4">
                    <li>Email support form in the Contact section</li>
                    <li>FAQ section with common questions</li>
                    <li>Help documentation and knowledge base</li>
                    <li>Phone support during business hours</li>
                  </ul>
                </div>
                
                <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-blue-800 dark:text-blue-200">
                  <p className="text-sm">
                    Note: For more information about support options, please visit the Contact section of the website.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}