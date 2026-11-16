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
  Banknote,
  TestTube2,
  HardDrive as HardDriveIcon,
  Cpu,
  Fan,
  PlugZap
} from 'lucide-react';

const aboutContent = [
  {
    icon: Cpu,
    title: "Опыт и профессионализм",
    description: "Наши инженеры имеют многолетний опыт в ремонте цифровой техники и проходят регулярное обучение"
  },
  {
    icon: Shield,
    title: "Профессиональное оборудование",
    description: "Используем только профессиональное диагностическое оборудование для точной идентификации неисправностей"
  },
  {
    icon: TestTube2,
    title: "Бережное отношение к данным",
    description: "Соблюдаем конфиденциальность и обеспечиваем безопасное восстановление данных"
  },
  {
    icon: Banknote,
    title: "Прозрачные цены",
    description: "Никаких скрытых платежей. Четко указываем стоимость перед началом работ"
  },
  {
    icon: Fan,
    title: "Гарантия качества",
    description: "Гарантируем качество выполненных работ на срок до 12 месяцев"
  }
];

export function AboutPage() {
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
            <span className="text-white">О компании</span>
            <span className="text-primary">PIXEL SERVICE</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Мы - сервисный центр, специализирующийся на ремонте цифровой техники. 
            Мы ценим профессионализм, честность и качество в каждом выполненном ремонте.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aboutContent.map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-darkGray rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4"
                  whileHover={{ scale: 1.1 }}
                >
                  <item.icon className="w-7 h-7 text-primary" />
                </motion.div>
                <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}