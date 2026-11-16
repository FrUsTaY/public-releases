import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, ArrowLeft, ArrowRight } from 'lucide-react';

const upgradeOptions = [
  {
    id: 'gpu_upgrade',
    name: 'Замена видеокарты',
    description: 'Повышение FPS в играх',
    price: 30000,
    compatible: ['i5_12400', 'i7_13700k', 'ryzen_5_5600', 'ryzen_7_5800x', 'ryzen_9_5900x']
  },
  {
    id: 'cpu_upgrade',
    name: 'Обновление процессора',
    description: 'Ускорение работы системы',
    price: 25000,
    compatible: ['i5_12400', 'i7_13700k', 'ryzen_5_5600', 'ryzen_7_5800x', 'ryzen_9_5900x']
  },
  {
    id: 'ram_upgrade',
    name: 'Увеличение объема оперативной памяти',
    description: 'От 16GB до 32GB или 64GB',
    price: 6000,
    compatible: ['m512', 'm713', 'm56', 'm756', 'm78']
  },
  {
    id: 'ssd_upgrade',
    name: 'Установка более быстрого SSD',
    description: 'НVMe до 2TB',
    price: 5000,
    compatible: ['m512', 'm713', 'm56', 'm756', 'm78']
  },
  {
    id: 'cooling_upgrade',
    name: 'Снижение температуры и шума',
    description: 'Замена термопасты и систем охлаждения',
    price: 2000,
    compatible: ['m512', 'm713', 'm56', 'm756', 'm78']
  },
  {
    id: 'overclocking',
    name: 'Оверклокинг процессора',
    description: 'Разгон для повышения производительности',
    price: 1500,
    compatible: ['i7_13700k', 'ryzen_7_5800x', 'ryzen_9_5900x']
  }
];

export function UpgradeCalculator() {
  const [step, setStep] = useState(0);
  const [selectedUpgrade, setSelectedUpgrade] = useState<string>('');
  const [upgradeDetails, setUpgradeDetails] = useState<any>(null);

  const calculateTotal = () => {
    if (upgradeDetails) {
      return upgradeDetails.price;
    }
    return 0;
  };

  const reset = () => {
    setStep(0);
    setSelectedUpgrade('');
    setUpgradeDetails(null);
  };

  return (
    <section className="py-20 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Калькулятор </span>
            <span className="text-primary">апгрейда ПК</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Подберите оптимальный вариант модернизации вашего компьютера
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {/* Step Progress */}
          <div className="flex justify-center items-center mb-8">
            {[0, 1].map((s) => (
              <React.Fragment key={s}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${s === step ? 'bg-primary' : s < step ? 'bg-primary/50' : 'bg-darkGray'}`}>
                  {s + 1}
                </div>
                {s < 1 && (
                  <div className={`w-16 h-1 ${s < 1 ? 'bg-primary' : 'bg-darkGray'}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step 1: Select Upgrade Direction */}
          {step === 0 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4 text-white text-center">Выберите направление модернизации</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upgradeOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    onClick={() => setSelectedUpgrade(option.id)}
                    className={`w-full p-6 rounded-2xl transition-all duration-300 flex justify-between items-center ${
                      selectedUpgrade === option.id
                        ? 'bg-primary shadow-lg' 
                        : 'bg-darkGray hover:bg-white/5'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-start gap-1">
                      <div className="text-lg font-bold text-primary">{option.name}</div>
                      <div className="text-gray-400 text-sm">{option.description}</div>
                    </div>
                    <div className="text-xl font-bold text-white">{option.price} ₽</div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Result */}
          {step === 1 && selectedUpgrade && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="text-center space-y-6"
            >
              <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Рекомендуемое обновление</h3>
                <div className="bg-white/10 rounded-2xl p-6 mb-4">
                  <div className="text-center space-y-2">
                    <div className="text-3xl font-bold mb-2">{calculateTotal().toLocaleString()} ₽</div>
                    <p className="text-gray-200 text-sm">Ориентировочная стоимость модернизации</p>
                    <p className="text-gray-300 text-xs">
                      Это демонстрационный подбор на основе заранее подготовленных правил.
                    </p>
                  </div>
                </div>
                <div className="flex justify-center space-x-4">
                  <motion.a
                    href="#"
                    className="px-6 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Сохранить конфигурацию
                  </motion.a>
                  <motion.a
                    href="#"
                    className="px-6 py-3 bg-transparent border-2 border-primary text-primary hover:bg-primary/10 rounded-full transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    Сделать новый расчет
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          {step > 0 && step < 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setStep(0)}
                className="px-6 py-3 bg-darkGray text-white rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <ArrowLeft size={18} />
                Назад
              </button>
              <button
                onClick={() => setStep(1)}
                disabled={!selectedUpgrade}
                className="px-6 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                whileHover={!selectedUpgrade ? false : { scale: 1.05 }}
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