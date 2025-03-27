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
import { BsDownload, BsPlayFill, BsCheck2, BsBriefcase, BsBoxArrowUpRight, BsCodeSlash, BsGear, BsServer, BsHddNetwork } from "react-icons/bs";
import { cn } from "@/lib/utils";
import CodeExample from "@/components/ui/CodeExample";

// Code examples for different configurations
const dockerComposeCode = `version: '3'
services:
  selenium-hub:
    image: selenium/hub:4.15.0
    container_name: selenium-hub
    ports:
      - "4442:4442"
      - "4443:4443"
      - "4444:4444"

  chrome:
    image: selenium/node-chrome:4.15.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4

  firefox:
    image: selenium/node-firefox:4.15.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4

  edge:
    image: selenium/node-edge:4.15.0
    shm_size: 2gb
    depends_on:
      - selenium-hub
    environment:
      - SE_EVENT_BUS_HOST=selenium-hub
      - SE_EVENT_BUS_PUBLISH_PORT=4442
      - SE_EVENT_BUS_SUBSCRIBE_PORT=4443
      - SE_NODE_MAX_SESSIONS=4`;

const seleniumGridJavaCode = `import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.openqa.selenium.edge.EdgeOptions;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Parameters;
import org.testng.annotations.Test;

import java.net.URL;
import java.time.Duration;

public class SeleniumGridTest {
    private WebDriver driver;

    @BeforeMethod
    @Parameters("browser")
    public void setUp(String browser) throws Exception {
        // Define the hub URL
        URL hubUrl = new URL("http://localhost:4444/wd/hub");
        
        // Setup driver based on browser parameter
        switch (browser.toLowerCase()) {
            case "chrome":
                ChromeOptions chromeOptions = new ChromeOptions();
                driver = new RemoteWebDriver(hubUrl, chromeOptions);
                break;
            case "firefox":
                FirefoxOptions firefoxOptions = new FirefoxOptions();
                driver = new RemoteWebDriver(hubUrl, firefoxOptions);
                break;
            case "edge":
                EdgeOptions edgeOptions = new EdgeOptions();
                driver = new RemoteWebDriver(hubUrl, edgeOptions);
                break;
            default:
                throw new IllegalArgumentException("Browser " + browser + " not supported");
        }
        
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }
    
    @Test
    public void testGoogleSearch() {
        // Navigate to Google
        driver.get("https://www.google.com");
        
        // Accept cookies if present
        try {
            driver.findElement(By.xpath("//button[contains(., 'Accept all')]")).click();
        } catch (Exception e) {
            // Cookie dialog may not appear in all regions
            System.out.println("Cookie dialog not found or already accepted");
        }
        
        // Perform search
        driver.findElement(By.name("q")).sendKeys("Selenium Grid");
        driver.findElement(By.name("q")).submit();
        
        // Print title
        System.out.println("Page title: " + driver.getTitle());
        
        // You could add assertions here
    }
    
    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}`;

const seleniumGridPythonCode = `import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
from selenium.webdriver.firefox.options import Options as FirefoxOptions
from selenium.webdriver.edge.options import Options as EdgeOptions

class SeleniumGridTest(unittest.TestCase):
    
    def setUp(self):
        # Define the hub URL
        self.hub_url = "http://localhost:4444/wd/hub"
        
        # Get browser parameter from environment or set a default
        browser = os.environ.get('BROWSER', 'chrome').lower()
        
        # Setup driver based on browser parameter
        if browser == 'chrome':
            options = ChromeOptions()
            self.driver = webdriver.Remote(
                command_executor=self.hub_url,
                options=options
            )
        elif browser == 'firefox':
            options = FirefoxOptions()
            self.driver = webdriver.Remote(
                command_executor=self.hub_url,
                options=options
            )
        elif browser == 'edge':
            options = EdgeOptions()
            self.driver = webdriver.Remote(
                command_executor=self.hub_url,
                options=options
            )
        else:
            raise ValueError(f"Browser {browser} not supported")
        
        self.driver.maximize_window()
        self.driver.implicitly_wait(10)
    
    def test_google_search(self):
        # Navigate to Google
        self.driver.get("https://www.google.com")
        
        # Accept cookies if present
        try:
            self.driver.find_element(By.XPATH, "//button[contains(., 'Accept all')]").click()
        except:
            # Cookie dialog may not appear in all regions
            print("Cookie dialog not found or already accepted")
        
        # Perform search
        search_box = self.driver.find_element(By.NAME, "q")
        search_box.send_keys("Selenium Grid")
        search_box.submit()
        
        # Print title
        print(f"Page title: {self.driver.title}")
        
        # You could add assertions here
    
    def tearDown(self):
        if self.driver:
            self.driver.quit()

if __name__ == "__main__":
    unittest.main()`;

const testNGXmlCode = `<!DOCTYPE suite SYSTEM "https://testng.org/testng-1.0.dtd">
<suite name="Cross Browser Test Suite" parallel="tests" thread-count="3">
    
    <test name="Chrome Tests">
        <parameter name="browser" value="chrome" />
        <classes>
            <class name="com.example.tests.SeleniumGridTest" />
        </classes>
    </test>
    
    <test name="Firefox Tests">
        <parameter name="browser" value="firefox" />
        <classes>
            <class name="com.example.tests.SeleniumGridTest" />
        </classes>
    </test>
    
    <test name="Edge Tests">
        <parameter name="browser" value="edge" />
        <classes>
            <class name="com.example.tests.SeleniumGridTest" />
        </classes>
    </test>
    
</suite>`;

const seleniumGridConfigCode = `{
  "port": 4444,
  "newSessionWaitTimeout": -1,
  "servlets": [],
  "withoutServlets": [],
  "custom": {},
  "capabilityMatcher": "org.openqa.grid.internal.utils.DefaultCapabilityMatcher",
  "registry": "org.openqa.grid.internal.DefaultGridRegistry",
  "throwOnCapabilityNotPresent": true,
  "cleanUpCycle": 5000,
  "role": "hub",
  "debug": false,
  "browserTimeout": 60,
  "timeout": 1800
}`;

// Define the lab content with sections
const labSections: TabItem[] = [
  {
    id: "overview",
    label: "Overview",
    icon: <BsBriefcase className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Selenium Grid Lab</h2>
        <p className="text-lg">
          Welcome to the Selenium Grid Lab! This tutorial will guide you through setting up and using 
          Selenium Grid for distributed testing across multiple browsers, operating systems, and devices. 
          You'll learn how to scale your test automation infrastructure efficiently.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">What is Selenium Grid?</h3>
        <p>
          Selenium Grid allows you to run your tests on different browsers, operating systems, and machines in parallel. 
          It consists of a hub that routes JSON test commands to nodes where browsers run. Grid helps:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Run tests in parallel across multiple machines</li>
          <li>Test across different browser versions and platforms</li>
          <li>Reduce test execution time dramatically</li>
          <li>Centralize browser configuration</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">What You'll Learn</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Setting up a Selenium Grid Hub</li>
          <li>Configuring Nodes to connect to the Hub</li>
          <li>Running tests in parallel on multiple browsers</li>
          <li>Scaling your grid with Docker containers</li>
          <li>Implementing cross-browser testing strategies</li>
          <li>Managing test execution on remote machines</li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Prerequisites</h3>
        <p>
          Before starting this lab, you should be familiar with:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Basic Selenium WebDriver concepts and commands</li>
          <li>Java, Python, or JavaScript programming language</li>
          <li>Basic understanding of test automation concepts</li>
          <li>Fundamental knowledge of browsers and HTML/CSS (helpful but not required)</li>
        </ul>
        
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 text-blue-800 dark:text-blue-200 mt-6">
          <p className="text-sm">
            <strong>Note:</strong> This lab contains interactive exercises that you can complete in your own 
            development environment. You will need Docker installed for the containerized Grid setup.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "grid-architecture",
    label: "Grid Architecture",
    icon: <BsHddNetwork className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Understanding Selenium Grid Architecture</h2>
        <p>
          Selenium Grid follows a hub-and-node architecture that enables distributed test execution. Let's understand 
          the key components and how they interact.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <div>
            <h3 className="text-xl font-semibold">Key Components</h3>
            <ul className="list-disc pl-6 space-y-4 mt-4">
              <li>
                <strong className="text-blue-600 dark:text-blue-400">Hub:</strong> The central point that receives test requests and 
                distributes them to the appropriate nodes. Think of it as a traffic controller that routes each test command to the right browser.
              </li>
              <li>
                <strong className="text-green-600 dark:text-green-400">Nodes:</strong> The machines or containers that run the browsers where tests execute. 
                Nodes register with the hub, offering their supported browser capabilities.
              </li>
              <li>
                <strong className="text-purple-600 dark:text-purple-400">Session:</strong> A single instance of a browser controlled by WebDriver on a specific node.
              </li>
              <li>
                <strong className="text-red-600 dark:text-red-400">Capabilities:</strong> The browser configurations (browser type, version, platform) 
                that you request for your tests.
              </li>
            </ul>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Grid 4 Architecture</h3>
            <div className="flex flex-col space-y-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-lg text-blue-800 dark:text-blue-300">
                <h4 className="font-semibold mb-1">Router</h4>
                <p className="text-sm">
                  Handles incoming requests and routes them to appropriate nodes
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-2xl">↕️</span>
              </div>
              
              <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg text-green-800 dark:text-green-300">
                <h4 className="font-semibold mb-1">Distributor</h4>
                <p className="text-sm">
                  Maintains queue of incoming new session requests
                </p>
              </div>
              
              <div className="flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-2xl">↕️</span>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg text-yellow-800 dark:text-yellow-300">
                  <h4 className="font-semibold text-xs mb-1">Node 1</h4>
                  <p className="text-xs">Chrome</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg text-yellow-800 dark:text-yellow-300">
                  <h4 className="font-semibold text-xs mb-1">Node 2</h4>
                  <p className="text-xs">Firefox</p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-lg text-yellow-800 dark:text-yellow-300">
                  <h4 className="font-semibold text-xs mb-1">Node 3</h4>
                  <p className="text-xs">Edge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">How Tests Flow Through Grid</h3>
        <ol className="list-decimal space-y-4 pl-6 mt-4">
          <li>
            <strong>Test Request:</strong> Your test code makes a request to the hub with desired capabilities 
            (e.g., "I need Chrome on Windows").
          </li>
          <li>
            <strong>Hub Processing:</strong> The hub looks for an available node that matches your requested capabilities.
          </li>
          <li>
            <strong>Session Creation:</strong> The hub routes the request to the selected node, which creates a new browser session.
          </li>
          <li>
            <strong>Command Execution:</strong> All subsequent test commands are routed from the hub to this specific session.
          </li>
          <li>
            <strong>Session Completion:</strong> When the test completes (or fails), the session is closed and resources are released.
          </li>
        </ol>
        
        <h3 className="text-xl font-semibold mt-8">Grid 4 vs. Grid 3</h3>
        <p>
          Selenium Grid 4 (the latest version) offers significant improvements over Grid 3:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Grid 3 (Legacy)</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Simple hub and node architecture</li>
              <li>Based on JSON Wire Protocol</li>
              <li>Requires Java to run</li>
              <li>Limited scaling options</li>
              <li>Basic management interface</li>
            </ul>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Grid 4 (Current)</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Fully distributed architecture</li>
              <li>Based on W3C WebDriver standard</li>
              <li>Docker-native deployment support</li>
              <li>Advanced scaling and management</li>
              <li>Enhanced UI dashboard</li>
              <li>Improved stability and performance</li>
            </ul>
          </Card>
        </div>
        
        <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-4 text-yellow-800 dark:text-yellow-200 mt-6">
          <h4 className="font-semibold">Important Note</h4>
          <p className="text-sm">
            This lab focuses on Selenium Grid 4, which is the recommended version for new implementations.
            If you're working with an existing Grid 3 setup, you may need to adapt some commands and configurations.
          </p>
        </div>
      </div>
    )
  },
  {
    id: "setup-docker",
    label: "Docker Setup",
    icon: <BsServer className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Setting Up Selenium Grid with Docker</h2>
        <p>
          Docker provides the easiest way to set up a complete Selenium Grid environment. Using Docker containers, 
          you can quickly create a hub and multiple browser nodes without complex configuration.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Prerequisites</h3>
        <p>
          Before you begin, ensure you have the following installed:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>
            <a 
              href="https://www.docker.com/products/docker-desktop" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Docker Desktop
            </a> (for Windows/Mac) or Docker Engine (for Linux)
          </li>
          <li>
            <a 
              href="https://docs.docker.com/compose/install/"
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Docker Compose
            </a> (usually included with Docker Desktop)
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-8">Docker Compose Setup</h3>
        <p>
          The easiest way to start Selenium Grid is using Docker Compose, which allows you to define 
          and run multi-container applications.
        </p>
        
        <div className="mt-4">
          <h4 className="font-semibold mb-2">1. Create a docker-compose.yml file</h4>
          <p className="mb-4">
            Create a file named <code className="text-pink-600 dark:text-pink-400">docker-compose.yml</code> with the following content:
          </p>
          
          <UnifiedTabs 
            tabs={[
              {
                id: "docker-compose",
                label: "docker-compose.yml",
                code: dockerComposeCode
              }
            ]}
            variant="terminal"
            title="Selenium Grid Docker Compose Configuration"
            description="This configuration sets up a hub with Chrome, Firefox and Edge nodes"
            showCopyButton={true}
          />
          
          <h4 className="font-semibold mt-6 mb-2">2. Start the Grid</h4>
          <p className="mb-4">
            Open a terminal in the directory containing your docker-compose.yml file and run:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
            {`docker-compose up -d`}
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            The <code className="text-pink-600 dark:text-pink-400">-d</code> flag runs the containers in detached mode (in the background).
          </p>
          
          <h4 className="font-semibold mt-6 mb-2">3. Verify the Grid is Running</h4>
          <p className="mb-4">
            Open your browser and navigate to <code className="text-pink-600 dark:text-pink-400">http://localhost:4444</code>. 
            You should see the Selenium Grid Dashboard.
          </p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4">
            <p className="font-semibold mb-2">Common Docker Compose Commands:</p>
            <ul className="text-sm space-y-2">
              <li>
                <code className="text-pink-600 dark:text-pink-400">docker-compose up -d</code> - Start the grid
              </li>
              <li>
                <code className="text-pink-600 dark:text-pink-400">docker-compose down</code> - Stop and remove containers
              </li>
              <li>
                <code className="text-pink-600 dark:text-pink-400">docker-compose ps</code> - Check status of containers
              </li>
              <li>
                <code className="text-pink-600 dark:text-pink-400">docker-compose logs</code> - View logs from all containers
              </li>
              <li>
                <code className="text-pink-600 dark:text-pink-400">docker-compose logs selenium-hub</code> - View logs from just the hub
              </li>
            </ul>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Running Individual Containers</h3>
        <p>
          If you prefer not to use Docker Compose, you can run the containers individually:
        </p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-4">
          {`# Start the Hub
docker run -d -p 4442:4442 -p 4443:4443 -p 4444:4444 --name selenium-hub selenium/hub:4.15.0

# Start Chrome Node
docker run -d --link selenium-hub:hub -e SE_EVENT_BUS_HOST=selenium-hub \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  -e SE_NODE_MAX_SESSIONS=4 --shm-size=2g selenium/node-chrome:4.15.0

# Start Firefox Node
docker run -d --link selenium-hub:hub -e SE_EVENT_BUS_HOST=selenium-hub \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  -e SE_NODE_MAX_SESSIONS=4 --shm-size=2g selenium/node-firefox:4.15.0

# Start Edge Node
docker run -d --link selenium-hub:hub -e SE_EVENT_BUS_HOST=selenium-hub \\
  -e SE_EVENT_BUS_PUBLISH_PORT=4442 -e SE_EVENT_BUS_SUBSCRIBE_PORT=4443 \\
  -e SE_NODE_MAX_SESSIONS=4 --shm-size=2g selenium/node-edge:4.15.0`}
        </pre>
        
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-green-800 dark:text-green-400">Exercise</h4>
          <p className="text-green-800 dark:text-green-300">
            Try setting up Selenium Grid using Docker:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Create the docker-compose.yml file with the provided configuration</li>
            <li>Start the Grid using docker-compose</li>
            <li>Open the Grid console at <code className="bg-green-50 dark:bg-green-900/50 px-1 rounded">http://localhost:4444</code></li>
            <li>Verify that the Chrome, Firefox, and Edge nodes are connected</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: "running-tests",
    label: "Running Tests",
    icon: <BsPlayFill className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Running Tests on Selenium Grid</h2>
        <p>
          Now that your Grid is up and running, let's look at how to execute tests on it. 
          You'll need to modify your existing Selenium WebDriver tests to connect to the 
          Grid instead of launching local browsers.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Connecting to Grid with RemoteWebDriver</h3>
        <p>
          The key to running tests on Grid is using <code className="text-pink-600 dark:text-pink-400">RemoteWebDriver</code> instead 
          of the browser-specific drivers. This class connects to the Grid hub and executes commands remotely.
        </p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "java-grid",
              label: "Java",
              icon: <SiJava className="mr-2 h-4 w-4" />,
              code: seleniumGridJavaCode
            },
            {
              id: "python-grid",
              label: "Python",
              icon: <SiPython className="mr-2 h-4 w-4" />,
              code: seleniumGridPythonCode
            }
          ]}
          variant="terminal"
          title="Running Tests on Selenium Grid"
          description="Example of executing a test on Selenium Grid with different browsers"
          showCopyButton={true}
        />
        
        <h3 className="text-xl font-semibold mt-8">Running Tests in Parallel</h3>
        <p>
          One of the major benefits of Selenium Grid is the ability to run tests in parallel across different browsers. 
          Various test frameworks provide ways to parallelize test execution:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">TestNG (Java)</h4>
            <p className="text-sm mb-4">
              TestNG makes it easy to run tests in parallel using XML configuration:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-xs">
              {testNGXmlCode}
            </pre>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">pytest (Python)</h4>
            <p className="text-sm mb-4">
              Using pytest-xdist to run tests in parallel:
            </p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg overflow-x-auto text-xs">
              {`# Install pytest-xdist
pip install pytest-xdist

# Run tests in parallel with 3 processes
pytest -n 3 test_selenium_grid.py

# Run with browser parameter
pytest -n 3 --browser=chrome test_selenium_grid.py`}
            </pre>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Common RemoteWebDriver Options</h3>
        <p>
          When connecting to Grid, you can configure various options for your browser sessions:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Basic Options</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Browser name and version</li>
              <li>Platform (Windows/Linux/Mac)</li>
              <li>Accept SSL certificates</li>
              <li>Browser window size</li>
            </ul>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Advanced Options</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Browser extensions</li>
              <li>Proxy settings</li>
              <li>Command timeouts</li>
              <li>Network conditions</li>
            </ul>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Chrome-specific</h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Headless mode</li>
              <li>Mobile emulation</li>
              <li>Download directory</li>
              <li>Browser arguments</li>
            </ul>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Example Option Configurations</h3>
        <div className="mt-4">
          <UnifiedTabs 
            tabs={[
              {
                id: "java-options",
                label: "Java",
                icon: <SiJava className="mr-2 h-4 w-4" />,
                content: (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`ChromeOptions options = new ChromeOptions();

// Basic options
options.setBrowserVersion("latest");
options.setPlatformName("Windows 10");

// Chrome-specific options
options.addArguments("--headless");
options.addArguments("--disable-gpu");
options.addArguments("--window-size=1920,1080");

// Add extensions
options.addExtensions(new File("/path/to/extension.crx"));

// Set download directory
Map<String, Object> prefs = new HashMap<>();
prefs.put("download.default_directory", "/path/to/downloads");
options.setExperimentalOption("prefs", prefs);

// Create RemoteWebDriver with these options
WebDriver driver = new RemoteWebDriver(new URL("http://localhost:4444/wd/hub"), options);`}
                  </pre>
                )
              },
              {
                id: "python-options",
                label: "Python",
                icon: <SiPython className="mr-2 h-4 w-4" />,
                content: (
                  <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm">
                    {`from selenium import webdriver
from selenium.webdriver.chrome.options import Options

options = Options()

# Basic options
options.browser_version = "latest"
options.platform_name = "Windows 10"

# Chrome-specific options
options.add_argument("--headless")
options.add_argument("--disable-gpu") 
options.add_argument("--window-size=1920,1080")

# Add extensions
options.add_extension("/path/to/extension.crx")

# Set download directory
prefs = {
    "download.default_directory": "/path/to/downloads"
}
options.add_experimental_option("prefs", prefs)

# Create RemoteWebDriver with these options
driver = webdriver.Remote(
    command_executor="http://localhost:4444/wd/hub",
    options=options
)`}
                  </pre>
                )
              }
            ]}
            variant="pills"
          />
        </div>
        
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-green-800 dark:text-green-400">Practice Exercise</h4>
          <p className="text-green-800 dark:text-green-300">
            Try running a test on your Selenium Grid:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Create a simple test script using the example code provided</li>
            <li>Configure it to run on your local Grid (http://localhost:4444)</li>
            <li>Run the test on Chrome, Firefox, and Edge in sequence</li>
            <li>Modify your test to run in parallel (based on your chosen framework)</li>
            <li>Observe the Grid console to see the tests running simultaneously</li>
          </ol>
        </div>
      </div>
    )
  },
  {
    id: "advanced-config",
    label: "Advanced Config",
    icon: <BsGear className="mr-2 h-4 w-4" />,
    content: (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Advanced Grid Configuration</h2>
        <p>
          For larger deployments or specific requirements, you may need to customize your Selenium Grid setup. 
          This section covers advanced configuration options for optimizing your Grid.
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Grid Configuration Files</h3>
        <p>
          Selenium Grid can be configured using JSON configuration files. This approach provides more control 
          than command-line parameters.
        </p>
        
        <UnifiedTabs 
          tabs={[
            {
              id: "grid-config",
              label: "grid-config.json",
              code: seleniumGridConfigCode
            }
          ]}
          variant="terminal"
          title="Selenium Grid Hub Configuration"
          description="Example configuration file for the Selenium Grid Hub"
          showCopyButton={true}
        />
        
        <p className="mt-4">
          To start the hub with this configuration:
        </p>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-2">
          {`java -jar selenium-server-<version>.jar hub -config grid-config.json`}
        </pre>
        
        <h3 className="text-xl font-semibold mt-8">Node Configuration</h3>
        <p>
          For nodes, you can configure browser-specific settings like versions, maximum instances, and timeouts.
        </p>
        
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto text-sm mt-4">
          {`{
  "capabilities": [
    {
      "browserName": "chrome",
      "maxInstances": 5
    },
    {
      "browserName": "firefox",
      "maxInstances": 3
    }
  ],
  "maxSession": 5,
  "port": 5555,
  "host": "localhost",
  "register": true,
  "registerCycle": 5000,
  "hub": "http://localhost:4444",
  "nodeStatusCheckTimeout": 5000,
  "nodePolling": 5000,
  "role": "node",
  "unregisterIfStillDownAfter": 60000,
  "downPollingLimit": 2,
  "debug": false,
  "servlets": [],
  "withoutServlets": []
}`}
        </pre>
        
        <h3 className="text-xl font-semibold mt-8">Load Balancing Strategies</h3>
        <p>
          Selenium Grid 4 offers different load balancing strategies:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Default Strategy</h4>
            <p className="text-sm">
              The hub assigns tests to the least loaded node that can support the requested capabilities.
            </p>
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Pros: Simple, works well for most cases<br />
              Cons: May not be optimal for complex environments
            </div>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold mb-2">Custom Strategy</h4>
            <p className="text-sm">
              You can implement custom load balancing by extending NodeSelector in Grid 4.
            </p>
            <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">
              Pros: Highly customizable to specific needs<br />
              Cons: Requires Java development and deeper Grid knowledge
            </div>
          </Card>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Scaling Tips for Large Deployments</h3>
        <div className="space-y-4 mt-4">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Separate Hub and Node Machines</h4>
            <p className="text-sm">
              For large-scale deployments, place the hub on a dedicated server with sufficient 
              resources to handle routing traffic.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Use Kubernetes for Scalability</h4>
            <p className="text-sm">
              Selenium Grid can be deployed on Kubernetes for dynamic scaling based on demand.
            </p>
            <pre className="bg-gray-50 dark:bg-gray-900 p-2 rounded mt-2 text-xs overflow-x-auto">
              {`# Install with Helm
helm repo add docker-selenium https://www.selenium.dev/docker-selenium
helm repo update
helm install selenium-grid docker-selenium/selenium-grid`}
            </pre>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Memory Management</h4>
            <p className="text-sm">
              Ensure nodes have sufficient memory. For browser tests, configure at least 2GB 
              per node, and use the <code className="text-pink-600 dark:text-pink-400">--shm-size</code> parameter with Docker.
            </p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Network Optimization</h4>
            <p className="text-sm">
              Place Grid components within the same network to minimize latency. For geographically 
              distributed teams, consider regional Grid deployments.
            </p>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mt-8">Monitoring and Maintenance</h3>
        <p>
          Keep your Grid healthy with proper monitoring:
        </p>
        <ul className="list-disc pl-6 space-y-2 mt-4">
          <li>Use the Grid console at <code className="text-pink-600 dark:text-pink-400">http://hub-url:4444</code> to monitor active sessions</li>
          <li>Implement health checks for hub and nodes</li>
          <li>Set up alerting for node failures or high load</li>
          <li>Regularly update your Selenium Grid version to get the latest features and fixes</li>
          <li>Consider implementing log aggregation for easier debugging</li>
        </ul>
        
        <div className="bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6">
          <h4 className="font-bold text-green-800 dark:text-green-400">Advanced Exercise</h4>
          <p className="text-green-800 dark:text-green-300">
            Try customizing your Selenium Grid:
          </p>
          <ol className="list-decimal pl-6 space-y-2 text-green-800 dark:text-green-300 mt-2">
            <li>Create a custom grid-config.json file with your desired settings</li>
            <li>Modify your docker-compose.yml to use the configuration file</li>
            <li>Adjust the maximum number of browser instances per node</li>
            <li>Configure timeouts for different operations</li>
            <li>Restart your Grid and verify the changes are applied</li>
          </ol>
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
          Continue your Selenium Grid learning journey with these helpful resources:
        </p>
        
        <h3 className="text-xl font-semibold mt-6">Official Documentation</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <a 
              href="https://www.selenium.dev/documentation/grid/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Grid Documentation
            </a>
          </li>
          <li>
            <a 
              href="https://www.selenium.dev/documentation/grid/getting_started/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Grid Getting Started Guide
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/SeleniumHQ/docker-selenium" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Docker GitHub Repository
            </a>
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Books and Tutorials</h3>
        <ul className="mt-4 space-y-3">
          <li>
            <strong>"Selenium Framework Design in Data-Driven Testing"</strong> by Carl Cocchiaro
          </li>
          <li>
            <strong>"Selenium Grid Tutorial"</strong> on Test Automation University
          </li>
          <li>
            <strong>"Mastering Selenium WebDriver 3.0"</strong> by Mark Collin
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mt-6">Online Courses</h3>
        <p>Deepen your knowledge with comprehensive online courses:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-4 h-full">
            <h4 className="font-semibold">Advanced Selenium Grid</h4>
            <p className="text-sm mt-2">
              Learn advanced Selenium Grid configuration, management, and integration with CI/CD pipelines.
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Duration: 10 hours • Level: Intermediate to Advanced
            </div>
            <div className="mt-2">
              <Link href="/courses/advanced-selenium-grid">
                <Button variant="link" className="p-0">
                  View Course
                </Button>
              </Link>
            </div>
          </Card>
          
          <Card className="p-4 h-full">
            <h4 className="font-semibold">Selenium Grid with Docker & Kubernetes</h4>
            <p className="text-sm mt-2">
              Master containerized test infrastructure with Docker and Kubernetes for scalable automation.
            </p>
            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Duration: 12 hours • Level: Intermediate to Advanced
            </div>
            <div className="mt-2">
              <Link href="/courses/selenium-grid-docker-kubernetes">
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
              href="https://stackoverflow.com/questions/tagged/selenium-grid" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Stack Overflow - Selenium Grid Tag
            </a>
          </li>
          <li>
            <a 
              href="https://gitter.im/SeleniumHQ/selenium" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Gitter Chat
            </a>
          </li>
          <li>
            <a 
              href="https://seleniumhq.slack.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center text-blue-600 dark:text-blue-400 hover:underline"
            >
              <BsBoxArrowUpRight className="mr-2 h-4 w-4" />
              Selenium Slack Workspace
            </a>
          </li>
        </ul>
        
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-6 mt-8">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-300">Next Steps</h3>
          <p className="text-blue-800 dark:text-blue-300 mt-2">
            Now that you've completed the Selenium Grid lab, consider:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-blue-800 dark:text-blue-300 mt-4">
            <li>Integrating Selenium Grid with your CI/CD pipeline</li>
            <li>Setting up a persistent Grid deployment for your team</li>
            <li>Learning about parallel execution frameworks</li>
            <li>Exploring cloud-based Selenium Grid providers</li>
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

export default function SeleniumGridLab() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <MainLayout title="Selenium Grid Lab - Quality Sensei" description="Learn how to set up and use Selenium Grid for distributed test execution across multiple browsers and platforms.">
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
              Selenium Grid Lab
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} max-w-3xl mx-auto`}>
              Learn how to scale your Selenium tests with distributed execution across multiple browsers and platforms.
            </p>
            
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              <span className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 text-xs rounded-full px-3 py-1">
                Distributed Testing
              </span>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full px-3 py-1">
                Parallel Execution
              </span>
              <span className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 text-xs rounded-full px-3 py-1">
                Docker
              </span>
              <span className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 text-xs rounded-full px-3 py-1">
                Cross-Browser
              </span>
              <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 text-xs rounded-full px-3 py-1">
                Scalability
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
                        <span>0/3</span>
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