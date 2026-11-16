import React, { useState } from 'react';
import { motion } from 'framer-motion';

const maintenanceServices = [
  { id: 'clean_dust', name: 'Чистка от пыли', price: 1200 },
  { id: 'thermal_paste_cpu', name: 'Замена термопасты процессора', price: 800 },
  { id: 'thermal_paste_gpu', name: 'Замена термопасты видеокарты', price: 1500 },
  { id: 'thermal_pad', name: 'Замена термопадок', price: 1200 },
  { id: 'cooling_system', name: 'Обслуживание системы охлаждения', price: 2000 },
  { id: 'temperature_check', name: 'Проверка температур', price: 500 },
  { id: 'component_check', name: 'Диагностика комплектующих', price: 1000 },
  { id: 'cable_management', name: 'Кабель-менеджмент', price: 700 },
  { id: 'full_maintenance', name: 'Полная профилактика', price: 3500 }
];

export function SupportPCCalculator() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);

  const total = selectedServices.reduce((sum, id) => {
    const service = maintenanceServices.find(s => s.id === id);
    return sum + (service?.price || 0);
  }, 0);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
            <span className="text-primary">обслуживания ПК</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Выберите услуги обслуживания и получите общую стоимость
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {maintenanceServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
                className={`group cursor-pointer p-6 rounded-2xl transition-all duration-300 ${
                  selectedServices.includes(service.id)
                    ? 'bg-primary shadow-lg'
                    : 'bg-darkGray hover:bg-white/5 border border-transparent hover:border-white/10'
                }`}
                whileHover={{ scale: 1.02 }}
                onClick={() => toggleService(service.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-white">{service.name}</div>
                  <div className="text-primary font-bold">{service.price} ₽</div>
                </div>
                <div className="w-2 h-2 rounded-full bg-white transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${
                  selectedServices.includes(service.id) ? 'opacity-100' : ''
                }" />
              </motion.div>
            ))}
          </div>

          {selectedServices.length > 0 && (
            <motion.div
              className="mt-8 bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-white"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{total.toLocaleString()} ₽</div>
                <p className="text-white/90 text-sm">Общая стоимость обслуживания</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}