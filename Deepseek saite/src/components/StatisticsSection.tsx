import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: 5000, suffix: '+', label: 'Обслуженных устройств', isCount: true },
  { value: 8, suffix: '+', label: 'лет опыта', isCount: false },
  { value: 95, suffix: '%', label: 'ремонтов в срок', isCount: true },
  { value: 100, suffix: '%', label: 'гарантии', isCount: true }
];

function useCountUp(end: number, start = 0, duration = 2, isPercentage = false) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentValue = Math.floor(start + (end - start) * progress);
      
      if (isPercentage) {
        setCount(progress < 1 ? currentValue : end);
      } else {
        setCount(currentValue);
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [end, start, duration, isPercentage]);

  return count;
}

export function StatisticsSection() {
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
            <span className="text-white">Наша </span>
            <span className="text-primary">статистика</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Достижения, подтвержденные нашей работой
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-darkGray rounded-2xl shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {useCountUp(stat.value)}<span className="text-white">{stat.suffix}</span>
              </motion.div>
              <p className="text-gray-300 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}