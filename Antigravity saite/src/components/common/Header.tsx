import React, { useState, useEffect } from 'react';
import { 
  Wrench, 
  Phone, 
  Menu, 
  X, 
  Sparkles, 
  Calculator, 
  Laptop, 
  Info, 
  MapPin,
  ChevronRight
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, subTarget?: string) => void;
  onOpenAppointment: (prefill?: { deviceType?: string; problem?: string; estimatedCost?: number }) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView, onNavigate, onOpenAppointment }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Главная', icon: Sparkles },
    { id: 'services', label: 'Услуги', icon: Laptop },
    { id: 'calculators', label: 'Калькуляторы', icon: Calculator, badge: '4 в 1' },
    { id: 'about', label: 'О нас', icon: Info },
    { id: 'contacts', label: 'Контакты', icon: MapPin },
  ];

  const handleNavClick = (viewId: string) => {
    onNavigate(viewId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-dark-950/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40' 
            : 'bg-transparent py-4 border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 group-hover:border-cyan-400 transition-colors shadow-glow-cyan">
                <Wrench className="w-5 h-5 text-cyan-glow group-hover:rotate-12 transition-transform duration-300" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-glow rounded-full animate-ping" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-glow rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-wider text-white group-hover:text-cyan-glow transition-colors">
                    PIXEL
                  </span>
                  <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-accent border border-cyan-500/30">
                    SERVICE
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-mono tracking-tight hidden sm:block">
                  ЦИФРОВОЙ СЕРВИСНЫЙ ЦЕНТР
                </p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 bg-dark-900/60 p-1.5 rounded-full border border-slate-800 backdrop-blur-sm">
              {navItems.map((item) => {
                const isActive = currentView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-cyan-500/25 to-blue-600/25 border border-cyan-500/50 shadow-sm shadow-cyan-500/20' 
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-cyan-400 text-dark-950">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Contacts & CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}
                className="flex items-center gap-2 group text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
              >
                <div className="w-8 h-8 rounded-lg bg-dark-800 border border-slate-700 flex items-center justify-center text-cyan-glow group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-semibold text-white group-hover:text-cyan-glow transition-colors font-mono">
                    {SITE_CONFIG.contacts.phone}
                  </div>
                  <div className="text-[10px] text-slate-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Пн–Вс с 09:00
                  </div>
                </div>
              </a>

              <button
                onClick={() => onOpenAppointment()}
                className="relative inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-dark-950 transition-all bg-gradient-to-r from-cyan-glow to-cyan-400 rounded-xl hover:from-cyan-400 hover:to-cyan-300 active:scale-95 shadow-glow-cyan focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-cyan-400"
              >
                Оставить заявку
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => onOpenAppointment()}
                className="px-3 py-1.5 text-xs font-bold text-dark-950 bg-cyan-glow rounded-lg active:scale-95"
              >
                Заявка
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-dark-900 border border-slate-800 text-slate-300 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6 text-cyan-glow" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 lg:hidden pt-20 pb-6 px-4 bg-dark-950/95 backdrop-blur-xl flex flex-col justify-between overflow-y-auto animate-fadeIn">
          <div className="space-y-2">
            <div className="text-xs font-mono text-cyan-glow uppercase tracking-wider px-3 py-1">
              Навигация
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-cyan-500/15 text-cyan-glow border border-cyan-500/30'
                      : 'bg-dark-900/60 text-slate-200 hover:bg-dark-850 border border-slate-800/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-cyan-500/20 text-cyan-glow' : 'bg-dark-800 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-400 text-dark-950 font-bold">
                        {item.badge}
                      </span>
                    )}
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-4">
            <a 
              href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}
              className="flex items-center justify-between p-3 rounded-xl bg-dark-900 border border-slate-800"
            >
              <div>
                <div className="text-xs text-slate-400">Прямой номер сервиса:</div>
                <div className="text-base font-bold text-white font-mono">{SITE_CONFIG.contacts.phone}</div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-glow flex items-center justify-center">
                <Phone className="w-5 h-5" />
              </div>
            </a>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAppointment();
              }}
              className="w-full py-3.5 rounded-xl font-bold text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 shadow-glow-cyan active:scale-95"
            >
              Записаться на диагностику
            </button>
          </div>
        </div>
      )}
    </>
  );
};
