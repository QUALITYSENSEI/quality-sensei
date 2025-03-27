import React from 'react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  isExternal?: boolean;
  children?: NavItem[];
  isNew?: boolean;
  disabled?: boolean;
}

export interface NavigationFactoryProps {
  logo: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  items: NavItem[];
  actionButtons?: {
    primary?: {
      label: string;
      href: string;
      icon?: React.ReactNode;
    };
    secondary?: {
      label: string;
      href: string;
      icon?: React.ReactNode;
    };
  };
  showThemeToggle?: boolean;
  position?: 'fixed' | 'sticky' | 'relative';
  transparent?: boolean;
  fullWidth?: boolean;
  hideOnScroll?: boolean;
}

export function createNavigation(props: NavigationFactoryProps) {
  return {
    ...props,
    hasPrimaryAction: !!props.actionButtons?.primary,
    hasSecondaryAction: !!props.actionButtons?.secondary,
    hasThemeToggle: !!props.showThemeToggle,
    hasNestedItems: props.items.some(item => item.children && item.children.length > 0),
    getPositionClass: () => {
      switch (props.position) {
        case 'fixed': return 'fixed top-0 left-0 right-0 z-50';
        case 'sticky': return 'sticky top-0 z-50';
        default: return 'relative';
      }
    },
    getBackgroundClass: (isDark: boolean) => {
      if (props.transparent) return 'bg-transparent';
      return isDark ? 'bg-gray-900' : 'bg-white';
    },
    getMaxWidthClass: () => {
      return props.fullWidth ? 'w-full' : 'max-w-7xl mx-auto';
    },
    getItemsWithActive: (currentPath: string) => {
      const checkActive = (item: NavItem): NavItem => {
        // Check if current path starts with the item's href (for nested routes)
        const isActive = currentPath === item.href || 
          (item.href !== '/' && currentPath.startsWith(item.href));
        
        // Process children recursively if they exist
        const children = item.children?.map(checkActive);
        
        // Item is also active if any child is active
        const hasActiveChild = children?.some(child => child.active);
        
        return {
          ...item, 
          active: isActive || hasActiveChild,
          children
        };
      };
      
      return props.items.map(checkActive);
    },
    findActiveTrail: (currentPath: string): NavItem[] => {
      const findTrail = (items: NavItem[], trail: NavItem[] = []): NavItem[] => {
        for (const item of items) {
          const isMatch = currentPath === item.href || 
            (item.href !== '/' && currentPath.startsWith(item.href));
          
          if (isMatch) {
            return [...trail, item];
          }
          
          if (item.children?.length) {
            const childTrail = findTrail(item.children, [...trail, item]);
            if (childTrail.length > trail.length) {
              return childTrail;
            }
          }
        }
        
        return trail;
      };
      
      return findTrail(props.items);
    }
  };
}