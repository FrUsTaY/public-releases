import React from 'react';
import { 
  Award, 
  MessageSquareText, 
  ShieldCheck, 
  CheckCircle2, 
  Cpu, 
  Lock,
  Sparkles
} from 'lucide-react';
import { ADVANTAGES_DATA } from '../../data/servicesData';

export const AdvantagesSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-cyan-glow" />;
      case 'MessageSquareText': return <MessageSquareText className="w-6 h-6 text-purple-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-emerald-400" />;
      case 'CheckCircle2': return <CheckCircle2 className="w-6 h-6 text-cyan-glow" />;
      case 'Cpu': return <Cpu className="w-6 h-6 text-purple-400" />;
      case 'Lock': return <Lock className="w-6 h-6 text-cyan-glow" />;
      default: return <Award className="w-6 h-6 text-cyan-glow" />;
    }
  };

  return (
    <section className="py-20 bg-dark-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>СТАНДАРТЫ КАЧЕСТВА PIXEL SERVICE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Почему нам доверяют <span className="text-cyan-glow">сложную электронику</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Мы отказались от шаблонных подходов и поверхностной замены узлов целиком. Наша цель — восстановить оригинальную плату на компонентном уровне, сэкономив до 70% стоимости новой детали.
          </p>
        </div>

        {/* 6 Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ADVANTAGES_DATA.map((adv) => (
            <div
              key={adv.id}
              className="group p-6 rounded-2xl bg-dark-900/80 border border-slate-800/80 hover:border-cyan-500/50 hover:bg-dark-850 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-dark-950 border border-slate-800 group-hover:border-cyan-500/40 flex items-center justify-center transition-colors shadow-sm">
                    {getIcon(adv.iconName)}
                  </div>

                  {adv.highlight && (
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-dark-950 text-cyan-glow border border-cyan-500/25">
                      {adv.highlight}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-glow transition-colors">
                    {adv.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {adv.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-500 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow"></span>
                <span>Стандарт инженерии PIXEL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
