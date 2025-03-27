import { Variants } from 'framer-motion';

export type AnimationDirection = 'up' | 'down' | 'left' | 'right';
export type AnimationType = 'fade' | 'slide' | 'scale' | 'rotate' | 'flip' | 'bounce' | 'pulse' | 'wave';
export type AnimationTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
export type AnimationDuration = 'fast' | 'normal' | 'slow' | 'very-slow';

export interface AnimationFactoryProps {
  type: AnimationType;
  direction?: AnimationDirection;
  duration?: AnimationDuration | number;
  delay?: number;
  staggerChildren?: number;
  timing?: AnimationTiming;
  repeat?: number | 'infinity';
  custom?: any;
}

function getDurationValue(duration: AnimationDuration | number): number {
  if (typeof duration === 'number') return duration;
  
  switch (duration) {
    case 'fast': return 0.3;
    case 'normal': return 0.5;
    case 'slow': return 0.8;
    case 'very-slow': return 1.5;
    default: return 0.5;
  }
}

export function createAnimation(props: AnimationFactoryProps): Variants {
  const {
    type,
    direction = 'up',
    duration = 'normal',
    delay = 0,
    staggerChildren = 0.1,
    timing = 'ease-out',
    repeat = 0,
    custom = {}
  } = props;
  
  const durationValue = getDurationValue(duration);
  
  // Default transition
  const transition = {
    duration: durationValue,
    delay,
    ease: timing,
    repeat: repeat === 'infinity' ? Infinity : repeat
  };
  
  // Base variants
  let variants: Variants = {
    initial: { transition },
    animate: { transition },
    exit: { transition },
    hover: { transition: { ...transition, duration: durationValue / 2 } }
  };
  
  // Calculate offset values based on direction
  const getOffsetX = () => direction === 'left' ? 50 : direction === 'right' ? -50 : 0;
  const getOffsetY = () => direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
  
  // Apply animation type
  switch (type) {
    case 'fade':
      variants = {
        initial: { opacity: 0, transition },
        animate: { opacity: 1, transition },
        exit: { opacity: 0, transition },
        hover: { opacity: 0.8, transition: { ...transition, duration: durationValue / 2 } }
      };
      break;
      
    case 'slide':
      variants = {
        initial: { 
          x: getOffsetX(), 
          y: getOffsetY(), 
          opacity: 0, 
          transition 
        },
        animate: { 
          x: 0, 
          y: 0, 
          opacity: 1, 
          transition 
        },
        exit: { 
          x: getOffsetX(), 
          y: getOffsetY(), 
          opacity: 0, 
          transition 
        },
        hover: { 
          x: getOffsetX() / 10, 
          y: getOffsetY() / 10, 
          transition: { ...transition, duration: durationValue / 2 } 
        }
      };
      break;
      
    case 'scale':
      variants = {
        initial: { scale: 0.8, opacity: 0, transition },
        animate: { scale: 1, opacity: 1, transition },
        exit: { scale: 0.8, opacity: 0, transition },
        hover: { scale: 1.05, transition: { ...transition, duration: durationValue / 2 } }
      };
      break;
      
    case 'rotate':
      variants = {
        initial: { rotate: -10, opacity: 0, transition },
        animate: { rotate: 0, opacity: 1, transition },
        exit: { rotate: 10, opacity: 0, transition },
        hover: { rotate: 2, transition: { ...transition, duration: durationValue / 2 } }
      };
      break;
      
    case 'flip':
      variants = {
        initial: { 
          rotateX: direction === 'up' || direction === 'down' ? 90 : 0,
          rotateY: direction === 'left' || direction === 'right' ? 90 : 0,
          opacity: 0, 
          transition 
        },
        animate: { 
          rotateX: 0, 
          rotateY: 0, 
          opacity: 1, 
          transition 
        },
        exit: { 
          rotateX: direction === 'up' || direction === 'down' ? -90 : 0,
          rotateY: direction === 'left' || direction === 'right' ? -90 : 0,
          opacity: 0, 
          transition 
        },
        hover: { 
          rotateX: direction === 'up' || direction === 'down' ? 5 : 0,
          rotateY: direction === 'left' || direction === 'right' ? 5 : 0,
          transition: { ...transition, duration: durationValue / 2 } 
        }
      };
      break;
      
    case 'bounce':
      variants = {
        initial: { y: -10, opacity: 0, transition },
        animate: { 
          y: 0, 
          opacity: 1, 
          transition: {
            ...transition,
            type: 'spring',
            stiffness: 300,
            damping: 10
          }
        },
        exit: { y: 10, opacity: 0, transition },
        hover: { 
          y: -5, 
          transition: { 
            ...transition, 
            duration: durationValue / 2,
            type: 'spring',
            stiffness: 300,
            damping: 10 
          } 
        }
      };
      break;
      
    case 'pulse':
      variants = {
        initial: { scale: 1, opacity: 0.5, transition },
        animate: { 
          scale: [0.98, 1.02, 1], 
          opacity: 1, 
          transition: {
            ...transition,
            times: [0, 0.5, 1],
            repeat: repeat === 'infinity' ? Infinity : repeat
          }
        },
        exit: { scale: 0.98, opacity: 0.5, transition },
        hover: { 
          scale: 1.05, 
          transition: { ...transition, duration: durationValue / 2 } 
        }
      };
      break;
    
    case 'wave':
      variants = {
        initial: { 
          opacity: 0, 
          transition 
        },
        animate: { 
          opacity: 1, 
          transition: {
            ...transition,
            staggerChildren
          }
        },
        exit: { 
          opacity: 0, 
          transition: {
            ...transition,
            staggerChildren: staggerChildren / 2
          }
        },
        hover: { 
          transition: { 
            ...transition, 
            duration: durationValue / 2 
          } 
        }
      };
      break;
  }
  
  // Add any custom values
  return {
    ...variants,
    initial: { ...variants.initial, ...custom.initial },
    animate: { ...variants.animate, ...custom.animate },
    exit: { ...variants.exit, ...custom.exit },
    hover: { ...variants.hover, ...custom.hover }
  };
}

// Special variants for staggered children
export const childVariants = {
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 }
  },
  slideDown: {
    initial: { y: -20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 }
  },
  slideLeft: {
    initial: { x: 20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 }
  },
  slideRight: {
    initial: { x: -20, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  scaleUp: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 }
  }
};