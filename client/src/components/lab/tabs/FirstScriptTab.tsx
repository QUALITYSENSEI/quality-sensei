import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Info, CheckCircle, AlertCircle } from "lucide-react";
import CodeExample from "@/components/ui/CodeExample";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { SiPython, SiJavascript } from "@/components/IconImports";

export default function FirstScriptTab() {
  const { theme } = useTheme();

  const pythonScript = `from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

# Set up the driver with automatic ChromeDriver installation
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

# Navigate to the website
driver.get("https://www.example.com")

# Find an element by ID and interact with it
element = driver.find_element(By.ID, "element-id")
element.click()

# Find an element by CSS selector
css_element = driver.find_element(By.CSS_SELECTOR, "button.submit-button")
css_element.click()

# Type into an input field
input_field = driver.find_element(By.NAME, "username")
input_field.send_keys("testuser")

# Get text from an element
text_element = driver.find_element(By.CLASS_NAME, "welcome-message")
message = text_element.text
print(f"Message: {message}")

# Close the browser
driver.quit()`;

  const javascriptScript = `const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function runTest() {
  // Set up Chrome options
  const options = new chrome.Options();
  
  // Create a new WebDriver instance
  const driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();
    
  try {
    // Navigate to a website
    await driver.get('https://www.example.com');
    
    // Find an element by ID and click it
    const button = await driver.findElement(By.id('submit-button'));
    await button.click();
    
    // Type into an input field
    const searchBox = await driver.findElement(By.name('search'));
    await searchBox.sendKeys('Selenium testing', Key.RETURN);
    
    // Wait for results to load
    await driver.wait(until.elementLocated(By.css('.results')), 5000);
    
    // Get text from an element
    const resultStats = await driver.findElement(By.css('.result-count'));
    console.log(await resultStats.getText());
    
  } finally {
    // Always quit the driver
    await driver.quit();
  }
}

runTest().catch(err => console.error('Test failed:', err));`;

  const javaScript = `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import io.github.bonigarcia.wdm.WebDriverManager;

public class FirstSeleniumTest {
    public static void main(String[] args) {
        // Setup ChromeDriver using WebDriverManager
        WebDriverManager.chromedriver().setup();
        
        // Configure Chrome options
        ChromeOptions options = new ChromeOptions();
        
        // Initialize the WebDriver
        WebDriver driver = new ChromeDriver(options);
        
        try {
            // Navigate to website
            driver.get("https://www.example.com");
            
            // Find element by ID and click
            WebElement button = driver.findElement(By.id("submit-button"));
            button.click();
            
            // Find element by name and enter text
            WebElement searchBox = driver.findElement(By.name("search"));
            searchBox.sendKeys("Selenium testing");
            searchBox.submit();
            
            // Get text from element
            WebElement resultElement = driver.findElement(By.className("result-count"));
            System.out.println(resultElement.getText());
            
            // Take a screenshot
            // File screenshot = ((TakesScreenshot)driver).getScreenshotAs(OutputType.FILE);
            // Files.copy(screenshot.toPath(), Paths.get("./screenshot.png"));
            
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Always close the browser
            driver.quit();
        }
    }
}`;

  return (
    <div className={cn(
      "prose prose-lg max-w-none",
      theme === "dark" 
        ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
        : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
    )}>
      <h3>Write Your First Selenium Script</h3>
      <p>
        Now that you have Selenium installed, it's time to write your first automation script.
        Let's start with a basic example that opens a browser, navigates to a website, and interacts with elements.
      </p>

      <Alert className="my-4">
        <Info className="h-4 w-4" />
        <AlertTitle>Key Concepts</AlertTitle>
        <AlertDescription>
          <ul className="list-disc ml-6 mt-2 mb-0">
            <li>WebDriver - The main interface for browser automation</li>
            <li>Elements - Web components you interact with (buttons, inputs, etc.)</li>
            <li>Locators - Methods to find elements (ID, CSS, XPath, etc.)</li>
            <li>Actions - Interactions like click, type, submit</li>
          </ul>
        </AlertDescription>
      </Alert>

      <div className="my-8">
        <h4>Sample Scripts by Language</h4>
        <p>Choose your preferred programming language:</p>
        
        <CodeExample 
          examples={[
            {
              language: "python",
              code: pythonScript,
              label: "Python"
            },
            {
              language: "javascript",
              code: javascriptScript,
              label: "JavaScript"
            },
            {
              language: "java",
              code: javaScript,
              label: "Java"
            }
          ]}
          title="Basic Selenium Example"
          description="A simple script to navigate to a website and interact with elements"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <Card className={cn(
          "p-4",
          theme === "dark" ? "bg-green-900/20" : "bg-green-50"
        )}>
          <h4 className="flex items-center mt-0 text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            Best Practices
          </h4>
          <ul className="list-disc ml-6 mb-0">
            <li>Always quit the driver when done</li>
            <li>Use waits instead of fixed sleeps</li>
            <li>Create reusable helper methods</li>
            <li>Handle exceptions properly</li>
          </ul>
        </Card>
        
        <Card className={cn(
          "p-4",
          theme === "dark" ? "bg-red-900/20" : "bg-red-50"
        )}>
          <h4 className="flex items-center mt-0 text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            Common Pitfalls
          </h4>
          <ul className="list-disc ml-6 mb-0">
            <li>Not handling timing issues</li>
            <li>Using unreliable locators</li>
            <li>Missing error handling</li>
            <li>Forgetting to close browser sessions</li>
          </ul>
        </Card>
      </div>
      
      <div className="mt-8">
        <h4>Step-by-Step Explanation</h4>
        <ol>
          <li>Import the necessary Selenium modules</li>
          <li>Initialize a WebDriver for your chosen browser</li>
          <li>Navigate to a website using driver.get()</li>
          <li>Locate elements using various strategies (ID, CSS, XPath, etc.)</li>
          <li>Perform actions on the elements (click, type, etc.)</li>
          <li>Extract information if needed</li>
          <li>Close the browser when finished</li>
        </ol>
      </div>
      
      <div className={cn(
        "p-4 rounded-lg mt-6",
        theme === "dark" ? "bg-gray-700" : "bg-gray-100"
      )}>
        <h4 className="flex items-center mt-0">
          <Info className="w-5 h-5 mr-2" />
          Pro Tip
        </h4>
        <p className="text-sm mb-0">
          Start with simple scripts that focus on a single task before building more complex test suites.
          This helps you understand the Selenium API better and troubleshoot issues more easily.
        </p>
      </div>
    </div>
  );
}