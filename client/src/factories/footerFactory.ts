import React from 'react';

export interface FooterLink {
  label: string;
  href: string;
  icon?: React.ReactNode;
  isExternal?: boolean;
}

export interface FooterSectionFactoryProps {
  title: string;
  links: FooterLink[];
}

export interface FooterFactoryProps {
  logo?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  tagline?: string;
  sections: FooterSectionFactoryProps[];
  socialLinks?: {
    platform: string;
    href: string;
    icon: React.ReactNode;
  }[];
  legalLinks?: FooterLink[];
  newsletter?: {
    title: string;
    description: string;
    buttonText: string;
    placeholderText?: string;
    thanksMessage?: string;
  };
  copyright?: string;
  backgroundColor?: string;
  textColor?: string;
  borderTop?: boolean;
}

export function createFooter(props: FooterFactoryProps) {
  const currentYear = new Date().getFullYear();
  const copyrightText = props.copyright?.replace(/\{year\}/g, currentYear.toString()) || 
    `© ${currentYear} Quality Sensei. All rights reserved.`;
  
  return {
    ...props,
    hasLogo: !!props.logo,
    hasTagline: !!props.tagline,
    hasSocialLinks: !!(props.socialLinks && props.socialLinks.length > 0),
    hasLegalLinks: !!(props.legalLinks && props.legalLinks.length > 0),
    hasNewsletter: !!props.newsletter,
    hasBorder: !!props.borderTop,
    copyright: copyrightText,
    getBackgroundClass: () => {
      return props.backgroundColor || 'bg-gray-50 dark:bg-gray-900';
    },
    getTextClass: () => {
      return props.textColor || 'text-gray-500 dark:text-gray-400';
    },
    getSocialLinkClass: (platform: string) => {
      const baseClass = 'flex items-center justify-center w-8 h-8 rounded-full transition-colors';
      
      switch (platform.toLowerCase()) {
        case 'twitter':
        case 'x':
          return `${baseClass} bg-black hover:bg-gray-800 text-white`;
        case 'facebook':
          return `${baseClass} bg-blue-600 hover:bg-blue-700 text-white`;
        case 'instagram':
          return `${baseClass} bg-pink-600 hover:bg-pink-700 text-white`;
        case 'linkedin':
          return `${baseClass} bg-blue-700 hover:bg-blue-800 text-white`;
        case 'youtube':
          return `${baseClass} bg-red-600 hover:bg-red-700 text-white`;
        case 'github':
          return `${baseClass} bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-700 dark:hover:bg-gray-600`;
        default:
          return `${baseClass} bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200`;
      }
    },
    getLinkClass: (isExternal = false) => {
      const baseClass = 'hover:underline transition-colors text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300';
      return isExternal ? `${baseClass} flex items-center gap-1` : baseClass;
    },
    getAllLinks: () => {
      const allLinks: FooterLink[] = [];
      
      props.sections.forEach(section => {
        section.links.forEach(link => {
          allLinks.push(link);
        });
      });
      
      props.legalLinks?.forEach(link => {
        allLinks.push(link);
      });
      
      return allLinks;
    }
  };
}