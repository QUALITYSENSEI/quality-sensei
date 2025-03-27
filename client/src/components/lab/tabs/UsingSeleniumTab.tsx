import { useState } from 'react';
import { motion } from 'framer-motion';
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

  // Example code snippets for each category/language combination
  const examples = {
    findElement: {
      java: `// Finding elements using different locator strategies
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

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
            
            // Find element by link text
            WebElement elementByLinkText = driver.findElement(By.linkText("Forgot Password?"));
            
            // Find element by partial link text
            WebElement elementByPartialLinkText = driver.findElement(By.partialLinkText("Forgot"));
            
            // Find element by tag name
            WebElement elementByTagName = driver.findElement(By.tagName("button"));
            
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
    
    # Find element by link text
    element_by_link_text = driver.find_element(By.LINK_TEXT, "Forgot Password?")
    
    # Find element by partial link text
    element_by_partial_link_text = driver.find_element(By.PARTIAL_LINK_TEXT, "Forgot")
    
    # Find element by tag name
    element_by_tag_name = driver.find_element(By.TAG_NAME, "button")
    
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
        
        // Find element by link text
        const elementByLinkText = await driver.findElement(By.linkText('Forgot Password?'));
        
        // Find element by partial link text
        const elementByPartialLinkText = await driver.findElement(By.partialLinkText('Forgot'));
        
        // Find element by tag name
        const elementByTagName = await driver.findElement(By.tagName('button'));
        
        // Find multiple elements (returns a list)
        const elements = await driver.findElements(By.css('.product-item'));
        console.log(`Found ${elements.length} product items`);
        
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
            
            // Find element by link text
            IWebElement elementByLinkText = driver.FindElement(By.LinkText("Forgot Password?"));
            
            // Find element by partial link text
            IWebElement elementByPartialLinkText = driver.FindElement(By.PartialLinkText("Forgot"));
            
            // Find element by tag name
            IWebElement elementByTagName = driver.FindElement(By.TagName("button"));
            
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
    },
    elementInteractions: {
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
            
            // Submit a form
            WebElement form = driver.findElement(By.id("login-form"));
            form.submit();
            
            // Check/uncheck a checkbox
            WebElement checkbox = driver.findElement(By.name("remember-me"));
            if (!checkbox.isSelected()) {
                checkbox.click(); // Check the checkbox
            }
            
            // Working with dropdown lists
            WebElement dropdown = driver.findElement(By.id("country"));
            Select selectCountry = new Select(dropdown);
            
            // Select by visible text
            selectCountry.selectByVisibleText("United States");
            
            // Select by value attribute
            selectCountry.selectByValue("US");
            
            // Select by index
            selectCountry.selectByIndex(1);
            
            // Get text from an element
            WebElement heading = driver.findElement(By.tagName("h1"));
            String headingText = heading.getText();
            System.out.println("Heading text: " + headingText);
            
            // Get attribute value
            String placeholder = usernameField.getAttribute("placeholder");
            System.out.println("Placeholder text: " + placeholder);
            
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
    
    # Submit a form
    form = driver.find_element(By.ID, "login-form")
    form.submit()
    
    # Check/uncheck a checkbox
    checkbox = driver.find_element(By.NAME, "remember-me")
    if not checkbox.is_selected():
        checkbox.click()  # Check the checkbox
    
    # Working with dropdown lists
    dropdown = driver.find_element(By.ID, "country")
    select_country = Select(dropdown)
    
    # Select by visible text
    select_country.select_by_visible_text("United States")
    
    # Select by value attribute
    select_country.select_by_value("US")
    
    # Select by index
    select_country.select_by_index(1)
    
    # Get text from an element
    heading = driver.find_element(By.TAG_NAME, "h1")
    heading_text = heading.text
    print(f"Heading text: {heading_text}")
    
    # Get attribute value
    placeholder = username_field.get_attribute("placeholder")
    print(f"Placeholder text: {placeholder}")
    
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
        
        // Submit a form
        const form = await driver.findElement(By.id('login-form'));
        await form.submit();
        
        // Check/uncheck a checkbox
        const checkbox = await driver.findElement(By.name('remember-me'));
        if (!(await checkbox.isSelected())) {
            await checkbox.click(); // Check the checkbox
        }
        
        // Working with dropdown lists (using standard select methods in JavaScript)
        const dropdown = await driver.findElement(By.id('country'));
        
        // Select by visible text (using JavaScript execution)
        await driver.executeScript(
            'arguments[0].value = Array.from(arguments[0].options).find(o => o.text === "United States").value', 
            dropdown
        );
        
        // Select by value attribute
        await dropdown.sendKeys('US');
        
        // Get text from an element
        const heading = await driver.findElement(By.css('h1'));
        const headingText = await heading.getText();
        console.log('Heading text:', headingText);
        
        // Get attribute value
        const placeholder = await usernameField.getAttribute('placeholder');
        console.log('Placeholder text:', placeholder);
        
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
            
            // Submit a form
            IWebElement form = driver.FindElement(By.Id("login-form"));
            form.Submit();
            
            // Check/uncheck a checkbox
            IWebElement checkbox = driver.FindElement(By.Name("remember-me"));
            if (!checkbox.Selected)
            {
                checkbox.Click(); // Check the checkbox
            }
            
            // Working with dropdown lists
            IWebElement dropdown = driver.FindElement(By.Id("country"));
            SelectElement selectCountry = new SelectElement(dropdown);
            
            // Select by visible text
            selectCountry.SelectByText("United States");
            
            // Select by value attribute
            selectCountry.SelectByValue("US");
            
            // Select by index
            selectCountry.SelectByIndex(1);
            
            // Get text from an element
            IWebElement heading = driver.FindElement(By.TagName("h1"));
            string headingText = heading.Text;
            Console.WriteLine($"Heading text: {headingText}");
            
            // Get attribute value
            string placeholder = usernameField.GetAttribute("placeholder");
            Console.WriteLine($"Placeholder text: {placeholder}");
        }
        finally
        {
            driver.Quit();
        }
    }
}`
    },
    waitStrategies: {
      java: `// Wait strategies in Selenium
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.FluentWait;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.time.Duration;
import java.util.function.Function;

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
            
            // 3. Fluent Wait - more customizable explicit wait
            FluentWait<WebDriver> fluentWait = new FluentWait<>(driver)
                .withTimeout(Duration.ofSeconds(30))
                .pollingEvery(Duration.ofMillis(500))
                .ignoring(org.openqa.selenium.NoSuchElementException.class);
            
            WebElement element = fluentWait.until(new Function<WebDriver, WebElement>() {
                public WebElement apply(WebDriver driver) {
                    return driver.findElement(By.id("dynamically-loaded"));
                }
            });
            
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
from selenium.common.exceptions import NoSuchElementException, TimeoutException
import time

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
    
    # 3. Fluent Wait - more customizable explicit wait
    from selenium.webdriver.support.wait import WebDriverWait
    
    fluent_wait = WebDriverWait(
        driver, 
        timeout=30,
        poll_frequency=0.5,
        ignored_exceptions=[NoSuchElementException]
    )
    
    element = fluent_wait.until(
        lambda d: d.find_element(By.ID, "dynamically-loaded")
    )
    
    # 4. Sleep - avoid in real tests, but sometimes necessary
    # time.sleep(2)  # Waits for 2 seconds (avoid in production)
    
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
        
        // 3. Custom Wait conditions
        await driver.wait(async function() {
            const elementText = await driver.findElement(By.id('dynamically-loaded')).getText();
            return elementText.includes('Loaded successfully');
        }, 30000, 'Element never contained the expected text');
        
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
            
            // 3. Fluent Wait - more customizable explicit wait
            DefaultWait<IWebDriver> fluentWait = new DefaultWait<IWebDriver>(driver)
            {
                Timeout = TimeSpan.FromSeconds(30),
                PollingInterval = TimeSpan.FromMilliseconds(500)
            };
            fluentWait.IgnoreExceptionTypes(typeof(NoSuchElementException));
            
            IWebElement element = fluentWait.Until(d => d.FindElement(By.Id("dynamically-loaded")));
        }
        finally
        {
            driver.Quit();
        }
    }
}`
    },
    navigation: {
      java: `// Navigation in Selenium
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
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
            
            // Working with multiple windows/tabs
            // Open a new tab via JavaScript
            ((JavascriptExecutor) driver).executeScript("window.open('https://example.com/contact', '_blank');");
            
            // Get all window handles
            String originalWindow = driver.getWindowHandle();
            for (String windowHandle : driver.getWindowHandles()) {
                if(!originalWindow.equals(windowHandle)) {
                    // Switch to new window/tab
                    driver.switchTo().window(windowHandle);
                    break;
                }
            }
            
            // Do something in the new tab
            System.out.println("New tab title: " + driver.getTitle());
            
            // Switch back to original window
            driver.switchTo().window(originalWindow);
            
            // Working with iframes
            // Switch to an iframe by index
            driver.switchTo().frame(0);
            
            // Switch to an iframe by name or ID
            driver.switchTo().frame("iframe-name");
            
            // Switch to an iframe by WebElement
            WebElement iframe = driver.findElement(By.cssSelector("#content-frame"));
            driver.switchTo().frame(iframe);
            
            // Switch back to main content from iframe
            driver.switchTo().defaultContent();
            
            // Working with alerts
            // Switch to an alert
            driver.switchTo().alert().accept();  // Click OK
            driver.switchTo().alert().dismiss(); // Click Cancel
            driver.switchTo().alert().sendKeys("Text input"); // Type into prompt
            String alertText = driver.switchTo().alert().getText(); // Get alert text
            
        } finally {
            driver.quit();
        }
    }
}`,
      python: `# Navigation in Selenium
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()

try:
    # Basic navigation - open URL
    driver.get("https://example.com")
    
    # Alternative navigation method
    driver.navigate().to("https://example.com/about")
    
    # Browser navigation
    driver.back()      # Go back to previous page
    driver.forward()   # Go forward
    driver.refresh()   # Refresh current page
    
    # Working with multiple windows/tabs
    # Open a new tab via JavaScript
    driver.execute_script("window.open('https://example.com/contact', '_blank');")
    
    # Get all window handles
    original_window = driver.current_window_handle
    for window_handle in driver.window_handles:
        if window_handle != original_window:
            # Switch to new window/tab
            driver.switch_to.window(window_handle)
            break
    
    # Do something in the new tab
    print(f"New tab title: {driver.title}")
    
    # Switch back to original window
    driver.switch_to.window(original_window)
    
    # Working with iframes
    # Switch to an iframe by index
    driver.switch_to.frame(0)
    
    # Switch to an iframe by name or ID
    driver.switch_to.frame("iframe-name")
    
    # Switch to an iframe by WebElement
    iframe = driver.find_element(By.CSS_SELECTOR, "#content-frame")
    driver.switch_to.frame(iframe)
    
    # Switch back to main content from iframe
    driver.switch_to.default_content()
    
    # Working with alerts
    # Switch to an alert
    driver.switch_to.alert.accept()  # Click OK
    driver.switch_to.alert.dismiss() # Click Cancel
    driver.switch_to.alert.send_keys("Text input") # Type into prompt
    alert_text = driver.switch_to.alert.text # Get alert text
    
finally:
    driver.quit()`,
      javascript: `// Navigation in Selenium
const { Builder, By } = require('selenium-webdriver');

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
        
        // Working with multiple windows/tabs
        // Open a new tab via JavaScript
        await driver.executeScript("window.open('https://example.com/contact', '_blank');");
        
        // Get all window handles
        const originalWindow = await driver.getWindowHandle();
        const windows = await driver.getAllWindowHandles();
        
        for (const handle of windows) {
            if (handle !== originalWindow) {
                // Switch to new window/tab
                await driver.switchTo().window(handle);
                break;
            }
        }
        
        // Do something in the new tab
        const newTabTitle = await driver.getTitle();
        console.log(`New tab title: ${newTabTitle}`);
        
        // Switch back to original window
        await driver.switchTo().window(originalWindow);
        
        // Working with iframes
        // Switch to an iframe by index
        await driver.switchTo().frame(0);
        
        // Switch to an iframe by name or ID
        await driver.switchTo().frame('iframe-name');
        
        // Switch to an iframe by WebElement
        const iframe = await driver.findElement(By.css('#content-frame'));
        await driver.switchTo().frame(iframe);
        
        // Switch back to main content from iframe
        await driver.switchTo().defaultContent();
        
        // Working with alerts
        // Switch to an alert
        await driver.switchTo().alert().accept();  // Click OK
        await driver.switchTo().alert().dismiss(); // Click Cancel
        await driver.switchTo().alert().sendKeys('Text input'); // Type into prompt
        const alertText = await driver.switchTo().alert().getText(); // Get alert text
        
    } finally {
        await driver.quit();
    }
})();`,
      csharp: `// Navigation in Selenium
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using System;
using System.Collections.Generic;
using System.Linq;

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
            
            // Working with multiple windows/tabs
            // Open a new tab via JavaScript
            ((IJavaScriptExecutor)driver).ExecuteScript("window.open('https://example.com/contact', '_blank');");
            
            // Get all window handles
            string originalWindow = driver.CurrentWindowHandle;
            foreach (string windowHandle in driver.WindowHandles)
            {
                if (windowHandle != originalWindow)
                {
                    // Switch to new window/tab
                    driver.SwitchTo().Window(windowHandle);
                    break;
                }
            }
            
            // Do something in the new tab
            Console.WriteLine($"New tab title: {driver.Title}");
            
            // Switch back to original window
            driver.SwitchTo().Window(originalWindow);
            
            // Working with iframes
            // Switch to an iframe by index
            driver.SwitchTo().Frame(0);
            
            // Switch to an iframe by name or ID
            driver.SwitchTo().Frame("iframe-name");
            
            // Switch to an iframe by WebElement
            IWebElement iframe = driver.FindElement(By.CssSelector("#content-frame"));
            driver.SwitchTo().Frame(iframe);
            
            // Switch back to main content from iframe
            driver.SwitchTo().DefaultContent();
            
            // Working with alerts
            // Switch to an alert
            driver.SwitchTo().Alert().Accept();  // Click OK
            driver.SwitchTo().Alert().Dismiss(); // Click Cancel
            driver.SwitchTo().Alert().SendKeys("Text input"); // Type into prompt
            string alertText = driver.SwitchTo().Alert().Text; // Get alert text
        }
        finally
        {
            driver.Quit();
        }
    }
}`
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
              code: examples[selectedExample as keyof typeof examples][selectedLanguage as keyof (typeof examples)[keyof typeof examples]],
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
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">By.xpath()</code> - Find by XPath</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Element Actions</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.click()</code> - Click on element</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.sendKeys()</code> - Type text</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.clear()</code> - Clear input field</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.getText()</code> - Get visible text</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">.getAttribute()</code> - Get attribute value</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Wait Conditions</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">elementToBeClickable</code> - Wait until clickable</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">visibilityOfElementLocated</code> - Wait until visible</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">presenceOfElementLocated</code> - Wait until exists in DOM</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">textToBePresentInElement</code> - Wait for specific text</li>
            </ul>
          </div>
          
          <div className="space-y-2">
            <h5 className="font-medium text-cyan-700 dark:text-cyan-400">Navigation</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">driver.get(url)</code> - Navigate to URL</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">driver.navigate().back()</code> - Go back</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">driver.navigate().forward()</code> - Go forward</li>
              <li><code className="text-xs bg-gray-100 dark:bg-gray-700 px-1 rounded">driver.navigate().refresh()</code> - Refresh page</li>
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
          <li>
            <strong>Use unique, stable locators</strong> that are less likely to change with UI updates.
          </li>
        </ul>
      </div>
    </div>
  );
}