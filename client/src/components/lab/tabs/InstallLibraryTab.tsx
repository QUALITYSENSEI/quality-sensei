import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import { Info, FileTerminal, Code } from "lucide-react";
import Terminal from "@/components/ui/Terminal";
import TerminalCodeTabs from "@/components/ui/TerminalCodeTabs";
import { SiPython, SiJavascript } from "@/components/IconImports";

export default function InstallLibraryTab() {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "prose prose-lg max-w-none",
      theme === "dark" 
        ? "prose-invert prose-headings:text-white prose-a:text-[#40E0D0]" 
        : "prose-headings:text-gray-900 prose-a:text-[#00BCD4]"
    )}>
      <h3>Install a Selenium Library</h3>
      <p>
        Setting up the Selenium library for your favorite programming language is the first step.
        The installation process depends on the language you choose to use. Make sure to check the
        <a href="https://www.selenium.dev/downloads/" target="_blank" rel="noopener noreferrer"> Selenium downloads page </a>
        to ensure you're using the latest version.
      </p>

      <div className="my-8">
        <h4>Requirements by Language</h4>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <FileTerminal className="text-orange-500 h-4 w-4" /> <span>Java</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <SiPython className="text-blue-500" /> <span>Python</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <Code className="text-purple-500 h-4 w-4" /> <span>C#</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <FileTerminal className="text-red-500 h-4 w-4" /> <span>Ruby</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <SiJavascript className="text-yellow-500" /> <span>JavaScript</span>
          </div>
          <div className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md",
            theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
          )}>
            <Code className="text-blue-400 h-4 w-4" /> <span>Kotlin</span>
          </div>
        </div>
        
        <p>Java requires at least Java 8 for Selenium WebDriver (view the <a href="https://www.selenium.dev/documentation/webdriver/getting_started/install_library/" target="_blank" rel="noopener noreferrer">minimum supported Java version here</a>).</p>
        <p>Installation of Selenium libraries for Java is accomplished using a build tool.</p>
        
        <TerminalCodeTabs 
          title="Java Dependency Configuration" 
          description="Choose your preferred build tool:"
          tabs={[
            {
              id: "maven",
              label: "Maven",
              code: `<dependency>
    <groupId>org.seleniumhq.selenium</groupId>
    <artifactId>selenium-java</artifactId>
    <version>\${selenium.version}</version>
</dependency>`
            },
            {
              id: "gradle",
              label: "Gradle",
              code: `testImplementation 'org.seleniumhq.selenium:selenium-java:4.29.0'
testImplementation 'org.junit.jupiter:junit-jupiter-engine:5.12.0'`
            }
          ]}
          className="my-6"
        />
      </div>

      <div className="mt-8">
        <h3>Terminal Commands</h3>
        <p>Here's how you can install Selenium using package managers in different languages:</p>
        
        <Terminal 
          lines={[
            { type: 'command', content: 'pip install selenium', delay: 500 },
            { type: 'output', content: 'Collecting selenium', delay: 1000 },
            { type: 'output', content: '  Downloading selenium-4.29.0.tar.gz (8.9 MB)', delay: 1500 },
            { type: 'output', content: 'Installing collected packages: selenium', delay: 2000 },
            { type: 'success', content: 'Successfully installed selenium-4.29.0', delay: 2500 },
            { type: 'cursor', content: '', delay: 3000 }
          ]}
          language="Python"
          className="mb-4"
        />
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
          Always check the compatibility between your browser version and the WebDriver version you're using.
        </p>
      </div>
    </div>
  );
}