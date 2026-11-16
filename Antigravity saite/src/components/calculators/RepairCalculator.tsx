import React, { useState } from 'react';
import { 
  Laptop, 
  Cpu, 
  Smartphone, 
  Tablet, 
  Layers, 
  Gamepad2, 
  AlertCircle, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { 
  REPAIR_DEVICES, 
  REPAIR_FAULTS, 
  REPAIR_EXTRAS,
  RepairDeviceOption 
} from '../../data/calculatorData';
import { formatPrice } from '../../utils/formatters';

interface RepairCalculatorProps {
  onOrder: (data: { deviceType: string; problem: string; estimatedCost: number; notes: string }) => void;
}

export const RepairCalculator: React.FC<RepairCalculatorProps> = ({ onOrder }) => {
  const [selectedDevice, setSelectedDevice] = useState<string>('laptop');
  const [selectedModel, setSelectedModel] = useState<string>(REPAIR_DEVICES[0].models[0]);
  const [selectedFaultId, setSelectedFaultId] = useState<string>(
    REPAIR_FAULTS['laptop']?.[0]?.id || ''
  );
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['courier']);

  const currentDeviceObj = REPAIR_DEVICES.find(d => d.id === selectedDevice) || REPAIR_DEVICES[0];
  const faultList = REPAIR_FAULTS[selectedDevice] || [];
  const currentFault = faultList.find(f => f.id === selectedFaultId) || faultList[0];

  const handleDeviceChange = (deviceId: string) => {
    setSelectedDevice(deviceId);
    const newDev = REPAIR_DEVICES.find(d => d.id === deviceId);
    if (newDev && newDev.models.length > 0) {
      setSelectedModel(newDev.models[0]);
    }
    const newFaults = REPAIR_FAULTS[deviceId] || [];
    if (newFaults.length > 0) {
      setSelectedFaultId(newFaults[0].id);
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // Calculation
  const baseCost = currentFault ? currentFault.basePrice : 1500;
  const extrasCost = selectedExtras.reduce((sum, extraId) => {
    const extra = REPAIR_EXTRAS.find(e => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);
  const totalCost = baseCost + extrasCost;

  const handleBook = () => {
    const notes = `Калькулятор ремонта: ${currentDeviceObj.name} (${selectedModel}). Неисправность: ${currentFault?.name}. Доп. опции: ${selectedExtras.join(', ')}`;
    onOrder({
      deviceType: `${currentDeviceObj.name} (${selectedModel})`,
      problem: currentFault?.name || 'Ремонт цифрового устройства',
      estimatedCost: totalCost,
      notes
    });
  };

  const getDeviceIcon = (icon: string) => {
    switch (icon) {
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5" />;
      case 'Tablet': return <Tablet className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Gamepad2': return <Gamepad2 className="w-5 h-5" />;
      default: return <Cpu className="w-5 h-5" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Controls Form - 7 cols */}
      <div className="lg:col-span-7 space-y-6">
        {/* Step 1: Device Type */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-glow flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-glow flex items-center justify-center text-[10px] font-bold">1</span>
            Выберите тип цифровой техники
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {REPAIR_DEVICES.map((dev: RepairDeviceOption) => {
              const isSelected = dev.id === selectedDevice;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => handleDeviceChange(dev.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-cyan-500/15 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-dark-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className={`p-2 rounded-lg w-fit ${isSelected ? 'bg-cyan-500 text-dark-950' : 'bg-dark-800 text-cyan-glow'}`}>
                    {getDeviceIcon(dev.icon)}
                  </div>
                  <span className="text-xs font-semibold leading-tight">{dev.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Model / Series */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-glow flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-glow flex items-center justify-center text-[10px] font-bold">2</span>
            Модель или серия устройства
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
          >
            {currentDeviceObj.models.map((mod: string) => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>
        </div>

        {/* Step 3: Fault / Issue */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-glow flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-glow flex items-center justify-center text-[10px] font-bold">3</span>
            Характер неисправности
          </label>
          <div className="space-y-2">
            {faultList.map((fault) => {
              const isSelected = fault.id === selectedFaultId;
              return (
                <div
                  key={fault.id}
                  onClick={() => setSelectedFaultId(fault.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-sm'
                      : 'bg-dark-900/60 border-slate-800/80 hover:bg-dark-850 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-white flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                      }`}>
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-dark-950" />}
                      </div>
                      <span>{fault.name}</span>
                    </div>
                    <p className="text-xs text-slate-400 pl-6 leading-relaxed">
                      {fault.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono font-semibold text-cyan-glow">
                      от {formatPrice(fault.basePrice)}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      ~{fault.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 4: Additional options */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-cyan-glow flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-glow flex items-center justify-center text-[10px] font-bold">4</span>
            Дополнительные опции
          </label>
          <div className="space-y-2">
            {REPAIR_EXTRAS.map((extra) => {
              const isChecked = selectedExtras.includes(extra.id);
              return (
                <label
                  key={extra.id}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-cyan-500/10 border-cyan-500/40'
                      : 'bg-dark-900/40 border-slate-800/80 hover:bg-dark-850'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleExtra(extra.id)}
                    className="mt-0.5 rounded border-slate-700 text-cyan-400 focus:ring-0"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{extra.name}</span>
                      <span className="font-mono font-bold text-cyan-glow">
                        {extra.price === 0 ? 'Бесплатно' : `+${formatPrice(extra.price)}`}
                      </span>
                    </div>
                    <p className="text-slate-400 mt-0.5">{extra.description}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Summary Output - 5 cols (Sticky on desktop) */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Предварительный расчет</div>
              <h3 className="text-lg font-bold text-white mt-0.5">Смета на ремонт</h3>
            </div>
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-glow">
              <Sparkles className="w-5 h-5" />
            </div>
          </div>

          {/* Breakdown list */}
          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Устройство:</span>
              <span className="font-semibold text-white">{currentDeviceObj.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Модель:</span>
              <span className="font-semibold text-cyan-glow font-mono">{selectedModel}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Неисправность:</span>
              <span className="font-semibold text-white text-right max-w-[200px] truncate">{currentFault?.name}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Базовые работы:</span>
              <span className="font-mono text-white">{formatPrice(baseCost)}</span>
            </div>
            {extrasCost > 0 && (
              <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                <span className="text-slate-400">Дополнительные опции:</span>
                <span className="font-mono text-cyan-glow">+{formatPrice(extrasCost)}</span>
              </div>
            )}
            <div className="flex justify-between items-center py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-glow" />
                Срок выполнения:
              </span>
              <span className="font-mono text-white font-medium">{currentFault?.duration || '1-2 дня'}</span>
            </div>
            <div className="flex justify-between items-center py-1.5">
              <span className="text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Гарантия на узел:
              </span>
              <span className="text-emerald-400 font-medium">до 12 месяцев</span>
            </div>
          </div>

          {/* Grand total banner */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-dark-950 border border-cyan-500/30 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Итоговая ориентировочная стоимость
            </div>
            <div className="text-3xl font-extrabold text-cyan-glow font-mono">
              {formatPrice(totalCost)}
            </div>
          </div>

          {/* Mandatory Disclaimer as per TZ 6.1 */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2.5 text-[11px] text-amber-200/90 leading-tight">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              <strong>Внимание:</strong> Итоговая стоимость определяется после аппаратной диагностики. Указанная сумма является предварительной оценкой типовых работ.
            </p>
          </div>

          <button
            onClick={handleBook}
            className="w-full py-4 rounded-xl font-bold text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-[0.98]"
          >
            <span>Записаться на этот ремонт</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
