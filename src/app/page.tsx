import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { WorkSection } from '@/components/sections/WorkSection';
import { FeaturedAdoptionsSection } from '@/components/sections/FeaturedAdoptionsSection';
import { DonationsSection } from '@/components/sections/DonationsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ScrollToTop } from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <FeaturedAdoptionsSection />
        <DonationsSection />
        <ContactSection />
        <FAQSection />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
