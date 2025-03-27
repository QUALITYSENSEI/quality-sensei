import { Lightbulb, ZapIcon } from 'lucide-react';

export default function UsingSeleniumTab() {
  return (
    <div className="space-y-8">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Using Selenium WebDriver Effectively</h3>
        <p>
          Selenium WebDriver is a powerful tool for automating web browsers, but using it effectively 
          requires understanding some key concepts and best practices. This guide will help you 
          get the most out of Selenium in your testing and automation projects.
        </p>
      </div>

      {/* Best Practices Section */}
      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-200">Best Practices</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <ZapIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Use Explicit Waits
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Avoid using fixed sleep timeouts. Instead, wait for specific conditions 
              to be met, such as element visibility or presence.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <ZapIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Use Proper Locators
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Prefer stable locators like IDs and names. CSS selectors and XPath 
              should be used carefully to avoid brittle tests.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <ZapIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Handle Exceptions
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Implement proper exception handling to deal with elements that 
              may not be present or interactive.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-sm">
            <h4 className="font-semibold text-lg mb-2 flex items-center">
              <ZapIcon className="w-5 h-5 mr-2 text-yellow-500" />
              Clean Up Resources
            </h4>
            <p className="text-gray-700 dark:text-gray-300">
              Always quit your WebDriver instances to release system resources 
              and avoid browser processes accumulating.
            </p>
          </div>
        </div>
      </div>

      {/* Common Patterns Section */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Common Patterns</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg mb-2">Page Object Model</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              The Page Object Model is a design pattern that creates an object repository 
              for web UI elements. Each page in the application has a corresponding Page class.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                <code className="language-javascript">{`// LoginPage.js
class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameInput = By.id('username');
    this.passwordInput = By.id('password');
    this.loginButton = By.id('loginBtn');
  }

  async login(username, password) {
    await this.driver.findElement(this.usernameInput).sendKeys(username);
    await this.driver.findElement(this.passwordInput).sendKeys(password);
    await this.driver.findElement(this.loginButton).click();
  }
}

// Usage
const loginPage = new LoginPage(driver);
await loginPage.login('user', 'pass');`}</code>
              </pre>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Fluent Interface</h4>
            <p className="text-gray-700 dark:text-gray-300 mb-3">
              A fluent interface allows method chaining and provides a more readable API. 
              This pattern is especially useful for complex interactions.
            </p>
            <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-md">
              <pre className="text-sm overflow-x-auto">
                <code className="language-javascript">{`// HomePage.js
class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  async navigate() {
    await this.driver.get('https://example.com');
    return this;
  }

  async search(term) {
    await this.driver.findElement(By.id('searchBox')).sendKeys(term, Key.RETURN);
    return this;
  }

  async clickFirstResult() {
    await this.driver.findElement(By.css('.result:first-child')).click();
    return this;
  }
}

// Usage - fluent chaining
await new HomePage(driver)
  .navigate()
  .search('selenium automation')
  .clickFirstResult();`}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Lightbulb className="w-6 h-6 mr-2 text-amber-500" />
          Pro Tips
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Take screenshots on failure:</span> Configure your tests to 
              capture screenshots when assertions fail to help with debugging.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Use headless mode for CI:</span> Run browsers in headless 
              mode for continuous integration environments to improve performance.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Implement retry logic:</span> Web applications can be 
              flaky. Add retry mechanisms for operations that might occasionally fail.
            </p>
          </div>
          
          <div className="border-l-4 border-amber-500 pl-4 py-2">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Use JavaScript execution:</span> Sometimes the WebDriver 
              API isn't enough. You can execute JavaScript directly in the browser context for 
              complex operations.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mt-8">
        <h3 className="text-xl font-bold mb-3">Next Steps</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Now that you understand the basics of using Selenium WebDriver, you're ready to:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Learn more about advanced locator strategies</li>
          <li>Set up a test framework with Selenium</li>
          <li>Implement reporting for your test results</li>
          <li>Try automating complex user interactions</li>
          <li>Explore Selenium Grid for parallel test execution</li>
        </ul>
      </div>
    </div>
  );
}