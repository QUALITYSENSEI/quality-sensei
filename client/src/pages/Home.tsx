import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeatureSection from "@/components/FeatureSection";
import CoursesSection from "@/components/CoursesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Quality Sensei - Software Testing Courses</title>
        <meta name="description" content="Master software testing with Quality Sensei's expert-led courses. Learn QA fundamentals, automation, and advanced testing techniques." />
      </Helmet>
      
      <Header />
      
      <main>
        <HeroSection />
        <FeatureSection />
        <CoursesSection />
        <TestimonialsSection />
        <CTASection />
        <AboutSection />
        <ContactSection />
      </main>
      
      <Footer />
    </>
  );
}
