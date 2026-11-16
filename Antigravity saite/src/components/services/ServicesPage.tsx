import React, { useState } from 'react';
import { 
  Cpu, 
  Laptop, 
  Layers, 
  Smartphone, 
  Gamepad2, 
  Tablet, 
  Clock, 
  ShieldCheck, 
  Calculator, 
  ArrowRight,
  CheckCircle2,
  Wrench
} from 'lucide-react';
import { DIRECTIONS_DATA } from '../../data/servicesData';
import { formatPrice } from '../../utils/formatters';

interface ServicesPageProps {
  onOpenAppointment: (prefill: { deviceType: string; problem: string; estimatedCost?: number }) => void;
  onNavigateToCalculator: (prefillTab?: string) => void;
  selectedDirectionFilter?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onOpenAppointment,
  onNavigateToCalculator,
  selectedDirectionFilter = 'all'
}) => {
  const [activeTab, setActiveTab] = useState<string>(
    selectedDirectionFilter === 'all' ? 'all' : selectedDirectionFilter
  );

  const filteredDirections = activeTab === 'all'
    ? DIRECTIONS_DATA
    : DIRECTIONS_DATA.filter(d => d.id === activeTab);

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
    <div className="pt-28 pb-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Wrench className="w-3.5 h-3.5" />
            <span>КАТАЛОГ УСЛУГ И ПРАЙС-ЛИСТ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Все направления ремонта <br />
            <span className="text-cyan-glow">цифровой электроники</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Подробный перечень типовых неисправностей, сроки выполнения, технологии компонентного ремонта и ориентировочная стоимость работ по каждому виду техники.
          </p>
        </div>

        {/* Direction Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-cyan-500 text-dark-950 shadow-glow-cyan'
                : 'bg-dark-900 text-slate-300 border border-slate-800 hover:border-slate-700'
            }`}
          >
            Все направления
          </button>
          {DIRECTIONS_DATA.map((dir) => (
            <button
              key={dir.id}
              onClick={() => setActiveTab(dir.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === dir.id
                  ? 'bg-cyan-500 text-dark-950 shadow-glow-cyan'
                  : 'bg-dark-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{dir.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Detailed Sections for each Direction */}
        <div className="space-y-16">
          {filteredDirections.map((dir) => (
            <div 
              key={dir.id} 
              id={dir.id}
              className="p-6 sm:p-8 rounded-3xl bg-dark-900/80 border border-slate-800/80 shadow-2xl relative overflow-hidden"
            >
              {/* Header inside direction */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-800">
                <div className="lg:col-span-8 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-glow font-mono text-[11px] font-semibold">
                      {dir.tag}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Направление #{dir.id.toUpperCase()}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/40 text-cyan-glow flex items-center justify-center">
                      {getDirectionIcon(dir.iconName)}
                    </div>
                    <span>{dir.title}</span>
                  </h2>

                  <p className="text-xs font-mono text-cyan-accent">{dir.subtitle}</p>
                  <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                    {dir.description}
                  </p>
                </div>

                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center">
                  <button
                    onClick={() => onNavigateToCalculator('repair')}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-dark-950 border border-cyan-500/40 text-cyan-glow hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Рассчитать стоимость в калькуляторе</span>
                  </button>

                  <button
                    onClick={() => onOpenAppointment({ deviceType: dir.title, problem: 'Диагностика и ремонт' })}
                    className="w-full py-3 px-4 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-glow to-cyan-400 text-dark-950 hover:from-cyan-400 hover:to-cyan-300 transition-colors flex items-center justify-center gap-2 shadow-glow-cyan"
                  >
                    <span>Записаться на диагностику (0 ₽)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* 2 Columns: Typical Issues & Detailed Price Table */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">
                {/* Left: Typical issues bullet list */}
                <div className="lg:col-span-4 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                    Типичные неисправности:
                  </h3>
                  <div className="space-y-2">
                    {dir.popularIssues.map((issue, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-dark-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                        <span>{issue}</span>
                      </div>
                    ))}
                  </div>

                  {/* Guarantee banner */}
                  <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-xs space-y-1">
                    <div className="font-semibold text-cyan-glow flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      Гарантийный талон
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      На все замененные комплектующие и выполненную пайку выдается гарантия до 12 месяцев.
                    </p>
                  </div>
                </div>

                {/* Right: Detailed Price Table */}
                <div className="lg:col-span-8 space-y-4">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow" />
                    Прайс-лист на ремонт и обслуживание:
                  </h3>

                  <div className="rounded-2xl border border-slate-800 overflow-hidden bg-dark-950/60">
                    <div className="divide-y divide-slate-800">
                      {dir.repairs.map((repair, rIdx) => (
                        <div 
                          key={rIdx}
                          className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-colors"
                        >
                          <div className="space-y-1">
                            <span className="text-sm font-semibold text-white">
                              {repair.name}
                            </span>
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-cyan-glow" />
                                {repair.duration}
                              </span>
                              <span>•</span>
                              <span>Бесплатная диагностика</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                            <div className="text-right">
                              <span className="text-sm sm:text-base font-bold font-mono text-cyan-glow">
                                {repair.price === 0 ? 'Бесплатно' : `от ${formatPrice(repair.price)}`}
                              </span>
                            </div>

                            <button
                              onClick={() => onOpenAppointment({
                                deviceType: dir.title,
                                problem: repair.name,
                                estimatedCost: repair.price
                              })}
                              className="px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-cyan-500 hover:text-dark-950 text-slate-200 text-xs font-semibold transition-all border border-slate-700"
                            >
                              Выбрать
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
