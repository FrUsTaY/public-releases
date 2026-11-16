import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  HelpCircle,
  Banknote,
  Shield,
  TestTube2,
  HardDrive
} from 'lucide-react';

const advantages = [
  {
    icon: Award,
    title: 'Опытные инженеры',
    description: 'Квалифицированные специалисты с многолетним опытом ремонта'
  },
  {
    icon: HelpCircle,
    title: 'Бесплатная первичная консультация',
    description: 'Получите профессиональную диагностику без оплаты'
  },
  {
    icon: Banknote,
    title: 'Прозрачная стоимость ремонта',
    description: 'Честные цены без скрытых платежей'
  },
  {
    icon: Shield,
    title: 'Гарантия на работы',
    description: 'Гарантируем качество исполнения на срок до 12 месяцев'
  },
  {
    icon: TestTube2,
    title: 'Современное диагностическое оборудование',
    description: 'Точная диагностика с использованием профессионального инструмента'
  },
  {
    icon: HardDrive,
    title: 'Бережное отношение к данным клиента',
    description: 'Восстанавливаем данные с минимальным риском их потери'
  }
];

export function AdvantagesSection() {
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
            <span className="text-white">Почему выбирают </span>
            <span className="text-primary">нас</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Наша работа основана на профессионализме, честности и внимании к деталям
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((item, index) => (
            <motion.div
              key={item.title}
              className="bg-darkGray rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(14, 165, 233, 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <item.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}