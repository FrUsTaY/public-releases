import React, { useState } from 'react';
import { 
  Wrench, 
  Sparkles, 
  Cpu, 
  Flame, 
  Calculator
} from 'lucide-react';
import { RepairCalculator } from './RepairCalculator';
import { MaintenanceCalculator } from './MaintenanceCalculator';
import { PcBuildCalculator } from './PcBuildCalculator';
import { PcUpgradeCalculator } from './PcUpgradeCalculator';

interface CalculatorsHubProps {
  initialTab?: 'repair' | 'maintenance' | 'build' | 'upgrade';
  onOrder: (data: { deviceType: string; problem: string; estimatedCost: number; notes: string }) => void;
}

export const CalculatorsHub: React.FC<CalculatorsHubProps> = ({ 
  initialTab = 'repair',
  onOrder 
}) => {
  const [activeTab, setActiveTab] = useState<'repair' | 'maintenance' | 'build' | 'upgrade'>(initialTab);

  const tabs = [
    { id: 'repair', label: '1. Ремонт техники', icon: Wrench, desc: 'Расчёт стоимости ремонта ноутбуков, ПК, видеокарт' },
    { id: 'maintenance', label: '2. Обслуживание ПК', icon: Sparkles, desc: 'Калькулятор чистки, термопасты и СЖО' },
    { id: 'build', label: '3. Сборка ПК', icon: Cpu, desc: 'Конфигуратор с проверкой совместимости сокетов и TDP' },
    { id: 'upgrade', label: '4. Апгрейд системы', icon: Flame, desc: 'Подбор видеокарты, процессора и RAM под задачи' },
  ];

  return (
    <section id="calculators" className="py-16 bg-dark-950/90 relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>ИНТЕРАКТИВНЫЙ РАСЧЁТ В РЕАЛЬНОМ ВРЕМЕНИ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Интерактивные калькуляторы <span className="text-cyan-glow">PIXEL SERVICE</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Честный предварительный расчёт без скрытых комиссий. Выберите необходимый инструмент: расчет стоимости ремонта, калькулятор ТО, проверка совместимости сборки или план апгрейда.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`p-4 rounded-2xl border text-left transition-all relative ${
                  isActive
                    ? 'bg-gradient-to-br from-dark-850 to-dark-900 border-cyan-400/80 shadow-glow-cyan text-white'
                    : 'bg-dark-900/60 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-xl ${
                    isActive ? 'bg-cyan-500 text-dark-950 font-bold' : 'bg-dark-800 text-cyan-glow'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold">{tab.label}</span>
                </div>
                <p className="text-xs text-slate-400 leading-snug line-clamp-2">
                  {tab.desc}
                </p>
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-cyan-glow rounded-full shadow-glow-cyan" />
                )}
              </button>
            );
          })}
        </div>

        {/* Active Calculator Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-dark-900/70 border border-slate-800/80 backdrop-blur-sm shadow-2xl relative">
          {activeTab === 'repair' && <RepairCalculator onOrder={onOrder} />}
          {activeTab === 'maintenance' && <MaintenanceCalculator onOrder={onOrder} />}
          {activeTab === 'build' && <PcBuildCalculator onOrder={onOrder} />}
          {activeTab === 'upgrade' && <PcUpgradeCalculator onOrder={onOrder} />}
        </div>
      </div>
    </section>
  );
};
