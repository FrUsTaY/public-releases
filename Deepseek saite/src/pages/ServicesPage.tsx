import React from 'react';
import { motion } from 'framer-motion';
import {
  DesktopComputer,
  Notebook,
  Smartphone,
  Tablet,
  GPU,
  Gamepad2,
  Monitor,
  HardDrive,
  RefreshCw,
  Shield,
  Database,
 Cpu,
  Fan,
  PlugZap
} from 'lucide-react';

export function ServicesPage() {
  const serviceDetails = [
    {
      id: 'laptops',
      icon: Notebook,
      title: 'Ноутбуки',
      image: '/images/laptop.jpg',
      issues: [
        { name: 'Замена матрицы', price: 'от 5 000 ₽', time: '1 день' },
        { name: 'Замена клавиатуры', price: 'от 3 500 ₽', time: '2–4 часа' },
        { name: 'Ремонт разъёма питания', price: 'от 1 500 ₽', time: '2–3 часа' },
        { name: 'Замена аккумулятора', price: 'от 4 000 ₽', time: '1 день' },
        { name: 'Чистка системы охлаждения', price: 'от 1 200 ₽', time: '1–2 часа' },
        { name: 'Замена термопасты', price: 'от 800 ₽', time: '1 час' },
        { name: 'Ремонт материнской платы', price: 'от 8 000 ₽', time: '2–3 дня' },
        { name: 'Восстановление после залития', price: 'от 15 000 ₽', time: '3–5 дней' }
      ]
    },
    // More service items would be added here
  ];

  return (
    <section className="py-20 bg-dark min-h-screen">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Наши </span>
            <span className="text-primary">услуги</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Подробный список услуг с ценами и сроками выполнения
          </p>
        </motion.div>

        <div className="space-y-12">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-darkGray rounded-2xl overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 lg:p-8">
                <div className="lg:col-span-1">
                  <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl w-full h-64 flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-primary opacity-50" />
                  </div>
                </div>
                
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-4 text-white">{service.title}</h2>
                  <p className="text-gray-300 mb-6">
                    Профессиональный ремонт {service.title.toLowerCase()} с гарантией качества
                  </p>
                  
                  <h3 className="text-lg font-bold mb-3 text-white">Типичные неисправности:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.issues.map((issue) => (
                      <div key={issue.name} className="bg-dark rounded-xl p-4">
                        <h4 className="font-medium text-white mb-2">{issue.name}</h4>
                        <div className="flex justify-between text-sm">
                          <span className="text-primary font-bold">{issue.price}</span>
                          <span className="text-gray-500">{issue.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}