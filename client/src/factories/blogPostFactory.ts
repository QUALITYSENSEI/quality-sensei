import React from 'react';

export interface BlogPostFactoryProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl?: string;
  author: {
    name: string;
    avatarUrl?: string;
    bio?: string;
  };
  category: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  readTime?: number;
  featured?: boolean;
  views?: number;
  relatedPosts?: string[];
}

export function createBlogPost(props: BlogPostFactoryProps) {
  return {
    ...props,
    isFeatured: !!props.featured,
    hasImage: !!props.coverImageUrl,
    getPublishedDate: () => {
      try {
        return new Date(props.publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return props.publishedAt;
      }
    },
    getUpdatedDate: () => {
      if (!props.updatedAt) return null;
      try {
        return new Date(props.updatedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      } catch (e) {
        return props.updatedAt;
      }
    },
    getFormattedReadTime: () => {
      if (!props.readTime) return '';
      return `${props.readTime} min read`;
    },
    getFormattedViews: () => {
      if (!props.views) return '';
      return props.views > 1000 
        ? `${(props.views / 1000).toFixed(1)}K views` 
        : `${props.views} views`;
    },
    getTagLinks: () => {
      return props.tags?.map(tag => ({
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-')
      })) || [];
    },
    getExcerpt: (maxLength = 150) => {
      if (props.excerpt) return props.excerpt;
      
      // Strip HTML tags if content contains HTML
      const strippedContent = props.content.replace(/<[^>]*>?/gm, '');
      
      if (strippedContent.length <= maxLength) return strippedContent;
      
      // Trim to max length and ensure we don't cut words in half
      return strippedContent.substring(0, maxLength).replace(/\s+\S*$/, '...'); 
    }
  };
}