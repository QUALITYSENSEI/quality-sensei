import React from 'react';

export interface TestimonialFactoryProps {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
  companyLogoUrl?: string;
  featured?: boolean;
  verified?: boolean;
  date?: string;
}

export function createTestimonial(props: TestimonialFactoryProps) {
  return {
    ...props,
    isFeatured: !!props.featured,
    isVerified: !!props.verified,
    hasAvatar: !!props.avatarUrl,
    hasCompanyLogo: !!props.companyLogoUrl,
    getInitials: () => {
      const nameParts = props.name.split(' ');
      if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();
      return (nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)).toUpperCase();
    },
    getRatingStars: () => {
      if (!props.rating) return null;
      const fullStars = Math.floor(props.rating);
      const hasHalfStar = props.rating % 1 >= 0.5;
      const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      
      return {
        fullStars,
        hasHalfStar,
        emptyStars
      };
    },
    getFormattedDate: () => {
      if (!props.date) return '';
      try {
        return new Date(props.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      } catch (e) {
        return props.date;
      }
    }
  };
}