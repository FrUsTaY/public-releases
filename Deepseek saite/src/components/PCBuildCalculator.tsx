import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Component {
  id: string;
  name: string;
  price: number;
}

const componentCategories = {
  processor: [
    { id: 'i5_12400', name: 'Intel Core i5-12400', price: 20000 },
    { id: 'i7_13700k', name: 'Intel Core i7-13700K', price: 35000 },
    { id: 'ryzen_5_5600', name: 'AMD Ryzen 5 5600', price: 15000 },
    { id: 'ryzen_7_5800x', name: 'AMD Ryzen 7 5800X', price: 25000 },
    { id: 'ryzen_9_5900x', name: 'AMD Ryzen 9 5900X', price: 45000 }
  ],
  motherboard: [
    { id: 'b660', name: 'MSI B660M', price: 12000 },
    { id: 'b760', name: 'ASUS B760', price: 15000 },
    { id: 'b560', name: 'MSI B560', price: 10000 }
  ],
  ram: [
    { id: '16gb', name: '16GB DDR4', price: 3000 },
    { id: '32gb', name: '32GB DDR4', price: 6000 },
    { id: '64gb', name: '64GB DDR4', price: 12000 }
  ],
  ssd: [
    { id: '500gb', name: '500GB NVMe', price: 3000 },
    { id: '1tb', name: '1TB NVMe', price: 5000 },
    { id: '2tb', name: '2TB NVMe', price: 9000 }
  ],
  gpu: [
    { id: 'rtx_3060', name: 'NVIDIA RTX 3060', price: 25000 },
    { id: 'rtx_4060', name: 'NVIDIA RTX 4060', price: 32000 },
    { id: 'rtx_4070', name: 'NVIDIA RTX 4070', price: 55000 }
  ],
  case: [
    { id: 'mid_tower', name: 'Mid Tower', price: 4000 },
    { id: 'full_tower', name: 'Full Tower', price: 8000 }
  ],
  cooling: [
    { id: 'air', name: 'Воздушный охладитель', price: 2000 },
    { id: 'liquid', name: 'Жидкостной охладитель', price: 6000 }
  ],
  psu: [
    { id: '550w', name: '550W', price: 3500 },
    { id: '650w', name: '650W', price: 4500 },
    { id: '750w', name: '750W', price: 5500 }
  ]
};

const categoryLabels: Record<string, string> = {
  processor: 'Процессор',
  motherboard: 'Материнская плата',
  ram: 'Оперативная память',
  ssd: 'SSD',
  gpu: 'Видеокарта',
  case: 'Корпус',
  cooling: 'Система охлаждения',
  psu: 'Блок питания'
};

export function PCBuildCalculator() {
  const [selected, setSelected] = useState<Record<string, Component | null>>({
    processor: null,
    motherboard: null,
    ram: null,
    ssd: null,
    gpu: null,
    case: null,
    cooling: null,
    psu: null
  });

  const total = Object.values(selected).reduce((sum, comp) => sum + (comp?.price || 0), 0);

  const selectComponent = (category: string, component: Component) => {
    setSelected(prev => ({ ...prev, [category]: component }));
  };

  const reset = () => {
    setSelected({
      processor: null,
      motherboard: null,
      ram: null,
      ssd: null,
      gpu: null,
      case: null,
      cooling: null,
      psu: null
    });
  };

  return (
    <section className="py-20 bg-dark">
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
            <span className="text-primary">сборки ПК</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Подберите компоненты и получите итоговую стоимость сборки
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(componentCategories).map(([category, components], idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-darkGray rounded-2xl p-4 shadow-xl"
              >
                <h3 className="text-sm font-bold text-gray-400 mb-3">{categoryLabels[category]}</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {components.map(comp => (
                    <motion.button
                      key={comp.id}
                      onClick={() => selectComponent(category, comp)}
                      className={`w-full p-3 rounded-xl text-left transition-all duration-300 ${
                        selected[category as keyof typeof selected]?.id === comp.id
                          ? 'bg-primary shadow-lg'
                          : 'bg-white/5 hover:bg-white/10'
                      }`}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="font-medium text-white">{comp.name}</div>
                      <div className="text-xs text-gray-400">{comp.price.toLocaleString()} ₽</div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 bg-gradient-to-br from-primary to-secondary rounded-3xl p-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {total.toLocaleString()} ₽
              </div>
              <p className="text-white/90 text-sm mb-4">
                Итоговая стоимость сборки ПК
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-gray-200">Выбрано компонентов:</div>
                  <div className="font-bold">{Object.values(selected).filter(Boolean).length}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <div className="text-gray-200">Готово к сборке:</div>
                  <div className="font-bold">{Object.values(selected).every(Boolean) ? 'Да' : 'Нет'}</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={reset}
              className="px-6 py-3 bg-darkGray text-white rounded-full hover:bg-white/10 transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              Сбросить
            </button>
            <button
              disabled={Object.values(selected).every(Boolean)}
              className="px-6 py-3 bg-white text-primary font-bold rounded-full hover:bg-white/95 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: Object.values(selected).every(Boolean) ? false : 1.05 }}
            >
              Сохранить конфигурацию
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}