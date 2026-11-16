import React from 'react';
import { 
  Cpu, 
  ShieldCheck, 
  Award, 
  Wrench, 
  Sparkles, 
  Microscope, 
  Activity, 
  Lock, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';

export const AboutPage: React.FC = () => {
  const equipment = [
    {
      title: 'Инфракрасная паяльная станция «Термопро ИК-650»',
      desc: 'Прецизионный термопрофиль для безопасного демонтажа и запайки BGA-чипов видеопамяти и процессоров без перегрева текстолита.',
      icon: Cpu
    },
    {
      title: 'Четырёхканальный цифровой осциллограф Rigol',
      desc: 'Анализ сигналов шин PCIe, SMBus, фаз питания VRM и дежурных линий с разрешением до 1 ГГц.',
      icon: Activity
    },
    {
      title: 'Оптический стереомикроскоп с увеличением до 90x',
      desc: 'Восстановление поврежденных дорожек толщиной до 0.05 мм, поиск микротрещин в шариках BGA-пайки.',
      icon: Microscope
    },
    {
      title: 'Тепловизионный комплекс Fluke Professional',
      desc: 'Мгновенная локализация пробитых керамических конденсаторов и микросхем с точностью до 0.1°C.',
      icon: Sparkles
    }
  ];

  return (
    <div className="pt-28 pb-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>ИНЖЕНЕРНАЯ ФИЛОСОФИЯ PIXEL SERVICE</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            О нашей лаборатории <br />
            <span className="text-cyan-glow">компонентного ремонта</span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Мы объединили опытных инженеров-схемотехников и профессиональное лабораторное оборудование, чтобы спасать технику даже в случаях, когда другие мастерские признают её «неремонтопригодной».
          </p>
        </div>

        {/* 2-Column Story & Principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-cyan-glow uppercase tracking-wider">Принцип работы</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Восстановление на уровне элементов, а не блочная замена
              </h2>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              Большинство современных сервисных центров работают по принципу «модульной замены»: при выходе из строя одного копеечного транзистора в цепи питания вам предлагают заменить всю материнскую плату или видеокарту за 70–80% от цены устройства.
            </p>

            <p className="text-sm text-slate-300 leading-relaxed">
              В <strong className="text-cyan-glow">PIXEL SERVICE</strong> мы локализуем конкретный пробитый элемент (ШИМ-контроллер, мосфет DrMOS, фильтрующий конденсатор, чип видеопамяти) и заменяем именно его на оригинальный компонент от производителя, сохраняя заводскую плату и сокращая расходы клиента в несколько раз.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-glow shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Пайка по заводским температурным профилям IPC/JEDEC</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-glow shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Ультразвуковая деоксидация плат после залития специальными составами</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-cyan-glow shrink-0 mt-0.5" />
                <span className="text-xs text-slate-300">Обязательное нагрузочное тестирование в стресс-тестах FurMark / OCCT</span>
              </div>
            </div>
          </div>

          {/* Clean Tech Visual Showcase */}
          <div className="relative rounded-3xl bg-gradient-to-br from-dark-850 to-dark-900 border border-slate-800 p-8 shadow-2xl overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="text-xs font-mono text-cyan-glow uppercase tracking-wider">
                Лабораторный регламент
              </div>
              <div className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold">
                ISO / ESD ЗАЩИТА
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-glow" />
                  Антистатическая зона (ESD Protection)
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Все рабочие столы инженеров заземлены и оборудованы антистатическими ковриками и браслетами для исключения пробоя чувствительных полупроводников.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-cyan-glow" />
                  Строгий регламент конфиденциальности данных
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {SITE_CONFIG.warranty.dataPrivacy}. Мы не подключаем клиентские диски к сети и не открываем личные папки без прямого запроса на сохранение данных.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-dark-950/80 border border-slate-800/80 space-y-1">
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-glow" />
                  Собственный склад оригинальных компонентов
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Постоянное наличие оригинальных матриц, контроллеров питания, ключей DrMOS и чипов GDDR6 для быстрого старта ремонта без длительного ожидания поставок.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono text-cyan-glow uppercase tracking-wider">Материально-техническая база</span>
            <h3 className="text-2xl font-bold text-white">Инструменты и оборудование лаборатории</h3>
            <p className="text-xs text-slate-400">
              Высокоточное оснащение рабочих мест для диагностики и микропайки
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {equipment.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/30 text-cyan-glow flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-white leading-snug">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="text-[10px] font-mono text-cyan-glow/80 pt-2 border-t border-slate-800">
                    Метрологическая поверка 2026
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Demo Notice required by TZ */}
        <div className="p-4 rounded-xl bg-dark-900/60 border border-amber-500/30 text-xs text-amber-200/90 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-400 block mb-0.5">Демонстрационная информация:</span>
            Описания оборудования и регламентов соответствуют реальным практикам профессиональных сервисных центров по компонентному ремонту электроники. Данные представлены в качестве концепта цифрового сайта сервиса.
          </div>
        </div>
      </div>
    </div>
  );
};
