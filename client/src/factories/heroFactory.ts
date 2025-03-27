import React from 'react';

export interface HeroFactoryProps {
  title: string;
  subtitle: string;
  imageUrl?: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  align?: 'left' | 'center' | 'right';
  overlayColor?: string;
  backgroundType?: 'image' | 'gradient' | 'solid';
  backgroundColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  textColor?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
}

export const defaultHeroProps: HeroFactoryProps = {
  title: 'Master Software Testing with Quality Sensei',
  subtitle: 'Practical courses and hands-on labs to help you become a testing expert',
  ctaText: 'Explore Courses',
  ctaLink: '#courses',
  secondaryCtaText: 'Try Free Labs',
  secondaryCtaLink: '/labs',
  align: 'center',
  backgroundType: 'gradient',
  gradientFrom: '#4F46E5',
  gradientTo: '#7C3AED',
  textColor: 'white',
  height: 'lg'
};

export function createHero(props: Partial<HeroFactoryProps> = {}) {
  const mergedProps = { ...defaultHeroProps, ...props };
  
  return {
    ...mergedProps,
    hasSecondaryAction: !!mergedProps.secondaryCtaText,
    getBackgroundStyle: () => {
      if (mergedProps.backgroundType === 'image' && mergedProps.imageUrl) {
        return {
          backgroundImage: `url(${mergedProps.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        };
      } else if (mergedProps.backgroundType === 'gradient') {
        return {
          background: `linear-gradient(to right, ${mergedProps.gradientFrom}, ${mergedProps.gradientTo})`
        };
      } else {
        return {
          backgroundColor: mergedProps.backgroundColor
        };
      }
    },
    getTextAlignment: () => {
      if (mergedProps.align === 'left') return 'text-left';
      if (mergedProps.align === 'right') return 'text-right';
      return 'text-center';
    },
    getHeightClass: () => {
      switch (mergedProps.height) {
        case 'sm': return 'min-h-[30vh]';
        case 'md': return 'min-h-[50vh]';
        case 'lg': return 'min-h-[70vh]';
        case 'xl': return 'min-h-[90vh]';
        default: return 'min-h-[70vh]';
      }
    }
  };
}