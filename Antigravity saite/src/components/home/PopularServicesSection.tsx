import React from 'react';
import { Clock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { POPULAR_SERVICES } from '../../data/servicesData';
import { formatPrice } from '../../utils/formatters';

interface PopularServicesSectionProps {
  onOpenAppointment: (prefill: { problem: string; estimatedCost?: number }) => void;
  onNavigateToServices: () => void;
}

export const PopularServicesSection: React.FC<PopularServicesSectionProps> = ({
  onOpenAppointment,
  onNavigateToServices
}) => {
  return (
    <section className="py-20 bg-dark-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>ВОСТРЕБОВАННЫЕ УСЛУГИ</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Популярные услуги <span className="text-cyan-glow">с фиксацией цены</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Оперативные решения типовых проблем цифровой электроники: от чистки и термопрофиля до сложной пайки DrMOS и замены BGA-памяти.
            </p>
          </div>

          <button
            onClick={onNavigateToServices}
            className="self-start md:self-end px-5 py-2.5 rounded-xl border border-slate-700 bg-dark-900 text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Весь каталог работ</span>
            <ArrowRight className="w-4 h-4 text-cyan-glow" />
          </button>
        </div>

        {/* 6 Popular Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POPULAR_SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="p-6 rounded-2xl bg-dark-900/90 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-dark-850 transition-all flex flex-col justify-between group shadow-card"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-glow border border-cyan-500/30">
                    ТОП ЗАКАЗОВ
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-glow" />
                    <span>{srv.duration}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-glow transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Гарантия: {srv.warranty}</span>
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-500 font-mono uppercase">Ориентировочно:</div>
                  <div className="text-xl font-bold font-mono text-cyan-glow">
                    от {formatPrice(srv.priceFrom)}
                  </div>
                </div>

                <button
                  onClick={() => onOpenAppointment({ problem: srv.title, estimatedCost: srv.priceFrom })}
                  className="px-4 py-2 rounded-xl bg-cyan-500/15 group-hover:bg-cyan-400 text-cyan-glow group-hover:text-dark-950 font-bold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Заказать</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
