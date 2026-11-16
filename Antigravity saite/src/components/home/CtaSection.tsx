import React from 'react';
import { 
  Phone, 
  Send, 
  MessageCircle, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

interface CtaSectionProps {
  onOpenAppointment: (prefill?: any) => void;
}

export const CtaSection: React.FC<CtaSectionProps> = ({ onOpenAppointment }) => {
  return (
    <section className="py-20 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative overflow-hidden border-t border-slate-800">
      {/* Glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-500/15 via-purple-600/15 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-950/90 border border-cyan-500/40 shadow-2xl relative overflow-hidden text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>БЕСПЛАТНАЯ ПЕРВИЧНАЯ ДИАГНОСТИКА</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Готовы починить вашу технику <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow to-purple-400">
              прямо сегодня?
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Привезите устройство в лабораторию или вызовите бесплатного курьера. Инженер проведет осмотр, назовет точную причину поломки и зафиксирует стоимость до начала работ.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 pt-2 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-glow" />
              <span>Осмотр за 40 минут</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Гарантия до 1 года</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-glow" />
              <span>Оплата после проверки</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => onOpenAppointment()}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-95"
            >
              <span>Записаться на диагностику (0 ₽)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold text-sm text-white bg-dark-900 border border-slate-700 hover:border-cyan-400 transition-all flex items-center justify-center gap-2 font-mono"
            >
              <Phone className="w-4 h-4 text-cyan-glow" />
              <span>{SITE_CONFIG.contacts.phone}</span>
            </a>
          </div>

          {/* Direct messengers */}
          <div className="pt-4 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span>Или напишите напрямую инженеру:</span>
            <a 
              href={SITE_CONFIG.socials.telegram} 
              target="_blank" 
              rel="noreferrer"
              className="text-cyan-glow hover:underline flex items-center gap-1 font-semibold"
            >
              <Send className="w-3.5 h-3.5" /> Telegram
            </a>
            <a 
              href={SITE_CONFIG.socials.whatsapp} 
              target="_blank" 
              rel="noreferrer"
              className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
