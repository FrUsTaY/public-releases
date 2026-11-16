import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[--header-height]">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-80 h-80 bg-secondary/20 rounded-full filter blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-white">Возвращаем </span>
            <span className="text-white">технику </span>
            <span className="text-primary">к жизни</span>
          </motion.h1>

          <motion.p
            className="text-lg text-gray-300 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Профессиональный ремонт компьютеров, ноутбуков, смартфонов и цифровой электроники. Точная диагностика, честная стоимость и гарантия на выполненные работы.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.a
              href="#calculator"
              className="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Рассчитать стоимость
            </motion.a>

            <motion.a
              href="#diagnostic"
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Записаться на диагностику
              <Calendar size={20} />
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Image/Content */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-darkGray">
            {/* Placeholder for device images - in real project would have actual images */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <motion.div
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="w-48 h-48 mx-auto bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-4xl">💻📱🔧</span>
                </div>
                <p className="text-gray-300">Профессиональный ремонт</p>
              </motion.div>
            </div>
          </div>

          {/* Floating elements */}
          <motion.div
            className="absolute -top-6 -right-6 bg-primary text-white p-4 rounded-2xl shadow-xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-sm font-bold">5000+</div>
            <div className="text-xs">Устройств</div>
          </motion.div>

          <motion.div
            className="absolute -bottom-6 -left-6 bg-secondary text-white p-4 rounded-2xl shadow-xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-sm font-bold">8 лет</div>
            <div className="text-xs">Опыта</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}