import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  Send, 
  Phone, 
  MessageCircle, 
  Cpu, 
  AlertCircle, 
  Loader2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { Modal } from './Modal';
import { SITE_CONFIG } from '../../config/siteConfig';
import { formatPrice, validatePhone } from '../../utils/formatters';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    deviceType?: string;
    problem?: string;
    estimatedCost?: number;
    calculatorNotes?: string;
  };
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  prefill
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceType, setDeviceType] = useState('Ноутбук');
  const [problem, setProblem] = useState('');
  const [contactMethod, setContactMethod] = useState<'telegram' | 'whatsapp' | 'phone'>('telegram');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      if (prefill) {
        if (prefill.deviceType) setDeviceType(prefill.deviceType);
        if (prefill.problem) setProblem(prefill.problem);
        if (prefill.calculatorNotes && !problem) {
          setProblem(prefill.calculatorNotes);
        }
      }
      setIsSuccess(false);
      setErrors({});
    }
  }, [isOpen, prefill]);

  // Phone input mask handler
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
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: '' }));
    }
  };

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) {
      errs.name = 'Пожалуйста, укажите ваше имя';
    } else if (name.trim().length < 2) {
      errs.name = 'Имя должно содержать не менее 2 букв';
    }

    if (!phone) {
      errs.phone = 'Укажите контактный номер телефона';
    } else if (!validatePhone(phone)) {
      errs.phone = 'Пожалуйста, введите полный номер телефона (10 цифр)';
    }

    if (!problem.trim()) {
      errs.problem = 'Опишите неисправность или требуемую услугу';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validate()) return;

    setIsSubmitting(true);

    const submission = {
      id: 'REQ-' + Math.floor(100000 + Math.random() * 900000),
      name: name.trim(),
      phone,
      deviceType,
      problem: problem.trim(),
      contactMethod,
      estimatedCost: prefill?.estimatedCost,
      date: new Date().toLocaleString('ru-RU')
    };

    // Simulate realistic async network submission
    setTimeout(() => {
      // Save locally to localStorage demo history
      try {
        const history = JSON.parse(localStorage.getItem('pixel_service_leads') || '[]');
        history.unshift(submission);
        localStorage.setItem('pixel_service_leads', JSON.stringify(history.slice(0, 20)));
      } catch (err) {
        console.warn('Storage quota or private mode', err);
      }

      setLastSubmittedData(submission);
      setIsSubmitting(false);
      setIsSuccess(true);

      // Trigger high-tech festive confetti
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#A855F7', '#38BDF8', '#10B981']
      });
    }, 900);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setProblem('');
    setIsSuccess(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={isSuccess ? handleReset : onClose}
      title={isSuccess ? 'Заявка принята!' : 'Запись на диагностику и ремонт'}
      subtitle={
        isSuccess 
          ? 'Данные зафиксированы в демонстрационном реестре' 
          : 'Бесплатный осмотр инженера и фиксация цены до начала работ'
      }
      maxWidth="max-w-lg"
    >
      {isSuccess ? (
        <div className="text-center py-4 space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-glow flex items-center justify-center mx-auto shadow-glow-cyan">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-bold text-white">
              Спасибо, {lastSubmittedData?.name}!
            </h4>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Номер вашей демонстрационной заявки:{' '}
              <span className="font-mono font-bold text-cyan-glow bg-dark-950 px-2 py-0.5 rounded border border-cyan-500/30">
                {lastSubmittedData?.id}
              </span>
            </p>
          </div>

          <div className="bg-dark-950/70 border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Устройство:</span>
              <span className="text-white font-medium">{lastSubmittedData?.deviceType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800/80 pb-2">
              <span className="text-slate-400">Способ связи:</span>
              <span className="text-cyan-glow capitalize font-mono">
                {lastSubmittedData?.contactMethod === 'telegram' ? 'Telegram' : lastSubmittedData?.contactMethod === 'whatsapp' ? 'WhatsApp' : 'Телефон'}
              </span>
            </div>
            {lastSubmittedData?.estimatedCost && (
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Ориентировочная сумма:</span>
                <span className="text-emerald-400 font-bold">{formatPrice(lastSubmittedData.estimatedCost)}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-slate-400 pt-1">
              <Clock className="w-3.5 h-3.5 text-cyan-glow" />
              <span>Ориентировочное время ответа дежурного инженера: ~7 минут</span>
            </div>
          </div>

          {/* Explicit demo disclaimer required by Section 7 */}
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-left text-[11px] text-amber-200/90 leading-relaxed">
            <div className="flex items-center gap-1.5 font-semibold text-amber-400 mb-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Демонстрационный режим
            </div>
            Данные сохранены в памяти браузера и никуда не передаются. На реальном сайте заявка поступает в CRM систему и Telegram-бот дежурного инженера сервиса.
          </div>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-xl font-bold text-dark-950 bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 transition-all shadow-glow-cyan"
          >
            Понятно, вернуться к сайту
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {prefill?.estimatedCost && (
            <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-4 h-4 text-cyan-glow" />
                <span>Предварительный расчёт по калькулятору:</span>
              </div>
              <span className="text-sm font-bold text-cyan-glow font-mono">
                {formatPrice(prefill.estimatedCost)}
              </span>
            </div>
          )}

          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Ваше имя <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors(prev => ({ ...prev, name: '' }));
              }}
              placeholder="Например: Константин"
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border ${
                errors.name ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
              } text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Номер телефона <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="+7 (___) ___-__-__"
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border font-mono ${
                errors.phone ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
              } text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors`}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Device Type */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Категория цифровой техники
            </label>
            <select
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-dark-950 border border-slate-800 text-white text-sm focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors"
            >
              <option value="Ноутбук">Ноутбук / Ультрабук</option>
              <option value="Компьютер">Настольный / Игровой ПК</option>
              <option value="Смартфон">Смартфон</option>
              <option value="Планшет">Планшет</option>
              <option value="Видеокарта">Видеокарта</option>
              <option value="Игровая консоль">Игровая консоль (PS5 / Xbox / Switch)</option>
              <option value="Монитор">Монитор / Дисплей</option>
              <option value="Другая техника">Другая цифровая электроника</option>
            </select>
          </div>

          {/* Problem */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Что произошло с устройством? <span className="text-red-400">*</span>
            </label>
            <textarea
              rows={3}
              value={problem}
              onChange={(e) => {
                setProblem(e.target.value);
                if (errors.problem) setErrors(prev => ({ ...prev, problem: '' }));
              }}
              placeholder="Например: Не включается после скачка напряжения, либо треснул экран..."
              className={`w-full px-4 py-2.5 rounded-xl bg-dark-950 border ${
                errors.problem ? 'border-red-500' : 'border-slate-800 focus:border-cyan-400'
              } text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 transition-colors resize-none`}
            />
            {errors.problem && (
              <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.problem}
              </p>
            )}
          </div>

          {/* Contact Method */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">
              Удобный способ связи:
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setContactMethod('telegram')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  contactMethod === 'telegram'
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-glow'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5 text-cyan-glow" />
                <span>Telegram</span>
              </button>

              <button
                type="button"
                onClick={() => setContactMethod('whatsapp')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  contactMethod === 'whatsapp'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-400'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => setContactMethod('phone')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  contactMethod === 'phone'
                    ? 'bg-blue-500/20 border-blue-400 text-blue-400'
                    : 'bg-dark-950 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Звонок</span>
              </button>
            </div>
          </div>

          {/* Submit Button with Anti-double-click */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 rounded-xl font-bold text-dark-950 transition-all flex items-center justify-center gap-2 shadow-glow-cyan ${
              isSubmitting
                ? 'bg-cyan-500/50 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-glow to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 active:scale-[0.98]'
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                <span>Регистрация заявки...</span>
              </>
            ) : (
              <span>Записаться на диагностику (0 ₽)</span>
            )}
          </button>

          {/* Direct channels */}
          <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
            <span>Или свяжитесь сразу напрямую:</span>
            <div className="flex items-center gap-3">
              <a 
                href={SITE_CONFIG.socials.telegram} 
                target="_blank" 
                rel="noreferrer" 
                className="text-cyan-glow hover:underline flex items-center gap-0.5"
              >
                Telegram <ExternalLink className="w-2.5 h-2.5" />
              </a>
              <a 
                href={`tel:${SITE_CONFIG.contacts.phoneRaw}`} 
                className="text-white hover:underline font-mono"
              >
                {SITE_CONFIG.contacts.phone}
              </a>
            </div>
          </div>
        </form>
      )}
    </Modal>
  );
};
