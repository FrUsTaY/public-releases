import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle, 
  Share2, 
  Car, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/siteConfig';
import { InteractiveMap } from './InteractiveMap';
import { validatePhone } from '../../utils/formatters';

export const ContactsPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '');
    if (input.startsWith('8')) input = '7' + input.slice(1);
    if (!input.startsWith('7') && input.length > 0) input = '7' + input;

    let formatted = '';
    if (input.length > 0) formatted += '+7 ';
    if (input.length > 1) formatted += '(' + input.substring(1, 4);
    if (input.length >= 4) formatted += ') ' + input.substring(4, 7);
    if (input.length >= 7) formatted += '-' + input.substring(7, 9);
    if (input.length >= 9) formatted += '-' + input.substring(9, 11);

    setPhone(formatted);
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Укажите ваше имя');
      return;
    }
    if (!phone || !validatePhone(phone)) {
      setError('Введите корректный номер телефона');
      return;
    }
    if (!message.trim()) {
      setError('Напишите текст сообщения или вопрос');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  return (
    <div className="pt-28 pb-20 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-glow text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>СВЯЗЬ С СЕРВИСНЫМ ЦЕНТРОМ</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Контакты лаборатории <br />
            <span className="text-cyan-glow">PIXEL SERVICE</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Мы находимся в 4 минутах ходьбы от метро Сухаревская. Приезжайте на бесплатный осмотр или вызовите доставку курьером.
          </p>
        </div>

        {/* 4 Contact Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Phone */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/30 text-cyan-glow flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Прямой телефон:</div>
              <a 
                href={`tel:${SITE_CONFIG.contacts.phoneRaw}`}
                className="text-lg font-bold text-white hover:text-cyan-glow transition-colors font-mono block mt-0.5"
              >
                {SITE_CONFIG.contacts.phone}
              </a>
              <div className="text-[11px] text-emerald-400 flex items-center gap-1 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Инженер на связи
              </div>
            </div>
          </div>

          {/* Card 2: Email */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/30 text-cyan-glow flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Электронная почта:</div>
              <a 
                href={`mailto:${SITE_CONFIG.contacts.email}`}
                className="text-sm font-bold text-white hover:text-cyan-glow transition-colors font-mono block mt-1"
              >
                {SITE_CONFIG.contacts.email}
              </a>
              <div className="text-[11px] text-slate-400 mt-1">
                Для юрлиц и договоров
              </div>
            </div>
          </div>

          {/* Card 3: Address & Metro */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/30 text-cyan-glow flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Адрес мастерской:</div>
              <p className="text-xs text-white font-medium mt-1 leading-snug">
                {SITE_CONFIG.contacts.address}
              </p>
              <div className="text-[11px] text-cyan-accent font-mono mt-1">
                м. Сухаревская (4 мин)
              </div>
            </div>
          </div>

          {/* Card 4: Hours */}
          <div className="p-6 rounded-2xl bg-dark-900 border border-slate-800 space-y-3 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-dark-950 border border-cyan-500/30 text-cyan-glow flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase font-mono">Часы работы:</div>
              <div className="text-xs text-white font-mono mt-1 space-y-0.5">
                <div>{SITE_CONFIG.contacts.workingHours.weekdays}</div>
                <div>{SITE_CONFIG.contacts.workingHours.weekends}</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Без перерыва на обед
              </div>
            </div>
          </div>
        </div>

        {/* Messengers bar */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-cyan-glow" />
              Быстрая онлайн-консультация в мессенджерах
            </h3>
            <p className="text-xs text-slate-400">
              Пришлите фото или видео поломки устройства — инженер сориентирует по стоимости за 5 минут
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={SITE_CONFIG.socials.telegram}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-glow font-bold text-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Telegram-чат</span>
            </a>

            <a
              href={SITE_CONFIG.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-400 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp-чат</span>
            </a>

            <a
              href={SITE_CONFIG.socials.vk}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-400 font-bold text-xs transition-colors flex items-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              <span>Группа VK</span>
            </a>
          </div>
        </div>

        {/* 2-Column: Interactive Map + Direct Feedback Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map - 7 cols */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-glow" />
              Схема проезда и парковки
            </h3>

            <InteractiveMap />

            <div className="p-4 rounded-xl bg-dark-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
              <Car className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Как заехать на парковку:</strong>
                {SITE_CONFIG.contacts.parking}. Шлагбаум открывается автоматически при звонке с подтвержденного номера.
              </div>
            </div>
          </div>

          {/* Form - 5 cols */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-dark-900 border border-slate-800 shadow-card space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-glow">Форма связи</span>
                <h3 className="text-lg font-bold text-white mt-0.5">Задать вопрос инженеру</h3>
                <p className="text-xs text-slate-400 mt-1">Ответим на вопрос по ремонту или забронируем деталь</p>
              </div>

              {submitted ? (
                <div className="text-center py-8 space-y-4 animate-fadeIn">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-glow flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Сообщение принято!</h4>
                    <p className="text-xs text-slate-300 mt-1">
                      Дежурный инженер свяжется с вами в течение 10 минут.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName('');
                      setPhone('');
                      setMessage('');
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-cyan-glow bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20"
                  >
                    Отправить ещё одно сообщение
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Иван"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Телефон для связи
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="+7 (___) ___-__-__"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Ваш вопрос или описание поломки
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Какая модель устройства, что именно не работает?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-xs focus:border-cyan-400 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-xs text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 transition-all flex items-center justify-center gap-2 shadow-glow-cyan active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                        <span>Отправка...</span>
                      </>
                    ) : (
                      <>
                        <span>Отправить запрос инженеру</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Config note required by Section 5.4 */}
        <div className="p-4 rounded-xl bg-dark-900 border border-cyan-500/20 text-xs text-slate-400 flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-glow" />
            <span>
              Все контактные параметры и графики работы централизованно настраиваются в файле: <code className="text-cyan-glow font-mono">src/config/siteConfig.ts</code>
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            ДЕМОНСТРАЦИОННАЯ КОНФИГУРАЦИЯ
          </span>
        </div>
      </div>
    </div>
  );
};
