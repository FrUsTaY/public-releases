import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Check } from 'lucide-react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    device: '',
    problem: '',
    contactMethod: 'phone'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Демонстрационная отправка - данные не передаются
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setShowSuccess(true);
    setFormData({
      name: '',
      phone: '',
      device: '',
      problem: '',
      contactMethod: 'phone'
    });
    
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-20 bg-dark relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-white">Свяжитесь </span>
            <span className="text-primary">с нами</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Нужна помощь? Оставьте заявку - мы свяжемся с вами в течение 15 минут
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-darkGray rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Контактная информация</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Телефон</span>
                    <a href="tel:+79001234567" className="text-white font-medium hover:text-primary transition-colors">
                      +7 (900) 123-45-67
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Электронная почта</span>
                    <a href="mailto:info@pixel-service.ru" className="text-white font-medium hover:text-primary transition-colors">
                      info@pixel-service.ru
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Адрес</span>
                    <span className="text-white font-medium">Москва, ул. Тверская, 15</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <span className="text-gray-500 text-sm">Режим работы</span>
                    <span className="text-white font-medium">Пн-Пт: 10:00-20:00, Сб: 10:00-18:00</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-darkGray rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-white">Свяжитесь с нами</h3>
              <div className="flex gap-4">
                <motion.a
                  href="tel:+79001234567"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary hover:bg-secondary text-white font-medium rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Phone size={20} />
                  Позвонить
                </motion.a>
                <motion.a
                  href="https://t.me/pixelservice"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageCircle size={20} />
                  Telegram
                </motion.a>
                <motion.a
                  href="https://wa.me/79001234567"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </motion.a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-darkGray rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold mb-6 text-white">Оставьте заявку</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ваше имя *"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Номер телефона *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="\+?\d{10,15}"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400"
                />
              </div>

              <select
                name="device"
                value={formData.device}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-white"
              >
                <option value="" disabled className="bg-dark">Выберите тип устройства</option>
                <option value="laptop" className="bg-dark">Ноутбук</option>
                <option value="desktop" className="bg-dark">Компьютер</option>
                <option value="phone" className="bg-dark">Смартфон</option>
                <option value="tablet" className="bg-dark">Планшет</option>
                <option value="console" className="bg-dark">Игровая консоль</option>
              </select>

              <textarea
                name="problem"
                placeholder="Описание проблемы"
                rows={3}
                value={formData.problem}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-primary text-white placeholder-gray-400 resize-none"
              />

              <div>
                <label className="text-sm text-gray-400 mb-2 block">Предпочтительный способ связи</label>
                <div className="flex gap-4">
                  {['phone', 'telegram', 'email'].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={formData.contactMethod === method}
                        onChange={() => setFormData({ ...formData, contactMethod: method as any })}
                        className="w-4 h-4 text-primary"
                      />
                      <span className="text-sm text-gray-300 capitalize">{method === 'phone' ? 'Звонок' : method === 'telegram' ? 'Telegram' : 'Email'}</span>
                    </label>
                  ))}
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || showSuccess}
                className="w-full px-6 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isSubmitting ? (
                  <span>Отправляем...</span>
                ) : showSuccess ? (
                  <>
                    <Check size={20} />
                    Заявка отправлена!
                  </>
                ) : (
                  <>
                    Отправить заявку
                    <Send size={20} />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}