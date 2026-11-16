import React from 'react';
import { motion } from 'framer-motion';
import {
  DesktopComputer,
  Notebook,
  Smartphone,
  Tablet,
  GPU,
  Gamepad2
} from 'lucide-react';

const serviceCategories = [
  {
    icon: DesktopComputer,
    title: 'Компьютеры и игровые ПК',
    description: 'Полный спектр услуг для настольных компьютеров',
    count: 1200
  },
  {
    icon: Notebook,
    title: 'Ноутбуки',
    description: 'Ремонт любых ноутбуков, включая ультрабуки',
    count: 1800
  },
  {
    icon: Smartphone,
    title: 'Смартфоны',
    description: 'Замена экранов, ремонт разъёмов, восстановление',
    count: 2100
  },
  {
    icon: Tablet,
    title: 'Планшеты',
    description: 'Диагностика и ремонт планшетных компьютеров',
    count: 450
  },
  {
    icon: GPU,
    title: 'Видеокарты и комплектующие',
    description: 'Работа с отдельными компонентами',
    count: 300
  },
  {
    icon: Gamepad2,
    title: 'Игровые консоли',
    description: 'Ремонт PlayStation, Xbox, Nintendo Switch',
    count: 250
  }
];

export function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Направления </span>
            <span className="text-primary">ремонта</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы обслуживаем широкий спектр цифровой техники
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((service, index) => (
            <motion.div
              key={service.title}
              className="group bg-darkGray rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <service.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-white">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{service.description}</p>
                  <motion.span
                    className="text-primary font-medium text-sm"
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    {service.count}+ услуг →
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}