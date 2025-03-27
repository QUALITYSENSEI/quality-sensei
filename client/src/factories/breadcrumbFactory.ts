import React from 'react';
import { useLocation } from 'wouter';

export interface BreadcrumbItem {
  label: string;
  path: string;
  isActive?: boolean;
  icon?: React.ReactNode;
}

export interface BreadcrumbFactoryProps {
  separator?: string | React.ReactNode;
  homeItem?: {
    label: string;
    path: string;
    icon?: React.ReactNode;
  };
  maxItems?: number;
  showIcons?: boolean;
  collapsed?: boolean;
  collapsedLabel?: string;
}

export function createBreadcrumb(props: BreadcrumbFactoryProps = {}) {
  const {
    separator = '/',
    homeItem = { label: 'Home', path: '/' },
    maxItems = 0,
    showIcons = true,
    collapsed = false,
    collapsedLabel = '...'
  } = props;
  
  return {
    separator,
    homeItem,
    maxItems,
    showIcons,
    collapsed,
    collapsedLabel,
    
    /**
     * Generate breadcrumbs based on the current path
     */
    generateFromPath: (
      currentPath: string,
      pathMap?: Record<string, { label: string, icon?: React.ReactNode }>
    ): BreadcrumbItem[] => {
      if (currentPath === '/') {
        return [{ ...homeItem, isActive: true }];
      }
      
      // Split the path and remove empty segments
      const pathSegments = currentPath.split('/').filter(Boolean);
      const breadcrumbs: BreadcrumbItem[] = [{ ...homeItem, isActive: false }];
      
      // Build up the paths and labels
      let currentBuiltPath = '';
      
      pathSegments.forEach((segment, index) => {
        currentBuiltPath += `/${segment}`;
        const isLast = index === pathSegments.length - 1;
        
        // Get label from pathMap if available, otherwise capitalize the segment
        const segmentInfo = pathMap && pathMap[currentBuiltPath] 
          ? pathMap[currentBuiltPath] 
          : { label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ') };
        
        breadcrumbs.push({
          label: segmentInfo.label,
          path: currentBuiltPath,
          isActive: isLast,
          icon: segmentInfo.icon
        });
      });
      
      // Apply max items limit if specified
      if (maxItems > 0 && breadcrumbs.length > maxItems) {
        const visibleCount = maxItems - 2; // Reserve spots for home and current
        const startItems = [breadcrumbs[0]];
        const endItems = breadcrumbs.slice(breadcrumbs.length - (visibleCount + 1));
        const collapsedItem: BreadcrumbItem = {
          label: collapsedLabel,
          path: '',
          isActive: false
        };
        
        return [...startItems, collapsedItem, ...endItems];
      }
      
      return breadcrumbs;
    },
    
    /**
     * Create a hook to get breadcrumbs based on current location
     */
    useBreadcrumbs: (
      pathMap?: Record<string, { label: string, icon?: React.ReactNode }>
    ) => {
      const [location] = useLocation();
      
      const breadcrumbs = React.useMemo(() => {
        return pathMap 
          ? generateBreadcrumbsFromLocation(location, pathMap)
          : generateBreadcrumbsFromLocation(location);
      }, [location, pathMap]);
      
      return breadcrumbs;
      
      function generateBreadcrumbsFromLocation(
        path: string,
        customPathMap?: Record<string, { label: string, icon?: React.ReactNode }>
      ) {
        return createBreadcrumb({
          separator,
          homeItem,
          maxItems,
          showIcons,
          collapsed,
          collapsedLabel
        }).generateFromPath(path, customPathMap);
      }
    }
  };
}