import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Cpu, 
  Layers, 
  HardDrive, 
  Zap, 
  Box, 
  Fan, 
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { 
  CPUS, 
  MOTHERBOARDS, 
  GPUS, 
  RAMS, 
  SSDS, 
  PSUS, 
  CASES, 
  COOLERS 
} from '../../data/hardwareCatalog';
import { PcBuildState } from '../../types';
import { checkPcBuildCompatibility } from '../../utils/compatibilityChecker';
import { formatPrice } from '../../utils/formatters';

interface PcBuildCalculatorProps {
  onOrder: (data: { deviceType: string; problem: string; estimatedCost: number; notes: string }) => void;
}

export const PcBuildCalculator: React.FC<PcBuildCalculatorProps> = ({ onOrder }) => {
  // Initial default balanced configuration (AM5 + RTX 4070 SUPER)
  const defaultBuild: PcBuildState = {
    cpu: CPUS[0], // Ryzen 5 7600X
    motherboard: MOTHERBOARDS[0], // B650 Tomahawk ATX
    gpu: GPUS[1], // RTX 4070 SUPER
    ram: RAMS[0], // 32GB DDR5
    ssd: SSDS[0], // 1TB NVMe Gen4
    psu: PSUS[1], // 750W Gold
    pcCase: CASES[0], // Lian Li LANCOOL 216
    cooler: COOLERS[1] // Thermalright Peerless Assassin
  };

  const [build, setBuild] = useState<PcBuildState>(defaultBuild);

  // Check compatibility in real-time
  const compResult = useMemo(() => {
    return checkPcBuildCompatibility(build);
  }, [build]);

  // Presets
  const applyPreset = (presetName: 'budget' | 'optimal' | 'flagship' | 'incompatibleDemo') => {
    if (presetName === 'budget') {
      setBuild({
        cpu: CPUS.find(c => c.id === 'cpu-r5-5600') || CPUS[5],
        motherboard: MOTHERBOARDS.find(m => m.id === 'mb-b550-ddr4-atx') || MOTHERBOARDS[5],
        gpu: GPUS.find(g => g.id === 'gpu-rtx-4060') || GPUS[0],
        ram: RAMS.find(r => r.id === 'ram-ddr4-16-3600') || RAMS[2],
        ssd: SSDS[0],
        psu: PSUS[0],
        pcCase: CASES[0],
        cooler: COOLERS[0]
      });
    } else if (presetName === 'optimal') {
      setBuild(defaultBuild);
    } else if (presetName === 'flagship') {
      setBuild({
        cpu: CPUS.find(c => c.id === 'cpu-r7-7800x3d') || CPUS[1],
        motherboard: MOTHERBOARDS.find(m => m.id === 'mb-x670e-atx') || MOTHERBOARDS[2],
        gpu: GPUS.find(g => g.id === 'gpu-rtx-4090') || GPUS[3],
        ram: RAMS.find(r => r.id === 'ram-ddr5-64-6000') || RAMS[1],
        ssd: SSDS[2],
        psu: PSUS[3], // 1000W
        pcCase: CASES[2], // Full Tower
        cooler: COOLERS[3] // AIO 360mm
      });
    } else if (presetName === 'incompatibleDemo') {
      // Intentionally select incompatible hardware to demonstrate real validation!
      // Intel LGA1700 CPU on AMD AM5 Motherboard, with DDR4 RAM on DDR5 board, and huge GPU in small case with 650W PSU
      setBuild({
        cpu: CPUS.find(c => c.id === 'cpu-i7-14700k') || CPUS[4], // LGA1700
        motherboard: MOTHERBOARDS.find(m => m.id === 'mb-b650-atx') || MOTHERBOARDS[0], // AM5! (Socket mismatch)
        gpu: GPUS.find(g => g.id === 'gpu-rtx-4090') || GPUS[3], // 450W TDP
        ram: RAMS.find(r => r.id === 'ram-ddr4-16-3600') || RAMS[2], // DDR4 on DDR5 board! (RAM mismatch)
        ssd: SSDS[0],
        psu: PSUS.find(p => p.id === 'psu-650w-gold') || PSUS[0], // 650W for RTX 4090! (Power deficit)
        pcCase: CASES.find(c => c.id === 'case-compact-matx') || CASES[1], // ATX motherboard in Micro-ATX only case!
        cooler: COOLERS[0] // 150W cooler for 253W i7!
      });
    }
  };

  const handleOrderBuild = () => {
    if (!compResult.isCompatible) return;

    const partsList = [
      `CPU: ${build.cpu?.name}`,
      `Плата: ${build.motherboard?.name}`,
      `GPU: ${build.gpu?.name}`,
      `RAM: ${build.ram?.name}`,
      `SSD: ${build.ssd?.name}`,
      `БП: ${build.psu?.name}`,
      `Корпус: ${build.pcCase?.name}`,
      `Кулер: ${build.cooler?.name}`
    ].join('\n');

    onOrder({
      deviceType: 'Сборка игрового ПК под ключ',
      problem: `Заказ сборки кастомной конфигурации на сумму ${formatPrice(compResult.totalPrice)}`,
      estimatedCost: compResult.totalPrice + 3500, // +3500 за профессиональную сборку и стресс-тесты
      notes: `Конфигурация ПК (100% совместима):\n${partsList}\nСборка и настройка: 3 500 ₽`
    });
  };

  return (
    <div className="space-y-6">
      {/* Preset bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-dark-900 border border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-glow" />
          <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
            Готовые проверенные пресеты:
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => applyPreset('budget')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-dark-800 text-slate-300 hover:text-white hover:bg-dark-700 border border-slate-700 transition-colors"
          >
            Бюджетный народный (от ~80k)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('optimal')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-cyan-500/20 text-cyan-glow border border-cyan-500/40 hover:bg-cyan-500/30 transition-colors"
          >
            Оптимальный 2K Gaming
          </button>
          <button
            type="button"
            onClick={() => applyPreset('flagship')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/40 hover:bg-purple-500/30 transition-colors"
          >
            Флагман 4K RTX 4090
          </button>
          <button
            type="button"
            onClick={() => applyPreset('incompatibleDemo')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/15 text-red-300 border border-red-500/30 hover:bg-red-500/25 transition-colors flex items-center gap-1"
            title="Показывает реальную работу алгоритмов обнаружения ошибок"
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            Проверить тест несовместимости
          </button>
        </div>
      </div>

      {/* Main Grid: Selectors (7 cols) + Status & Breakdown (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Component Selectors */}
        <div className="lg:col-span-7 space-y-4">
          {/* 1. CPU */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-glow" />
                1. Процессор (CPU)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.cpu ? formatPrice(build.cpu.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.cpu?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, cpu: CPUS.find(c => c.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {CPUS.map(cpu => (
                <option key={cpu.id} value={cpu.id}>
                  {cpu.name} | Сокет: {cpu.socket} | TDP: {cpu.tdp}W — {formatPrice(cpu.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Сокет: <strong className="text-slate-200">{build.cpu?.socket}</strong></span>
              <span>Тепловыделение TDP: <strong className="text-slate-200">{build.cpu?.tdp} Вт</strong></span>
            </div>
          </div>

          {/* 2. Motherboard */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-glow" />
                2. Материнская плата
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.motherboard ? formatPrice(build.motherboard.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.motherboard?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, motherboard: MOTHERBOARDS.find(m => m.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {MOTHERBOARDS.map(mb => (
                <option key={mb.id} value={mb.id}>
                  {mb.name} — {formatPrice(mb.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Сокет: <strong className="text-slate-200">{build.motherboard?.socket}</strong></span>
              <span>Поддержка RAM: <strong className="text-slate-200">{build.motherboard?.ramType}</strong></span>
              <span>Форм-фактор: <strong className="text-slate-200">{build.motherboard?.formFactor}</strong></span>
            </div>
          </div>

          {/* 3. GPU */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-glow" />
                3. Видеокарта (GPU)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.gpu ? formatPrice(build.gpu.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.gpu?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, gpu: GPUS.find(g => g.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {GPUS.map(gpu => (
                <option key={gpu.id} value={gpu.id}>
                  {gpu.name} | Длина: {gpu.lengthMm}мм | Реком. БП: {gpu.minPsuWattage}W — {formatPrice(gpu.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Длина: <strong className="text-slate-200">{build.gpu?.lengthMm} мм</strong></span>
              <span>TDP: <strong className="text-slate-200">{build.gpu?.tdp} Вт</strong></span>
              <span>Мин. БП: <strong className="text-slate-200">{build.gpu?.minPsuWattage} Вт</strong></span>
            </div>
          </div>

          {/* 4. RAM */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-glow" />
                4. Оперативная память (RAM)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.ram ? formatPrice(build.ram.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.ram?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, ram: RAMS.find(r => r.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {RAMS.map(ram => (
                <option key={ram.id} value={ram.id}>
                  {ram.name} — {formatPrice(ram.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Тип: <strong className="text-slate-200">{build.ram?.type}</strong></span>
              <span>Объём: <strong className="text-slate-200">{build.ram?.capacityGb} ГБ</strong></span>
              <span>Частота: <strong className="text-slate-200">{build.ram?.speedMhz} МГц</strong></span>
            </div>
          </div>

          {/* 5. SSD */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-glow" />
                5. Накопитель SSD M.2 NVMe
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.ssd ? formatPrice(build.ssd.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.ssd?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, ssd: SSDS.find(s => s.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {SSDS.map(ssd => (
                <option key={ssd.id} value={ssd.id}>
                  {ssd.name} — {formatPrice(ssd.price)}
                </option>
              ))}
            </select>
          </div>

          {/* 6. PSU */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-glow" />
                6. Блок питания (PSU)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.psu ? formatPrice(build.psu.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.psu?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, psu: PSUS.find(p => p.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {PSUS.map(psu => (
                <option key={psu.id} value={psu.id}>
                  {psu.name} — {formatPrice(psu.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Мощность: <strong className="text-slate-200">{build.psu?.wattage} Вт</strong></span>
              <span>Сертификат: <strong className="text-slate-200">{build.psu?.efficiency}</strong></span>
            </div>
          </div>

          {/* 7. Case */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-cyan-glow" />
                7. Корпус (Case)
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.pcCase ? formatPrice(build.pcCase.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.pcCase?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, pcCase: CASES.find(c => c.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {CASES.map(pcCase => (
                <option key={pcCase.id} value={pcCase.id}>
                  {pcCase.name} — {formatPrice(pcCase.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Макс. длина видеокарты: <strong className="text-slate-200">{build.pcCase?.maxGpuLengthMm} мм</strong></span>
              <span>Поддерживаемые платы: <strong className="text-slate-200">{build.pcCase?.supportedMotherboards.join(', ')}</strong></span>
            </div>
          </div>

          {/* 8. Cooler */}
          <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Fan className="w-4 h-4 text-cyan-glow" />
                8. Система охлаждения процессора
              </label>
              <span className="text-xs font-mono font-bold text-cyan-glow">
                {build.cooler ? formatPrice(build.cooler.price) : '0 ₽'}
              </span>
            </div>
            <select
              value={build.cooler?.id || ''}
              onChange={(e) => setBuild(prev => ({ ...prev, cooler: COOLERS.find(c => c.id === e.target.value) || null }))}
              className="w-full px-3 py-2.5 rounded-lg bg-dark-950 border border-slate-800 text-sm text-white focus:border-cyan-400 focus:outline-none"
            >
              {COOLERS.map(cooler => (
                <option key={cooler.id} value={cooler.id}>
                  {cooler.name} — {formatPrice(cooler.price)}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-slate-400 flex gap-4">
              <span>Тип: <strong className="text-slate-200">{build.cooler?.type}</strong></span>
              <span>Рассеиваемая мощность: <strong className="text-slate-200">до {build.cooler?.maxTdp} Вт</strong></span>
            </div>
          </div>
        </div>

        {/* Sidebar: Real Compatibility Check & Specs (5 cols) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
          {/* Compatibility Banner */}
          <div className={`p-5 rounded-2xl border transition-all ${
            compResult.isCompatible
              ? compResult.issues.length > 0
                ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200 shadow-glow-cyan'
              : 'bg-red-950/40 border-red-500/60 text-red-200 animate-pulse'
          }`}>
            <div className="flex items-start gap-3">
              {compResult.isCompatible ? (
                compResult.issues.length > 0 ? (
                  <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                )
              ) : (
                <XCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
              )}

              <div>
                <h4 className="text-base font-bold text-white">
                  {compResult.isCompatible
                    ? compResult.issues.length > 0
                      ? 'Совместимо с предупреждениями'
                      : 'Все компоненты 100% совместимы'
                    : 'Обнаружена несовместимость компонентов!'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {compResult.isCompatible
                    ? 'Сокеты, тип памяти, габариты корпуса и мощность блока питания полностью соответствуют спецификациям.'
                    : 'Сборка не может быть запущена в таком виде. Ознакомьтесь со списком ошибок ниже.'}
                </p>
              </div>
            </div>

            {/* List of Issues if any */}
            {compResult.issues.length > 0 && (
              <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                {compResult.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                      issue.type === 'error'
                        ? 'bg-red-900/40 border border-red-500/40 text-red-100'
                        : 'bg-amber-900/40 border border-amber-500/40 text-amber-100'
                    }`}
                  >
                    <div className="font-semibold flex items-center gap-1.5 mb-0.5">
                      {issue.type === 'error' ? 'Критическая ошибка: ' : 'Внимание: '}
                      {issue.title}
                    </div>
                    <div>{issue.description}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Technical Calculations */}
          <div className="p-5 rounded-2xl bg-dark-900 border border-slate-800 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 border-b border-slate-800 pb-2">
              Анализ энергопотребления системы
            </h4>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Расчётный TDP под нагрузкой:</span>
                <span className="font-mono font-bold text-white">~{compResult.estimatedTdp} Вт</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Рекомендуемый блок питания:</span>
                <span className="font-mono font-bold text-cyan-glow">от {compResult.recommendedPsuWattage} Вт</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Выбранная мощность БП:</span>
                <span className={`font-mono font-bold ${
                  (build.psu?.wattage || 0) >= compResult.recommendedPsuWattage
                    ? 'text-emerald-400'
                    : 'text-amber-400'
                }`}>
                  {build.psu?.wattage || 0} Вт
                </span>
              </div>
            </div>

            {/* Component prices summary */}
            <div className="pt-3 border-t border-slate-800 space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Стоимость комплектующих:</span>
                <span className="font-mono text-white">{formatPrice(compResult.totalPrice)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Сборка, кабель-менеджмент, BIOS:</span>
                <span className="font-mono text-cyan-glow">3 500 ₽</span>
              </div>
            </div>

            {/* Grand Total */}
            <div className="p-4 rounded-xl bg-dark-950 border border-cyan-500/30">
              <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                Итого под ключ с гарантией 12 мес:
              </div>
              <div className="text-3xl font-extrabold text-cyan-glow font-mono mt-0.5">
                {formatPrice(compResult.totalPrice + 3500)}
              </div>
            </div>

            {/* Order build button */}
            <button
              onClick={handleOrderBuild}
              disabled={!compResult.isCompatible}
              className={`w-full py-4 rounded-xl font-bold text-dark-950 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-[0.98] ${
                !compResult.isCompatible
                  ? 'bg-slate-700 cursor-not-allowed opacity-50'
                  : 'bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300'
              }`}
            >
              <span>Заказать сборку этой конфигурации</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {!compResult.isCompatible && (
              <p className="text-[11px] text-red-400 text-center">
                Устраните ошибки несовместимости компонентов для заказа
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
