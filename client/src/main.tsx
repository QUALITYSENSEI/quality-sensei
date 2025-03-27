import { createRoot } from "react-dom/client";
import { lazy, Suspense } from "react";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

// Lazy load the main App component for better initial load performance
const App = lazy(() => import("./App"));

// Add a simple loading state
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div className="flex flex-col items-center">
      <div className="w-24 h-24 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">
        Loading Quality Sensei...
      </h2>
    </div>
  </div>
);

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </HelmetProvider>
);
