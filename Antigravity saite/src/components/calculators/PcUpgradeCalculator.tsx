import React, { useState } from 'react';
import { 
  Flame, 
  Zap, 
  Layers, 
  Cpu, 
  Wind, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp,
  Wrench
} from 'lucide-react';
import { UPGRADE_SCENARIOS, UpgradeScenario } from '../../data/calculatorData';
import { formatPrice } from '../../utils/formatters';

interface PcUpgradeCalculatorProps {
  onOrder: (data: { deviceType: string; problem: string; estimatedCost: number; notes: string }) => void;
}

export const PcUpgradeCalculator: React.FC<PcUpgradeCalculatorProps> = ({ onOrder }) => {
  const [selectedGoal, setSelectedGoal] = useState<string>('fps');
  const [currentCpuGeneration, setCurrentCpuGeneration] = useState<string>('intel_old');
  const [currentRamAmount, setCurrentRamAmount] = useState<string>('16gb');
  const [currentDrive, setCurrentDrive] = useState<string>('sata_ssd');

  const currentScenario: UpgradeScenario = UPGRADE_SCENARIOS[selectedGoal] || UPGRADE_SCENARIOS['fps'];

  const goals = [
    { id: 'fps', title: 'Повысить FPS в играх', icon: Flame, desc: 'Плавный геймплей в 2K/4K и трассировка лучей' },
    { id: 'system_speed', title: 'Ускорить работу системы', icon: Zap, desc: 'Быстрый запуск Windows и рабочих программ' },
    { id: 'ram', title: 'Увеличить объём RAM', icon: Layers, desc: 'Для мультизадачности, браузеров и тяжелых программ' },
    { id: 'cpu_platform', title: 'Обновить процессор / сокет', icon: Cpu, desc: 'Переход на сокет AM5 или LGA1700' },
    { id: 'cooling_noise', title: 'Снизить шум и температуру', icon: Wind, desc: 'Тихие кулеры, СЖО и продув корпуса' }
  ];

  const handleSelectPackage = (pkg: any) => {
    onOrder({
      deviceType: 'Модернизация (апгрейд) ПК',
      problem: `Апгрейд по сценарию «${currentScenario.title}»: ${pkg.name}`,
      estimatedCost: pkg.price,
      notes: `Выбран пакет «${pkg.name}» (${formatPrice(pkg.price)}).\nКомплектующие: ${pkg.parts.join(', ')}.\nВключенные работы: ${pkg.serviceIncluded}`
    });
  };

  return (
    <div className="space-y-8">
      {/* Step 1: User's Current Setup */}
      <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-glow" />
              1. Укажите текущую конфигурацию вашего компьютера
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Это поможет подобрать оптимальные компоненты без переплаты за избыточную мощность
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-glow px-2.5 py-1 rounded bg-cyan-500/15 border border-cyan-500/30">
            Экспресс-анализ
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Установленный процессор:
            </label>
            <select
              value={currentCpuGeneration}
              onChange={(e) => setCurrentCpuGeneration(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="intel_old">Intel Core i5/i7 (до 10-го поколения)</option>
              <option value="intel_new">Intel Core i5/i7 (12-14 поколение)</option>
              <option value="amd_am4">AMD Ryzen 1000–5000 (сокет AM4)</option>
              <option value="amd_am5">AMD Ryzen 7000 (сокет AM5)</option>
              <option value="other">Старый системный блок (6+ лет)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Объем оперативной памяти:
            </label>
            <select
              value={currentRamAmount}
              onChange={(e) => setCurrentRamAmount(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="8gb">8 ГБ (мало для современных игр)</option>
              <option value="16gb">16 ГБ (базовый минимум)</option>
              <option value="32gb">32 ГБ (оптимально)</option>
              <option value="64gb">64 ГБ и более</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Основной диск с Windows:
            </label>
            <select
              value={currentDrive}
              onChange={(e) => setCurrentDrive(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-dark-950 border border-slate-800 text-xs text-white focus:border-cyan-400 focus:outline-none"
            >
              <option value="hdd">Обычный HDD (жесткий диск) — тормозит</option>
              <option value="sata_ssd">SATA 2.5" SSD (до 500 МБ/с)</option>
              <option value="nvme_ssd">Быстрый NVMe M.2 SSD</option>
            </select>
          </div>
        </div>
      </div>

      {/* Step 2: Goal selection */}
      <div className="space-y-3">
        <label className="text-xs font-mono uppercase tracking-wider text-cyan-glow flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-glow flex items-center justify-center text-[10px] font-bold">2</span>
          Выберите главную цель модернизации
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const isSelected = selectedGoal === goal.id;
            return (
              <button
                key={goal.id}
                type="button"
                onClick={() => setSelectedGoal(goal.id)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-glow-cyan'
                    : 'bg-dark-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className={`p-2 rounded-lg w-fit mb-2 ${isSelected ? 'bg-cyan-400 text-dark-950' : 'bg-dark-800 text-cyan-glow'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-xs font-bold leading-tight">{goal.title}</div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">{goal.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Tiered recommendations */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <div className="text-xs font-mono text-cyan-glow uppercase tracking-wider">
              Рекомендованные решения лаборатории
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">{currentScenario.title}</h3>
            <p className="text-xs text-slate-400">{currentScenario.subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Ожидаемый прирост:</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono font-bold text-xs flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              {currentScenario.estimatedPerfGain}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentScenario.packages.map((pkg, idx) => {
            const isOptimal = pkg.tier === 'optimal';
            return (
              <div
                key={idx}
                className={`relative rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                  isOptimal
                    ? 'bg-gradient-to-b from-dark-850 to-dark-900 border-cyan-500/60 shadow-glow-cyan md:-translate-y-2'
                    : 'bg-dark-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                {isOptimal && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-400 text-dark-950 font-mono text-[10px] font-bold tracking-wider uppercase shadow-md">
                    ХИТ • Оптимальный выбор
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      {pkg.tier === 'budget' ? 'Экономный вариант' : pkg.tier === 'optimal' ? 'Идеальный баланс' : 'Максимум мощности'}
                    </span>
                    <h4 className="text-base font-bold text-white mt-1">{pkg.name}</h4>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">{pkg.description}</p>
                  </div>

                  {/* Performance badge */}
                  <div className="p-2.5 rounded-xl bg-dark-950 border border-slate-800 text-xs flex items-center justify-between">
                    <span className="text-slate-400">Прирост производительности:</span>
                    <span className="text-cyan-glow font-bold font-mono">{pkg.perfGain}</span>
                  </div>

                  {/* Included Parts */}
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono uppercase text-slate-400">Что входит в комплект:</div>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {pkg.parts.map((part, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-glow shrink-0 mt-0.5" />
                          <span>{part}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Services Included */}
                  <div className="p-3 rounded-xl bg-dark-950/70 border border-slate-800/80 text-[11px] text-slate-400">
                    <span className="text-slate-300 font-semibold block mb-0.5">Включенные работы сервиса:</span>
                    {pkg.serviceIncluded}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800 mt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Итого под ключ:</span>
                    <div className="text-2xl font-bold font-mono text-cyan-glow">
                      {formatPrice(pkg.price)}
                    </div>
                  </div>

                  <button
                    onClick={() => handleSelectPackage(pkg)}
                    className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 active:scale-95 ${
                      isOptimal
                        ? 'bg-gradient-to-r from-cyan-glow to-cyan-400 text-dark-950 shadow-glow-cyan hover:from-cyan-400 hover:to-cyan-300'
                        : 'bg-dark-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
                    }`}
                  >
                    <span>Выбрать этот вариант</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
