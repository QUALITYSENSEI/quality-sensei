import React from 'react';

export interface FAQItemFactoryProps {
  id: string;
  question: string;
  answer: string;
  category?: string;
  popular?: boolean;
}

export interface FAQFactoryProps {
  title: string;
  subtitle?: string;
  items: FAQItemFactoryProps[];
  categories?: string[];
  layout?: 'accordion' | 'grid' | 'cards';
  itemsPerPage?: number;
  showSearch?: boolean;
  contactText?: string;
  contactLink?: string;
}

export function createFAQItem(props: FAQItemFactoryProps) {
  return {
    ...props,
    isPopular: !!props.popular,
    hasCategory: !!props.category,
    getSlug: () => {
      return props.question
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    },
    getHighlightedAnswer: (searchTerm: string) => {
      if (!searchTerm) return props.answer;
      
      const regex = new RegExp(`(${searchTerm})`, 'gi');
      return props.answer.replace(regex, '<mark>$1</mark>');
    }
  };
}

export function createFAQ(props: FAQFactoryProps) {
  const faqItems = props.items.map(item => createFAQItem(item));
  
  return {
    ...props,
    items: faqItems,
    hasCategories: props.categories && props.categories.length > 0,
    hasSearch: !!props.showSearch,
    hasContact: !!(props.contactText && props.contactLink),
    getItemsByCategory: (category?: string) => {
      if (!category) return faqItems;
      return faqItems.filter(item => item.category === category);
    },
    searchItems: (searchTerm: string) => {
      if (!searchTerm) return faqItems;
      const lowercaseSearchTerm = searchTerm.toLowerCase();
      
      return faqItems.filter(item => 
        item.question.toLowerCase().includes(lowercaseSearchTerm) || 
        item.answer.toLowerCase().includes(lowercaseSearchTerm)
      );
    },
    getPopularItems: () => {
      return faqItems.filter(item => item.isPopular);
    },
    getPaginatedItems: (page: number = 1) => {
      const itemsPerPage = props.itemsPerPage || 10;
      const startIndex = (page - 1) * itemsPerPage;
      return faqItems.slice(startIndex, startIndex + itemsPerPage);
    },
    getTotalPages: () => {
      const itemsPerPage = props.itemsPerPage || 10;
      return Math.ceil(faqItems.length / itemsPerPage);
    }
  };
}