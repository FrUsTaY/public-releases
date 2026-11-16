import React, { useState } from 'react';
import { X } from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const DemoBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-dark-950 via-dark-900 to-dark-950 border-b border-cyan-500/25 px-4 py-1.5 text-[11px] text-slate-300 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-hidden truncate">
          <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-glow font-mono font-bold text-[9px] shrink-0 border border-cyan-500/40">
            ДЕМО-ПРОЕКТ
          </span>
          <span className="truncate">
            {SITE_CONFIG.contacts.isDemoNotice} Интерактивные калькуляторы и логика проверки совместимости полностью функциональны.
          </span>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-slate-400 hover:text-white p-0.5 rounded shrink-0"
          aria-label="Закрыть уведомление"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
