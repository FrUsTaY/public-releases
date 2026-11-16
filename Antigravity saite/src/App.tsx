import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { DemoBanner } from './components/common/DemoBanner';
import { AppointmentModal } from './components/common/AppointmentModal';
import { PrivacyModal } from './components/common/PrivacyModal';

// Home Views
import { HeroSection } from './components/home/HeroSection';
import { AdvantagesSection } from './components/home/AdvantagesSection';
import { DirectionsSection } from './components/home/DirectionsSection';
import { PopularServicesSection } from './components/home/PopularServicesSection';
import { WorkflowSection } from './components/home/WorkflowSection';
import { StatsSection } from './components/home/StatsSection';
import { ReviewsSection } from './components/home/ReviewsSection';
import { FaqSection } from './components/home/FaqSection';
import { CtaSection } from './components/home/CtaSection';

// Page Views
import { ServicesPage } from './components/services/ServicesPage';
import { CalculatorsHub } from './components/calculators/CalculatorsHub';
import { AboutPage } from './components/about/AboutPage';
import { ContactsPage } from './components/contacts/ContactsPage';

export function App() {
  const [currentView, setCurrentView] = useState<'home' | 'services' | 'calculators' | 'about' | 'contacts'>('home');
  const [selectedDirectionFilter, setSelectedDirectionFilter] = useState<string>('all');
  const [calculatorTab, setCalculatorTab] = useState<'repair' | 'maintenance' | 'build' | 'upgrade'>('repair');
  
  // Appointment Modal
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentPrefill, setAppointmentPrefill] = useState<{
    deviceType?: string;
    problem?: string;
    estimatedCost?: number;
    calculatorNotes?: string;
  } | undefined>(undefined);

  // Privacy Modal
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Sync with URL hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'services', 'calculators', 'about', 'contacts'].includes(hash)) {
        setCurrentView(hash as any);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (view: string, subTarget?: string) => {
    setCurrentView(view as any);
    window.location.hash = view;
    if (subTarget && view === 'services') {
      setSelectedDirectionFilter(subTarget);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAppointment = (prefill?: {
    deviceType?: string;
    problem?: string;
    estimatedCost?: number;
    calculatorNotes?: string;
  }) => {
    setAppointmentPrefill(prefill);
    setIsAppointmentOpen(true);
  };

  const handleCalculatorOrder = (data: {
    deviceType: string;
    problem: string;
    estimatedCost: number;
    notes: string;
  }) => {
    handleOpenAppointment({
      deviceType: data.deviceType,
      problem: data.problem,
      estimatedCost: data.estimatedCost,
      calculatorNotes: data.notes
    });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col justify-between selection:bg-cyan-500/25 selection:text-cyan-glow">
      <DemoBanner />

      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenAppointment={handleOpenAppointment}
      />

      <main className="flex-1">
        {currentView === 'home' && (
          <>
            <HeroSection
              onOpenAppointment={() => handleOpenAppointment()}
              onNavigateToCalculator={() => handleNavigate('calculators')}
              onNavigateToServices={() => handleNavigate('services')}
            />
            <AdvantagesSection />
            <DirectionsSection
              onSelectDirection={(dirId) => handleNavigate('services', dirId)}
              onOpenAppointment={handleOpenAppointment}
            />
            <PopularServicesSection
              onOpenAppointment={handleOpenAppointment}
              onNavigateToServices={() => handleNavigate('services')}
            />
            <CalculatorsHub
              initialTab="repair"
              onOrder={handleCalculatorOrder}
            />
            <WorkflowSection />
            <StatsSection />
            <ReviewsSection />
            <FaqSection />
            <CtaSection onOpenAppointment={handleOpenAppointment} />
          </>
        )}

        {currentView === 'services' && (
          <ServicesPage
            onOpenAppointment={handleOpenAppointment}
            onNavigateToCalculator={(tab) => {
              if (tab) setCalculatorTab(tab as any);
              handleNavigate('calculators');
            }}
            selectedDirectionFilter={selectedDirectionFilter}
          />
        )}

        {currentView === 'calculators' && (
          <div className="pt-24 bg-dark-950">
            <CalculatorsHub
              initialTab={calculatorTab}
              onOrder={handleCalculatorOrder}
            />
          </div>
        )}

        {currentView === 'about' && <AboutPage />}

        {currentView === 'contacts' && <ContactsPage />}
      </main>

      <Footer
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        prefill={appointmentPrefill}
      />

      {/* Privacy Policy Modal */}
      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />
    </div>
  );
}

export default App;
