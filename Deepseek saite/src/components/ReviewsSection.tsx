import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Алексей К.',
    rating: 5,
    review: 'Отличный сервис! Ноутбук отремонтировали за один день, все объяснили подробно. Рекомендую!',
    date: '15 ноября 2024'
  },
  {
    id: 2,
    name: 'Мария С.',
    rating: 5,
    review: 'Спасибо за профессиональный подход к вопросу восстановления данных. Все файлы спасены!',
    date: '10 ноября 2024'
  },
  {
    id: 3,
    name: 'Дмитрий П.',
    rating: 4,
    review: 'Смартфон полностью восстановлен. Немного дольше обещанного срока, но результат оставил хорошее впечатление.',
    date: '5 ноября 2024'
  },
  {
    id: 4,
    name: 'Елена В.',
    rating: 5,
    review: 'Грамотная команда, честные цены. Игровой ПК собрали в срок и без проблем.',
    date: '25 октября 2024'
  }
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[Array(rating).fill(0)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

export function ReviewsSection() {
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
            <span className="text-white">Отзывы </span>
            <span className="text-primary">клиентов</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Реальные отзывы о нашей работе. Демонстрационные данные, не выдавайте за реальные.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              className="bg-darkGray rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-1 mb-3">
                <StarRating rating={review.rating} />
                <span className="text-xs text-gray-500 ml-2">{review.date}</span>
              </div>
              <p className="text-gray-300 text-sm mb-3 line-clamp-3">"{review.review}"</p>
              <div className="border-t border-white/10 pt-3">
                <span className="font-bold text-white">{review.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}