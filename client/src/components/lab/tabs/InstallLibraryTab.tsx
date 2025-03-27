import Terminal from '@/components/ui/Terminal';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CodeExample from '@/components/ui/CodeExample';

export default function InstallLibraryTab() {
  return (
    <div className="space-y-6">
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <h3>Installing Selenium WebDriver</h3>
        <p>
          Selenium WebDriver provides a programming interface to create robust, browser-based 
          regression automation suites and tests. It's designed to provide a simpler, more 
          concise programming interface in addition to addressing some limitations in the 
          Selenium-RC API.
        </p>
        <p>
          The first step to using Selenium WebDriver is to install the appropriate library 
          for your programming language. Below are instructions for Java, Python, and JavaScript.
        </p>
      </div>

      <Tabs defaultValue="javascript" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="javascript">JavaScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="java">Java</TabsTrigger>
        </TabsList>

        <TabsContent value="javascript" className="space-y-4">
          <h4 className="text-lg font-semibold">Install with npm</h4>
          <Terminal 
            lines={[
              { type: 'command', content: 'npm install selenium-webdriver' },
              { type: 'output', content: 'added 42 packages, and audited 43 packages in 3s' },
              { type: 'success', content: 'found 0 vulnerabilities' }
            ]}
            showCopyButton={true}
          />
          
          <h4 className="text-lg font-semibold mt-6">Install WebDriver for your browser</h4>
          <p className="text-gray-700 dark:text-gray-300">
            You'll also need to install the browser-specific WebDriver executables:
          </p>
          
          <Terminal 
            lines={[
              { type: 'command', content: 'npm install -g chromedriver' },
              { type: 'output', content: 'added 1 package, and audited 2 packages in 0.5s' },
              { type: 'success', content: 'found 0 vulnerabilities' }
            ]}
            showCopyButton={true}
          />
          
          <div className="bg-amber-50 dark:bg-amber-900 p-4 rounded-md mt-4">
            <p className="text-amber-800 dark:text-amber-200 font-medium">
              Note: Make sure your ChromeDriver version matches your Chrome browser version
            </p>
          </div>
        </TabsContent>

        <TabsContent value="python" className="space-y-4">
          <h4 className="text-lg font-semibold">Install with pip</h4>
          <Terminal 
            lines={[
              { type: 'command', content: 'pip install selenium' },
              { type: 'output', content: 'Collecting selenium' },
              { type: 'output', content: '  Downloading selenium-4.10.0-py3-none-any.whl (6.7 MB)' },
              { type: 'success', content: 'Successfully installed selenium-4.10.0' }
            ]}
            showCopyButton={true}
          />
          
          <h4 className="text-lg font-semibold mt-6">WebDriver Setup</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Python's Selenium package includes a webdriver manager to automatically handle drivers:
          </p>
          
          <Terminal 
            lines={[
              { type: 'command', content: 'pip install webdriver-manager' },
              { type: 'output', content: 'Collecting webdriver-manager' },
              { type: 'output', content: '  Downloading webdriver_manager-3.8.6-py2.py3-none-any.whl (27 kB)' },
              { type: 'success', content: 'Successfully installed webdriver-manager-3.8.6' }
            ]}
            showCopyButton={true}
          />
        </TabsContent>

        <TabsContent value="java" className="space-y-4">
          <h4 className="text-lg font-semibold">Maven Dependency</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Add the following to your pom.xml:
          </p>
          
          <CodeExample
            examples={[
              {
                language: 'xml',
                code: `<dependency>
  <groupId>org.seleniumhq.selenium</groupId>
  <artifactId>selenium-java</artifactId>
  <version>4.10.0</version>
</dependency>`,
                label: 'pom.xml'
              }
            ]}
          />
          
          <h4 className="text-lg font-semibold mt-6">Gradle Dependency</h4>
          <p className="text-gray-700 dark:text-gray-300">
            Add the following to your build.gradle:
          </p>
          
          <CodeExample
            examples={[
              {
                language: 'groovy',
                code: `dependencies {
  implementation 'org.seleniumhq.selenium:selenium-java:4.10.0'
}`,
                label: 'build.gradle'
              }
            ]}
          />
          
          <h4 className="text-lg font-semibold mt-6">WebDriver Setup</h4>
          <p className="text-gray-700 dark:text-gray-300">
            You can use WebDriverManager to handle driver executables:
          </p>
          
          <CodeExample
            examples={[
              {
                language: 'xml',
                code: `<dependency>
  <groupId>io.github.bonigarcia</groupId>
  <artifactId>webdrivermanager</artifactId>
  <version>5.3.3</version>
</dependency>`,
                label: 'pom.xml (WebDriverManager)'
              }
            ]}
          />
        </TabsContent>
      </Tabs>

      <div className="prose prose-lg max-w-none dark:prose-invert mt-8">
        <h3>Verifying Installation</h3>
        <p>
          Let's verify that Selenium WebDriver was installed correctly with a simple script. 
          We'll look at how to do this in the next section.
        </p>
      </div>
    </div>
  );
}