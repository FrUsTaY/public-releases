import React from 'react';
import { 
  Cpu, 
  Laptop, 
  Smartphone, 
  Tablet, 
  Layers, 
  Gamepad2, 
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { DIRECTIONS_DATA } from '../../data/servicesData';
import { DirectionItem } from '../../types';

interface DirectionsSectionProps {
  onSelectDirection: (directionId: string) => void;
  onOpenAppointment: (prefill: { deviceType: string }) => void;
}

export const DirectionsSection: React.FC<DirectionsSectionProps> = ({
  onSelectDirection,
  onOpenAppointment
}) => {
  const getDirectionIcon = (name: string) => {
    switch (name) {
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <section id="directions" className="py-20 bg-dark-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>СПЕЦИАЛИЗАЦИЯ СЕРВИСНОГО ЦЕНТРА</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Направления ремонта <span className="text-cyan-glow">цифровой техники</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Мы не чиним утюги и стиральные машины. Вся наша лаборатория заточена исключительно на цифровую электронику, микропайку BGA и компьютеры.
            </p>
          </div>

          <button
            onClick={() => onSelectDirection('all')}
            className="self-start md:self-end px-5 py-2.5 rounded-xl border border-slate-700 bg-dark-950 text-xs font-semibold text-slate-300 hover:text-white hover:border-cyan-400 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Посмотреть все услуги с ценами</span>
            <ArrowRight className="w-4 h-4 text-cyan-glow" />
          </button>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DIRECTIONS_DATA.map((dir: DirectionItem) => (
            <div
              key={dir.id}
              className="group rounded-2xl bg-dark-950 border border-slate-800/80 hover:border-cyan-500/40 overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-card hover:shadow-card-hover"
            >
              {/* Image Banner */}
              <div className="relative h-44 overflow-hidden bg-dark-900">
                <img
                  src={dir.image}
                  alt={dir.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />

                {/* Floating Tag */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-lg bg-dark-950/90 border border-cyan-500/30 text-cyan-glow text-[11px] font-mono font-medium backdrop-blur-md">
                    {dir.tag}
                  </span>
                </div>

                {/* Icon in corner */}
                <div className="absolute bottom-3 right-3 w-10 h-10 rounded-xl bg-dark-950/90 border border-slate-700 text-cyan-glow flex items-center justify-center backdrop-blur-md">
                  {getDirectionIcon(dir.iconName)}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-glow transition-colors">
                    {dir.title}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {dir.subtitle}
                  </div>
                  <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
                    {dir.description}
                  </p>

                  {/* Typical Issues bullet list */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                      Частые неисправности:
                    </span>
                    {dir.popularIssues.slice(0, 3).map((issue, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
                        <span className="truncate">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectDirection(dir.id)}
                    className="py-2.5 px-3 rounded-xl bg-dark-900 hover:bg-dark-850 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Прайс-лист</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-glow" />
                  </button>

                  <button
                    onClick={() => onOpenAppointment({ deviceType: dir.title })}
                    className="py-2.5 px-3 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-xs font-semibold text-cyan-glow transition-colors text-center"
                  >
                    Сдать в ремонт
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
