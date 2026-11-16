import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Smartphone as Phone, Monitor, HardDrive } from 'lucide-react';

const popularServices = [
  {
    icon: Phone,
    title: 'Замена матрицы',
    description: 'Замена дисплея смартфона или планшета',
    price: 'от 3 500 ₽',
    time: '1–2 дня'
  },
  {
    icon: Wrench,
    title: 'Замена термопасты',
    description: 'Оптимизация температурного режима',
    price: 'от 800 ₽',
    time: '2–3 часа'
  },
  {
    icon: Monitor,
    title: 'Чистка от пыли',
    description: 'Глубокая очистка системы охлаждения',
    price: 'от 1 200 ₽',
    time: '1–2 часа'
  },
  {
    icon: HardDrive,
    title: 'Восстановление данных',
    description: 'Восстановление утерянных файлов',
    price: 'от 2 500 ₽',
    time: '1–3 дня'
  }
];

export function PopularServicesSection() {
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Популярные </span>
            <span className="text-primary">услуги</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Наиболее востребованные услуги по ремонту цифровой техники
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularServices.map((service, index) => (
            <motion.div
              key={service.title}
              className="bg-darkGray rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1 }}
              >
                <service.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-lg font-bold mb-2 text-white">{service.title}</h3>
              <p className="text-gray-400 text-sm mb-3">{service.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-primary font-bold">{service.price}</span>
                <span className="text-gray-500 text-sm">{service.time}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 px-3 py-2 bg-primary hover:bg-secondary text-white text-sm rounded-full transition-colors duration-300">
                  Рассчитать
                </button>
                <button className="flex-1 px-3 py-2 bg-transparent border border-primary text-primary text-sm rounded-full hover:bg-primary/10 transition-colors duration-300">
                  Заявка
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}