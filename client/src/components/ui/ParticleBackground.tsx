import { useCallback, useEffect, useState, memo, lazy, Suspense } from "react";
import type { Engine } from "tsparticles-engine";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";

// Dynamic import with chunking for better code splitting
const Particles = lazy(() => 
  import(/* webpackChunkName: "particles" */ "react-tsparticles")
);

interface ParticleBackgroundProps {
  className?: string;
}

function ParticleBackground({ className }: ParticleBackgroundProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if Intersection Observer is available
  const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';
  
  useEffect(() => {
    // Only load particles when the page has finished initial render
    // and after a longer delay for better overall page performance
    const timer = setTimeout(() => {
      setMounted(true);
    }, 2000); // Increased delay to 2 seconds
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!mounted || !hasIntersectionObserver) return;
    
    // Use Intersection Observer to only render particles when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setShouldRender(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    const target = document.getElementById('particle-container');
    if (target) observer.observe(target);
    
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [mounted, hasIntersectionObserver]);

  const particlesInit = useCallback(async (engine: Engine) => {
    // Only import the slim version when needed for better performance
    try {
      const loadSlimModule = await import(/* webpackChunkName: "tsparticles-slim" */ "tsparticles-slim");
      await loadSlimModule.loadSlim(engine);
    } catch (error) {
      console.error("Failed to load particles:", error);
    }
  }, []);

  // Simple gradient background (always rendered)
  const gradientBackground = (
    <div className={`absolute inset-0 z-0 ${className} bg-gradient-to-br from-transparent via-cyan-500/5 to-transparent`} />
  );
  
  // Return simple gradient background if not yet ready to show particles
  if (!mounted || !shouldRender) {
    return <div id="particle-container" className="relative w-full h-full">{gradientBackground}</div>;
  }

  // Extremely reduced particles count and effects for performance
  const particleCount = isMobile ? 15 : 30; // Further reduced
  const particleSpeed = isMobile ? 0.8 : 1.5; // Slower particles
  const enableHoverInteraction = !isMobile && !matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div id="particle-container" className={`absolute inset-0 z-0 ${className}`}>
      <Suspense fallback={gradientBackground}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            fullScreen: false,
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 30, // Further reduced for better performance
            interactivity: {
              events: {
                onClick: {
                  enable: false, // Disable click interactions for performance
                },
                onHover: {
                  enable: enableHoverInteraction,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                repulse: {
                  distance: 50, // Further reduced
                  duration: 0.2, // Further reduced
                },
              },
            },
            particles: {
              color: {
                value: theme === "dark" ? "#40E0D0" : "#00BCD4",
              },
              links: {
                color: theme === "dark" ? "#40E0D0" : "#00BCD4",
                distance: 100, // Reduced distance
                enable: true,
                opacity: 0.3, // Reduced opacity
                width: isMobile ? 0.5 : 0.8, // Thinner lines
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out", // Changed from bounce to out for performance
                },
                random: false,
                speed: particleSpeed,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 1000, // Increased area for fewer particles
                },
                limit: particleCount, // Add a hard limit
                value: particleCount,
              },
              opacity: {
                value: 0.3, // Reduced opacity
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 2 }, // Even smaller particles
              },
              collisions: {
                enable: false,
              }
            },
            detectRetina: false,
            pauseOnBlur: true, // Pause when tab not focused
            pauseOnOutsideViewport: true, // Pause when not visible
          }}
          className="absolute inset-0"
        />
      </Suspense>
    </div>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(ParticleBackground);