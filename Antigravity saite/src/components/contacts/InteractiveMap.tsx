import React, { useState } from 'react';
import { MapPin, Navigation, Car, Train } from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'metro' | 'car'>('all');

  return (
    <div className="relative rounded-2xl bg-dark-950 border border-slate-800 overflow-hidden shadow-2xl h-[420px] flex flex-col justify-between">
      {/* Top Map Toolbar */}
      <div className="relative z-10 p-3 bg-dark-950/80 backdrop-blur-md border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-glow animate-pulse" />
          <span className="text-xs font-mono text-white font-semibold">
            ИНТЕРАКТИВНАЯ КАРТА ПРОЕЗДА
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveLayer('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
              activeLayer === 'all'
                ? 'bg-cyan-500 text-dark-950 font-bold'
                : 'bg-dark-900 text-slate-300 hover:bg-dark-850'
            }`}
          >
            Все маршруты
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('metro')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeLayer === 'metro'
                ? 'bg-cyan-500 text-dark-950 font-bold'
                : 'bg-dark-900 text-slate-300 hover:bg-dark-850'
            }`}
          >
            <Train className="w-3 h-3" />
            Пешком от метро
          </button>
          <button
            type="button"
            onClick={() => setActiveLayer('car')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1 ${
              activeLayer === 'car'
                ? 'bg-cyan-500 text-dark-950 font-bold'
                : 'bg-dark-900 text-slate-300 hover:bg-dark-850'
            }`}
          >
            <Car className="w-3 h-3" />
            На авто + Парковка
          </button>
        </div>
      </div>

      {/* Styled Vector Cyber Map Background */}
      <div className="relative flex-1 bg-[#0a0e17] overflow-hidden">
        {/* Road Grid and City Streets SVG */}
        <svg 
          className="absolute inset-0 w-full h-full opacity-60" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Avenues */}
          <line x1="0" y1="180" x2="100%" y2="180" stroke="#1e293b" strokeWidth="18" />
          <line x1="260" y1="0" x2="260" y2="100%" stroke="#1e293b" strokeWidth="22" />
          <line x1="0" y1="290" x2="100%" y2="290" stroke="#1e293b" strokeWidth="14" />
          <line x1="580" y1="0" x2="580" y2="100%" stroke="#1e293b" strokeWidth="16" />

          {/* Secondary streets */}
          <line x1="120" y1="0" x2="120" y2="100%" stroke="#141d2e" strokeWidth="8" />
          <line x1="420" y1="0" x2="420" y2="100%" stroke="#141d2e" strokeWidth="10" />
          <line x1="0" y1="90" x2="100%" y2="90" stroke="#141d2e" strokeWidth="8" />

          {/* Metro Orange Line (Kaluzhsko-Rizhskaya) */}
          {(activeLayer === 'all' || activeLayer === 'metro') && (
            <path 
              d="M 80 40 Q 240 160 480 320" 
              stroke="#f97316" 
              strokeWidth="5" 
              strokeDasharray="8 6" 
              fill="none" 
            />
          )}

          {/* Metro Red Line (Sokolnicheskaya) */}
          {(activeLayer === 'all' || activeLayer === 'metro') && (
            <path 
              d="M 140 380 L 520 80" 
              stroke="#ef4444" 
              strokeWidth="5" 
              strokeDasharray="8 6" 
              fill="none" 
            />
          )}

          {/* Walking pedestrian route to Pixel Service */}
          {(activeLayer === 'all' || activeLayer === 'metro') && (
            <path 
              d="M 180 180 L 260 180 L 260 220 L 320 220" 
              stroke="#00F0FF" 
              strokeWidth="3.5" 
              strokeDasharray="5 5" 
              className="animate-pulse"
              fill="none" 
            />
          )}

          {/* Car path to parking */}
          {(activeLayer === 'all' || activeLayer === 'car') && (
            <path 
              d="M 580 290 L 380 290 L 380 220 L 335 220" 
              stroke="#8b5cf6" 
              strokeWidth="4" 
              fill="none" 
            />
          )}
        </svg>

        {/* Metro Station 1: Sukharevskaya */}
        <div className="absolute top-[160px] left-[160px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-dark-900/90 border border-orange-500/40 px-2 py-1 rounded-lg shadow-lg">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[10px] font-mono font-bold text-white">м. Сухаревская (4 мин)</span>
        </div>

        {/* Metro Station 2: Prospekt Mira */}
        <div className="absolute top-[60px] left-[320px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-dark-900/90 border border-orange-500/40 px-2 py-1 rounded-lg shadow-lg">
          <span className="w-2 h-2 rounded-full bg-orange-500" />
          <span className="text-[10px] font-mono font-bold text-white">м. Проспект Мира (7 мин)</span>
        </div>

        {/* Central Pin: PIXEL SERVICE */}
        <div className="absolute top-[220px] left-[320px] transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group cursor-pointer">
          {/* Animated beacon waves */}
          <div className="absolute -top-1 w-12 h-12 bg-cyan-400/20 rounded-full animate-ping" />
          <div className="relative w-10 h-10 rounded-2xl bg-cyan-400 text-dark-950 flex items-center justify-center font-bold shadow-glow-cyan border-2 border-white">
            <MapPin className="w-6 h-6 stroke-[2.5]" />
          </div>

          <div className="mt-2 bg-dark-950 border border-cyan-400 px-3 py-1.5 rounded-xl shadow-2xl text-center">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow animate-pulse" />
              PIXEL SERVICE
            </div>
            <div className="text-[10px] text-cyan-accent font-mono">
              ул. Большая Спасская, 12, оф. 104
            </div>
          </div>
        </div>

        {/* Parking Spot indicator */}
        {(activeLayer === 'all' || activeLayer === 'car') && (
          <div className="absolute top-[250px] left-[380px] transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 bg-purple-950/90 border border-purple-500/40 px-2 py-1 rounded-lg shadow-lg">
            <span className="w-3.5 h-3.5 rounded bg-purple-500 text-white font-bold text-[9px] flex items-center justify-center font-mono">P</span>
            <span className="text-[9px] text-purple-200">Бесплатная парковка</span>
          </div>
        )}
      </div>

      {/* Bottom Map Info Footer */}
      <div className="relative z-10 p-3 bg-dark-950/90 backdrop-blur-md border-t border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Navigation className="w-3.5 h-3.5 text-cyan-glow shrink-0" />
          <span>БЦ «Цифровой», 1-й этаж, центральный вход, офис 104</span>
        </div>
        <div className="text-slate-500 font-mono text-[10px]">
          Широта: 55.7745° | Долгота: 37.6412°
        </div>
      </div>
    </div>
  );
};
