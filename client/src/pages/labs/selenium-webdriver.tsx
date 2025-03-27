import { useTheme } from "@/contexts/ThemeContext";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import UnifiedTabs, { TabItem } from "@/components/ui/UnifiedTabs";
import { SiSelenium, SiJavascript, SiJava, SiPython, SiCsharp } from "@/components/IconImports";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { BsDownload, BsPlayFill, BsCheck2, BsBriefcase, BsBoxArrowUpRight, BsCodeSlash, BsGear } from "react-icons/bs";
import { cn } from "@/lib/utils";
import CodeExample from "@/components/ui/CodeExample";

// Code examples for different languages
const seleniumJavaCode = `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class SeleniumWebDriverDemo {
    public static void main(String[] args) {
        // Set path to ChromeDriver (or use WebDriverManager)
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        
        // Create ChromeOptions instance
        ChromeOptions options = new ChromeOptions();
        
        // Initialize ChromeDriver
        WebDriver driver = new ChromeDriver(options);
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        
        try {
            // Navigate to Google
            driver.get("https://www.google.com");
            
            // Accept cookies if present
            try {
                WebElement acceptButton = wait.until(
                    ExpectedConditions.elementToBeClickable(
                        By.xpath("//button[contains(., 'Accept all')]")
                    )
                );
                acceptButton.click();
            } catch (Exception e) {
                // Cookie dialog may not appear in all regions
                System.out.println("Cookie dialog not found or already accepted");
            }
            
            // Find search box and enter text
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver tutorials");
            
            // Submit search form
            searchBox.submit();
            
            // Wait for search results to load
            wait.until(ExpectedConditions.titleContains("Selenium WebDriver"));
            
            // Print title and URL
            System.out.println("Page title: " + driver.getTitle());
            System.out.println("Current URL: " + driver.getCurrentUrl());
            
            // Click on the first result
            WebElement firstResult = wait.until(
                ExpectedConditions.elementToBeClickable(
                    By.cssSelector("h3")
                )
            );
            firstResult.click();
            
            // Wait for page to load and print new title
            wait.until(ExpectedConditions.not(
                ExpectedConditions.titleContains("Google Search")
            ));
            System.out.println("New page title: " + driver.getTitle());
            
        } finally {
            // Close the browser
            driver.quit();
        }
    }
}`;

const seleniumPythonCode = `from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException

# Set path to ChromeDriver
webdriver_service = Service('path/to/chromedriver')

# Initialize the driver
driver = webdriver.Chrome(service=webdriver_service)
wait = WebDriverWait(driver, 10)

try:
    # Navigate to Google
    driver.get("https://www.google.com")
    
    # Accept cookies if present
    try:
        accept_button = wait.until(
            EC.element_to_be_clickable(
                (By.XPATH, "//button[contains(., 'Accept all')]")
            )
        )
        accept_button.click()
    except TimeoutException:
        # Cookie dialog may not appear in all regions
        print("Cookie dialog not found or already accepted")
    
    # Find search box and enter text
    search_box = driver.find_element(By.NAME, "q")
    search_box.send_keys("Selenium WebDriver tutorials")
    
    # Submit search form
    search_box.submit()
    
    # Wait for search results to load
    wait.until(EC.title_contains("Selenium WebDriver"))
    
    # Print title and URL
    print(f"Page title: {driver.title}")
    print(f"Current URL: {driver.current_url}")
    
    # Click on the first result
    first_result = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "h3")
        )
    )
    first_result.click()
    
    # Wait for page to load and print new title
    wait.until(EC.not_(
        EC.title_contains("Google Search")
    ))
    print(f"New page title: {driver.title}")
    
finally:
    # Close the browser
    driver.quit()`;

const seleniumJsCode = `const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runSeleniumTest() {
  // Initialize the driver
  let driver = await new Builder()
    .forBrowser('chrome')
    .build();
    
  try {
    // Navigate to Google
    await driver.get('https://www.google.com');
    
    // Accept cookies if present
    try {
      const acceptButton = await driver.wait(
        until.elementLocated(By.xpath("//button[contains(., 'Accept all')]")),
        5000
      );
      await acceptButton.click();
    } catch (error) {
      // Cookie dialog may not appear in all regions
      console.log("Cookie dialog not found or already accepted");
    }
    
    // Find search box and enter text
    const searchBox = await driver.findElement(By.name('q'));
    await searchBox.sendKeys('Selenium WebDriver tutorials');
    
    // Submit search form
    await searchBox.sendKeys(Key.RETURN);
    
    // Wait for search results to load
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
    
    // Print title and URL
    const title = await driver.getTitle();
    const url = await driver.getCurrentUrl();
    console.log(`Page title: ${title}`);
    console.log(`Current URL: ${url}`);
    
    // Click on the first result
    const firstResult = await driver.wait(
      until.elementLocated(By.css('h3')),
      5000
    );
    await firstResult.click();
    
    // Wait for page to load and print new title
    await driver.wait(
      until.not(until.titleContains('Google Search')),
      5000
    );
    const newTitle = await driver.getTitle();
    console.log(`New page title: ${newTitle}`);
    
  } finally {
    // Close the browser
    await driver.quit();
  }
}

runSeleniumTest().catch(error => console.error(error));`;

const seleniumCSharpCode = `using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class SeleniumWebDriverDemo
{
    static void Main()
    {
        // Initialize the driver
        var driver = new ChromeDriver();
        var wait = new WebDriverWait(driver, TimeSpan.FromSeconds(10));
        
        try
        {
            // Navigate to Google
            driver.Navigate().GoToUrl("https://www.google.com");
            
            // Accept cookies if present
            try
            {
                var acceptButton = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(
                    By.XPath("//button[contains(., 'Accept all')]")
                ));
                acceptButton.Click();
            }
            catch (WebDriverTimeoutException)
            {
                // Cookie dialog may not appear in all regions
                Console.WriteLine("Cookie dialog not found or already accepted");
            }
            
            // Find search box and enter text
            var searchBox = driver.FindElement(By.Name("q"));
            searchBox.SendKeys("Selenium WebDriver tutorials");
            
            // Submit search form
            searchBox.Submit();
            
            // Wait for search results to load
            wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.TitleContains("Selenium WebDriver"));
            
            // Print title and URL
            Console.WriteLine($"Page title: {driver.Title}");
            Console.WriteLine($"Current URL: {driver.Url}");
            
            // Click on the first result
            var firstResult = wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.ElementToBeClickable(
                By.CssSelector("h3")
            ));
            firstResult.Click();
            
            // Wait for page to load and print new title
            wait.Until(SeleniumExtras.WaitHelpers.ExpectedConditions.Not(
                SeleniumExtras.WaitHelpers.ExpectedConditions.TitleContains("Google Search")
            ));
            Console.WriteLine($"New page title: {driver.Title}");
        }
        finally
        {
            // Close the browser
            driver.Quit();
        }
    }
}`;

// Page Object Model example
const pageObjectModelCode = `// LoginPage.java
public class LoginPage {
    private WebDriver driver;
    
    // Locators
    private By usernameField = By.id("username");
    private By passwordField = By.id("password");
    private By loginButton = By.id("loginButton");
    private By errorMessage = By.className("error-message");
    
    // Constructor
    public LoginPage(WebDriver driver) {
        this.driver = driver;
    }
    
    // Methods
    public void enterUsername(String username) {
        driver.findElement(usernameField).sendKeys(username);
    }
    
    public void enterPassword(String password) {
        driver.findElement(passwordField).sendKeys(password);
    }
    
    public DashboardPage clickLoginButton() {
        driver.findElement(loginButton).click();
        return new DashboardPage(driver);
    }
    
    public LoginPage clickLoginButtonExpectingError() {
        driver.findElement(loginButton).click();
        return this;
    }
    
    public String getErrorMessage() {
        return driver.findElement(errorMessage).getText();
    }
    
    // Combined method for login
    public DashboardPage login(String username, String password) {
        enterUsername(username);
        enterPassword(password);
        return clickLoginButton();
    }
}

// DashboardPage.java
public class DashboardPage {
    private WebDriver driver;
    
    // Locators
    private By welcomeMessage = By.className("welcome-message");
    private By logoutButton = By.id("logoutButton");
    
    // Constructor
    public DashboardPage(WebDriver driver) {
        this.driver = driver;
        // Verify that we're on the right page
        if (!driver.getTitle().contains("Dashboard")) {
            throw new IllegalStateException("This is not the dashboard page");
        }
    }
    
    // Methods
    public String getWelcomeMessage() {
        return driver.findElement(welcomeMessage).getText();
    }
    
    public LoginPage logout() {
        driver.findElement(logoutButton).click();
        return new LoginPage(driver);
    }
}

// TestClass.java
public class LoginTest {
    private WebDriver driver;
    
    @BeforeMethod
    public void setUp() {
        System.setProperty("webdriver.chrome.driver", "path/to/chromedriver");
        driver = new ChromeDriver();
        driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
    }
    
    @Test
    public void testValidLogin() {
        driver.get("https://example.com/login");
        
        LoginPage loginPage = new LoginPage(driver);
        DashboardPage dashboardPage = loginPage.login("testuser", "password");
        
        Assert.assertEquals(dashboardPage.getWelcomeMessage(), "Welcome, Test User!");
    }
    
    @Test
    public void testInvalidLogin() {
        driver.get("https://example.com/login");
        
        LoginPage loginPage = new LoginPage(driver);
        loginPage = loginPage.clickLoginButtonExpectingError();
        
        Assert.assertEquals(loginPage.getErrorMessage(), "Username and password are required");
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;

// Waits and synchronization code
const waitsAndSynchronizationCode = `// Implicit wait example
driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

// Explicit wait examples
WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

// Wait for element to be clickable
WebElement element = wait.until(
    ExpectedConditions.elementToBeClickable(By.id("myButton"))
);

// Wait for element to be visible
WebElement element = wait.until(
    ExpectedConditions.visibilityOfElementLocated(By.id("myElement"))
);

// Wait for element to be invisible
wait.until(
    ExpectedConditions.invisibilityOfElementLocated(By.id("loadingSpinner"))
);

// Wait for text to be present in element
wait.until(
    ExpectedConditions.textToBePresentInElementLocated(
        By.id("message"), "Success"
    )
);

// Wait for title to contain text
wait.until(
    ExpectedConditions.titleContains("Dashboard")
);

// Wait for URL to contain text
wait.until(
    ExpectedConditions.urlContains("/dashboard")
);

// FluentWait example
Wait<WebDriver> fluentWait = new FluentWait<>(driver)
    .withTimeout(Duration.ofSeconds(30))
    .pollingEvery(Duration.ofMillis(500))
    .ignoring(NoSuchElementException.class);

WebElement element = fluentWait.until(driver -> {
    return driver.findElement(By.id("dynamicElement"));
});`;

// Define the lab content with sections
const labSections: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <BsBriefcase className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Selenium WebDriver Lab</h2>
        <p className="text-lg">
          Welcome to the Selenium WebDriver Lab! This interactive tutorial will guide you through using 
          Selenium WebDriver, the industry standard for browser-based test automation. You'll learn how 
          to set up Selenium WebDriver, write tests in various languages, and implement advanced patterns 
          for maintainable test automation.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">What You'll Learn</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Setting up Selenium WebDriver in your preferred programming language</li>
          <li>Locating elements using various selector strategies</li>
          <li>Writing robust tests that handle synchronization issues</li>
          <li>Implementing the Page Object Model pattern</li>
          <li>Working with complex elements like dropdowns, alerts, and frames</li>
          <li>Managing test data and capturing screenshots</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Prerequisites</h3>
        <p>
          Basic programming knowledge in at least one of the supported languages (Java, Python, JavaScript, or C#).
          No prior automation experience is necessary, but familiarity with HTML and CSS will be helpful.
        </p>
        
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-blue-800 dark:text-blue-200 mt-6">
          <p className="text-sm">
            <strong>Note:</strong> This lab contains interactive exercises that you can complete in your own 
            development environment. Installation instructions are provided for each language.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "installation",
    label: "Installation",
    icon: <BsDownload className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Setting Up Selenium WebDriver</h2>
        <p>
          To get started with Selenium WebDriver, you'll need to set up the WebDriver library in your 
          programming language of choice and download the appropriate browser driver.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Choose Your Language</h3>
        <p>Select your preferred programming language to see installation instructions:</p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "java",
              label: "Java",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Java Setup</h3>
                  <p>Add the following dependencies to your Maven or Gradle project:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`<!-- Maven -->
<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>4.12.1</version>
</dependency>

<!-- WebDriverManager (optional but recommended) -->
<dependency>
    <groupId>io.github.bonigarcia</groupId>
    <artifactId>webdrivermanager</artifactId>
    <version>5.5.3</version>
</dependency>

// Gradle
implementation 'org.seleniumhq.selenium:selenium-java:4.12.1'
implementation 'io.github.bonigarcia:webdrivermanager:5.5.3'`}
                  </pre>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">WebDriverManager</h4>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      WebDriverManager is a library that automates the management of the drivers required by Selenium WebDriver. 
                      It detects the browser version and downloads the appropriate driver automatically.
                    </p>
                    <pre className="bg-yellow-50 dark:bg-yellow-900/50 p-2 rounded mt-2 text-sm">
                      {`// Using WebDriverManager
import io.github.bonigarcia.wdm.WebDriverManager;

// Setup Chrome driver
WebDriverManager.chromedriver().setup();
WebDriver driver = new ChromeDriver();`}
                    </pre>
                  </div>
                </div>
              )
            },
            {
              id: "python",
              label: "Python",
              icon: <SiPython className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Python Setup</h3>
                  <p>Install Selenium using pip:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`pip install selenium
pip install webdriver-manager  # Optional but recommended`}
                  </pre>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">webdriver-manager</h4>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      The webdriver-manager package for Python helps you manage browser drivers automatically:
                    </p>
                    <pre className="bg-yellow-50 dark:bg-yellow-900/50 p-2 rounded mt-2 text-sm">
                      {`from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.service import Service

# Setup Chrome driver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service)`}
                    </pre>
                  </div>
                </div>
              )
            },
            {
              id: "javascript",
              label: "JavaScript",
              icon: <SiJavascript className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">JavaScript (Node.js) Setup</h3>
                  <p>Install Selenium WebDriver and other dependencies using npm:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`npm install selenium-webdriver
npm install chromedriver geckodriver
npm install @wdio/selenium-standalone-service  # Optional but recommended`}
                  </pre>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Using WebDriver with Node.js</h4>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      Basic setup for a Selenium test in JavaScript:
                    </p>
                    <pre className="bg-yellow-50 dark:bg-yellow-900/50 p-2 rounded mt-2 text-sm">
                      {`const { Builder, By, Key, until } = require('selenium-webdriver');
require('chromedriver');  // This registers the Chrome driver

async function runTest() {
  const driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get('https://www.example.com');
    // Rest of your test code
  } finally {
    await driver.quit();
  }
}

runTest();`}
                    </pre>
                  </div>
                </div>
              )
            },
            {
              id: "csharp",
              label: "C#",
              icon: <SiCsharp className="mr-2 h-4 w-4" />,
              content: (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">C# (.NET) Setup</h3>
                  <p>Add the following NuGet packages to your project:</p>
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`# Using Package Manager Console
Install-Package Selenium.WebDriver
Install-Package Selenium.Support
Install-Package WebDriverManager  # Optional but recommended
Install-Package DotNetSeleniumExtras.WaitHelpers  # For ExpectedConditions`}
                  </pre>
                  
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-lg mt-4">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">Using WebDriverManager in C#</h4>
                    <p className="text-yellow-800 dark:text-yellow-300">
                      The WebDriverManager NuGet package helps with driver management:
                    </p>
                    <pre className="bg-yellow-50 dark:bg-yellow-900/50 p-2 rounded mt-2 text-sm">
                      {`using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using WebDriverManager;
using WebDriverManager.DriverConfigs.Impl;

class Program {
    static void Main() {
        // Setup Chrome driver
        new DriverManager().SetUpDriver(new ChromeConfig());
        IWebDriver driver = new ChromeDriver();
        
        driver.Navigate().GoToUrl("https://www.example.com");
        // Rest of your test code
        
        driver.Quit();
    }
}`}
                    </pre>
                  </div>
                </div>
              )
            }
          ]}
          variant="pills"
        />
        
        <h3 className="text-xl font-semibold mt-8">Browser Drivers</h3>
        <p>
          If you're not using a driver manager library, you'll need to download the appropriate driver for your browser:
        </p>
        <ul className="mt-4 space-y-3">
          <li>
            <a 
              href="https://googlechromelabs.github.io/chrome-for-testing/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              ChromeDriver (Google Chrome)
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/mozilla/geckodriver/releases" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              GeckoDriver (Mozilla Firefox)
            </a>
          </li>
          <li>
            <a 
              href="https://developer.microsoft.com/en-us/microsoft-edge/tools/webdriver/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              EdgeDriver (Microsoft Edge)
            </a>
          </li>
          <li>
            <a 
              href="https://webkit.org/blog/6900/webdriver-support-in-safari-10/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              SafariDriver (Safari)
            </a>
          </li>
        </ul>
        
        <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 text-green-800 dark:text-green-200 mt-6">
          <h4 className="font-semibold">Installation Verification</h4>
          <p>
            After setting up Selenium and your browser driver, verify your installation by running a simple test:
          </p>
          <ol className="list-decimal pl-6 space-y-2 mt-2">
            <li>Create a new project in your preferred IDE</li>
            <li>Add the Selenium dependencies</li>
            <li>Copy the example code from the "First Steps" section</li>
            <li>Run the test to ensure everything is working correctly</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: "first-steps",
    label: "First Steps",
    icon: <BsPlayFill className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Your First Selenium WebDriver Test</h2>
        <p>
          Let's start with a simple example that demonstrates how to use Selenium WebDriver to automate a basic 
          web interaction. This example will open Google, search for a term, and click on the first search result.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Sample Code</h3>
        <p>Choose your preferred language:</p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "java-code",
              label: "Java",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              code: seleniumJavaCode
            },
            {
              id: "python-code",
              label: "Python",
              icon: <SiPython className="mr-2 h-4 w-4" />,
              code: seleniumPythonCode
            },
            {
              id: "js-code",
              label: "JavaScript",
              icon: <SiJavascript className="mr-2 h-4 w-4" />,
              code: seleniumJsCode
            },
            {
              id: "csharp-code",
              label: "C#",
              icon: <SiCsharp className="mr-2 h-4 w-4" />,
              code: seleniumCSharpCode
            }
          ]}
          variant="terminal"
          title="First Selenium WebDriver Test"
          description="This example demonstrates a simple Google search automation."
          showCopyButton={true}
        />
        
        <h3 className="text-xl font-semibold mt-8">Code Breakdown</h3>
        <div className="space-y-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">1. Browser Setup</h4>
            <p>
              First, we initialize the WebDriver for the Chrome browser. This code will launch a new browser window 
              that will be controlled by our automation script.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">2. Navigation</h4>
            <p>
              We navigate to Google using the <code className="text-pink-600 dark:text-pink-400">get()</code> method, 
              which is equivalent to typing a URL in the browser's address bar and pressing Enter.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">3. Interacting with Elements</h4>
            <p>
              We locate the search input field using different locator strategies (like <code className="text-pink-600 dark:text-pink-400">By.name</code>), 
              enter our search term, and submit the form.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">4. Waits</h4>
            <p>
              We use explicit waits to ensure that elements are present before interacting with them, which helps make 
              our tests more reliable and less prone to timing issues.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">5. Cleanup</h4>
            <p>
              Finally, we close the browser using <code className="text-pink-600 dark:text-pink-400">quit()</code>. This is important to prevent 
              "browser leaks" that can consume system resources.
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Exercise: Modify the Script</h3>
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Task</h4>
          <p className="text-green-800 dark:text-green-300">
            Modify the example code to:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Search for "Selenium WebDriver tutorials" on Google</li>
            <li>Extract and print the titles of the first 5 search results</li>
            <li>Take a screenshot of the search results page</li>
          </ol>
          <p className="text-green-800 dark:text-green-300 mt-2">
            This exercise will help you practice element location, data extraction, and screenshot capabilities.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "locators",
    label: "Element Locators",
    icon: <BsCodeSlash className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Finding Elements on the Page</h2>
        <p>
          One of the most important aspects of Selenium WebDriver is locating elements on a web page. 
          Selenium provides multiple strategies for element location, each with its own advantages 
          and use cases.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Common Locator Strategies</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">ID</h4>
            <p className="mb-3 text-sm">
              Locates elements by their ID attribute. This is the most reliable and efficient locator if IDs are available.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.id("username"));

# Python
driver.find_element(By.ID, "username")

// JavaScript
driver.findElement(By.id("username"));

// C#
driver.FindElement(By.Id("username"));`}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">Name</h4>
            <p className="mb-3 text-sm">
              Locates elements by their name attribute. Commonly used for form fields.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.name("email"));

# Python
driver.find_element(By.NAME, "email")

// JavaScript
driver.findElement(By.name("email"));

// C#
driver.FindElement(By.Name("email"));`}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">CSS Selector</h4>
            <p className="mb-3 text-sm">
              Powerful and versatile. Preferred over XPath for its better performance and readability.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.cssSelector(".login-form input[type='submit']"));

# Python
driver.find_element(By.CSS_SELECTOR, ".login-form input[type='submit']")

// JavaScript
driver.findElement(By.css(".login-form input[type='submit']"));

// C#
driver.FindElement(By.CssSelector(".login-form input[type='submit']"));`}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">XPath</h4>
            <p className="mb-3 text-sm">
              Versatile but sometimes complex. Can traverse up and down the DOM tree.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.xpath("//button[contains(text(), 'Submit')]"));

# Python
driver.find_element(By.XPATH, "//button[contains(text(), 'Submit')]")

// JavaScript
driver.findElement(By.xpath("//button[contains(text(), 'Submit')]"));

// C#
driver.FindElement(By.XPath("//button[contains(text(), 'Submit')]"));`}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">Link Text</h4>
            <p className="mb-3 text-sm">
              Locates links by their exact text content.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.linkText("Sign Up"));

# Python
driver.find_element(By.LINK_TEXT, "Sign Up")

// JavaScript
driver.findElement(By.linkText("Sign Up"));

// C#
driver.FindElement(By.LinkText("Sign Up"));`}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold text-lg mb-2">Partial Link Text</h4>
            <p className="mb-3 text-sm">
              Locates links that contain the specified text.
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded-lg overflow-x-auto text-xs">
              {`// Java
driver.findElement(By.partialLinkText("Sign"));

# Python
driver.find_element(By.PARTIAL_LINK_TEXT, "Sign")

// JavaScript
driver.findElement(By.partialLinkText("Sign"));

// C#
driver.FindElement(By.PartialLinkText("Sign"));`}
            </pre>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Finding Multiple Elements</h3>
        <p>
          Sometimes you need to find multiple elements that match a certain criteria:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-4">
          {`// Java
List<WebElement> links = driver.findElements(By.tagName("a"));

# Python
links = driver.find_elements(By.TAG_NAME, "a")

// JavaScript
const links = await driver.findElements(By.css("a"));

// C#
var links = driver.FindElements(By.TagName("a"));`}
        </pre>
        
        <h3 className="text-xl font-semibold mt-8">Tips for Robust Locators</h3>
        <ol className="list-decimal space-y-2 pl-6 mt-4">
          <li>
            <strong>Prefer IDs and names when available</strong> - They're faster and more stable than other locators.
          </li>
          <li>
            <strong>Use CSS selectors over XPath</strong> - They're generally faster and easier to read.
          </li>
          <li>
            <strong>Avoid brittle locators</strong> - Don't rely on position-based selectors like <code className="text-pink-600 dark:text-pink-400">nth-child</code> if possible.
          </li>
          <li>
            <strong>Build resilient selectors</strong> - Use multiple attributes to create robust selectors (e.g., <code className="text-pink-600 dark:text-pink-400">input[type='submit'][value='Login']</code>).
          </li>
          <li>
            <strong>Test your locators</strong> - Use browser developer tools to verify your selectors before using them in code.
          </li>
        </ol>
        
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Exercise</h4>
          <p className="text-green-800 dark:text-green-300">
            Open a website of your choice and practice finding elements using different locator strategies:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Find a form field by ID</li>
            <li>Find a button using a CSS selector</li>
            <li>Find all links on the page</li>
            <li>Find an element using XPath based on its text content</li>
            <li>Create a locator that uses multiple attributes for better reliability</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: "patterns",
    label: "Design Patterns",
    icon: <BsGear className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Test Automation Design Patterns</h2>
        <p>
          As your automation suite grows, it's important to organize your code following best practices 
          and established design patterns. This makes your tests more maintainable, readable, and robust.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Page Object Model (POM)</h3>
        <p>
          The Page Object Model is a design pattern that creates an object repository for storing all web elements. 
          It helps reduce code duplication and improves test maintenance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <h4 className="font-semibold mb-4">Key Principles of POM:</h4>
            <ul className="list-disc pl-6 space-y-2">
              <li>Represent each page as a class</li>
              <li>Encapsulate page elements as private fields</li>
              <li>Expose methods that perform actions on the page</li>
              <li>Return the next page object when navigating</li>
              <li>Keep assertions in test classes, not page objects</li>
            </ul>
            
            <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg mt-6">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">Benefits of POM</h4>
              <ul className="list-disc pl-6 space-y-1 text-blue-800 dark:text-blue-300 text-sm mt-2">
                <li>Reduces impact of UI changes</li>
                <li>Improves code reusability</li>
                <li>Makes tests more readable</li>
                <li>Separates test logic from page interactions</li>
                <li>Simplifies maintenance</li>
              </ul>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Page Object Model Structure:</h4>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-xs overflow-x-auto">
                {`Project
├── src/main/java
│   └── pages
│       ├── BasePage.java       # Common functionality
│       ├── LoginPage.java      # Login page elements & methods
│       ├── DashboardPage.java  # Dashboard page elements & methods
│       └── ...
└── src/test/java
    └── tests
        ├── BaseTest.java       # Setup/teardown
        ├── LoginTest.java      # Login test cases 
        └── ...`}
              </pre>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Page Object Model Example</h3>
        <UnifiedTabs 
          tabs={[
            {
              id: "pom-example",
              label: "Page Object Example",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              code: pageObjectModelCode
            }
          ]}
          variant="terminal"
          title="Page Object Model Implementation"
          description="Example of a login flow using the Page Object Model pattern"
          showCopyButton={true}
        />
        
        <h3 className="text-xl font-semibold mt-8">Waits and Synchronization</h3>
        <p>
          Proper synchronization is crucial for reliable test automation. Selenium provides different types 
          of waits to handle timing issues.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Implicit Waits</h4>
            <p className="text-sm">
              Sets a default wait time for the entire WebDriver instance. The driver will wait for elements 
              for the specified duration before throwing a NoSuchElementException.
            </p>
            <div className="mt-2 text-amber-600 dark:text-amber-400 text-xs">
              Best for simple scripts, but can lead to unnecessary waiting.
            </div>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Explicit Waits</h4>
            <p className="text-sm">
              Waits for a specific condition to be true before proceeding. More flexible and efficient 
              than implicit waits.
            </p>
            <div className="mt-2 text-green-600 dark:text-green-400 text-xs">
              Recommended for most scenarios.
            </div>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Fluent Waits</h4>
            <p className="text-sm">
              A more configurable version of explicit waits. Allows setting polling interval, timeout, 
              and exceptions to ignore.
            </p>
            <div className="mt-2 text-blue-600 dark:text-blue-400 text-xs">
              Best for complex waiting scenarios.
            </div>
          </Card>
        </div>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "waits-example",
              label: "Waits and Synchronization",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              code: waitsAndSynchronizationCode
            }
          ]}
          variant="terminal"
          title="Waits and Synchronization Examples"
          description="Different ways to handle timing and synchronization in Selenium WebDriver"
          showCopyButton={true}
        />
        
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-8">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Exercise</h4>
          <p className="text-green-800 dark:text-green-300">
            Try implementing the Page Object Model for a simple workflow:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Create page objects for at least two pages (e.g., Home and Login)</li>
            <li>Implement methods for common actions on each page</li>
            <li>Write a test that uses these page objects to complete a workflow</li>
            <li>Use explicit waits for proper synchronization</li>
          </ol>
          <p className="text-green-800 dark:text-green-300 mt-2">
            This exercise will help you understand how to structure maintainable test automation code.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "resources",
    label: "Resources",
    icon: <BsCheck2 className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Additional Resources</h2>
        <p>
          Continue your Selenium WebDriver learning journey with these helpful resources:
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Official Documentation</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <a 
              href="https://www.selenium.dev/documentation/webdriver/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium WebDriver Documentation
            </a>
          </li>
          <li>
            <a 
              href="https://www.selenium.dev/selenium/docs/api/java/overview-summary.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Java API Documentation
            </a>
          </li>
          <li>
            <a 
              href="https://www.selenium.dev/selenium/docs/api/py/api.html" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Python API Documentation
            </a>
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Books</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <strong>Selenium WebDriver Practical Guide</strong> - Packt Publishing
          </li>
          <li>
            <strong>Selenium WebDriver 4 with Java</strong> - Apress
          </li>
          <li>
            <strong>Test Automation Using Selenium WebDriver</strong> - Packt Publishing
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Online Courses</h3>
        <p>Deepen your knowledge with comprehensive online courses:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold">Selenium WebDriver with Java</h4>
            <p className="text-sm mt-2">
              Master Selenium WebDriver using Java with practical examples and real-world scenarios.
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Duration: 15 hours • Level: Beginner to Intermediate
            </div>
            <div className="mt-2">
              <Link href="/courses/selenium-java">
                <Button variant="link" className="p-0">
                  View Course
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold">Selenium WebDriver with Python</h4>
            <p className="text-sm mt-2">
              Learn how to build a complete test automation framework using Selenium with Python.
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Duration: 12 hours • Level: Beginner to Intermediate
            </div>
            <div className="mt-2">
              <Link href="/courses/selenium-python">
                <Button variant="link" className="p-0">
                  View Course
                </Button>
              </Link>
            </div>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Community and Support</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <a 
              href="https://stackoverflow.com/questions/tagged/selenium" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Stack Overflow - Selenium Tag
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/SeleniumHQ/selenium" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium GitHub Repository
            </a>
          </li>
          <li>
            <a 
              href="https://selenium.dev/blog/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Official Blog
            </a>
          </li>
        </ul>
        
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Next Steps</h3>
          <p className="text-blue-800 dark:text-blue-300 mt-2">
            Now that you've completed the Selenium WebDriver lab, consider:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-300 mt-4">
            <li>Taking one of our comprehensive Selenium courses</li>
            <li>Exploring our Selenium Grid lab to learn about distributed testing</li>
            <li>Practicing by creating a complete test automation framework</li>
            <li>Learning advanced topics like API testing with RestAssured</li>
          </ul>
          <div className="mt-6">
            <Link href="/labs">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Explore More Labs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
];

export default function SeleniumWebDriverLab() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout title="Selenium WebDriver Lab - Quality Sensei" description="Learn Selenium WebDriver with hands-on exercises covering element location, synchronization, and design patterns.">
      <div className="pt-20 pb-24">
        <div className="container mx-auto px-4">
          <Link href="/labs">
            <Button variant="ghost" className="mb-8">
              <FiArrowLeft className="mr-2" />
              Back to Labs
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              <SiSelenium className="inline-block mr-4 text-[#43B02A] h-12 w-12" />
              Selenium WebDriver Lab
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Master browser automation with Selenium WebDriver through practical, hands-on exercises.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full px-3 py-1">
                Browser Automation
              </span>
              <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs rounded-full px-3 py-1">
                Java
              </span>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full px-3 py-1">
                Python
              </span>
              <span className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 text-xs rounded-full px-3 py-1">
                JavaScript
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
                        <span>0%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500" style={{ width: '0%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Exercises Completed</span>
                        <span>0/4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-5 lg:col-span-4">
                <Card className={cn("bg-white dark:bg-gray-900", theme === 'dark' ? 'border-gray-800' : 'border-gray-200')}>
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