import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowLeft, ArrowRight } from 'lucide-react';

interface DeviceIssue {
  id: string;
  name: string;
  basePrice: number;
  timeEstimate: string;
}

const devices = [
  { id: 'laptop', name: 'Ноутбук', icon: '💻' },
  { id: 'desktop', name: 'Компьютер', icon: '🖥️' },
  { id: 'phone', name: 'Смартфон', icon: '📱' },
  { id: 'tablet', name: 'Планшет', icon: '📸' },
  { id: 'console', name: 'Игровая консоль', icon: '🎮' },
  { id: 'monitor', name: 'Монитор', icon: '🖥️' }
];

const issuesByDevice: Record<string, DeviceIssue[]> = {
  laptop: [
    { id: 'not_waking', name: 'Не включается', basePrice: 1500, timeEstimate: '1–2 дня' },
    { id: 'overheating', name: 'Перегревается', basePrice: 800, timeEstimate: '2–4 часа' },
    { id: 'screen_break', name: 'Разбит экран', basePrice: 3500, timeEstimate: '1 день' },
    { id: 'not_charging', name: 'Не заряжается', basePrice: 1200, timeEstimate: '1–3 часа' },
    { id: 'keyboard_broken', name: 'Не работает клавиатура', basePrice: 2000, timeEstimate: '2–4 часа' },
    { id: 'body_damage', name: 'Повреждён корпус', basePrice: 1800, timeEstimate: '1 день' },
    { id: 'liquid_damage', name: 'Залит жидкостью', basePrice: 4500, timeEstimate: '2–3 дня' },
    { id: 'needs_cleaning', name: 'Требуется чистка', basePrice: 600, timeEstimate: '1 час' },
    { id: 'other', name: 'Другая неисправность', basePrice: 500, timeEstimate: 'По диагностике' }
  ],
  phone: [
    { id: 'not_waking', name: 'Не включается', basePrice: 1200, timeEstimate: '1 день' },
    { id: 'screen_break', name: 'Разбит экран', basePrice: 4500, timeEstimate: '1 день' },
    { id: 'not_charging', name: 'Не заряжается', basePrice: 800, timeEstimate: '1–2 часа' },
    { id: 'battery_drain', name: 'Быстро разряжается', basePrice: 1500, timeEstimate: '1 день' },
    { id: 'water_damage', name: 'После залития', basePrice: 3500, timeEstimate: '2–3 дня' }
  ],
  desktop: [
    { id: 'not_waking', name: 'Не включается', basePrice: 1000, timeEstimate: '1–2 часа' },
    { id: 'overheating', name: 'Перегревается', basePrice: 600, timeEstimate: '1 час' },
    { id: 'psu_issue', name: 'Проблемы блока питания', basePrice: 2000, timeEstimate: '2–4 часа' },
    { id: 'motherboard_issue', name: 'Проблемы материнской платы', basePrice: 3000, timeEstimate: '1–2 дня' },
    { id: 'gpu_issue', name: 'Проблемы видеокарты', basePrice: 2500, timeEstimate: '1–2 дня' },
    { id: 'cpu_issue', name: 'Проблемы процессора', basePrice: 4000, timeEstimate: '2–3 дня' }
  ]
};

const additionalServices: Array<{ id: string; name: string; price: number }> = [
  { id: 'os_install', name: 'Установка ОС', price: 500 },
  { id: 'software_setup', name: 'Установка ПО', price: 300 },
  { id: 'data_backup', name: 'Резервное копирование', price: 700 },
  { id: 'overclocking', name: 'Оверклокинг', price: 1500 }
];

export function RepairCostCalculator() {
  const [step, setStep] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState('');
  const [selectedIssue, setSelectedIssue] = useState('');
  const [selectedAdditional, setSelectedAdditional] = useState<string[]>([]);
  
  const issues = selectedDevice ? (issuesByDevice[selectedDevice] || []) : [];

  const calculatePrice = () => {
    const issuePrice = selectedIssue ? issues.find(i => i.id === selectedIssue)?.basePrice || 0 : 0;
    const additionalPrice = selectedAdditional.reduce((sum, id) => {
      const service = additionalServices.find(s => s.id === id);
      return sum + (service?.price || 0);
    }, 0);
    return issuePrice + additionalPrice;
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const reset = () => {
    setStep(0);
    setSelectedDevice('');
    setSelectedIssue('');
    setSelectedAdditional([]);
  };

  const total = calculatePrice();

  return (
    <section id="calculator" className="py-20 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Калькулятор </span>
            <span className="text-primary">стоимости ремонта</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Рассчитайте приблизительную стоимость ремонта вашей техники
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Step Progress */}
          <div className="flex justify-center items-center mb-8">
            {[0, 1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s === step ? 'bg-primary' : s < step ? 'bg-primary/50' : 'bg-darkGray'}`}>
                  {s + 1}
                </div>
                {s < 3 && (
                  <div className={`w-16 h-1 ${s < step ? 'bg-primary' : 'bg-darkGray'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Device Selection */}
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold mb-4 text-white text-center">Выберите тип устройства</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {devices.map((device) => (
                    <motion.button
                      key={device.id}
                      onClick={() => {
                        setSelectedDevice(device.id);
                        nextStep();
                      }}
                      className="p-4 bg-darkGray rounded-2xl hover:bg-primary/20 transition-colors duration-300 flex flex-col items-center gap-2"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="text-3xl">{device.icon}</span>
                      <span className="text-sm font-medium text-white">{device.name}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Issue Selection */}
            {step === 1 && selectedDevice && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold mb-4 text-white text-center">Выберите тип неисправности</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {issues.map((issue) => (
                    <motion.button
                      key={issue.id}
                      onClick={() => setSelectedIssue(issue.id)}
                      className={`w-full p-4 rounded-2xl transition-all duration-300 flex justify-between items-center ${
                        selectedIssue === issue.id 
                          ? 'bg-primary shadow-lg' 
                          : 'bg-darkGray hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className={selectedIssue === issue.id ? 'text-white font-medium' : 'text-white'}>
                        {issue.name} — {issue.timeEstimate}
                      </span>
                      <span className={selectedIssue === issue.id ? 'text-white text-sm' : 'text-gray-400 text-sm'}>
                        {issue.basePrice} ₽
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Additional Services */}
            {step === 2 && selectedDevice && selectedIssue && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold mb-4 text-white text-center">Дополнительные услуги</h3>
                <div className="space-y-2">
                  {additionalServices.map((service) => (
                    <motion.button
                      key={service.id}
                      onClick={() => {
                        const newSelected = selectedAdditional.includes(service.id)
                          ? selectedAdditional.filter(id => id !== service.id)
                          : [...selectedAdditional, service.id];
                        setSelectedAdditional(newSelected);
                      }}
                      className={`w-full p-4 rounded-2xl transition-all duration-300 flex justify-between items-center ${
                        selectedAdditional.includes(service.id)
                          ? 'bg-primary shadow-lg'
                          : 'bg-darkGray hover:bg-white/5'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className={selectedAdditional.includes(service.id) ? 'text-white font-medium' : 'text-white'}>
                        {service.name}
                      </span>
                      <span className={selectedAdditional.includes(service.id) ? 'text-white' : 'text-gray-400'}>
                        +{service.price} ₽
                      </span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Result */}
            {step === 3 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="text-center space-y-6"
              >
                <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Результат расчета</h3>
                  <div className="bg-white/10 rounded-2xl p-6 mb-4">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold mb-2">
                        {total.toLocaleString()} ₽
                      </div>
                      <p className="text-gray-200 text-sm">Ориентировочная стоимость ремонта</p>
                      {selectedIssue && (
                        <p className="text-gray-300 text-xs">
                          {issues.find(i => i.id === selectedIssue)?.name} • {issues.find(i => i.id === selectedIssue)?.timeEstimate}
                        </p>
                      )}
                      {selectedAdditional.length > 0 && (
                        <p className="text-gray-300 text-xs">
                          Доп. услуги: {selectedAdditional.length}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-sm opacity-90">
                      Итоговая стоимость определяется после диагностики. Указанная сумма является предварительной оценкой.
                    </p>
                    <a 
                      href="#contact" 
                      className="inline-block mt-4 px-6 py-3 bg-white text-primary font-bold rounded-full hover:bg-white/95 transition-colors duration-300"
                    >
                      Записаться на диагностику
                    </a>
                  </div>
                </div>

                <button
                  onClick={reset}
                  className="px-6 py-3 bg-darkGray text-white rounded-full hover:bg-white/10 transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  Сделать новый расчет
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          {step > 0 && step < 3 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-darkGray text-white rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <ArrowLeft size={18} />
                Назад
              </button>
              <button
                onClick={nextStep}
                disabled={!selectedIssue || (step === 2 && selectedAdditional.length === 0)}
                className="px-6 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={!selectedIssue || (step === 2 && selectedAdditional.length === 0) ? false : { scale: 1.05 }}
              >
                Далее
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}