// 6.1 Калькулятор стоимости ремонта
export interface RepairDeviceOption {
  id: string;
  name: string;
  icon: string;
  models: string[];
}

export interface RepairFaultOption {
  id: string;
  name: string;
  basePrice: number;
  duration: string;
  description: string;
}

export interface RepairExtraOption {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const REPAIR_DEVICES: RepairDeviceOption[] = [
  {
    id: 'laptop',
    name: 'Ноутбук / Ультрабук',
    icon: 'Laptop',
    models: ['Apple MacBook (Air/Pro)', 'ASUS ROG / TUF / ZenBook', 'Lenovo Legion / ThinkPad', 'Acer Predator / Nitro / Swift', 'HP Omen / Pavilion', 'MSI Gaming Series', 'Другой бренд']
  },
  {
    id: 'pc',
    name: 'Компьютер / Игровой ПК',
    icon: 'Cpu',
    models: ['Игровой ПК (кастомная сборка)', 'Рабочая станция (Workstation)', 'Офисный системный блок', 'Моноблок (All-in-One)', 'Компактный Mini-ITX ПК']
  },
  {
    id: 'smartphone',
    name: 'Смартфон',
    icon: 'Smartphone',
    models: ['Apple iPhone (11-16 Pro Max)', 'Samsung Galaxy (S/Z/A series)', 'Xiaomi / Poco / Redmi', 'Google Pixel', 'OnePlus / Realme', 'Другой Android-смартфон']
  },
  {
    id: 'tablet',
    name: 'Планшет',
    icon: 'Tablet',
    models: ['Apple iPad (Pro / Air / Mini)', 'Samsung Galaxy Tab (S9/S8)', 'Xiaomi Pad / Lenovo Tab', 'Графический планшет Wacom']
  },
  {
    id: 'gpu',
    name: 'Видеокарта',
    icon: 'Layers',
    models: ['NVIDIA GeForce RTX 40-я серия', 'NVIDIA GeForce RTX 30-я серия', 'AMD Radeon RX 7000 / 6000', 'GeForce GTX 16 / 10 серия', 'Профессиональные NVIDIA Quadro/RTX']
  },
  {
    id: 'console',
    name: 'Игровая консоль',
    icon: 'Gamepad2',
    models: ['Sony PlayStation 5 / 5 Pro / 4', 'Microsoft Xbox Series X / S', 'Nintendo Switch (OLED / v2)', 'Steam Deck / ASUS ROG Ally']
  }
];

export const REPAIR_FAULTS: Record<string, RepairFaultOption[]> = {
  laptop: [
    { id: 'not_turning_on', name: 'Не включается / не реагирует на кнопку', basePrice: 2800, duration: '1-3 дня', description: 'Диагностика цепей дежурного питания, мультиконтроллера, BIOS или BGA-хаба' },
    { id: 'overheating', name: 'Перегревается, шумит кулер, выключается', basePrice: 1900, duration: '2-4 часа', description: 'Чистка от пыли, замена термопасты MX-6 / жидкого металла, смазка кулера' },
    { id: 'screen_broken', name: 'Разбит экран / полосы / нет подсветки', basePrice: 2400, duration: '1-2 дня', description: 'Замена матрицы IPS/OLED, ремонт шлейфа eDP, восстановление подсветки' },
    { id: 'liquid_damage', name: 'Залит жидкостью (вода, кофе, кола)', basePrice: 3500, duration: '1-3 дня', description: 'Ультразвуковая чистка платы, удаление окислов, восстановление сгнивших дорожек' },
    { id: 'not_charging', name: 'Не заряжается / сломан разъём питания Type-C/DC', basePrice: 2200, duration: '3-6 часов', description: 'Перепайка силового разъема питания или контроллера зарядки (Bq/ISL)' },
    { id: 'keyboard_broken', name: 'Не работают клавиши / залипает клавиатура', basePrice: 1800, duration: '1-2 дня', description: 'Замена клавиатурного модуля (включая клепаные топкейсы)' },
    { id: 'case_hinge', name: 'Сломаны петли корпуса / треснула крышка', basePrice: 2100, duration: '1-2 дня', description: 'Восстановление латунных бонок, реставрация петель компаундом' },
    { id: 'other', name: 'Другая неисправность / требуется глубокая диагностика', basePrice: 1500, duration: '1-2 дня', description: 'Комплексный аппаратный анализ всех узлов материнской платы' }
  ],
  pc: [
    { id: 'pc_no_boot', name: 'Не стартует / циклический перезапуск / черный экран', basePrice: 1900, duration: '1-2 дня', description: 'Пост-код диагностика, проверка фаз питания CPU/RAM, прошивка BIOS' },
    { id: 'pc_overheating', name: 'Перегрев процессора или видеокарты под нагрузкой', basePrice: 1800, duration: '2-3 часа', description: 'Ревизия прижима кулера/СЖО, замена термоинтерфейса, оптимизация потоков' },
    { id: 'pc_bsod', name: 'Синий экран смерти (BSOD) / спонтанные вылеты', basePrice: 1600, duration: '4-8 часов', description: 'Стресс-тестирование памяти MemTest86, проверка SMART дисков, аудит драйверов' },
    { id: 'pc_psu_fail', name: 'Запах гари / хлопок / сгорел блок питания', basePrice: 1500, duration: '1 день', description: 'Тестирование линий 12V/5V/3.3V, диагностика на КЗ компонентов' },
    { id: 'pc_slow', name: 'Тормозит система / зависает Windows / вирусы', basePrice: 1200, duration: '2-4 часа', description: 'Оптимизация реестра, удаление вредоносного ПО, настройка служб' },
    { id: 'pc_other', name: 'Другая сложная неисправность', basePrice: 1500, duration: '1-2 дня', description: 'Полный аппаратно-программный комплекс тестов' }
  ],
  smartphone: [
    { id: 'phone_screen', name: 'Разбит дисплей / сенсор не реагирует', basePrice: 1900, duration: '1-3 часа', description: 'Замена дисплейного модуля с сохранением TrueTone и влагозащитной проклейкой' },
    { id: 'phone_battery', name: 'Быстро разряжается / выключается на холоде / вздулся', basePrice: 1200, duration: '1-2 часа', description: 'Установка оригинального аккумулятора с калибровкой контроллера' },
    { id: 'phone_charge_port', name: 'Не идет зарядка / отходит кабель Type-C/Lightning', basePrice: 1500, duration: '2-4 часа', description: 'Замена или чистка шлейфа разъема питания и микрофона' },
    { id: 'phone_water', name: 'Упал в воду / влага в динамиках и камере', basePrice: 2500, duration: '1-2 дня', description: 'Вскрытие, сушка в термокамере, отмывка в УЗВ, восстановление цепей' },
    { id: 'phone_sound', name: 'Не слышно собеседника / хрипит динамик', basePrice: 1100, duration: '1-2 часа', description: 'Чистка акустических сеток или замена разговорного динамика' },
    { id: 'phone_other', name: 'Не включается / завис на яблоке/логотипе', basePrice: 1800, duration: '1 день', description: 'Восстановление прошивки DFU / компонентный ремонт модема/NAND' }
  ],
  tablet: [
    { id: 'tab_screen', name: 'Треснуло стекло / повреждена матрица', basePrice: 2200, duration: '1-2 дня', description: 'Замена тачскрина или дисплейного бутерброда с проклейкой на стапеле' },
    { id: 'tab_battery', name: 'Износ аккумулятора / быстро садится', basePrice: 1600, duration: '3-6 часов', description: 'Установка новой АКБ повышенной емкости' },
    { id: 'tab_connector', name: 'Разбит разъем зарядки / погнут корпус', basePrice: 1900, duration: '1 день', description: 'Пайка гнезда Type-C, выравнивание алюминиевого корпуса' },
    { id: 'tab_other', name: 'Не загружается / зависает', basePrice: 1500, duration: '1 день', description: 'Диагностика системной платы' }
  ],
  gpu: [
    { id: 'gpu_artifacts', name: 'Артефакты на экране (полосы, квадратики, снег)', basePrice: 4500, duration: '2-4 дня', description: 'Реболлинг или замена чипов видеопамяти GDDR6/X, ремонт BGA-пайки' },
    { id: 'gpu_no_image', name: 'Кулеры крутятся, но нет видеосигнала (черный экран)', basePrice: 3800, duration: '2-3 дня', description: 'Восстановление цепей питания VDD/Vcore, замена DrMOS транзисторов' },
    { id: 'gpu_hotspot', name: 'Хотспот 105°C+ / гудят кулеры на 100%', basePrice: 2200, duration: '3-5 часов', description: 'Замена термопасты на PTM7950, подбор толщины термопрокладок калибром' },
    { id: 'gpu_fans', name: 'Сломаны лопасти / треск вентиляторов', basePrice: 1400, duration: '1 день', description: 'Замена вертушек на оригинальные гидродинамические подшипники' },
    { id: 'gpu_pcie', name: 'Поврежден текстолит / скол возле замка PCIe', basePrice: 4200, duration: '3-5 дней', description: 'Микропайка поврежденных дифференциальных пар под микроскопом' }
  ],
  console: [
    { id: 'console_hdmi', name: 'Нет сигнала на телевизор / выломан разъем HDMI', basePrice: 2900, duration: '1-2 дня', description: 'Замена HDMI-разъема и проверка микросхемы энкодера Panasonic/Retimer' },
    { id: 'console_noise', name: 'Сильно гудит вентилятор / перегрев и выключение', basePrice: 2400, duration: '3-5 часов', description: 'Чистка радиатора, обновление жидкого металла (PS5) или пасты (Xbox)' },
    { id: 'console_optical', name: 'Не принимает / не читает диски', basePrice: 1900, duration: '1 день', description: 'Ремонт привода Blu-ray, замена лазерной головки' },
    { id: 'console_gamepad', name: 'Дрифт стиков геймпада DualSense / Xbox', basePrice: 1200, duration: '1-2 часа', description: 'Установка датчиков Холла (Hall Effect sticks) с защитой от износа' },
    { id: 'console_other', name: 'Ошибка обновления / синий огонь смерти (BLOD)', basePrice: 3500, duration: '2-4 дня', description: 'Реболлинг APU процессора, замена южного моста' }
  ]
};

export const REPAIR_EXTRAS: RepairExtraOption[] = [
  { id: 'express', name: 'Срочный ремонт вне очереди (приоритет)', price: 1200, description: 'Инженер приступает к работе сразу при поступлении' },
  { id: 'data_backup', name: 'Резервное копирование и сохранение данных', price: 900, description: 'Полный образ диска на защищенный накопитель до начала ремонта' },
  { id: 'thermal_upgrade', name: 'Премиум-термоинтерфейс (PTM7950 / Liquid Metal)', price: 800, description: 'Снижение температур на 5-12°C по сравнению с обычной пастой' },
  { id: 'courier', name: 'Бесплатная курьерская доставка в обе стороны', price: 0, description: 'Бережный курьер заберет устройство и привезет обратно после ремонта' },
  { id: 'warranty_ext', name: 'Расширенная гарантия (12 месяцев вместо 6)', price: 950, description: 'Полная защита отремонтированного узла на целый год' }
];

// 6.2 Калькулятор обслуживания ПК
export interface MaintenanceOption {
  id: string;
  title: string;
  category: 'cleaning' | 'thermal' | 'diagnostic' | 'tuning';
  price: number;
  duration: string;
  recommended: boolean;
  description: string;
}

export const MAINTENANCE_SERVICES: MaintenanceOption[] = [
  {
    id: 'clean_dust',
    title: 'Глубокая продувка и чистка от пыли',
    category: 'cleaning',
    price: 900,
    duration: '40 мин',
    recommended: true,
    description: 'Очистка корпуса, радиаторов, крыльчаток кулеров и блока питания антистатическим компрессором'
  },
  {
    id: 'paste_cpu',
    title: 'Замена термопасты центрального процессора',
    category: 'thermal',
    price: 800,
    duration: '30 мин',
    recommended: true,
    description: 'Удаление окаменевшей пасты изопропиловым составом, нанесение премиальной термопасты Arctic MX-6'
  },
  {
    id: 'paste_gpu',
    title: 'Замена термопасты графического чипа видеокарты',
    category: 'thermal',
    price: 1500,
    duration: '1 час',
    recommended: true,
    description: 'Аккуратная разборка системы охлаждения GPU, очистка кристалла, фазовый термоинтерфейс с защитой от выдавливания'
  },
  {
    id: 'pads_gpu',
    title: 'Замена термопрокладок видеопамяти и VRM (полный сет)',
    category: 'thermal',
    price: 1900,
    duration: '1.5 часа',
    recommended: false,
    description: 'Установка термопрокладок Thermalright Odyssey / Gelid с точным подбором толщины (0.5/1.0/1.5 мм)'
  },
  {
    id: 'aio_service',
    title: 'Обслуживание системы водяного охлаждения (СЖО)',
    category: 'thermal',
    price: 2200,
    duration: '2 часа',
    recommended: false,
    description: 'Промывка радиатора от накипи, устранение завоздушивания помпы, дозаправка фирменного антикоррозийного хладагента'
  },
  {
    id: 'stress_test',
    title: 'Стресс-тестирование и тепловизионный контроль',
    category: 'diagnostic',
    price: 700,
    duration: '45 мин',
    recommended: true,
    description: 'Нагрузка OCCT + FurMark + AIDA64 с замером температур VRM и памяти тепловизором Fluke'
  },
  {
    id: 'smart_diag',
    title: 'Комплексная аппаратная диагностика компонентов',
    category: 'diagnostic',
    price: 600,
    duration: '30 мин',
    recommended: false,
    description: 'Проверка секторов SSD/HDD, тест стабильности оперативной памяти, мониторинг 12V линий БП'
  },
  {
    id: 'cable_mgmt',
    title: 'Эстетичный кабель-менеджмент',
    category: 'tuning',
    price: 1200,
    duration: '1 час',
    recommended: false,
    description: 'Укладка жгутов проводов за задней стенкой корпуса стяжками и липучками для идеального продува и внешнего вида'
  },
  {
    id: 'full_preventive',
    title: 'Пакет «Полная профилактика компьютера» (Всё включено)',
    category: 'tuning',
    price: 3900,
    duration: '3 часа',
    recommended: true,
    description: 'Полная разборка, ультрачистка, замена пасты CPU и GPU, термопрокладки, кабель-менеджмент и стресс-тесты со скидкой 40%'
  }
];

// 6.4 Калькулятор апгрейда ПК
export interface UpgradeScenario {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  recommendedBudget: string;
  estimatedPerfGain: string;
  packages: {
    tier: 'budget' | 'optimal' | 'maximum';
    name: string;
    price: number;
    perfGain: string;
    parts: string[];
    description: string;
    serviceIncluded: string;
  }[];
}

export const UPGRADE_SCENARIOS: Record<string, UpgradeScenario> = {
  fps: {
    id: 'fps',
    title: 'Повысить FPS в современных играх',
    subtitle: 'Плавный геймплей в 2K / 4K на ультра-настройках с трассировкой лучей',
    icon: 'Flame',
    recommendedBudget: 'от 35 000 ₽',
    estimatedPerfGain: '+60%...180% FPS',
    packages: [
      {
        tier: 'budget',
        name: 'Пакет «Уверенный 1080p / 2K»',
        price: 36900,
        perfGain: '+50-70% FPS',
        parts: ['Видеокарта RTX 4060 8GB', 'Оптимизация таймингов RAM', 'Профилактика охлаждения'],
        description: 'Отличный скачок для старых сборок на GTX 1060 / 1660 / RX 580',
        serviceIncluded: 'Установка видеокарты, чистка от старых драйверов через DDU, стресс-тест 2 часа'
      },
      {
        tier: 'optimal',
        name: 'Пакет «2K Ultra & Cyberpunk»',
        price: 76500,
        perfGain: '+110-150% FPS',
        parts: ['Видеокарта RTX 4070 SUPER 12GB', 'Блок питания 750W Gold', 'Настройка DLSS 3 Frame Gen'],
        description: 'Максимальный комфорт на мониторах 144-240 Гц в разрешении 2560x1440',
        serviceIncluded: 'Монтаж БП и видеокарты, аккуратный кабель-менеджмент, андервольтинг для снижения температур'
      },
      {
        tier: 'maximum',
        name: 'Пакет «Бескомпромиссный 4K Gaming»',
        price: 139000,
        perfGain: '+180-250% FPS',
        parts: ['Видеокарта RTX 4080 SUPER 16GB', 'Блок питания 850W ATX 3.0', 'Подставка против провисания GPU'],
        description: 'Тяжелый 4K гейминг на максимальных настройках с включенной трассировкой пути',
        serviceIncluded: 'Премиум-сборка, термотестирование в FurMark + Timespy, сертификат стабильности'
      }
    ]
  },
  system_speed: {
    id: 'system_speed',
    title: 'Ускорить работу системы и запуск программ',
    subtitle: 'Мгновенная загрузка Windows за 7 секунд, отзывчивый интерфейс без микрофризов',
    icon: 'Zap',
    recommendedBudget: 'от 7 500 ₽',
    estimatedPerfGain: 'В 4-8 раз быстрее HDD',
    packages: [
      {
        tier: 'budget',
        name: 'Пакет «Быстрый старт»',
        price: 7500,
        perfGain: 'Система быстрее в 4 раза',
        parts: ['NVMe M.2 SSD 1TB (до 3500 МБ/с)', 'Алюминиевый радиатор охлаждения диска'],
        description: 'Идеально для ПК, где система до сих пор установлена на старом жестком диске или дешевом SATA SSD',
        serviceIncluded: 'Клонирование существующей Windows со всеми файлами и программами без потери лицензий'
      },
      {
        tier: 'optimal',
        name: 'Пакет «Рабочая станция Pro»',
        price: 16900,
        perfGain: 'Отзывчивость в 7 раз выше',
        parts: ['Сверхбыстрый SSD Samsung 980 Pro 2TB (7000 МБ/с)', 'Дополнительная планка RAM 16/32GB'],
        description: 'Проекты в Premiere, Photoshop и Blender открываются без задержек и подвисаний',
        serviceIncluded: 'Миграция ОС на Gen4 накопитель, стресс-тест памяти, оптимизация файла подкачки'
      },
      {
        tier: 'maximum',
        name: 'Пакет «Турбо-архитектура»',
        price: 36000,
        perfGain: 'Максимум пропускной способности',
        parts: ['Флагманский SSD Samsung 990 Pro 4TB', '64GB высокоскоростной RAM', 'Кастомный массив'],
        description: 'Для рендеринга 8K видео, компиляции массивных проектов и работы с большими базами данных',
        serviceIncluded: 'Полная настройка дисковой подсистемы, стресс-тесты надежности ячеек памяти'
      }
    ]
  },
  ram: {
    id: 'ram',
    title: 'Увеличить объём оперативной памяти',
    subtitle: 'Чтобы вкладки браузера не перезагружались, а игры не вылетали из-за нехватки ОЗУ',
    icon: 'Layers',
    recommendedBudget: 'от 5 000 ₽',
    estimatedPerfGain: 'Ликвидация фризов при переполнении',
    packages: [
      {
        tier: 'budget',
        name: 'Переход на 16 ГБ DDR4',
        price: 4900,
        perfGain: 'Базовый комфорт',
        parts: ['Комплект 16GB (2x8GB) 3200MHz CL16'],
        description: 'Минимальный стандарт для плавной работы офиса и большинства киберспортивных дисциплин',
        serviceIncluded: 'Установка в правильные слоты (Dual Channel), активация XMP профиля в BIOS'
      },
      {
        tier: 'optimal',
        name: 'Золотой стандарт: 32 ГБ DDR4 / DDR5',
        price: 10900,
        perfGain: 'Запас на 4 года вперед',
        parts: ['Комплект 32GB (2x16GB) 3600MHz / DDR5 6000MHz'],
        description: 'Хватит на любые игры (Hogwarts Legacy, Cities Skylines II) с открытым Discord и браузером',
        serviceIncluded: 'Тестирование стабильности TestMem5 (anta777), проверка стабильности контроллера памяти'
      },
      {
        tier: 'maximum',
        name: 'Профессиональные 64 ГБ',
        price: 24500,
        perfGain: 'Для тяжелых нагрузок',
        parts: ['Кит 64GB (2x32GB) DDR5 6000MHz CL30'],
        description: 'Для 3D-моделирования, After Effects, виртуализации и тяжелого кодинга',
        serviceIncluded: 'Тонкая настройка вторичных и третичных таймингов для снижения задержки памяти'
      }
    ]
  },
  cpu_platform: {
    id: 'cpu_platform',
    title: 'Обновить процессор и материнскую плату',
    subtitle: 'Переход на свежую платформу AM5 или LGA1700 для устранения боттлнека',
    icon: 'Cpu',
    recommendedBudget: 'от 29 000 ₽',
    estimatedPerfGain: '+70-130% процессорной мощности',
    packages: [
      {
        tier: 'budget',
        name: 'Народный апгрейд на Ryzen 5 5600',
        price: 19800,
        perfGain: '+60% в рабочих задачах',
        parts: ['Процессор AMD Ryzen 5 5600', 'Плата B550', 'Башенный кулер 4 трубки'],
        description: 'Отличный бюджетный вариант на доступной памяти DDR4',
        serviceIncluded: 'Сборка платформы, нанесение пасты Arctic MX-6, кабель-менеджмент'
      },
      {
        tier: 'optimal',
        name: 'Платформа будущего: Ryzen 5 7600X / AM5 DDR5',
        price: 49500,
        perfGain: '+110% скорости одного ядра',
        parts: ['Ryzen 5 7600X', 'Плата B650 Tomahawk', '32GB DDR5 6000', 'Кулер Deepcool AK620'],
        description: 'Современный сокет AM5 с поддержкой будущих процессоров до 2027 года',
        serviceIncluded: 'Полная пересборка ПК, перепрошивка BIOS на новейшую стабильную AGESA'
      },
      {
        tier: 'maximum',
        name: 'Игровой монстр: Ryzen 7 7800X3D',
        price: 89000,
        perfGain: 'Топ-1 в играх по всему миру',
        parts: ['Ryzen 7 7800X3D с 3D V-Cache', 'Плата X670E / B650E', '32GB DDR5 6000 CL30', 'СЖО 360 мм'],
        description: 'Лучший в мире игровой процессор с невероятно высоким 1% и 0.1% low FPS',
        serviceIncluded: 'Сборка с водяным охлаждением, калибровка кривой вентиляторов Curve Optimizer'
      }
    ]
  },
  cooling_noise: {
    id: 'cooling_noise',
    title: 'Снизить температуры и уровень шума',
    subtitle: 'Бесшумная работа ПК в покое и тихий шелест под максимальной нагрузкой',
    icon: 'Wind',
    recommendedBudget: 'от 4 500 ₽',
    estimatedPerfGain: '-15°C на CPU, уровень шума < 28 дБА',
    packages: [
      {
        tier: 'budget',
        name: 'Тихий башенный кулер',
        price: 4500,
        perfGain: '-12°C на процессоре',
        parts: ['Башня Deepcool AK400 Digital с дисплеем', 'Замена термопасты на Honeywell PTM7950'],
        description: 'Замена шумного боксового кулера на эффективную тихую башню с гидродинамическим подшипником',
        serviceIncluded: 'Установка с правильным усилительным бэкплейтом, настройка тихой кривой оборотов'
      },
      {
        tier: 'optimal',
        name: 'Комплекс «Холод и тишина»',
        price: 11900,
        perfGain: '-18°C и почти полная тишина',
        parts: ['Двухсекционный кулер Thermalright PA120', '3 тихих корпусных вентилятора 140 мм BeQuiet!'],
        description: 'Организация правильного сквозного продува в корпусе с положительным давлением воздуха',
        serviceIncluded: 'Монтаж кулера и вертушек, кабель-менеджмент, стресс-тест акустического давления'
      },
      {
        tier: 'maximum',
        name: 'Премиум СЖО 360 мм Arctic',
        price: 21500,
        perfGain: '-24°C, справляется с 300+ Вт тепла',
        parts: ['Система жидкостного охлаждения Arctic Liquid Freezer III 360', 'Полный комплект термопрокладок'],
        description: 'Топовое водяное охлаждение с обдувом VRM материнской платы для мощных процессоров i7/i9/R9',
        serviceIncluded: 'Установка радиатора, настройка гидродинамики, калибровка PWM помпы'
      }
    ]
  }
};
