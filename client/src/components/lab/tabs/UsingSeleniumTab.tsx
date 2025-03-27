import { useState } from 'react';
import { Zap, Search, Target, Clock, Star } from 'lucide-react';
import CodeExample from '@/components/ui/CodeExample';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export default function UsingSeleniumContent() {
  const { theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState('java');
  const [selectedExample, setSelectedExample] = useState('findElement');

  const languageOptions = [
    { name: 'Java', value: 'java' },
    { name: 'Python', value: 'python' },
    { name: 'JavaScript', value: 'javascript' },
    { name: 'C#', value: 'csharp' }
  ];

  const exampleOptions = [
    { name: 'Finding Elements', value: 'findElement', icon: <Search className="h-4 w-4" /> },
    { name: 'Element Interactions', value: 'elementInteractions', icon: <Zap className="h-4 w-4" /> },
    { name: 'Wait Strategies', value: 'waitStrategies', icon: <Clock className="h-4 w-4" /> },
    { name: 'Navigation', value: 'navigation', icon: <Target className="h-4 w-4" /> }
  ];

  // Example code snippets for each category
  const findElementCode = {
    java: `// Finding elements using different locator strategies
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import java.util.List;

public class FindElementsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        try {
            // Find element by ID
            WebElement elementById = driver.findElement(By.id("username"));
            
            // Find element by name
            WebElement elementByName = driver.findElement(By.name("password"));
            
            // Find element by class name
            WebElement elementByClass = driver.findElement(By.className("login-button"));
            
            // Find element by CSS selector
            WebElement elementByCss = driver.findElement(By.cssSelector(".form-group #username"));
            
            // Find element by XPath
            WebElement elementByXPath = driver.findElement(By.xpath("//button[contains(text(),'Log In')]"));
            
            // Find multiple elements (returns a list)
            List<WebElement> elements = driver.findElements(By.cssSelector(".product-item"));
            System.out.println("Found " + elements.size() + " product items");
            
        } finally {
            driver.quit();
        }
    }
}`,
    python: `# Finding elements using different locator strategies
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")

try:
    # Find element by ID
    element_by_id = driver.find_element(By.ID, "username")
    
    # Find element by name
    element_by_name = driver.find_element(By.NAME, "password")
    
    # Find element by class name
    element_by_class = driver.find_element(By.CLASS_NAME, "login-button")
    
    # Find element by CSS selector
    element_by_css = driver.find_element(By.CSS_SELECTOR, ".form-group #username")
    
    # Find element by XPath
    element_by_xpath = driver.find_element(By.XPATH, "//button[contains(text(),'Log In')]")
    
    # Find multiple elements (returns a list)
    elements = driver.find_elements(By.CSS_SELECTOR, ".product-item")
    print(f"Found {len(elements)} product items")
    
finally:
    driver.quit()`,
    javascript: `// Finding elements using different locator strategies
const { Builder, By } = require('selenium-webdriver');

(async function findElementsExample() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://example.com');
        
        // Find element by ID
        const elementById = await driver.findElement(By.id('username'));
        
        // Find element by name
        const elementByName = await driver.findElement(By.name('password'));
        
        // Find element by class name
        const elementByClass = await driver.findElement(By.className('login-button'));
        
        // Find element by CSS selector
        const elementByCss = await driver.findElement(By.css('.form-group #username'));
        
        // Find element by XPath
        const elementByXPath = await driver.findElement(By.xpath("//button[contains(text(),'Log In')]"));
        
        // Find multiple elements (returns a list)
        const elements = await driver.findElements(By.css('.product-item'));
        console.log("Found " + elements.length + " product items");
        
    } finally {
        await driver.quit();
    }
})();`,
    csharp: `// Finding elements using different locator strategies
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;

class FindElementsExample
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        driver.Navigate().GoToUrl("https://example.com");
        
        try
        {
            // Find element by ID
            IWebElement elementById = driver.FindElement(By.Id("username"));
            
            // Find element by name
            IWebElement elementByName = driver.FindElement(By.Name("password"));
            
            // Find element by class name
            IWebElement elementByClass = driver.FindElement(By.ClassName("login-button"));
            
            // Find element by CSS selector
            IWebElement elementByCss = driver.FindElement(By.CssSelector(".form-group #username"));
            
            // Find element by XPath
            IWebElement elementByXPath = driver.FindElement(By.XPath("//button[contains(text(),'Log In')]"));
            
            // Find multiple elements (returns a list)
            IReadOnlyCollection<IWebElement> elements = driver.FindElements(By.CssSelector(".product-item"));
            Console.WriteLine($"Found {elements.Count} product items");
        }
        finally
        {
            driver.Quit();
        }
    }
}`
  };

  const elementInteractionsCode = {
    java: `// Interacting with elements
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;

public class ElementInteractionsExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com/form");
        
        try {
            // Click on an element
            WebElement loginButton = driver.findElement(By.id("login"));
            loginButton.click();
            
            // Type text into an input field
            WebElement usernameField = driver.findElement(By.name("username"));
            usernameField.sendKeys("testuser123");
            
            // Clear a text field before typing
            WebElement searchField = driver.findElement(By.id("search"));
            searchField.clear();
            searchField.sendKeys("selenium testing");
            
            // Working with dropdown lists
            WebElement dropdown = driver.findElement(By.id("country"));
            Select selectCountry = new Select(dropdown);
            
            // Select by visible text
            selectCountry.selectByVisibleText("United States");
            
            // Select by value attribute
            selectCountry.selectByValue("US");
            
            // Select by index
            selectCountry.selectByIndex(1);
            
        } finally {
            driver.quit();
        }
    }
}`,
    python: `# Interacting with elements
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome()
driver.get("https://example.com/form")

try:
    # Click on an element
    login_button = driver.find_element(By.ID, "login")
    login_button.click()
    
    # Type text into an input field
    username_field = driver.find_element(By.NAME, "username")
    username_field.send_keys("testuser123")
    
    # Clear a text field before typing
    search_field = driver.find_element(By.ID, "search")
    search_field.clear()
    search_field.send_keys("selenium testing")
    
    # Working with dropdown lists
    dropdown = driver.find_element(By.ID, "country")
    select_country = Select(dropdown)
    
    # Select by visible text
    select_country.select_by_visible_text("United States")
    
    # Select by value attribute
    select_country.select_by_value("US")
    
    # Select by index
    select_country.select_by_index(1)
    
finally:
    driver.quit()`,
    javascript: `// Interacting with elements
const { Builder, By } = require('selenium-webdriver');

(async function elementInteractionsExample() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://example.com/form');
        
        // Click on an element
        const loginButton = await driver.findElement(By.id('login'));
        await loginButton.click();
        
        // Type text into an input field
        const usernameField = await driver.findElement(By.name('username'));
        await usernameField.sendKeys('testuser123');
        
        // Clear a text field before typing
        const searchField = await driver.findElement(By.id('search'));
        await searchField.clear();
        await searchField.sendKeys('selenium testing');
        
        // Working with dropdown lists
        const dropdown = await driver.findElement(By.id('country'));
        
        // Select by value attribute
        await dropdown.sendKeys('US');
        
    } finally {
        await driver.quit();
    }
})();`,
    csharp: `// Interacting with elements
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;

class ElementInteractionsExample
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        driver.Navigate().GoToUrl("https://example.com/form");
        
        try
        {
            // Click on an element
            IWebElement loginButton = driver.FindElement(By.Id("login"));
            loginButton.Click();
            
            // Type text into an input field
            IWebElement usernameField = driver.FindElement(By.Name("username"));
            usernameField.SendKeys("testuser123");
            
            // Clear a text field before typing
            IWebElement searchField = driver.FindElement(By.Id("search"));
            searchField.Clear();
            searchField.SendKeys("selenium testing");
            
            // Working with dropdown lists
            IWebElement dropdown = driver.FindElement(By.Id("country"));
            SelectElement selectCountry = new SelectElement(dropdown);
            
            // Select by visible text
            selectCountry.SelectByText("United States");
            
            // Select by value attribute
            selectCountry.SelectByValue("US");
            
            // Select by index
            selectCountry.SelectByIndex(1);
        }
        finally
        {
            driver.Quit();
        }
    }
}`
  };

  const waitStrategiesCode = {
    java: `// Wait strategies in Selenium
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;

public class WaitStrategiesExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        driver.get("https://example.com");
        
        try {
            // 1. Implicit Wait - applies to all element finds
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
            
            // 2. Explicit Wait - for a specific condition
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            
            // Wait until element is clickable
            WebElement loginButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.id("login"))
            );
            loginButton.click();
            
            // Wait until element is visible
            WebElement userPanel = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("user-panel"))
            );
            
            // Wait until element has specific text
            wait.until(
                ExpectedConditions.textToBePresentInElement(userPanel, "Welcome")
            );
            
        } finally {
            driver.quit();
        }
    }
}`,
    python: `# Wait strategies in Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("https://example.com")

try:
    # 1. Implicit Wait - applies to all element finds
    driver.implicitly_wait(10)  # seconds
    
    # 2. Explicit Wait - for a specific condition
    wait = WebDriverWait(driver, 20)  # seconds
    
    # Wait until element is clickable
    login_button = wait.until(
        EC.element_to_be_clickable((By.ID, "login"))
    )
    login_button.click()
    
    # Wait until element is visible
    user_panel = wait.until(
        EC.visibility_of_element_located((By.ID, "user-panel"))
    )
    
    # Wait until element has specific text
    wait.until(
        EC.text_to_be_present_in_element((By.ID, "user-panel"), "Welcome")
    )
    
finally:
    driver.quit()`,
    javascript: `// Wait strategies in Selenium
const { Builder, By, until } = require('selenium-webdriver');

(async function waitStrategiesExample() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        await driver.get('https://example.com');
        
        // 1. Implicit Wait - applies to all element finds
        await driver.manage().setTimeouts({ implicit: 10000 }); // 10 seconds
        
        // 2. Explicit Wait - for a specific condition
        
        // Wait until element is clickable
        const loginButton = await driver.wait(
            until.elementLocated(By.id('login')),
            20000 // 20 seconds timeout
        );
        
        // Also wait for it to be clickable
        await driver.wait(until.elementIsEnabled(loginButton), 10000);
        await loginButton.click();
        
        // Wait until element is visible
        const userPanel = await driver.wait(
            until.elementLocated(By.id('user-panel')),
            20000
        );
        
        // Wait until element contains specific text
        await driver.wait(
            until.elementTextContains(userPanel, 'Welcome'),
            10000
        );
        
    } finally {
        await driver.quit();
    }
})();`,
    csharp: `// Wait strategies in Selenium
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;
using System;
using SeleniumExtras.WaitHelpers;

class WaitStrategiesExample
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        driver.Navigate().GoToUrl("https://example.com");
        
        try
        {
            // 1. Implicit Wait - applies to all element finds
            driver.Manage().Timeouts().ImplicitWait = TimeSpan.FromSeconds(10);
            
            // 2. Explicit Wait - for a specific condition
            WebDriverWait wait = new WebDriverWait(driver, TimeSpan.FromSeconds(20));
            
            // Wait until element is clickable
            IWebElement loginButton = wait.Until(
                ExpectedConditions.ElementToBeClickable(By.Id("login"))
            );
            loginButton.Click();
            
            // Wait until element is visible
            IWebElement userPanel = wait.Until(
                ExpectedConditions.ElementIsVisible(By.Id("user-panel"))
            );
            
            // Wait until element has specific text
            wait.Until(
                ExpectedConditions.TextToBePresentInElement(userPanel, "Welcome")
            );
        }
        finally
        {
            driver.Quit();
        }
    }
}`
  };

  const navigationCode = {
    java: `// Navigation in Selenium
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class NavigationExample {
    public static void main(String[] args) {
        WebDriver driver = new ChromeDriver();
        
        try {
            // Basic navigation - open URL
            driver.get("https://example.com");
            
            // Alternative navigation method
            driver.navigate().to("https://example.com/about");
            
            // Browser navigation
            driver.navigate().back();      // Go back to previous page
            driver.navigate().forward();   // Go forward
            driver.navigate().refresh();   // Refresh current page
            
            // Get current URL and title
            String currentUrl = driver.getCurrentUrl();
            String pageTitle = driver.getTitle();
            
            System.out.println("Current URL: " + currentUrl);
            System.out.println("Page title: " + pageTitle);
            
        } finally {
            driver.quit();
        }
    }
}`,
    python: `# Navigation in Selenium
from selenium import webdriver

driver = webdriver.Chrome()

try:
    # Basic navigation - open URL
    driver.get("https://example.com")
    
    # Alternative navigation method
    driver.get("https://example.com/about")
    
    # Browser navigation
    driver.back()      # Go back to previous page
    driver.forward()   # Go forward
    driver.refresh()   # Refresh current page
    
    # Get current URL and title
    current_url = driver.current_url
    page_title = driver.title
    
    print(f"Current URL: {current_url}")
    print(f"Page title: {page_title}")
    
finally:
    driver.quit()`,
    javascript: `// Navigation in Selenium
const { Builder } = require('selenium-webdriver');

(async function navigationExample() {
    let driver = await new Builder().forBrowser('chrome').build();
    
    try {
        // Basic navigation - open URL
        await driver.get('https://example.com');
        
        // Alternative navigation method
        await driver.navigate().to('https://example.com/about');
        
        // Browser navigation
        await driver.navigate().back();      // Go back to previous page
        await driver.navigate().forward();   // Go forward
        await driver.navigate().refresh();   // Refresh current page
        
        // Get current URL and title
        const currentUrl = await driver.getCurrentUrl();
        const pageTitle = await driver.getTitle();
        
        console.log("Current URL: " + currentUrl);
        console.log("Page title: " + pageTitle);
        
    } finally {
        await driver.quit();
    }
})();`,
    csharp: `// Navigation in Selenium
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;

class NavigationExample
{
    static void Main()
    {
        IWebDriver driver = new ChromeDriver();
        
        try
        {
            // Basic navigation - open URL
            driver.Navigate().GoToUrl("https://example.com");
            
            // Alternative navigation method
            driver.Navigate().GoToUrl("https://example.com/about");
            
            // Browser navigation
            driver.Navigate().Back();      // Go back to previous page
            driver.Navigate().Forward();   // Go forward
            driver.Navigate().Refresh();   // Refresh current page
            
            // Get current URL and title
            string currentUrl = driver.Url;
            string pageTitle = driver.Title;
            
            Console.WriteLine($"Current URL: {currentUrl}");
            Console.WriteLine($"Page title: {pageTitle}");
        }
        finally
        {
            driver.Quit();
        }
    }
}`
  };

  // Helper function to get code based on selected example and language
  const getCodeForCurrentSelection = () => {
    switch (selectedExample) {
      case 'findElement':
        return findElementCode[selectedLanguage as keyof typeof findElementCode];
      case 'elementInteractions':
        return elementInteractionsCode[selectedLanguage as keyof typeof elementInteractionsCode];
      case 'waitStrategies':
        return waitStrategiesCode[selectedLanguage as keyof typeof waitStrategiesCode];
      case 'navigation':
        return navigationCode[selectedLanguage as keyof typeof navigationCode];
      default:
        return findElementCode[selectedLanguage as keyof typeof findElementCode];
    }
  };

  return (
    <div>
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Using Selenium WebDriver</h3>
        <p>
          Now that you've learned the basics of setting up Selenium and creating your first script, let's explore some essential Selenium WebDriver operations.
        </p>
      </div>

      {/* Topic selector */}
      <div className="mt-6 mb-8">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Select topic:</h4>
        <div className="flex flex-wrap gap-3">
          {exampleOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setSelectedExample(option.value)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center",
                selectedExample === option.value
                  ? "bg-gradient-to-r from-cyan-500 to-[#40E0D0] text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {option.icon}
              <span className="ml-2">{option.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Language selector */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Choose language:</h4>
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

      {/* Code Examples */}
      <div className="mb-8">
        <h4 className="text-lg font-medium mb-4 flex items-center">
          {exampleOptions.find(o => o.value === selectedExample)?.icon}
          <span className="ml-2">{exampleOptions.find(o => o.value === selectedExample)?.name}</span>
        </h4>
        
        <CodeExample
          examples={[
            {
              language: selectedLanguage,
              code: getCodeForCurrentSelection(),
              label: `${languageOptions.find(l => l.value === selectedLanguage)?.name} Example`
            }
          ]}
        />
      </div>

      {/* Quick Reference Section */}
      <div className={cn(
        "rounded-xl p-6 mb-8",
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
      )}>
        <h4 className="text-lg font-medium mb-3 flex items-center">
          <Star className="h-5 w-5 mr-2 text-yellow-500" />
          Quick Reference
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Locator Strategies</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">By.id()</code> - Find by id attribute</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">By.name()</code> - Find by name attribute</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">By.className()</code> - Find by CSS class</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">By.cssSelector()</code> - Find by CSS selector</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Element Actions</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.click()</code> - Click on element</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.sendKeys()</code> - Type text</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.clear()</code> - Clear input field</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.getText()</code> - Get visible text</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Best Practices */}
      <div className={cn(
        "rounded-xl p-6 border-l-4 border-green-500",
        theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
      )}>
        <h4 className="text-lg font-medium mb-3 text-green-800 dark:text-green-300">Best Practices</h4>
        
        <ul className="space-y-3 text-green-700 dark:text-green-300">
          <li>
            <strong>Use explicit waits</strong> instead of Thread.sleep() or implicitlyWait() for more reliable tests.
          </li>
          <li>
            <strong>Prefer CSS selectors or ID locators</strong> over XPath for better performance when possible.
          </li>
          <li>
            <strong>Always clean up your WebDriver resources</strong> with try/finally blocks and driver.quit().
          </li>
          <li>
            <strong>Implement the Page Object Model</strong> pattern for more maintainable test code (covered in advanced modules).
          </li>
        </ul>
      </div>
    </div>
  );
}