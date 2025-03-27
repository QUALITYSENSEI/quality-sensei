import MainLayout from "@/layouts/MainLayout";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingChatBot from "@/components/ui/FloatingChatBot";

export default function Home() {
  return (
    <MainLayout
      title="Quality Sensei - Software Testing Courses"
      description="Master software testing with Quality Sensei's expert-led courses. Learn QA fundamentals, automation, and advanced testing techniques."
      keywords="software testing, QA training, quality assurance, test automation, API testing, performance testing"
    >
      <ScrollProgress />
      
      <HeroSection />
      <FeatureSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
      <AboutSection />
      <ContactSection />
      
      <FloatingChatBot />
    </MainLayout>
  );
}
