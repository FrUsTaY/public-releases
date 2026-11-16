import React from 'react';
import { 
  ArrowRight, 
  Calculator, 
  Zap, 
  Cpu, 
  CheckCircle2,
  Wrench,
  ChevronRight
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAppointment: () => void;
  onNavigateToCalculator: () => void;
  onNavigateToServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenAppointment,
  onNavigateToCalculator,
  onNavigateToServices
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial gradient mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-cyan-500/10 via-purple-600/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-cyan-400/5 rounded-full blur-2xl pointer-events-none" />

      {/* Cyber grid lines overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(#00F0FF 1px, transparent 1px), linear-gradient(90deg, #00F0FF 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text content - 7 cols */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Top pill badge */}
            <button 
              onClick={onNavigateToServices}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono hover:bg-cyan-500/20 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
              <span>ЛАБОРАТОРИЯ КОМПОНЕНТНОГО РЕМОНТА ЭЛЕКТРОНИКИ</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* Headline from TZ */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Возвращаем технику <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glow via-cyan-300 to-purple-400">
                к жизни
              </span>
            </h1>

            {/* Subtitle from TZ */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Профессиональный ремонт компьютеров, ноутбуков, смартфонов и цифровой электроники. Точная аппаратная диагностика, честная стоимость до начала работ и официальная гарантия.
            </p>

            {/* Key mini bullets */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-glow" />
                <span>BGA-пайка под микроскопом</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-glow" />
                <span>Бесплатная диагностика</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-glow" />
                <span>Гарантия до 12 месяцев</span>
              </div>
            </div>

            {/* Buttons from TZ */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={onNavigateToCalculator}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-95 group"
              >
                <Calculator className="w-4 h-4 text-dark-950" />
                <span>Рассчитать стоимость</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenAppointment}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-sm text-white bg-dark-900 border border-slate-700 hover:border-cyan-400 hover:bg-dark-850 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Wrench className="w-4 h-4 text-cyan-glow" />
                <span>Записаться на диагностику (0 ₽)</span>
              </button>
            </div>

            {/* Trust badge stats */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-glow">5 000+</div>
                <div className="text-[11px] text-slate-400">Устройств спасено</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-purple-400">95%</div>
                <div className="text-[11px] text-slate-400">Ремонтов в срок</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">12 мес</div>
                <div className="text-[11px] text-slate-400">Официальная гарантия</div>
              </div>
            </div>
          </div>

          {/* High-Tech Hardware Visual Composition - 5 cols */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card: Interactive Hardware Diagnostic Terminal */}
              <div className="relative rounded-3xl bg-gradient-to-b from-dark-850 to-dark-950 p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 overflow-hidden">
                {/* Circuit ambient glow */}
                <div className="absolute top-0 right-0 w-44 h-44 bg-cyan-500/10 rounded-full blur-2xl" />

                {/* Window header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 font-mono text-xs text-slate-400">PIXEL-OS DIAGNOSTICS v4.2</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-cyan-glow bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
                    ONLINE
                  </span>
                </div>

                {/* Hardware Schematics Illustration */}
                <div className="relative h-48 bg-dark-950/80 rounded-2xl border border-slate-800/80 p-4 flex flex-col justify-between overflow-hidden">
                  <div className="flex justify-between items-start text-xs font-mono">
                    <div className="text-cyan-glow flex items-center gap-1.5">
                      <Cpu className="w-4 h-4" />
                      <span>BGA SOC / GPU COLD PLATE</span>
                    </div>
                    <span className="text-emerald-400">32.4°C / NORMAL</span>
                  </div>

                  {/* Microcontroller chip vector illustration */}
                  <div className="flex items-center justify-center relative my-2">
                    <div className="relative w-28 h-28 rounded-xl bg-gradient-to-br from-slate-900 to-dark-850 border-2 border-cyan-500/60 flex flex-col items-center justify-center shadow-glow-cyan">
                      <Cpu className="w-10 h-10 text-cyan-glow animate-pulse-slow" />
                      <span className="text-[9px] font-mono font-bold text-white mt-1">RTX / RYZEN</span>
                      <span className="text-[8px] font-mono text-cyan-accent">DIAG TEST: OK</span>

                      {/* Pins around */}
                      <span className="absolute -top-1.5 left-4 w-2 h-1 bg-cyan-400 rounded-sm" />
                      <span className="absolute -top-1.5 right-4 w-2 h-1 bg-cyan-400 rounded-sm" />
                      <span className="absolute -bottom-1.5 left-4 w-2 h-1 bg-cyan-400 rounded-sm" />
                      <span className="absolute -bottom-1.5 right-4 w-2 h-1 bg-cyan-400 rounded-sm" />
                    </div>
                  </div>

                  {/* Signal line */}
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
                    <span>12V RAIL: 12.08V (0.01% ripple)</span>
                    <span className="text-cyan-glow">VRM DRMOS: PASSED</span>
                  </div>
                </div>

                {/* Telemetry items below */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs">
                    <div className="text-slate-400 text-[10px]">Тепловизор Fluke Ti480</div>
                    <div className="font-mono font-bold text-white mt-0.5">КЗ не обнаружено</div>
                  </div>

                  <div className="p-3 rounded-xl bg-dark-900 border border-slate-800 text-xs">
                    <div className="text-slate-400 text-[10px]">Осциллограф Rigol</div>
                    <div className="font-mono font-bold text-cyan-glow mt-0.5">Частоты стабильны</div>
                  </div>
                </div>

                {/* Floating badge top right */}
                <div className="absolute -top-3 -right-3 bg-cyan-400 text-dark-950 font-bold text-[11px] font-mono px-3 py-1 rounded-full shadow-lg transform rotate-3 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 fill-dark-950" />
                  ТОЧНОСТЬ 100%
                </div>
              </div>

              {/* Floating review/trust pill */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-dark-900/95 border border-slate-700/80 backdrop-blur-md p-3 rounded-2xl shadow-xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold">
                  ★ 4.9
                </div>
                <div className="text-left text-xs">
                  <div className="font-bold text-white">Высокое доверие</div>
                  <div className="text-slate-400 text-[11px]">Рейтинг качества сервиса</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
