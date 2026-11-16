import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Сколько стоит диагностика?',
    answer: 'Первичная диагностика бесплатна. Мы проводим полный осмотр устройства и предоставляем вам точную стоимость ремонта до начала работ.'
  },
  {
    question: 'Сколько времени занимает ремонт?',
    answer: 'Сроки зависят от сложности поломки. Базовые ремонты (замена разъёма, экрана) выполняются за 1-2 дня. Комплексные поломки могут требовать до 7 дней.'
  },
  {
    question: 'Предоставляется ли гарантия?',
    answer: 'Да, мы предоставляем гарантию на выполненные работы на срок от 3 до 12 месяцев в зависимости от типа ремонта.'
  },
  {
    question: 'Можно ли восстановить данные?',
    answer: 'Да, у нас есть специализированное оборудование для восстановления данных с SSD, HDD, флешек и других накопителей. Стоимость начинается от 2 500 ₽.'
  },
  {
    question: 'Нужно ли записываться заранее?',
    answer: 'Рекомендуется записаться заранее, особенно в пиковые дни. Однако мы всегда принимаем экстренные заявки.'
  },
  {
    question: 'Можно ли привезти собственные комплектующие?',
    answer: 'Да, вы можете привезти нужные вам комплектующие. Мы их установим и протестируем.'
  },
  {
    question: 'Что делать, если устройство не включается?',
    answer: 'Привезите устройство на диагностику. Мы проверим блок питания, материнскую плату, систему охлаждения и другие компоненты.'
  }
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
            <span className="text-white">Часто задаваемые </span>
            <span className="text-primary">вопросы</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Ответы на самые популярные вопросы о нашей деятельности
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                className="bg-darkGray rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="text-left font-medium text-white">{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Plus className="w-5 h-5 text-primary" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      className="px-6 pb-4"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-gray-400 text-sm">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}