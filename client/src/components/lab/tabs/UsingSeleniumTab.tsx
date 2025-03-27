import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Info, Clock, ArrowRight, Lightbulb } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TerminalCodeTabs from "@/components/ui/TerminalCodeTabs";

export default function UsingSeleniumTab() {
  const { theme } = useTheme();

  const waitExamples = `# Implicit Wait (applies to all find_element calls)
driver.implicitly_wait(10)  # Wait up to 10 seconds

# Explicit Wait for a specific condition
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Wait for an element to be clickable
element = WebDriverWait(driver, 10).until(
    EC.element_to_be_clickable((By.ID, "myButton"))
)

# Wait for an element to be visible
element = WebDriverWait(driver, 20).until(
    EC.visibility_of_element_located((By.CSS_SELECTOR, ".notification"))
)

# Wait for page title to change
WebDriverWait(driver, 10).until(EC.title_contains("Success"))`;

  const advancedLocatorsCode = `# Using XPath
element = driver.find_element(By.XPATH, "//button[@class='submit']")

# Using CSS Selector
element = driver.find_element(By.CSS_SELECTOR, "div.content > p.message")

# Finding multiple elements
elements = driver.find_elements(By.TAG_NAME, "a")
for element in elements:
    print(element.text)

# Using relative XPath
element = driver.find_element(By.XPATH, "//div[contains(@class, 'user-info')]//button")

# Parent-child relationships
element = driver.find_element(By.CSS_SELECTOR, ".parent > .child")

# Finding by element attributes
element = driver.find_element(By.CSS_SELECTOR, "input[name='username'][required]")`;

  const actionChainsCode = `# Import ActionChains
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys

# Create an ActionChains instance
actions = ActionChains(driver)

# Hover over an element
menu = driver.find_element(By.ID, "menu")
actions.move_to_element(menu).perform()

# Drag and drop
source = driver.find_element(By.ID, "draggable")
target = driver.find_element(By.ID, "droppable")
actions.drag_and_drop(source, target).perform()

# Right-click (context click)
element = driver.find_element(By.ID, "context-menu-trigger")
actions.context_click(element).perform()

# Double-click
element = driver.find_element(By.ID, "double-click-element")
actions.double_click(element).perform()

# Key combinations (e.g., Ctrl+A to select all)
actions.key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL).perform()

# Multiple actions in sequence
actions.move_to_element(element).click().send_keys("Hello").perform()`;

  return (
    <div className={cn(
      "prose prose-lg max-w-none",
      theme === "dark" 
        ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
        : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
    )}>
      <h3>Using Selenium Effectively</h3>
      <p>
        Once you've learned the basics, it's time to explore more advanced 
        Selenium features to create robust and reliable automation scripts.
      </p>

      <Alert className="my-4">
        <Clock className="h-4 w-4" />
        <AlertTitle>Handling Timing Issues</AlertTitle>
        <AlertDescription>
          One of the most common challenges in Selenium automation is dealing with 
          timing and synchronization. The solution is to use waits effectively.
        </AlertDescription>
      </Alert>

      <div className="my-8">
        <h4>Working with Waits</h4>
        <p>
          The web is asynchronous, and elements might not be immediately available. 
          Selenium offers several ways to wait for elements:
        </p>
        
        <TerminalCodeTabs 
          title="Waiting Techniques" 
          description="Python examples for different wait strategies:"
          tabs={[
            {
              id: "waits",
              label: "Wait Examples",
              code: waitExamples
            }
          ]}
          className="my-6"
        />
      </div>
      
      <div className="my-8">
        <h4>Advanced Element Location</h4>
        <p>
          Finding elements reliably is crucial for stable tests. Learn these advanced locator 
          strategies:
        </p>
        
        <TerminalCodeTabs 
          title="Locator Strategies" 
          description="More powerful ways to find elements:"
          tabs={[
            {
              id: "locators",
              label: "Advanced Locators",
              code: advancedLocatorsCode
            }
          ]}
          className="my-6"
        />
      </div>

      <Separator className="my-8" />
      
      <div className="my-8">
        <h4>Advanced Interactions</h4>
        <p>
          For complex user interactions like hover, drag-and-drop, and keyboard shortcuts, 
          use the ActionChains API:
        </p>
        
        <TerminalCodeTabs 
          title="ActionChains API" 
          description="Complex user interactions:"
          tabs={[
            {
              id: "actions",
              label: "Action Chains",
              code: actionChainsCode
            }
          ]}
          className="my-6"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <span className={cn(
                "p-2 mr-2 rounded-full",
                theme === "dark" ? "bg-purple-900/30" : "bg-purple-100"
              )}>
                <Lightbulb className={cn(
                  "h-4 w-4",
                  theme === "dark" ? "text-purple-400" : "text-purple-600"
                )} />
              </span>
              Page Objects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Organize your test code by representing each page as a class. 
              This improves maintainability and readability.
            </p>
            <a href="https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={cn(
                 "text-xs flex items-center",
                 theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
               )}>
              Learn more <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <span className={cn(
                "p-2 mr-2 rounded-full",
                theme === "dark" ? "bg-blue-900/30" : "bg-blue-100"
              )}>
                <Lightbulb className={cn(
                  "h-4 w-4",
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                )} />
              </span>
              Frameworks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Use test frameworks like pytest, TestNG, or Mocha to organize, run,
              and report on your Selenium tests.
            </p>
            <a href="https://www.selenium.dev/documentation/test_practices/encouraged/use_a_test_framework/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={cn(
                 "text-xs flex items-center",
                 theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
               )}>
              Learn more <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <span className={cn(
                "p-2 mr-2 rounded-full",
                theme === "dark" ? "bg-green-900/30" : "bg-green-100"
              )}>
                <Lightbulb className={cn(
                  "h-4 w-4",
                  theme === "dark" ? "text-green-400" : "text-green-600"
                )} />
              </span>
              Execution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-3">
              Run Selenium tests in parallel, in different browsers, and in CI/CD pipelines
              to maximize efficiency.
            </p>
            <a href="https://www.selenium.dev/documentation/grid/" 
               target="_blank" 
               rel="noopener noreferrer"
               className={cn(
                 "text-xs flex items-center",
                 theme === "dark" ? "text-[#40E0D0]" : "text-[#00BCD4]"
               )}>
              Learn more <ArrowRight className="h-3 w-3 ml-1" />
            </a>
          </CardContent>
        </Card>
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
          Invest time in creating a robust framework with good logging, reporting, and error handling.
          This will save you countless hours of debugging in the long run and make your tests more
          maintainable.
        </p>
      </div>
    </div>
  );
}