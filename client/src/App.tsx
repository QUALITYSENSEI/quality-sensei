import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import PracticalLabs from "@/pages/PracticalLabs";
import AutomationTestingLab from "@/pages/labs/automation-testing";
import SeleniumWebDriverLab from "@/pages/labs/selenium-webdriver";
import SeleniumGridLab from "@/pages/labs/selenium-grid";
import ComponentShowcase from "@/pages/ComponentShowcase";
import { Helmet } from "react-helmet-async";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";

function Router() {
  const [location] = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/labs" component={PracticalLabs} />
      <Route path="/labs/automation-testing" component={AutomationTestingLab} />
      <Route path="/labs/selenium-webdriver" component={SeleniumWebDriverLab} />
      <Route path="/labs/selenium-grid" component={SeleniumGridLab} />
      <Route path="/components" component={ComponentShowcase} />
      <Route component={NotFound} />
    </Switch>
  );
}

// Inner App component that uses theme context
function AppContent() {
  const { theme } = useTheme();
  
  return (
    <>
      <Helmet>
        <title>Quality Sensei - Software Testing Courses</title>
        <meta name="description" content="Master software testing with Quality Sensei's expert-led courses. Learn QA fundamentals, automation, and advanced testing techniques." />
        <meta name="theme-color" content={theme === 'dark' ? '#40E0D0' : '#00BCD4'} />
        <meta name="keywords" content="software testing, QA training, quality assurance, test automation, API testing, performance testing" />
        <meta property="og:title" content="Quality Sensei - Software Testing Courses" />
        <meta property="og:description" content="Master software testing with Quality Sensei's expert-led courses." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Router />
      <Toaster />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
