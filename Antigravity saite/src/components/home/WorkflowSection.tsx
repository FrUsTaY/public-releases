import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { WORKFLOW_STEPS } from '../../data/servicesData';

export const WorkflowSection: React.FC = () => {
  return (
    <section className="py-20 bg-dark-900/40 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ПРОЗРАЧНЫЙ РЕГЛАМЕНТ РАБОТЫ</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Как мы возвращаем технику <span className="text-cyan-glow">в строй</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Шесть понятных шагов от заявки до проверки готового устройства. Полная прозрачность, фотоотчеты и согласование сметы до начала работ.
          </p>
        </div>

        {/* 6 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-dark-950 border border-slate-800/80 relative hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-card"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black font-mono text-cyan-500/30 group-hover:text-cyan-glow transition-colors">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-400 border border-slate-800">
                    {step.time}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-glow transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-cyan-glow font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Этап {idx + 1} из 6</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
