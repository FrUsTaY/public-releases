import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const steps = [
  { step: 1, title: 'Оставляете заявку', description: 'Заполняете форму или звоните нам' },
  { step: 2, title: 'Привозите устройство', description: 'Приносите технику или согласовываете передачу' },
  { step: 3, title: 'Проводим диагностику', description: 'Точная проверка и определение причин неисправности' },
  { step: 4, title: 'Согласовываете стоимость', description: 'Получаете полную прозрачную смету' },
  { step: 5, title: 'Выполняем ремонт', description: 'Квалифицированные инженеры работают над устройством' },
  { step: 6, title: 'Получаете исправное устройство', description: 'Техника готова к использованию с гарантией' }
];

export function HowWeWorkSection() {
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
            <span className="text-white">Как мы </span>
            <span className="text-primary">работаем</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Простой и прозрачный процесс ремонта вашей техники
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.div
                  className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
                  whileHover={{ scale: 1.1 }}
                >
                  {step.step}
                </motion.div>
                <div>
                  <h3 className="text-lg font-bold mb-1 text-white">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}