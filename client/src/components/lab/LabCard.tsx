import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

export interface LabCardProps {
  id: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: string;
  languages?: string[];
  modules?: number;
  students?: number;
  level?: string;
  route?: string;
  comingSoon?: boolean;
  onClick?: () => void;
  className?: string;
}

/**
 * Reusable lab card component for displaying courses/labs
 */
export default function LabCard({
  id,
  title,
  description,
  icon,
  color,
  languages = [],
  modules,
  students,
  level,
  route,
  comingSoon = false,
  onClick,
  className = ''
}: LabCardProps) {
  const { theme } = useTheme();
  
  const handleClick = () => {
    if (comingSoon) return;
    
    if (onClick) {
      onClick();
    } else if (route) {
      window.location.href = route;
    }
  };
  
  return (
    <div 
      key={id}
      className={cn(
        "rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-200 relative",
        theme === 'dark' ? 'bg-gray-800' : 'bg-white',
        className
      )}
    >
      {/* Coming Soon overlay */}
      {comingSoon && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-10">
          <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-4 py-2 rounded-full font-bold transform -rotate-12 shadow-lg">
            Coming Soon
          </div>
        </div>
      )}
    
      <div 
        className="block relative cursor-pointer" 
        onClick={handleClick}
      >
        {/* Header with icon */}
        <div className={cn(
          "h-24 flex items-center justify-center bg-gradient-to-r",
          color
        )}>
          <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
            {icon}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{description}</p>
          
          {/* Stats */}
          {(modules || students || level) && (
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              {modules && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Modules</p>
                  <p className="font-bold">{modules}</p>
                </div>
              )}
              {students && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Students</p>
                  <p className="font-bold">{students.toLocaleString()}</p>
                </div>
              )}
              {languages.length > 0 && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Languages</p>
                  <p className="font-bold">{languages.length}</p>
                </div>
              )}
              {level && (
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Level</p>
                  <p className="font-bold">{level}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {languages.map((lang, i) => (
                <span 
                  key={i}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full"
                >
                  {lang}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}