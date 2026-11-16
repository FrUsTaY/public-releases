import React, { useState } from 'react';
import { 
  Check, 
  Wrench, 
  Sparkles, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { MAINTENANCE_SERVICES, MaintenanceOption } from '../../data/calculatorData';
import { formatPrice } from '../../utils/formatters';

interface MaintenanceCalculatorProps {
  onOrder: (data: { deviceType: string; problem: string; estimatedCost: number; notes: string }) => void;
}

export const MaintenanceCalculator: React.FC<MaintenanceCalculatorProps> = ({ onOrder }) => {
  // Pre-select recommended items
  const [selectedServices, setSelectedServices] = useState<string[]>([
    'clean_dust',
    'paste_cpu',
    'paste_gpu'
  ]);

  const toggleService = (id: string) => {
    // If selecting full_preventive, handle smart selection
    if (id === 'full_preventive') {
      if (selectedServices.includes('full_preventive')) {
        setSelectedServices(['clean_dust', 'paste_cpu']);
      } else {
        setSelectedServices(['full_preventive']);
      }
      return;
    }

    // If full_preventive was active and user clicks individual service, remove full_preventive
    let updated = selectedServices.filter(s => s !== 'full_preventive');
    if (updated.includes(id)) {
      updated = updated.filter(s => s !== id);
    } else {
      updated.push(id);
    }
    setSelectedServices(updated);
  };

  const isFullPackage = selectedServices.includes('full_preventive');

  // Calculate sum and discount
  const activeItems = MAINTENANCE_SERVICES.filter(s => selectedServices.includes(s.id));
  
  const rawSum = activeItems.reduce((acc, curr) => acc + curr.price, 0);
  
  // Package bundle discount if user selected 3+ individual items
  let discount = 0;
  if (!isFullPackage && activeItems.length >= 3) {
    discount = Math.round(rawSum * 0.15); // 15% discount for combo
  }

  const finalSum = Math.max(0, rawSum - discount);

  // Time estimate
  const estimatedHours = isFullPackage 
    ? '2.5–3 часа' 
    : activeItems.length <= 2 
    ? '1-1.5 часа' 
    : '2–3 часа';

  const handleOrder = () => {
    const serviceNames = activeItems.map(i => i.title).join(', ');
    onOrder({
      deviceType: 'Настольный компьютер / ПК',
      problem: `Техническое обслуживание ПК: ${serviceNames}`,
      estimatedCost: finalSum,
      notes: `Выбранные работы ТО: ${serviceNames}. Итого со скидкой: ${formatPrice(finalSum)}`
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Services Checklist - 7 cols */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Wrench className="w-4 h-4 text-cyan-glow" />
              Выберите необходимые регламентные работы
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Отметьте нужные пункты или выберите комплексный пакет со скидкой
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSelectedServices(['clean_dust', 'paste_cpu', 'paste_gpu', 'stress_test'])}
            className="text-xs font-mono text-cyan-glow hover:underline hidden sm:block"
          >
            Выбрать популярный набор
          </button>
        </div>

        {/* List of services */}
        <div className="space-y-2.5">
          {MAINTENANCE_SERVICES.map((item: MaintenanceOption) => {
            const isChecked = selectedServices.includes(item.id);
            const isPackage = item.id === 'full_preventive';

            return (
              <div
                key={item.id}
                onClick={() => toggleService(item.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  isPackage
                    ? isChecked
                      ? 'bg-gradient-to-r from-purple-950/60 to-cyan-950/60 border-purple-500/80 shadow-glow-purple'
                      : 'bg-dark-900 border-purple-500/40 hover:border-purple-500'
                    : isChecked
                    ? 'bg-cyan-500/10 border-cyan-500/60 shadow-sm'
                    : 'bg-dark-900/70 border-slate-800 hover:bg-dark-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                      isChecked 
                        ? isPackage ? 'bg-purple-500 border-purple-500 text-white' : 'bg-cyan-400 border-cyan-400 text-dark-950'
                        : 'border-slate-600 bg-dark-950'
                    }`}>
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-white">{item.title}</span>
                        {item.recommended && !isPackage && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-glow border border-cyan-500/30">
                            Рекомендуем
                          </span>
                        )}
                        {isPackage && (
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white flex items-center gap-1">
                            <Sparkles className="w-3 h-3" />
                            ВЫГОДА 40%
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className={`text-sm font-mono font-bold ${isPackage ? 'text-purple-300' : 'text-cyan-glow'}`}>
                      {formatPrice(item.price)}
                    </div>
                    <div className="text-[10px] text-slate-500 flex items-center justify-end gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      {item.duration}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Box - 5 cols */}
      <div className="lg:col-span-5 lg:sticky lg:top-24">
        <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400">Детализация профилактики</div>
            <h3 className="text-lg font-bold text-white mt-0.5">Состав обслуживания</h3>
          </div>

          {/* Chosen services list */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {activeItems.length === 0 ? (
              <p className="text-xs text-slate-500 italic py-2">
                Выберите хотя бы одну услугу в списке слева
              </p>
            ) : (
              activeItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-xs py-1 border-b border-slate-800/50">
                  <span className="text-slate-300 truncate max-w-[220px]">{item.title}</span>
                  <span className="font-mono text-white shrink-0">{formatPrice(item.price)}</span>
                </div>
              ))
            )}
          </div>

          {/* Discount alert if applicable */}
          {discount > 0 && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Скидка за комбо (3+ услуги):
              </span>
              <span className="font-mono font-bold">-{formatPrice(discount)}</span>
            </div>
          )}

          {/* Timing & Guarantee */}
          <div className="bg-dark-950/60 rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Ориентировочное время:</span>
              <span className="font-medium text-white">{estimatedHours}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Используемые материалы:</span>
              <span className="font-medium text-cyan-glow">Arctic MX-6 / Odyssey</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Гарантия на термопрофиль:</span>
              <span className="font-medium text-emerald-400">6 месяцев</span>
            </div>
          </div>

          {/* Total Price Display */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/60 to-dark-950 border border-cyan-500/30">
            <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Итого к оплате с материалами:
            </div>
            <div className="text-3xl font-extrabold text-cyan-glow font-mono mt-0.5">
              {formatPrice(finalSum)}
            </div>
          </div>

          <button
            onClick={handleOrder}
            disabled={activeItems.length === 0}
            className={`w-full py-4 rounded-xl font-bold text-dark-950 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-[0.98] ${
              activeItems.length === 0
                ? 'bg-slate-700 cursor-not-allowed opacity-50'
                : 'bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300'
            }`}
          >
            <span>Заказать обслуживание</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
