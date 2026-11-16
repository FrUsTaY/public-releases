import React, { useState } from 'react';
import { Star, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';
import { REVIEWS_DATA } from '../../data/reviewsData';

export const ReviewsSection: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredReviews = filter === 'all' 
    ? REVIEWS_DATA 
    : REVIEWS_DATA.filter(r => r.device.toLowerCase().includes(filter.toLowerCase()));

  return (
    <section className="py-20 bg-dark-950 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>ОТЗЫВЫ О РЕЗУЛЬТАТАХ РЕМОНТА</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Что говорят клиенты <span className="text-cyan-glow">о нашей работе</span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Реальные истории спасения дорогостоящего оборудования после залитий, перепадов напряжения и сбоев видеочипов.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: 'all', label: 'Все отзывы' },
            { id: 'видеокарт', label: 'Видеокарты' },
            { id: 'ноутбук', label: 'Ноутбуки' },
            { id: 'пк', label: 'Компьютеры' },
            { id: 'консоль', label: 'Консоли' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setFilter(btn.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                filter === btn.id
                  ? 'bg-cyan-500 text-dark-950 font-bold'
                  : 'bg-dark-900 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-6 rounded-2xl bg-dark-900 border border-slate-800/80 flex flex-col justify-between shadow-card hover:border-cyan-500/30 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-mono text-slate-500">
                    {rev.date}
                  </span>
                </div>

                <div>
                  <div className="font-mono text-xs font-bold text-cyan-glow">
                    {rev.device}
                  </div>
                  <div className="text-[11px] text-slate-400 italic">
                    {rev.serviceType}
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  «{rev.text}»
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 text-cyan-glow font-bold text-xs flex items-center justify-center font-mono">
                    {rev.author[0]}
                  </div>
                  <span className="text-xs font-semibold text-white">{rev.author}</span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Проверен</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo reviews note */}
        <div className="mt-10 p-3 bg-dark-900/60 border border-slate-800 rounded-xl text-center text-[11px] text-slate-400 flex items-center justify-center gap-2 max-w-xl mx-auto">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            Отзывы носят демонстрационный характер и иллюстрируют типичные сценарии решения аппаратных проблем клиентов.
          </span>
        </div>
      </div>
    </section>
  );
};
