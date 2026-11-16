import React from 'react';
import { NavigationBar } from './components/NavigationBar';
import { HeroSection } from './components/HeroSection';
import { AdvantagesSection } from './components/AdvantagesSection';
import { ServicesSection } from './components/ServicesSection';
import { PopularServicesSection } from './components/PopularServicesSection';
import { HowWeWorkSection } from './components/HowWeWorkSection';
import { StatisticsSection } from './components/StatisticsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { RepairCostCalculator } from './components/RepairCostCalculator';
import { SupportPCCalculator } from './components/SupportPCCalculator';
import { PCBuildCalculator } from './components/PCBuildCalculator';
import { UpgradeCalculator } from './components/UpgradeCalculator';

export function App() {
  return (
    <div className="min-h-screen bg-dark text-white overflow-x-hidden">
      <NavigationBar />
      <HeroSection />
      <AdvantagesSection />
      <ServicesSection />
      <PopularServicesSection />
      <HowWeWorkSection />
      <StatisticsSection />
      <ReviewsSection />
      <FAQSection />
      <RepairCostCalculator />
      <SupportPCCalculator />
      <PCBuildCalculator />
      <UpgradeCalculator />
      <ContactSection />
      <Footer />
    </div>
  );
}