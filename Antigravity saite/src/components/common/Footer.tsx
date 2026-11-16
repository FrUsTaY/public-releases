import React from 'react';
import { 
  Wrench, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Share2,
  Shield,
  ArrowUp
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface FooterProps {
  onNavigate: (view: string) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: About & Logo */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-600/20 border border-cyan-500/40 shadow-glow-cyan">
                <Wrench className="w-5 h-5 text-cyan-glow" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-wider text-white">
                  PIXEL
                </span>
                <span className="text-xs font-mono font-semibold px-1.5 py-0.5 rounded bg-cyan-500/15 text-cyan-accent border border-cyan-500/30">
                  SERVICE
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Специализированный центр компонентного ремонта цифровой электроники, игровых ПК, ноутбуков, видеокарт и мобильных устройств.
            </p>

            <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-glow font-medium">
                <Shield className="w-3.5 h-3.5" />
                Гарантийный регламент
              </div>
              <p>До 12 месяцев на компонентную пайку BGA и восстановление цепей питания.</p>
            </div>
          </div>

          {/* Col 2: Navigation & Services */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              Навигация
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-cyan-glow transition-colors">
                  Главная страница
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('services')} className="hover:text-cyan-glow transition-colors">
                  Все направления ремонта
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('calculators')} className="hover:text-cyan-glow transition-colors flex items-center gap-1.5">
                  Калькуляторы цен и совместимости
                  <span className="text-[10px] bg-cyan-500/20 text-cyan-glow px-1.5 py-0.2 rounded font-mono">NEW</span>
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-cyan-glow transition-colors">
                  О лаборатории и инженерах
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contacts')} className="hover:text-cyan-glow transition-colors">
                  Контакты и схема проезда
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              Контакты
            </h4>
            <div className="space-y-3 text-sm text-slate-400">
              <a 
                href={`tel:${SITE_CONFIG.contacts.phoneRaw}`} 
                className="flex items-start gap-2.5 hover:text-white transition-colors group"
              >
                <Phone className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono font-medium text-white group-hover:text-cyan-glow transition-colors">
                    {SITE_CONFIG.contacts.phone}
                  </div>
                  <div className="text-xs text-slate-500">Бесплатная консультация инженера</div>
                </div>
              </a>

              <a 
                href={`mailto:${SITE_CONFIG.contacts.email}`} 
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-cyan-glow shrink-0" />
                <span className="font-mono text-xs">{SITE_CONFIG.contacts.email}</span>
              </a>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  {SITE_CONFIG.contacts.address}
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                <div className="text-xs space-y-0.5">
                  <div>{SITE_CONFIG.contacts.workingHours.weekdays}</div>
                  <div>{SITE_CONFIG.contacts.workingHours.weekends}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Messengers & Demo Notice */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
              Мессенджеры
            </h4>

            <div className="flex items-center gap-2">
              <a
                href={SITE_CONFIG.socials.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-300 hover:text-cyan-glow hover:border-cyan-500/40 transition-colors"
              >
                <Send className="w-4 h-4 text-cyan-glow" />
                <span>Telegram</span>
              </a>

              <a
                href={SITE_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>

              <a
                href={SITE_CONFIG.socials.vk}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
              >
                <Share2 className="w-4 h-4 text-blue-400" />
                <span>VK</span>
              </a>
            </div>

            {/* Explicit Demo Disclaimer as required by TZ */}
            <div className="p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 text-[11px] text-amber-200/90 leading-tight">
              <span className="font-semibold text-amber-400">Демонстрационный макет:</span> Все контактные данные, адреса и демонстрационная статистика представлены в качестве концепта цифрового продукта и могут быть легко изменены в конфигурации.
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} PIXEL SERVICE. Все права защищены. Специализированный сервисный центр цифровой техники.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPrivacy}
              className="hover:text-slate-400 underline underline-offset-4 transition-colors"
            >
              Политика конфиденциальности
            </button>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 p-2 rounded-lg bg-dark-900 border border-slate-800 text-slate-400 hover:text-cyan-glow transition-colors"
              title="Наверх"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">Наверх</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
