import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { Helmet } from "react-helmet-async";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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
