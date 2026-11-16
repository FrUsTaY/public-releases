// Скрипт верификации и тестирования логики калькуляторов PIXEL SERVICE

import { checkPcBuildCompatibility } from '../src/utils/compatibilityChecker.ts';
import { 
  CPUS, 
  MOTHERBOARDS, 
  GPUS, 
  RAMS, 
  SSDS, 
  PSUS, 
  CASES, 
  COOLERS 
} from '../src/data/hardwareCatalog.ts';
import { 
  REPAIR_FAULTS, 
  REPAIR_EXTRAS, 
  MAINTENANCE_SERVICES, 
  UPGRADE_SCENARIOS 
} from '../src/data/calculatorData.ts';

let passedTests = 0;
let totalTests = 0;

function assert(condition, message) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${message}`);
  } else {
    console.error(`  [FAIL] ${message}`);
    process.exitCode = 1;
  }
}

console.log('====================================================');
console.log('ЗАПУСК ТЕСТОВЫХ СЦЕНАРИЕВ ДЛЯ ИНТЕРАКТИВНЫХ КАЛЬКУЛЯТОРОВ');
console.log('====================================================\n');

// ----------------------------------------------------
// ТЕСТ 1: Калькулятор стоимости ремонта (6.1)
// ----------------------------------------------------
console.log('Тест 1: Калькулятор стоимости ремонта (Формула расчёта)');

const laptopFault = REPAIR_FAULTS.laptop.find(f => f.id === 'screen_broken');
const extraExpress = REPAIR_EXTRAS.find(e => e.id === 'express');
const extraWarranty = REPAIR_EXTRAS.find(e => e.id === 'warranty_ext');

assert(laptopFault.basePrice === 2400, 'Базовая стоимость замены матрицы ноутбука: 2400 ₽');
assert(extraExpress.price === 1200, 'Стоимость опции срочности: 1200 ₽');
assert(extraWarranty.price === 950, 'Стоимость опции расширенной гарантии: 950 ₽');

const totalRepairCost = laptopFault.basePrice + extraExpress.price + extraWarranty.price;
assert(totalRepairCost === 4550, `Итоговая стоимость ремонта (2400 + 1200 + 950) = ${totalRepairCost} ₽`);

// ----------------------------------------------------
// ТЕСТ 2: Калькулятор обслуживания ПК (6.2)
// ----------------------------------------------------
console.log('\nТест 2: Калькулятор обслуживания ПК (Пакеты и скидки)');

const srvClean = MAINTENANCE_SERVICES.find(s => s.id === 'clean_dust');
const srvCpu = MAINTENANCE_SERVICES.find(s => s.id === 'paste_cpu');
const srvGpu = MAINTENANCE_SERVICES.find(s => s.id === 'paste_gpu');

const raw3Sum = srvClean.price + srvCpu.price + srvGpu.price;
assert(raw3Sum === 3200, `Сумма 3 услуг (900 + 800 + 1500) = ${raw3Sum} ₽`);

const comboDiscount = Math.round(raw3Sum * 0.15);
assert(comboDiscount === 480, `Скидка 15% за комбо из 3+ услуг = ${comboDiscount} ₽`);

const finalMaintenance = raw3Sum - comboDiscount;
assert(finalMaintenance === 2720, `Итого со скидкой (3200 - 480) = ${finalMaintenance} ₽`);

const srvFull = MAINTENANCE_SERVICES.find(s => s.id === 'full_preventive');
assert(srvFull.price === 3900, 'Пакет «Полная профилактика» = 3900 ₽');

// ----------------------------------------------------
// ТЕСТ 3: Калькулятор сборки ПК (6.3) - Совместимость
// ----------------------------------------------------
console.log('\nТест 3: Калькулятор сборки ПК (Проверка совместимости компонентов)');

// Сценарий 3.1: Полностью совместимая конфигурация
const compatibleBuild = {
  cpu: CPUS.find(c => c.id === 'cpu-r5-7600x'), // AM5
  motherboard: MOTHERBOARDS.find(m => m.id === 'mb-b650-atx'), // AM5, DDR5, ATX
  gpu: GPUS.find(g => g.id === 'gpu-rtx-4070-super'), // 300mm, min 650W
  ram: RAMS.find(r => r.id === 'ram-ddr5-32-6000'), // DDR5
  ssd: SSDS[0],
  psu: PSUS.find(p => p.id === 'psu-750w-gold'), // 750W
  pcCase: CASES.find(c => c.id === 'case-mid-tower-mesh'), // supports ATX, max 392mm
  cooler: COOLERS.find(c => c.id === 'cooler-air-ag620') // AM5, 245W
};

const resCompatible = checkPcBuildCompatibility(compatibleBuild);
assert(resCompatible.isCompatible === true, 'Сборка AM5 + B650 + DDR5 + RTX 4070 + 750W 100% совместима');
assert(resCompatible.issues.filter(i => i.type === 'error').length === 0, 'Критических ошибок нет');

// Сценарий 3.2: Несовместимость сокета (Intel CPU + AMD Board)
const socketMismatchBuild = {
  ...compatibleBuild,
  cpu: CPUS.find(c => c.id === 'cpu-i5-14600k') // LGA1700 на плате AM5!
};
const resSocketMismatch = checkPcBuildCompatibility(socketMismatchBuild);
assert(resSocketMismatch.isCompatible === false, 'Определена несовместимость сокета (LGA1700 на плате AM5)');
assert(resSocketMismatch.issues.some(i => i.title.includes('Несовместимый сокет')), 'Выдано предупреждение: Несовместимый сокет CPU и мат. платы');

// Сценарий 3.3: Несовместимость типа оперативной памяти (DDR4 на DDR5 плате)
const ramMismatchBuild = {
  ...compatibleBuild,
  ram: RAMS.find(r => r.id === 'ram-ddr4-16-3600') // DDR4 на плате с DDR5!
};
const resRamMismatch = checkPcBuildCompatibility(ramMismatchBuild);
assert(resRamMismatch.isCompatible === false, 'Определена несовместимость типа памяти (DDR4 на плате DDR5)');
assert(resRamMismatch.issues.some(i => i.title.includes('Несовместимый тип оперативной памяти')), 'Выдано предупреждение: Несовместимый тип памяти');

// Сценарий 3.4: Несовместимость форм-фактора (ATX плата в mATX корпус)
const formFactorMismatchBuild = {
  ...compatibleBuild,
  pcCase: CASES.find(c => c.id === 'case-compact-matx') // Корпус только mATX / ITX, а плата ATX!
};
const resFormFactorMismatch = checkPcBuildCompatibility(formFactorMismatchBuild);
assert(resFormFactorMismatch.isCompatible === false, 'Определена несовместимость габаритов: ATX плата в Micro-ATX корпус');
assert(resFormFactorMismatch.issues.some(i => i.title.includes('Материнская плата не помещается в корпус')), 'Выдано предупреждение: Плата не помещается в корпус');

// Сценарий 3.5: Длина видеокарты превышает длину корпуса
const gpuLengthMismatchBuild = {
  ...compatibleBuild,
  gpu: GPUS.find(g => g.id === 'gpu-rtx-4080-super'), // Длина 348 мм
  pcCase: CASES.find(c => c.id === 'case-compact-matx') // Макс длина 330 мм
};
const resGpuLengthMismatch = checkPcBuildCompatibility(gpuLengthMismatchBuild);
assert(resGpuLengthMismatch.isCompatible === false, 'Определено превышение длины видеокарты (348 мм > 330 мм)');
assert(resGpuLengthMismatch.issues.some(i => i.title.includes('Видеокарта длиннее допустимого пространства')), 'Выдано предупреждение: Длина GPU превышает допуск');

// Сценарий 3.6: Дефицит мощности блока питания
const psuDeficitBuild = {
  ...compatibleBuild,
  gpu: GPUS.find(g => g.id === 'gpu-rtx-4090'), // Требует минимум 850 Вт
  psu: PSUS.find(p => p.id === 'psu-650w-gold') // Установлен БП на 650 Вт!
};
const resPsuDeficit = checkPcBuildCompatibility(psuDeficitBuild);
assert(resPsuDeficit.isCompatible === false, 'Определена нехватка мощности БП (650W для RTX 4090)');
assert(resPsuDeficit.issues.some(i => i.title.includes('Недостаточная мощность блока питания')), 'Выдано предупреждение: Недостаточная мощность БП');

// ----------------------------------------------------
// ТЕСТ 4: Калькулятор апгрейда ПК (6.4)
// ----------------------------------------------------
console.log('\nТест 4: Калькулятор апгрейда ПК (Сценарии и пакеты)');

assert(Boolean(UPGRADE_SCENARIOS.fps), 'Сценарий FPS присутствует');
assert(UPGRADE_SCENARIOS.fps.packages.length === 3, 'Сценарий FPS содержит 3 пакета (бюджет, оптимум, максимум)');
assert(Boolean(UPGRADE_SCENARIOS.system_speed), 'Сценарий ускорения системы присутствует');
assert(Boolean(UPGRADE_SCENARIOS.ram), 'Сценарий апгрейда RAM присутствует');
assert(Boolean(UPGRADE_SCENARIOS.cpu_platform), 'Сценарий обновления сокета/процессора присутствует');
assert(Boolean(UPGRADE_SCENARIOS.cooling_noise), 'Сценарий охлаждения и снижения шума присутствует');

console.log('\n====================================================');
console.log(`РЕЗУЛЬТАТ ТЕСТИРОВАНИЯ: ${passedTests} из ${totalTests} проверок успешно пройдены!`);
console.log('====================================================');
