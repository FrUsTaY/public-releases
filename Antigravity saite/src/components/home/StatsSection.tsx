import React from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  AlertCircle
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 'stat-1',
      icon: Users,
      value: '5 400+',
      label: 'Обслуженных устройств',
      sublabel: 'ПК, ноутбуков, видеокарт и консолей',
      color: 'text-cyan-glow'
    },
    {
      id: 'stat-2',
      icon: Calendar,
      value: '8+ лет',
      label: 'Инженерного опыта',
      sublabel: 'Успешной практики в компонентной пайке',
      color: 'text-purple-400'
    },
    {
      id: 'stat-3',
      icon: Clock,
      value: '95%',
      label: 'Ремонтов в срок',
      sublabel: 'Выполнение точно по согласованному плану',
      color: 'text-emerald-400'
    },
    {
      id: 'stat-4',
      icon: ShieldCheck,
      value: 'до 12 мес',
      label: 'Официальная гарантия',
      sublabel: 'Письменный талон на все детали и работы',
      color: 'text-cyan-glow'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.id}
                className="p-6 rounded-2xl bg-dark-950/80 border border-slate-800/80 hover:border-cyan-500/30 transition-all text-center sm:text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-dark-900 border border-slate-800 flex items-center justify-center mb-4 mx-auto sm:mx-0">
                    <Icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div className={`text-3xl sm:text-4xl font-extrabold font-mono tracking-tight ${s.color}`}>
                    {s.value}
                  </div>
                  <div className="text-sm font-bold text-white mt-1">
                    {s.label}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {s.sublabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo disclaimer required by TZ */}
        <div className="mt-8 p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-center gap-2 text-center text-[11px] text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            {SITE_CONFIG.stats.disclaimer}. Приведены для иллюстрации масштаба и возможностей лаборатории.
          </span>
        </div>
      </div>
    </section>
  );
};
