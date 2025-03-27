import React from 'react';
import { Clock, User, Award, DollarSign } from 'lucide-react';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';

export interface CourseFactoryProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: string;
  level: CourseLevel;
  duration: string;
  price: number;
  discountedPrice?: number;
  topics: string[];
  rating?: number;
  ratingCount?: number;
  featured?: boolean;
  comingSoon?: boolean;
  tags?: string[];
}

export const defaultCourseProps: Omit<CourseFactoryProps, 'id' | 'title' | 'description' | 'imageUrl' | 'instructor'> = {
  level: 'All Levels',
  duration: '8 hours',
  price: 99.99,
  topics: [],
  rating: 4.5,
  ratingCount: 0,
  featured: false,
  comingSoon: false,
  tags: []
};

export function createCourse(props: Partial<CourseFactoryProps> & Pick<CourseFactoryProps, 'id' | 'title' | 'description' | 'imageUrl' | 'instructor'>) {
  const mergedProps = { ...defaultCourseProps, ...props };
  
  return {
    ...mergedProps,
    isOnSale: !!mergedProps.discountedPrice && mergedProps.discountedPrice < mergedProps.price,
    discountPercentage: mergedProps.discountedPrice 
      ? Math.round(((mergedProps.price - mergedProps.discountedPrice) / mergedProps.price) * 100) 
      : 0,
    formattedPrice: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mergedProps.price),
    formattedDiscountedPrice: mergedProps.discountedPrice 
      ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(mergedProps.discountedPrice)
      : null,
    getLevelIcon: () => <Award size={18} />,
    getDurationIcon: () => <Clock size={18} />,
    getInstructorIcon: () => <User size={18} />,
    getPriceIcon: () => <DollarSign size={18} />,
    getFormattedDuration: () => mergedProps.duration,
    getBadgeVariant: () => {
      if (mergedProps.comingSoon) return 'warning';
      if (mergedProps.featured) return 'default';
      return 'secondary';
    },
    getBadgeText: () => {
      if (mergedProps.comingSoon) return 'Coming Soon';
      if (mergedProps.featured) return 'Featured';
      return '';
    }
  };
}