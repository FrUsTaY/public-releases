export type DeviceCategory = 
  | 'pc'
  | 'laptop'
  | 'smartphone'
  | 'tablet'
  | 'gpu'
  | 'console'
  | 'monitor'
  | 'motherboard';

export interface ServiceItem {
  id: string;
  category: DeviceCategory;
  title: string;
  description: string;
  priceFrom: number;
  duration: string;
  popular?: boolean;
  warranty: string;
}

export interface DirectionItem {
  id: DeviceCategory;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image: string;
  popularIssues: string[];
  repairs: { name: string; price: number; duration: string }[];
  tag: string;
}

export interface AdvantageItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  highlight?: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  device: string;
  rating: number;
  date: string;
  text: string;
  serviceType: string;
  verified: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Build Configurator Types
export type CpuSocket = 'AM5' | 'AM4' | 'LGA1700' | 'LGA1851';
export type RamType = 'DDR4' | 'DDR5';
export type MotherboardFormFactor = 'ATX' | 'Micro-ATX' | 'Mini-ITX';

export interface CpuComponent {
  id: string;
  name: string;
  brand: 'AMD' | 'Intel';
  socket: CpuSocket;
  cores: number;
  threads: number;
  tdp: number;
  price: number;
  recommendedCoolerTdp: number;
}

export interface MotherboardComponent {
  id: string;
  name: string;
  socket: CpuSocket;
  ramType: RamType;
  formFactor: MotherboardFormFactor;
  price: number;
  chipset: string;
}

export interface GpuComponent {
  id: string;
  name: string;
  brand: 'NVIDIA' | 'AMD';
  vram: string;
  tdp: number;
  lengthMm: number;
  price: number;
  minPsuWattage: number;
}

export interface RamComponent {
  id: string;
  name: string;
  type: RamType;
  capacityGb: number;
  speedMhz: number;
  price: number;
}

export interface SsdComponent {
  id: string;
  name: string;
  type: 'NVMe Gen4' | 'NVMe Gen3' | 'SATA III';
  capacityGb: number;
  readSpeedMbps: number;
  price: number;
}

export interface PsuComponent {
  id: string;
  name: string;
  wattage: number;
  efficiency: '80+ Bronze' | '80+ Gold' | '80+ Platinum';
  price: number;
  modular: boolean;
}

export interface CaseComponent {
  id: string;
  name: string;
  supportedMotherboards: MotherboardFormFactor[];
  maxGpuLengthMm: number;
  maxCoolerHeightMm: number;
  price: number;
  fansIncluded: number;
}

export interface CoolerComponent {
  id: string;
  name: string;
  type: 'Air' | 'AIO 240mm' | 'AIO 360mm';
  supportedSockets: CpuSocket[];
  maxTdp: number;
  heightMm: number;
  price: number;
}

export interface PcBuildState {
  cpu: CpuComponent | null;
  motherboard: MotherboardComponent | null;
  gpu: GpuComponent | null;
  ram: RamComponent | null;
  ssd: SsdComponent | null;
  psu: PsuComponent | null;
  pcCase: CaseComponent | null;
  cooler: CoolerComponent | null;
}

export interface CompatibilityIssue {
  type: 'error' | 'warning';
  title: string;
  description: string;
  componentA: string;
  componentB: string;
}

// Appointment form data
export interface AppointmentData {
  name: string;
  phone: string;
  deviceType: string;
  problem: string;
  contactMethod: 'phone' | 'telegram' | 'whatsapp';
  estimatedCost?: number;
  calculatorNotes?: string;
}
