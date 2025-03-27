import { useTheme } from "@/contexts/ThemeContext";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import UnifiedTabs, { TabItem } from "@/components/ui/UnifiedTabs";
import { SiSelenium, SiJavascript, SiJava, SiPython, SiCsharp } from "@/components/IconImports";
import { SiPlaywright } from "@/components/IconImports";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { BsDownload, BsPlayFill, BsCheck2, BsBriefcase } from "react-icons/bs";
import { cn } from "@/lib/utils";

// Code examples for different frameworks
const seleniumJavaCode = `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class SeleniumDemo {
    public static void main(String[] args) {
        // Set path to ChromeDriver
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        
        // Create ChromeOptions instance
        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless"); // Run in headless mode
        
        // Initialize ChromeDriver
        WebDriver driver = new ChromeDriver(options);
        
        try {
            // Navigate to website
            driver.get("https://www.qualitysensei.com");
            
            // Find and click on an element
            WebElement loginButton = driver.findElement(By.linkText("Login"));
            loginButton.click();
            
            // Fill in login form
            driver.findElement(By.id("username")).sendKeys("testuser");
            driver.findElement(By.id("password")).sendKeys("password");
            driver.findElement(By.id("loginButton")).click();
            
            // Assert that login was successful
            WebElement welcomeMessage = driver.findElement(By.className("welcome-message"));
            if (welcomeMessage.isDisplayed()) {
                System.out.println("Login successful!");
            } else {
                System.out.println("Login failed!");
            }
            
        } finally {
            // Close the browser
            driver.quit();
        }
    }
}`;

const seleniumPythonCode = `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Setup Chrome options
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode

# Set path to ChromeDriver
webdriver_service = Service('path/to/chromedriver')

# Initialize the driver
driver = webdriver.Chrome(service=webdriver_service, options=chrome_options)

try:
    # Navigate to website
    driver.get("https://www.qualitysensei.com")
    
    # Find and click on an element
    login_button = driver.find_element(By.LINK_TEXT, "Login")
    login_button.click()
    
    # Wait for login form to load
    wait = WebDriverWait(driver, 10)
    username_field = wait.until(EC.presence_of_element_located((By.ID, "username")))
    
    # Fill in login form
    username_field.send_keys("testuser")
    driver.find_element(By.ID, "password").send_keys("password")
    driver.find_element(By.ID, "loginButton").click()
    
    # Assert that login was successful
    welcome_message = wait.until(EC.presence_of_element_located((By.CLASS_NAME, "welcome-message")))
    if welcome_message.is_displayed():
        print("Login successful!")
    else:
        print("Login failed!")

finally:
    # Close the browser
    driver.quit()`;

const seleniumJsCode = `const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  // Set up Chrome options
  let options = new chrome.Options();
  options.addArguments('--headless');
  
  // Initialize the driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    
  try {
    // Navigate to website
    await driver.get('https://www.qualitysensei.com');
    
    // Find and click on an element
    await driver.findElement(By.linkText('Login')).click();
    
    // Wait for login form to load
    await driver.wait(until.elementLocated(By.id('username')), 10000);
    
    // Fill in login form
    await driver.findElement(By.id('username')).sendKeys('testuser');
    await driver.findElement(By.id('password')).sendKeys('password');
    await driver.findElement(By.id('loginButton')).click();
    
    // Assert that login was successful
    await driver.wait(until.elementLocated(By.className('welcome-message')), 10000);
    let welcomeMessage = await driver.findElement(By.className('welcome-message'));
    
    if (await welcomeMessage.isDisplayed()) {
      console.log('Login successful!');
    } else {
      console.log('Login failed!');
    }
    
  } finally {
    // Close the browser
    await driver.quit();
  }
}

runTest();`;

const playwrightCode = `import { test, expect } from '@playwright/test';

test('basic login test', async ({ page }) => {
  // Navigate to website
  await page.goto('https://www.qualitysensei.com');
  
  // Find and click on login link
  await page.click('text=Login');
  
  // Fill in login form
  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password');
  await page.click('#loginButton');
  
  // Assert that login was successful
  const welcomeMessage = page.locator('.welcome-message');
  await expect(welcomeMessage).toBeVisible();
  
  // Take a screenshot
  await page.screenshot({ path: 'login-success.png' });
});

test('validate form errors', async ({ page }) => {
  // Navigate to login page
  await page.goto('https://www.qualitysensei.com/login');
  
  // Try to submit without filling the form
  await page.click('#loginButton');
  
  // Assert error messages
  const usernameError = page.locator('#username-error');
  const passwordError = page.locator('#password-error');
  
  await expect(usernameError).toBeVisible();
  await expect(usernameError).toHaveText('Username is required');
  await expect(passwordError).toBeVisible();
  await expect(passwordError).toHaveText('Password is required');
});`;

// Define the lab content with sections
const labSections: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <BsBriefcase className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Automation Testing Lab</h2>
        <p className="text-lg">
          Welcome to the Automation Testing Lab! This interactive environment will help you master 
          test automation using popular frameworks like Selenium and Playwright. Through hands-on 
          exercises, you'll learn how to create robust, maintainable test suites that can run 
          across different browsers and platforms.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">What You'll Learn</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Setting up automation frameworks in different programming languages</li>
          <li>Writing robust selectors that won't break with UI changes</li>
          <li>Creating maintainable test architectures using Page Object Models</li>
          <li>Handling dynamic content, wait conditions and synchronization</li>
          <li>Setting up continuous integration for your test suites</li>
          <li>Parallel test execution and cross-browser testing</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Prerequisites</h3>
        <p>
          Basic programming knowledge in at least one of the supported languages (Java, Python, JavaScript or C#).
          No prior automation experience is necessary, but familiarity with HTML and CSS will be helpful.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-blue-800 dark:text-blue-200 mt-6">
          <p className="text-sm">
            <strong>Note:</strong> This lab contains interactive exercises that you can complete in your own 
            development environment. Installation instructions are provided for each framework.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "selenium-basics",
    label: "Selenium Basics",
    icon: <SiSelenium className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Getting Started with Selenium</h2>
        <p>
          Selenium is one of the most popular open-source frameworks for web application testing. It provides 
          APIs for browser automation in multiple programming languages.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Installation</h3>
        <p>Choose your preferred language below to see installation instructions:</p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "java",
              label: "Java",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <p>Add the following dependencies to your Maven or Gradle project:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`<!-- Maven -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.12.0</version>
</dependency>

// Gradle
implementation 'org.seleniumhq.selenium:selenium-java:4.12.0'`}
                  </pre>
                  <p>Then download the appropriate WebDriver for your browser:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="https://googlechromelabs.github.io/chrome-for-testing/" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">ChromeDriver</a></li>
                    <li><a href="https://github.com/mozilla/geckodriver/releases" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">GeckoDriver (Firefox)</a></li>
                  </ul>
                </div>
              )
            },
            {
              id: "python",
              label: "Python",
              icon: <SiPython className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <p>Install Selenium using pip:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`pip install selenium`}
                  </pre>
                  <p>Then download the appropriate WebDriver for your browser:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><a href="https://googlechromelabs.github.io/chrome-for-testing/" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">ChromeDriver</a></li>
                    <li><a href="https://github.com/mozilla/geckodriver/releases" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">GeckoDriver (Firefox)</a></li>
                  </ul>
                </div>
              )
            },
            {
              id: "javascript",
              label: "JavaScript",
              icon: <SiJavascript className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <p>Install Selenium WebDriver using npm:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`npm install selenium-webdriver`}
                  </pre>
                  <p>Then install the browser-specific drivers:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`npm install chromedriver geckodriver`}
                  </pre>
                </div>
              )
            },
            {
              id: "csharp",
              label: "C#",
              icon: <SiCsharp className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <p>Add the following NuGet packages to your project:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`// Using Package Manager Console
Install-Package Selenium.WebDriver
Install-Package Selenium.Support
Install-Package Selenium.WebDriver.ChromeDriver`}
                  </pre>
                </div>
              )
            }
          ]}
          variant="pills"
        />
        
        <h3 className="text-xl font-semibold mt-8">Your First Selenium Test</h3>
        <p>Here's a basic example to get you started with Selenium:</p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "java-example",
              label: "Java",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              code: seleniumJavaCode
            },
            {
              id: "python-example",
              label: "Python",
              icon: <SiPython className="mr-2 h-4 w-4" />,
              code: seleniumPythonCode
            },
            {
              id: "js-example",
              label: "JavaScript",
              icon: <SiJavascript className="mr-2 h-4 w-4" />,
              code: seleniumJsCode
            }
          ]}
          variant="terminal"
          title="Basic Selenium Login Test"
          description="This example demonstrates how to automate a login flow using Selenium."
          showCopyButton={true}
        />
        
        <h3 className="text-xl font-semibold mt-8">Exercise: Your First Automation Test</h3>
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Task</h4>
          <p className="text-green-800 dark:text-green-300">
            Modify the example code to automate a search on the Quality Sensei website:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Navigate to the homepage</li>
            <li>Locate the search input field</li>
            <li>Enter "Automation Testing" as the search term</li>
            <li>Submit the search form</li>
            <li>Verify that search results are displayed</li>
          </ol>
          <p className="text-green-800 dark:text-green-300 mt-2">
            Try implementing this in your preferred programming language. Check the solution 
            in the exercises section of this lab.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "playwright",
    label: "Playwright",
    icon: <SiPlaywright className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Getting Started with Playwright</h2>
        <p>
          Playwright is a newer automation framework from Microsoft that provides a high-level API 
          for controlling Chromium, Firefox, and WebKit browsers. It offers several advantages over 
          Selenium, including automatic waiting, built-in screenshot and video capabilities, and 
          mobile device emulation.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Installation</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
          {`# Using npm
npm init playwright@latest

# Using yarn
yarn create playwright`}
        </pre>
        
        <p className="mt-4">This will set up a Playwright project with example tests and configuration.</p>
        
        <h3 className="text-xl font-semibold mt-8">Your First Playwright Test</h3>
        <p>Here's a basic example to get you started with Playwright:</p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "playwright-example",
              label: "Playwright",
              icon: <SiPlaywright className="mr-2 h-4 w-4" />,
              code: playwrightCode
            }
          ]}
          variant="terminal"
          title="Basic Playwright Login Test"
          description="This example demonstrates how to automate a login flow using Playwright."
          showCopyButton={true}
        />
        
        <h3 className="text-xl font-semibold mt-8">Key Features of Playwright</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Auto-waiting capabilities that ensure element interactability</li>
          <li>Reliable cross-browser automation</li>
          <li>Support for multiple pages, contexts, and browser types</li>
          <li>Mobile emulation with device profiles</li>
          <li>Network interception and mocking</li>
          <li>Screenshot and video recording</li>
          <li>Powerful built-in test assertions</li>
          <li>Codegen tool to record user interactions</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-8">Exercise: Recording a Test with Codegen</h3>
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Task</h4>
          <p className="text-green-800 dark:text-green-300">
            Playwright includes a powerful codegen tool that can record your interactions with a website:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
            {`npx playwright codegen https://www.qualitysensei.com`}
          </pre>
          <p className="text-green-800 dark:text-green-300 mt-2">
            Try using codegen to:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Navigate to the homepage</li>
            <li>Click on "Courses" in the navigation</li>
            <li>Select a specific course from the list</li>
            <li>Verify that the course details page loads</li>
          </ol>
          <p className="text-green-800 dark:text-green-300 mt-2">
            Save the generated code and try running it as a test.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "exercises",
    label: "Exercises",
    icon: <BsPlayFill className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Lab Exercises</h2>
        <p>
          Complete these exercises to practice your automation skills. Each exercise 
          builds upon the knowledge from the previous sections.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Exercise 1 */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle>Exercise 1: Basic Navigation and Verification</CardTitle>
              <CardDescription>Difficulty: Beginner</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">Write a test that:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Opens the Quality Sensei homepage</li>
                <li>Verifies the page title contains "Quality Sensei"</li>
                <li>Clicks on the "Courses" link in the navigation</li>
                <li>Verifies that at least 3 courses are displayed</li>
              </ol>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <UnifiedTabs 
                tabs={[
                  {
                    id: "exercise1-hint",
                    label: "Hint",
                    content: (
                      <div className="p-4">
                        <p>Use these selectors to find elements:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>Navigation: <code>nav a[href="/courses"]</code></li>
                          <li>Course cards: <code>.course-card</code></li>
                          <li>To verify page title: <code>driver.getTitle()</code> in Selenium or <code>expect(page).toHaveTitle(/Quality Sensei/)</code> in Playwright</li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    id: "exercise1-solution",
                    label: "Solution",
                    content: (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                        {`// Selenium JavaScript Solution
const { Builder, By, until } = require('selenium-webdriver');

async function exercise1() {
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // 1. Open homepage
    await driver.get('https://www.qualitysensei.com');
    
    // 2. Verify title
    const title = await driver.getTitle();
    if (title.includes('Quality Sensei')) {
      console.log('✓ Title verification passed');
    } else {
      console.log('× Title verification failed');
    }
    
    // 3. Click on Courses link
    await driver.findElement(By.css('nav a[href="/courses"]')).click();
    
    // 4. Verify at least 3 courses are displayed
    await driver.wait(until.elementsLocated(By.css('.course-card')), 5000);
    const courses = await driver.findElements(By.css('.course-card'));
    
    if (courses.length >= 3) {
      console.log('✓ Found ' + courses.length + ' courses');
    } else {
      console.log('× Expected at least 3 courses, but found ' + courses.length);
    }
    
  } finally {
    await driver.quit();
  }
}

exercise1();`}
                      </pre>
                    )
                  }
                ]}
                variant="pills"
                size="sm"
              />
            </CardFooter>
          </Card>
          
          {/* Exercise 2 */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle>Exercise 2: Form Interaction and Validation</CardTitle>
              <CardDescription>Difficulty: Intermediate</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">Write a test that:</p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Navigates to the Contact page</li>
                <li>Attempts to submit the form without filling in required fields</li>
                <li>Verifies that validation errors appear</li>
                <li>Fills in all required fields</li>
                <li>Submits the form</li>
                <li>Verifies the success message</li>
              </ol>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-4">
              <UnifiedTabs 
                tabs={[
                  {
                    id: "exercise2-hint",
                    label: "Hint",
                    content: (
                      <div className="p-4">
                        <p>Use these selectors to find elements:</p>
                        <ul className="list-disc pl-6 space-y-2 mt-2">
                          <li>Contact page: <code>a[href="/contact"]</code></li>
                          <li>Form fields: <code>#name</code>, <code>#email</code>, <code>#message</code></li>
                          <li>Submit button: <code>button[type="submit"]</code></li>
                          <li>Error messages: <code>.error-message</code></li>
                          <li>Success message: <code>.success-message</code></li>
                        </ul>
                      </div>
                    )
                  },
                  {
                    id: "exercise2-solution",
                    label: "Solution",
                    content: (
                      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                        {`// Playwright Solution
import { test, expect } from '@playwright/test';

test('Contact form validation', async ({ page }) => {
  // 1. Navigate to Contact page
  await page.goto('https://www.qualitysensei.com/contact');
  
  // 2. Submit form without filling required fields
  await page.click('button[type="submit"]');
  
  // 3. Verify validation errors
  const errorMessages = page.locator('.error-message');
  await expect(errorMessages).toHaveCount(3); // Name, email, message
  
  // 4. Fill in all required fields
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'test@example.com');
  await page.fill('#message', 'This is a test message from automated test.');
  
  // 5. Submit the form
  await page.click('button[type="submit"]');
  
  // 6. Verify success message
  const successMessage = page.locator('.success-message');
  await expect(successMessage).toBeVisible();
  await expect(successMessage).toContainText('Thank you for your message');
});`}
                      </pre>
                    )
                  }
                ]}
                variant="pills"
                size="sm"
              />
            </CardFooter>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Advanced Exercises</h3>
        <p>Try these more challenging exercises to deepen your automation skills:</p>
        
        <div className="grid grid-cols-1 gap-6 mt-4">
          {/* Advanced Exercise */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gray-100 dark:bg-gray-800">
              <CardTitle>Exercise 3: Page Object Model Implementation</CardTitle>
              <CardDescription>Difficulty: Advanced</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="mb-4">
                Implement the Page Object Model pattern to refactor the previous exercises into a 
                maintainable test suite:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Create a BasePage class with common methods</li>
                <li>Create HomePage, CoursesPage, and ContactPage classes</li>
                <li>Implement the previous test scenarios using these page objects</li>
                <li>Add proper error handling and logging</li>
                <li>Make the tests run in multiple browsers</li>
              </ol>
            </CardContent>
            <CardFooter className="border-t p-4">
              <p>
                This exercise is more open-ended and requires implementing a proper test architecture.
                If you get stuck, check our "Advanced Automation Patterns" course for detailed
                guidance on implementing the Page Object Model pattern.
              </p>
            </CardFooter>
          </Card>
        </div>
        
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Completed All Exercises?</h3>
          <p className="text-green-800 dark:text-green-300 mt-2">
            Congratulations on completing the Automation Testing Lab! Consider these next steps:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Check out our advanced courses on test automation</li>
            <li>Join our community forum to discuss your solutions</li>
            <li>Try the API Testing Lab to expand your testing skills</li>
          </ul>
          <div className="mt-4 flex space-x-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <BsDownload className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 dark:text-green-400 dark:border-green-400 dark:hover:bg-green-900/20">
              <BsCheck2 className="mr-2 h-4 w-4" />
              Mark as Completed
            </Button>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "resources",
    label: "Resources",
    icon: <BsDownload className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Additional Resources</h2>
        <p>
          Enhance your learning with these additional resources related to automation testing:
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Official Documentation</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><a href="https://www.selenium.dev/documentation/" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">Selenium Documentation</a></li>
          <li><a href="https://playwright.dev/docs/intro" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">Playwright Documentation</a></li>
          <li><a href="https://appium.io/docs/en/2.0/" className="text-blue-500 dark:text-blue-400 hover:underline" target="_blank" rel="noopener">Appium Documentation</a> (for mobile testing)</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Downloadable Materials</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Card className={cn("hover:shadow-md transition-shadow duration-300")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mr-2">
                  <BsDownload className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                </span>
                Selenium Cheat Sheet
              </CardTitle>
              <CardDescription>PDF, 2.3 MB</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A comprehensive quick reference guide for Selenium WebDriver commands and best practices.</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full" variant="outline">Download</Button>
            </CardFooter>
          </Card>
          
          <Card className={cn("hover:shadow-md transition-shadow duration-300")}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="p-2 rounded-full bg-purple-100 dark:bg-purple-900 mr-2">
                  <BsDownload className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                </span>
                Page Object Model Templates
              </CardTitle>
              <CardDescription>ZIP, 1.5 MB</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Ready-to-use templates for implementing the Page Object Model in Java, Python, JavaScript, and C#.</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full" variant="outline">Download</Button>
            </CardFooter>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Video Tutorials</h3>
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden mt-4 flex items-center justify-center">
          <div className="text-center p-8">
            <p className="text-xl font-semibold mb-2">Automation Testing Masterclass</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">A comprehensive video series on mastering test automation</p>
            <Button>Watch Now</Button>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Recommended Courses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Card className={cn("hover:shadow-md transition-shadow duration-300")}>
            <CardHeader>
              <CardTitle>Advanced Selenium Patterns</CardTitle>
              <CardDescription>Intermediate · 4 Weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Learn advanced design patterns for creating maintainable and scalable test automation frameworks.</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
          
          <Card className={cn("hover:shadow-md transition-shadow duration-300")}>
            <CardHeader>
              <CardTitle>Playwright Masterclass</CardTitle>
              <CardDescription>Intermediate · 3 Weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <p>A deep dive into Playwright's powerful features for modern web testing automation.</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
          
          <Card className={cn("hover:shadow-md transition-shadow duration-300")}>
            <CardHeader>
              <CardTitle>Mobile Testing with Appium</CardTitle>
              <CardDescription>Advanced · 5 Weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Master mobile automation testing for Android and iOS applications using Appium.</p>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full">View Course</Button>
            </CardFooter>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-6">Community & Support</h3>
        <p>
          Join our community of automation testers to ask questions, share knowledge, and stay updated:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Button variant="outline" className="h-auto py-3 justify-start">
            <div className="flex flex-col items-start text-left">
              <span className="font-bold">Join Discord Community</span>
              <span className="text-sm">Connect with other testers and get help</span>
            </div>
          </Button>
          <Button variant="outline" className="h-auto py-3 justify-start">
            <div className="flex flex-col items-start text-left">
              <span className="font-bold">Subscribe to Newsletter</span>
              <span className="text-sm">Receive testing tips and updates</span>
            </div>
          </Button>
        </div>
      </div>
    )
  }
];

export default function AutomationTestingLab() {
  const { theme } = useTheme();
  const viewRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, root: null, rootMargin: '0px' }
    );
    
    const currentElement = viewRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <MainLayout 
      title="Automation Testing Lab - Quality Sensei" 
      description="Learn test automation with Selenium, Playwright and other popular frameworks through hands-on exercises."
    >
      <div className="pt-20 pb-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/practical-labs">
              <Button variant="outline" className="gap-2">
                <FiArrowLeft /> Back to Labs
              </Button>
            </Link>
          </div>
          
          <motion.div
            ref={viewRef}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: "#43B02A" }}>
                <SiSelenium className="w-8 h-8" />
              </div>
              <div>
                <h1 className={`text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Automation Testing Lab
                </h1>
                <p className={`text-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Interactive exercises to master test automation frameworks
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full px-3 py-1">
                Selenium
              </span>
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs rounded-full px-3 py-1">
                Playwright
              </span>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full px-3 py-1">
                Java
              </span>
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs rounded-full px-3 py-1">
                JavaScript
              </span>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full px-3 py-1">
                Python
              </span>
              <span className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 text-xs rounded-full px-3 py-1">
                C#
              </span>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              <div className="md:col-span-5 lg:col-span-1">
                <UnifiedTabs
                  tabs={labSections}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                  variant="underlined"
                  fullWidth
                  contentClassName="hidden"
                  className="md:flex-col"
                />
                
                <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <h3 className="font-semibold mb-2">Lab Progress</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion</span>
                        <span>25%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exercises Completed</span>
                        <span>1/4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-5 lg:col-span-4">
                <Card className="bg-white dark:bg-gray-900">
                  <CardContent className="p-6">
                    {labSections.find(tab => tab.id === activeTab)?.content}
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}