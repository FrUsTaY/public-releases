import {
  CpuComponent,
  MotherboardComponent,
  GpuComponent,
  RamComponent,
  SsdComponent,
  PsuComponent,
  CaseComponent,
  CoolerComponent
} from '../types';

export const CPUS: CpuComponent[] = [
  {
    id: 'cpu-r5-7600x',
    name: 'AMD Ryzen 5 7600X (6 ядер, 12 потоков, до 5.3 ГГц)',
    brand: 'AMD',
    socket: 'AM5',
    cores: 6,
    threads: 12,
    tdp: 105,
    price: 19800,
    recommendedCoolerTdp: 160
  },
  {
    id: 'cpu-r7-7800x3d',
    name: 'AMD Ryzen 7 7800X3D (8 ядер, 16 потоков, 3D V-Cache)',
    brand: 'AMD',
    socket: 'AM5',
    cores: 8,
    threads: 16,
    tdp: 120,
    price: 39500,
    recommendedCoolerTdp: 200
  },
  {
    id: 'cpu-r9-7950x',
    name: 'AMD Ryzen 9 7950X (16 ядер, 32 потока, до 5.7 ГГц)',
    brand: 'AMD',
    socket: 'AM5',
    cores: 16,
    threads: 32,
    tdp: 170,
    price: 54900,
    recommendedCoolerTdp: 280
  },
  {
    id: 'cpu-i5-14600k',
    name: 'Intel Core i5-14600K (14 ядер, 20 потоков, до 5.3 ГГц)',
    brand: 'Intel',
    socket: 'LGA1700',
    cores: 14,
    threads: 20,
    tdp: 125,
    price: 28900,
    recommendedCoolerTdp: 220
  },
  {
    id: 'cpu-i7-14700k',
    name: 'Intel Core i7-14700K (20 ядер, 28 потоков, до 5.6 ГГц)',
    brand: 'Intel',
    socket: 'LGA1700',
    cores: 20,
    threads: 28,
    tdp: 253,
    price: 43200,
    recommendedCoolerTdp: 300
  },
  {
    id: 'cpu-r5-5600',
    name: 'AMD Ryzen 5 5600 (6 ядер, 12 потоков, до 4.4 ГГц)',
    brand: 'AMD',
    socket: 'AM4',
    cores: 6,
    threads: 12,
    tdp: 65,
    price: 10400,
    recommendedCoolerTdp: 100
  }
];

export const MOTHERBOARDS: MotherboardComponent[] = [
  {
    id: 'mb-b650-atx',
    name: 'MSI MAG B650 TOMAHAWK WIFI (Socket AM5, DDR5, ATX)',
    socket: 'AM5',
    ramType: 'DDR5',
    formFactor: 'ATX',
    price: 21500,
    chipset: 'AMD B650'
  },
  {
    id: 'mb-b650m-matx',
    name: 'ASUS TUF GAMING B650M-PLUS (Socket AM5, DDR5, Micro-ATX)',
    socket: 'AM5',
    ramType: 'DDR5',
    formFactor: 'Micro-ATX',
    price: 18200,
    chipset: 'AMD B650'
  },
  {
    id: 'mb-x670e-atx',
    name: 'ASUS ROG STRIX X670E-F GAMING (Socket AM5, DDR5, ATX)',
    socket: 'AM5',
    ramType: 'DDR5',
    formFactor: 'ATX',
    price: 38900,
    chipset: 'AMD X670E'
  },
  {
    id: 'mb-z790-ddr5-atx',
    name: 'GIGABYTE Z790 AORUS ELITE AX (LGA1700, DDR5, ATX)',
    socket: 'LGA1700',
    ramType: 'DDR5',
    formFactor: 'ATX',
    price: 27400,
    chipset: 'Intel Z790'
  },
  {
    id: 'mb-b760m-ddr4-matx',
    name: 'ASRock B760M Pro RS/D4 (LGA1700, DDR4, Micro-ATX)',
    socket: 'LGA1700',
    ramType: 'DDR4',
    formFactor: 'Micro-ATX',
    price: 12900,
    chipset: 'Intel B760'
  },
  {
    id: 'mb-b550-ddr4-atx',
    name: 'GIGABYTE B550 AORUS ELITE V2 (AM4, DDR4, ATX)',
    socket: 'AM4',
    ramType: 'DDR4',
    formFactor: 'ATX',
    price: 12400,
    chipset: 'AMD B550'
  }
];

export const GPUS: GpuComponent[] = [
  {
    id: 'gpu-rtx-4060',
    name: 'NVIDIA GeForce RTX 4060 8GB (Palit Dual)',
    brand: 'NVIDIA',
    vram: '8 GB GDDR6',
    tdp: 115,
    lengthMm: 242,
    price: 32900,
    minPsuWattage: 550
  },
  {
    id: 'gpu-rtx-4070-super',
    name: 'NVIDIA GeForce RTX 4070 SUPER 12GB (Gigabyte Gaming OC)',
    brand: 'NVIDIA',
    vram: '12 GB GDDR6X',
    tdp: 220,
    lengthMm: 300,
    price: 68500,
    minPsuWattage: 650
  },
  {
    id: 'gpu-rtx-4080-super',
    name: 'NVIDIA GeForce RTX 4080 SUPER 16GB (ASUS TUF OC)',
    brand: 'NVIDIA',
    vram: '16 GB GDDR6X',
    tdp: 320,
    lengthMm: 348,
    price: 114000,
    minPsuWattage: 750
  },
  {
    id: 'gpu-rtx-4090',
    name: 'NVIDIA GeForce RTX 4090 24GB (MSI Suprim X)',
    brand: 'NVIDIA',
    vram: '24 GB GDDR6X',
    tdp: 450,
    lengthMm: 336,
    price: 219000,
    minPsuWattage: 850
  },
  {
    id: 'gpu-rx-7800-xt',
    name: 'AMD Radeon RX 7800 XT 16GB (Sapphire Pulse)',
    brand: 'AMD',
    vram: '16 GB GDDR6',
    tdp: 263,
    lengthMm: 280,
    price: 56900,
    minPsuWattage: 700
  }
];

export const RAMS: RamComponent[] = [
  {
    id: 'ram-ddr5-32-6000',
    name: 'Kingston FURY Beast 32GB (2x16GB) DDR5 6000MHz CL30 EXPO',
    type: 'DDR5',
    capacityGb: 32,
    speedMhz: 6000,
    price: 13900
  },
  {
    id: 'ram-ddr5-64-6000',
    name: 'G.Skill Trident Z5 Neo 64GB (2x32GB) DDR5 6000MHz CL30',
    type: 'DDR5',
    capacityGb: 64,
    speedMhz: 6000,
    price: 25400
  },
  {
    id: 'ram-ddr4-16-3600',
    name: 'G.Skill Ripjaws V 16GB (2x8GB) DDR4 3600MHz CL16',
    type: 'DDR4',
    capacityGb: 16,
    speedMhz: 3600,
    price: 4900
  },
  {
    id: 'ram-ddr4-32-3600',
    name: 'Kingston FURY Renegade 32GB (2x16GB) DDR4 3600MHz CL16',
    type: 'DDR4',
    capacityGb: 32,
    speedMhz: 3600,
    price: 8900
  }
];

export const SSDS: SsdComponent[] = [
  {
    id: 'ssd-1tb-gen4',
    name: 'Samsung 980 PRO 1TB M.2 PCIe 4.0 (7000 МБ/с)',
    type: 'NVMe Gen4',
    capacityGb: 1000,
    readSpeedMbps: 7000,
    price: 9900
  },
  {
    id: 'ssd-2tb-gen4',
    name: 'Kingston KC3000 2TB M.2 PCIe 4.0 (7000 МБ/с)',
    type: 'NVMe Gen4',
    capacityGb: 2000,
    readSpeedMbps: 7000,
    price: 16800
  },
  {
    id: 'ssd-4tb-gen4',
    name: 'Samsung 990 PRO 4TB M.2 PCIe 4.0 (7450 МБ/с)',
    type: 'NVMe Gen4',
    capacityGb: 4000,
    readSpeedMbps: 7450,
    price: 34500
  }
];

export const PSUS: PsuComponent[] = [
  {
    id: 'psu-650w-gold',
    name: 'Montech Century 650W (80+ Gold, Full Modular)',
    wattage: 650,
    efficiency: '80+ Gold',
    price: 7800,
    modular: true
  },
  {
    id: 'psu-750w-gold',
    name: 'Deepcool PQ750M 750W (80+ Gold, Seasonic platform)',
    wattage: 750,
    efficiency: '80+ Gold',
    price: 9800,
    modular: true
  },
  {
    id: 'psu-850w-gold-atx3',
    name: 'be quiet! Pure Power 12 M 850W (ATX 3.0, 12VHPWR, 80+ Gold)',
    wattage: 850,
    efficiency: '80+ Gold',
    price: 13900,
    modular: true
  },
  {
    id: 'psu-1000w-platinum',
    name: 'Seasonic Focus GX-1000 1000W (ATX 3.0, 80+ Gold)',
    wattage: 1000,
    efficiency: '80+ Gold',
    price: 21500,
    modular: true
  }
];

export const CASES: CaseComponent[] = [
  {
    id: 'case-mid-tower-mesh',
    name: 'Lian Li LANCOOL 216 RGB Black (Mid-Tower, E-ATX/ATX/mATX, макс. GPU 392 мм)',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxGpuLengthMm: 392,
    maxCoolerHeightMm: 180,
    price: 9900,
    fansIncluded: 3
  },
  {
    id: 'case-compact-matx',
    name: 'Jonsbo D31 MESH SC Black (Micro-ATX корпус с экраном, макс. GPU 330 мм)',
    supportedMotherboards: ['Micro-ATX', 'Mini-ITX'],
    maxGpuLengthMm: 330,
    maxCoolerHeightMm: 168,
    price: 8400,
    fansIncluded: 0
  },
  {
    id: 'case-full-tower',
    name: 'Fractal Design Meshify 2 XL Black (Full-Tower, любая плата, макс. GPU 450 мм)',
    supportedMotherboards: ['ATX', 'Micro-ATX', 'Mini-ITX'],
    maxGpuLengthMm: 450,
    maxCoolerHeightMm: 185,
    price: 21900,
    fansIncluded: 3
  }
];

export const COOLERS: CoolerComponent[] = [
  {
    id: 'cooler-air-ak400',
    name: 'Deepcool AK400 Digital (башенный кулер, 4 теплотрубки, до 150 Вт)',
    type: 'Air',
    supportedSockets: ['AM5', 'AM4', 'LGA1700'],
    maxTdp: 150,
    heightMm: 156,
    price: 3600
  },
  {
    id: 'cooler-air-ag620',
    name: 'Thermalright Peerless Assassin 120 SE (двухсекционная башня, до 245 Вт)',
    type: 'Air',
    supportedSockets: ['AM5', 'AM4', 'LGA1700'],
    maxTdp: 245,
    heightMm: 155,
    price: 4900
  },
  {
    id: 'cooler-aio-240',
    name: 'Arctic Liquid Freezer III 240 Black (СЖО 240 мм, до 280 Вт)',
    type: 'AIO 240mm',
    supportedSockets: ['AM5', 'AM4', 'LGA1700'],
    maxTdp: 280,
    heightMm: 65,
    price: 9400
  },
  {
    id: 'cooler-aio-360',
    name: 'Arctic Liquid Freezer III 360 A-RGB (СЖО 360 мм, до 350 Вт)',
    type: 'AIO 360mm',
    supportedSockets: ['AM5', 'AM4', 'LGA1700'],
    maxTdp: 350,
    heightMm: 65,
    price: 13900
  }
];
