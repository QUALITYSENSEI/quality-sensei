import React from 'react';

export interface FeatureFactoryProps {
  id: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  link?: {
    text: string;
    url: string;
  };
  highlight?: boolean;
  bgColor?: string;
  textColor?: string;
  order?: number;
}

export function createFeature(props: FeatureFactoryProps) {
  return {
    ...props,
    isHighlighted: !!props.highlight,
    hasIcon: !!props.icon,
    hasImage: !!props.image,
    hasLink: !!props.link,
    isEven: (props.order || 0) % 2 === 0,
    getBgColorClass: () => {
      if (props.bgColor) return props.bgColor;
      return props.isHighlighted ? 'bg-primary-50 dark:bg-primary-900/20' : 'bg-transparent';
    },
    getTextColorClass: () => {
      if (props.textColor) return props.textColor;
      return 'text-gray-600 dark:text-gray-300';
    },
    getTitleColorClass: () => {
      if (props.textColor) return props.textColor;
      return props.isHighlighted ? 'text-primary-600 dark:text-primary-400' : 'text-gray-900 dark:text-white';
    }
  };
}