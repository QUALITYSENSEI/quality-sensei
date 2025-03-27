import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Helmet } from "react-helmet-async";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { lazy, Suspense } from "react";

// Lazy-loaded pages for better performance
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Labs = lazy(() => import("@/pages/Labs"));
const AutomationLabs = lazy(() => import("@/pages/AutomationLabs"));
const SeleniumLab = lazy(() => import("@/pages/SeleniumLab"));

// Loading component for page transitions
const PageLoading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoading />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/labs" component={Labs} />
        <Route path="/labs/automation" component={AutomationLabs} />
        <Route path="/labs/automation/selenium" component={SeleniumLab} />
        <Route path="/labs/automation/selenium/:moduleId" component={SeleniumLab} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
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
