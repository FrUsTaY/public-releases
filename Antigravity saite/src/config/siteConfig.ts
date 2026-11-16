/**
 * Централизованная конфигурация сайта PIXEL SERVICE.
 * Все контактные данные, адреса, ссылки и параметры собраны здесь для лёгкой замены.
 * Внимание: контактные данные являются демонстрационными и подлежат замене перед коммерческим запуском.
 */

export const SITE_CONFIG = {
  name: 'PIXEL SERVICE',
  shortName: 'PIXEL',
  tagline: 'Цифровой сервисный центр премиального уровня',
  slogan: 'Возвращаем технику к жизни',
  description: 'Профессиональный ремонт компьютеров, ноутбуков, смартфонов и сложной цифровой электроники. BGA-пайка, компонентный ремонт, точная диагностика и честная гарантия.',
  
  // Контактная информация (ДЕМОНСТРАЦИОННЫЕ ДАННЫЕ)
  contacts: {
    isDemoNotice: 'Внимание: контактные данные являются демонстрационными для портфолио/макета.',
    phone: '+7 (495) 790-24-88',
    phoneRaw: '+74957902488',
    emergencyPhone: '+7 (925) 123-45-67',
    email: 'info@pixel-service.pro',
    supportEmail: 'support@pixel-service.pro',
    address: 'г. Москва, ул. Большая Спасская, д. 12, стр. 2 (БЦ «Цифровой», офис 104)',
    metro: ['Сухаревская (4 мин)', 'Проспект Мира (7 мин)', 'Комсомольская (9 мин)'],
    workingHours: {
      weekdays: 'Пн — Пт: 09:00 – 21:00',
      weekends: 'Сб — Вс: 10:00 – 19:00',
      urgentService: 'Приём срочных заявок онлайн 24/7'
    },
    parking: 'Бесплатная гостевая парковка на территории БЦ (въезд по предварительному звонку)',
  },

  // Социальные сети и мессенджеры
  socials: {
    telegram: 'https://t.me/pixel_service_demo',
    telegramHandle: '@pixel_service_bot',
    whatsapp: 'https://wa.me/79251234567',
    whatsappNumber: '+7 (925) 123-45-67',
    vk: 'https://vk.com/pixelservice_tech',
    github: 'https://github.com/pixel-service',
    youtube: 'https://youtube.com/@pixel_service_repair'
  },

  // Демонстрационная статистика
  stats: {
    disclaimer: 'Показатели основаны на демонстрационной статистике сервисного центра',
    devicesRepaired: 5420,
    yearsInField: 8,
    onTimeRatePercent: 95,
    customerSatisfaction: 4.94,
    diagnosticsFreePercent: 100,
    warrantyMonthsMax: 12
  },

  // Гарантийные обязательства
  warranty: {
    components: 'До 12 месяцев на компонентный ремонт',
    maintenance: '6 месяцев на чистку и замену термоинтерфейсов',
    bgaChips: '6-12 месяцев на замену BGA-чипов и видеопамяти',
    dataPrivacy: '100% конфиденциальность данных по регламенту NDA'
  }
};
