import { PcBuildState, CompatibilityIssue } from '../types';

export interface CompatibilityCheckResult {
  isCompatible: boolean;
  issues: CompatibilityIssue[];
  totalPrice: number;
  estimatedTdp: number;
  recommendedPsuWattage: number;
}

export function checkPcBuildCompatibility(build: PcBuildState): CompatibilityCheckResult {
  const issues: CompatibilityIssue[] = [];
  const { cpu, motherboard, gpu, ram, ssd, psu, pcCase, cooler } = build;

  // 1. Сокет процессора и материнской платы
  if (cpu && motherboard) {
    if (cpu.socket !== motherboard.socket) {
      issues.push({
        type: 'error',
        title: 'Несовместимый сокет CPU и мат. платы',
        description: `Процессор ${cpu.name} использует сокет ${cpu.socket}, а материнская плата ${motherboard.name} рассчитана на сокет ${motherboard.socket}. Они физически несовместимы.`,
        componentA: cpu.name,
        componentB: motherboard.name
      });
    }
  }

  // 2. Тип оперативной памяти (DDR4 vs DDR5)
  if (motherboard && ram) {
    if (motherboard.ramType !== ram.type) {
      issues.push({
        type: 'error',
        title: 'Несовместимый тип оперативной памяти',
        description: `Материнская плата поддерживает только память ${motherboard.ramType}, а выбрана память ${ram.type}. Слот не совпадёт.`,
        componentA: motherboard.name,
        componentB: ram.name
      });
    }
  }

  // 3. Форм-фактор материнской платы и корпуса
  if (motherboard && pcCase) {
    if (!pcCase.supportedMotherboards.includes(motherboard.formFactor)) {
      issues.push({
        type: 'error',
        title: 'Материнская плата не помещается в корпус',
        description: `Материнская плата формата ${motherboard.formFactor} слишком велика для корпуса ${pcCase.name}, который поддерживает только: ${pcCase.supportedMotherboards.join(', ')}.`,
        componentA: motherboard.name,
        componentB: pcCase.name
      });
    }
  }

  // 4. Длина видеокарты и допустимое пространство в корпусе
  if (gpu && pcCase) {
    if (gpu.lengthMm > pcCase.maxGpuLengthMm) {
      issues.push({
        type: 'error',
        title: 'Видеокарта длиннее допустимого пространства корпуса',
        description: `Длина видеокарты ${gpu.lengthMm} мм превышает максимальный допуск корпуса ${pcCase.name} (${pcCase.maxGpuLengthMm} мм).`,
        componentA: gpu.name,
        componentB: pcCase.name
      });
    } else if (gpu.lengthMm > pcCase.maxGpuLengthMm - 15) {
      issues.push({
        type: 'warning',
        title: 'Очень плотная посадка видеокарты',
        description: `Остаётся зазор всего ${pcCase.maxGpuLengthMm - gpu.lengthMm} мм. Установка радиатора СЖО спереди может быть ограничена.`,
        componentA: gpu.name,
        componentB: pcCase.name
      });
    }
  }

  // 5. Совместимость кулера с сокетом и TDP
  if (cpu && cooler) {
    if (!cooler.supportedSockets.includes(cpu.socket)) {
      issues.push({
        type: 'error',
        title: 'Крепление кулера не подходит под сокет',
        description: `Кулер ${cooler.name} не имеет штатных креплений под сокет ${cpu.socket}.`,
        componentA: cooler.name,
        componentB: cpu.name
      });
    } else if (cooler.maxTdp < cpu.tdp) {
      issues.push({
        type: 'warning',
        title: 'Недостаточное охлаждение процессора',
        description: `Кулер рассчитан на отвод до ${cooler.maxTdp} Вт, тогда как базовый TDP процессора ${cpu.tdp} Вт (в бусте может быть выше). Возможен троттлинг.`,
        componentA: cooler.name,
        componentB: cpu.name
      });
    }
  }

  // Расчёт энергопотребления
  const cpuTdp = cpu ? cpu.tdp : 65;
  const gpuTdp = gpu ? gpu.tdp : 100;
  const baseOverhead = 90; // материнка, вентиляторы, диски, подсветка
  const estimatedTdp = (cpu ? cpuTdp : 0) + (gpu ? gpuTdp : 0) + (ssd ? 15 : 0) + (ram ? 15 : 0) + baseOverhead;
  const recommendedPsuWattage = Math.max(
    Math.ceil((estimatedTdp * 1.35) / 50) * 50,
    gpu ? gpu.minPsuWattage : 500
  );

  // 6. Мощность блока питания
  if (psu) {
    if (gpu && psu.wattage < gpu.minPsuWattage) {
      issues.push({
        type: 'error',
        title: 'Недостаточная мощность блока питания',
        description: `Для видеокарты ${gpu.name} производитель требует БП мощностью не менее ${gpu.minPsuWattage} Вт. Выбран блок питания на ${psu.wattage} Вт.`,
        componentA: psu.name,
        componentB: gpu.name
      });
    } else if (psu.wattage < recommendedPsuWattage) {
      issues.push({
        type: 'warning',
        title: 'Блок питания работает на пределе',
        description: `Рекомендуемый запас мощности для этой сборки — от ${recommendedPsuWattage} Вт. Блок на ${psu.wattage} Вт оставляет минимальный запас.`,
        componentA: psu.name,
        componentB: 'Система питания'
      });
    }
  }

  // Расчёт общей стоимости
  let totalPrice = 0;
  if (cpu) totalPrice += cpu.price;
  if (motherboard) totalPrice += motherboard.price;
  if (gpu) totalPrice += gpu.price;
  if (ram) totalPrice += ram.price;
  if (ssd) totalPrice += ssd.price;
  if (psu) totalPrice += psu.price;
  if (pcCase) totalPrice += pcCase.price;
  if (cooler) totalPrice += cooler.price;

  const hasFatalErrors = issues.some(i => i.type === 'error');

  return {
    isCompatible: !hasFatalErrors,
    issues,
    totalPrice,
    estimatedTdp,
    recommendedPsuWattage
  };
}
