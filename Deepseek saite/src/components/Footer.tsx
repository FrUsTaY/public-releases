import React from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 pt-12 pb-6">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 pb-8 border-b border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          {/* Logo and Description */}
          <div>
            <a href="#" className="text-2xl font-bold text-white mb-4 inline-block">
              <span className="text-primary">PIXEL</span> SERVICE
            </a>
            <p className="text-gray-400 text-sm mb-4">
              Профессиональный ремонт цифровой техники. Точная диагностика, честная стоимость и гарантия на выполненные работы.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Facebook size={20} className="text-primary" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Twitter size={20} className="text-primary" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Instagram size={20} className="text-primary" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <Linkedin size={20} className="text-primary" />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold mb-4">Навигация</h4>
            <ul className="space-y-3">
              {['Главная', 'Услуги', 'Калькулятор', 'О нас', 'Контакты'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold mb-4">Услуги</h4>
            <ul className="space-y-3">
              {['Ремонт ноутбуков', 'Ремонт смартфонов', 'Ремонт компьютеров', 'Восстановление данных', 'Сборка ПК'].map((item) => (
                <li key={item}>
                  <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Контакты</h4>
            <div className="space-y-3">
              <a href="tel:+79001234567" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Phone size={18} />
                <span>+7 (900) 123-45-67</span>
              </a>
              <a href="mailto:info@pixel-service.ru" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300">
                <Mail size={18} />
                <span>info@pixel-service.ru</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={18} />
                <span>Москва, ул. Тверская, 15</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2024 PIXEL SERVICE. Все права защищены.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Условия сервиса
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}