import { Check } from 'lucide-react';
import CodeExample from '@/components/ui/CodeExample';

export default function FirstScriptTab() {
  const jsExample = `const { Builder, By, Key, until } = require('selenium-webdriver');

async function example() {
  // Initialize the WebDriver
  let driver = await new Builder().forBrowser('chrome').build();
  
  try {
    // Navigate to a website
    await driver.get('https://www.google.com');
    
    // Find the search input element and type a query
    await driver.findElement(By.name('q')).sendKeys('Selenium WebDriver', Key.RETURN);
    
    // Wait for the search results to load
    await driver.wait(until.titleContains('Selenium WebDriver'), 5000);
    
    // Get and print the page title
    console.log('Page title:', await driver.getTitle());
    
  } finally {
    // Always close the browser
    await driver.quit();
  }
}

example();`;

  const pythonExample = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Initialize the WebDriver with automatic driver management
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

try:
    # Navigate to a website
    driver.get('https://www.google.com')
    
    # Find the search input element and type a query
    search_box = driver.find_element(By.NAME, 'q')
    search_box.send_keys('Selenium WebDriver')
    search_box.send_keys(Keys.RETURN)
    
    # Wait for the page title to change
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    WebDriverWait(driver, 10).until(EC.title_contains('Selenium WebDriver'))
    
    # Print the page title
    print('Page title:', driver.title)
    
finally:
    # Always close the browser
    driver.quit()`;

  const javaExample = `import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

public class FirstSeleniumTest {
    public static void main(String[] args) {
        // Setup ChromeDriver using WebDriverManager
        WebDriverManager.chromedriver().setup();
        
        // Initialize the WebDriver
        WebDriver driver = new ChromeDriver();
        
        try {
            // Navigate to a website
            driver.get("https://www.google.com");
            
            // Find the search input element and type a query
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.sendKeys(Keys.RETURN);
            
            // Wait for the page title to change
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            wait.until(ExpectedConditions.titleContains("Selenium WebDriver"));
            
            // Print the page title
            System.out.println("Page title: " + driver.getTitle());
            
        } finally {
            // Always close the browser
            driver.quit();
        }
    }
}`;

  return (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Your First Selenium Script</h3>
        <p>
          Now that you have Selenium WebDriver installed, let's write a simple script to automate 
          a web browser. This example will:
        </p>
        
        <ul>
          <li>Open a browser</li>
          <li>Navigate to Google</li>
          <li>Search for "Selenium WebDriver"</li>
          <li>Wait for the results page to load</li>
          <li>Print the page title</li>
          <li>Close the browser</li>
        </ul>
      </div>

      <CodeExample
        examples={[
          {
            language: 'javascript',
            code: jsExample,
            label: 'JavaScript'
          },
          {
            language: 'python',
            code: pythonExample,
            label: 'Python'
          },
          {
            language: 'java',
            code: javaExample,
            label: 'Java'
          }
        ]}
        title="Basic Selenium WebDriver Example"
        description="Choose your preferred language"
      />

      <div className="prose prose-lg max-w-none dark:prose-invert mt-8">
        <h3>Understanding the Script</h3>
        
        <div className="border-l-4 border-blue-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Initialization</h4>
          <p>
            The script begins by initializing a new WebDriver instance. This launches a 
            browser window that Selenium will control.
          </p>
        </div>
        
        <div className="border-l-4 border-green-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Navigation</h4>
          <p>
            We navigate to a URL using the <code>get()</code> method, which is similar to 
            typing a URL into the browser's address bar.
          </p>
        </div>
        
        <div className="border-l-4 border-yellow-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Element Location</h4>
          <p>
            Selenium offers several strategies to find elements on a webpage. In this example, 
            we use the <code>By.name</code> locator to find the search input field.
          </p>
        </div>
        
        <div className="border-l-4 border-purple-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Interaction</h4>
          <p>
            We interact with the element by typing text using <code>sendKeys()</code> and 
            simulating a press of the Enter/Return key.
          </p>
        </div>
        
        <div className="border-l-4 border-red-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Waiting</h4>
          <p>
            Explicit waits tell WebDriver to wait for certain conditions before proceeding. 
            This helps handle dynamic content and asynchronous operations.
          </p>
        </div>
        
        <div className="border-l-4 border-gray-500 pl-5 py-1 my-6">
          <h4 className="text-lg font-semibold">Cleanup</h4>
          <p>
            Always close the browser using <code>quit()</code> when finished to release 
            system resources.
          </p>
        </div>
      </div>

      <div className="bg-green-50 dark:bg-green-900 p-6 rounded-md mt-6">
        <h3 className="text-xl font-bold flex items-center text-green-800 dark:text-green-200">
          <Check className="mr-2 h-6 w-6" />
          Key Takeaways
        </h3>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-green-800 dark:text-green-200">
          <li>Selenium provides a programmatic interface to control web browsers</li>
          <li>Element location is a fundamental skill for automation</li>
          <li>Proper waiting strategies are essential for reliable tests</li>
          <li>Always clean up resources when tests are complete</li>
          <li>The same core concepts apply across all supported languages</li>
        </ul>
      </div>
    </div>
  );
}