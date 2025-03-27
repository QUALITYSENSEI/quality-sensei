import React from 'react';

export type LabDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type LabStatus = 'completed' | 'in-progress' | 'not-started' | 'coming-soon';

export interface LabModule {
  id: string;
  title: string;
  description: string;
  content?: string;
  duration?: string;
  status?: LabStatus;
  order?: number;
  prerequisites?: string[];
}

export interface LabFactoryProps {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: React.ReactNode;
  image?: string;
  difficulty: LabDifficulty;
  duration: string;
  modules: LabModule[];
  category: string;
  tags?: string[];
  prerequisites?: string[];
  relatedLabs?: string[];
  color?: string;
  bgGradient?: string;
  status?: LabStatus;
  authorName?: string;
  authorAvatar?: string;
  completionPercentage?: number;
}

export function createLabModule(props: LabModule) {
  return {
    ...props,
    order: props.order || 0,
    status: props.status || 'not-started',
    hasPrerequisites: !!(props.prerequisites && props.prerequisites.length > 0),
    isCompleted: props.status === 'completed',
    isInProgress: props.status === 'in-progress',
    isLocked: props.status === 'not-started' && props.prerequisites && props.prerequisites.length > 0,
    getStatusClass: () => {
      switch (props.status) {
        case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
        case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
        case 'coming-soon': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
    },
    getStatusIcon: () => {
      switch (props.status) {
        case 'completed': return 'check-circle';
        case 'in-progress': return 'play-circle';
        case 'coming-soon': return 'clock';
        default: return 'lock';
      }
    },
    getDurationLabel: () => {
      return props.duration || '15 min';
    }
  };
}

export function createLab(props: LabFactoryProps) {
  const modules = props.modules.map(module => createLabModule(module))
    .sort((a, b) => a.order - b.order);
  
  return {
    ...props,
    modules,
    hasIcon: !!props.icon,
    hasImage: !!props.image,
    hasTags: !!(props.tags && props.tags.length > 0),
    hasPrerequisites: !!(props.prerequisites && props.prerequisites.length > 0),
    hasRelatedLabs: !!(props.relatedLabs && props.relatedLabs.length > 0),
    isComingSoon: props.status === 'coming-soon',
    isCompleted: props.status === 'completed',
    isInProgress: props.status === 'in-progress',
    hasAuthor: !!(props.authorName),
    
    getDifficultyClass: () => {
      switch (props.difficulty) {
        case 'Beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
        case 'Intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
        case 'Advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
    },
    
    getStatusClass: () => {
      switch (props.status) {
        case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
        case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100';
        case 'coming-soon': return 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100';
        default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100';
      }
    },
    
    getBgGradient: () => {
      return props.bgGradient || `bg-gradient-to-br from-${props.color || 'blue'}-500 to-${props.color || 'blue'}-700`;
    },
    
    getCompletedModulesCount: () => {
      return modules.filter(module => module.status === 'completed').length;
    },
    
    getProgressPercentage: () => {
      if (props.completionPercentage !== undefined) return props.completionPercentage;
      
      if (modules.length === 0) return 0;
      const completedCount = modules.filter(module => module.status === 'completed').length;
      return Math.round((completedCount / modules.length) * 100);
    },
    
    getCurrentModule: () => {
      const inProgressModule = modules.find(module => module.status === 'in-progress');
      if (inProgressModule) return inProgressModule;
      
      // If no module is in progress, return the first uncompleted module
      const nextModule = modules.find(module => module.status === 'not-started');
      return nextModule || modules[0];
    },
    
    getNextModule: (currentModuleId: string) => {
      const currentIndex = modules.findIndex(module => module.id === currentModuleId);
      if (currentIndex < 0 || currentIndex >= modules.length - 1) return null;
      return modules[currentIndex + 1];
    },
    
    getPreviousModule: (currentModuleId: string) => {
      const currentIndex = modules.findIndex(module => module.id === currentModuleId);
      if (currentIndex <= 0) return null;
      return modules[currentIndex - 1];
    }
  };
}