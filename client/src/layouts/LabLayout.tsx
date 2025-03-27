import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LabLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  keywords?: string;
  metaImage?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  className?: string;
}

/**
 * Layout component for lab pages
 */
export default function LabLayout({
  children,
  title,
  description,
  keywords,
  metaImage,
  showHeader = true,
  showFooter = true,
  className = ''
}: LabLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Quality Sensei</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        {metaImage && <meta property="og:image" content={metaImage} />}
      </Helmet>

      {showHeader && <Header />}
      
      <main className={`min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 ${className}`}>
        {children}
      </main>
      
      {showFooter && <Footer />}
    </>
  );
}