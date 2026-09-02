import { CropType, GeoLocation } from '../engine/types';

export interface RegionalCorridor {
  id: string;
  name: string;
  state: string;
  tagline: string;
  badge: string;
  crop: CropType;
  quantityKg: number;
  farmerName: string;
  originDistrict: string;
  originLocation: GeoLocation;
  primaryDestination: string;
  mandiName: string;
  mandiPayoutPerKg: number;
  farmpathPayoutPerKg: number;
  totalLotGain: number;
  gainPercentage: number;
  realWorldChallenge: string;
  solutionSummary: string;
  keyBuyers: string[];
}

export const NATIONAL_CORRIDORS: RegionalCorridor[] = [
  {
    id: 'punjab',
    name: 'Punjab GT-Road Agri-Corridor',
    state: 'Punjab (Active Reference Pilot)',
    tagline: 'Fresh Table Tomatoes & Potato Seed Belt along NH-44',
    badge: 'Pilot Corridor',
    crop: 'Tomato',
    quantityKg: 5000,
    farmerName: 'Gurmail Singh (Nakodar, Jalandhar)',
    originDistrict: 'Jalandhar',
    originLocation: { lat: 31.1270, lng: 75.4740, district: 'Jalandhar', name: 'Nakodar Cluster' },
    primaryDestination: 'Cremica Agro Foods (Phillaur Plant)',
    mandiName: 'Maqsudan APMC Mandi (Jalandhar)',
    mandiPayoutPerKg: 18.90,
    farmpathPayoutPerKg: 24.80,
    totalLotGain: 29500,
    gainPercentage: 31.2,
    realWorldChallenge: 'High summer heat (38°C) causes 8.1% open-sun rotting in mandi tractor queues, while Arhatiyas deduct an 8.5% commission cut.',
    solutionSummary: 'Chilled pre-cooling at Doaba FPO Cold Hub preserves tomato firmness, enabling direct factory delivery with zero commission fees.',
    keyBuyers: ['Cremica Agro Foods', 'Del Monte (Ludhiana)', 'Pagro Frozen Foods', 'Reliance Fresh Ludhiana'],
  },
  {
    id: 'maharashtra',
    name: 'Maharashtra Western Corridor',
    state: 'Maharashtra',
    tagline: 'Asia’s Largest Onion & Pomegranate Belt along NH-48',
    badge: 'National Corridor',
    crop: 'Onion',
    quantityKg: 5000,
    farmerName: 'Dnyaneshwar Shinde (Lasalgaon, Nashik)',
    originDistrict: 'Nashik',
    originLocation: { lat: 20.1470, lng: 74.2270, district: 'Nashik', name: 'Lasalgaon Farmgate' },
    primaryDestination: 'Sahyadri Farms FPO Post-Harvest Center (Mohadi)',
    mandiName: 'Lasalgaon APMC Mandi (Nashik)',
    mandiPayoutPerKg: 21.20,
    farmpathPayoutPerKg: 27.60,
    totalLotGain: 32000,
    gainPercentage: 30.2,
    realWorldChallenge: 'Mandi price cartels depress farmgate prices during bumper arrivals; improper open-yard stacking leads to internal rot and sprouting.',
    solutionSummary: 'Routes onions to climate-controlled curing chambers with direct export-grade aggregation for Mumbai JNPT and FMCG buyers.',
    keyBuyers: ['Sahyadri Farms FPO', 'Adani Agrifresh', 'Mother Dairy (Mumbai)', 'JNPT Export Terminal'],
  },
  {
    id: 'uttar_pradesh',
    name: 'Uttar Pradesh Gangetic Plain Belt',
    state: 'Uttar Pradesh',
    tagline: 'Agra–Farrukhabad High-Volume Potato & Vegetable Hub',
    badge: 'National Corridor',
    crop: 'Potato',
    quantityKg: 10000,
    farmerName: 'Rameshwar Yadav (Farrukhabad)',
    originDistrict: 'Farrukhabad',
    originLocation: { lat: 27.3820, lng: 79.5830, district: 'Farrukhabad', name: 'Farrukhabad Tuber Hub' },
    primaryDestination: 'PepsiCo Snack Processing Center (Kosi Kalan, Mathura)',
    mandiName: 'Farrukhabad APMC Mandi',
    mandiPayoutPerKg: 12.40,
    farmpathPayoutPerKg: 16.80,
    totalLotGain: 44000,
    gainPercentage: 35.5,
    realWorldChallenge: 'High cold storage lock-in fees combined with long-distance transit burn to Delhi Azadpur Mandi reduce farmer margins to breakeven.',
    solutionSummary: 'Direct bulk procurement contract with potato chip processors eliminates 4 handling transshipments and bypasses middlemen.',
    keyBuyers: ['PepsiCo India (Kosi Kalan)', 'Haldiram Snacks (Noida)', 'McCain Foods', 'Azadpur Terminal Hub'],
  },
  {
    id: 'karnataka',
    name: 'South India Deccan Corridor',
    state: 'Karnataka & Andhra Border',
    tagline: 'Kolar Tomato & Mango Pulp Cluster connecting to Bengaluru',
    badge: 'National Corridor',
    crop: 'Tomato',
    quantityKg: 5000,
    farmerName: 'Venkataswamy Reddy (Kolar)',
    originDistrict: 'Kolar',
    originLocation: { lat: 13.1360, lng: 78.1290, district: 'Kolar', name: 'Kolar Highway Cluster' },
    primaryDestination: 'Zepto & Blinkit Fresh Central Distribution Hub (Hoskote)',
    mandiName: 'Kolar APMC Mandi',
    mandiPayoutPerKg: 19.50,
    farmpathPayoutPerKg: 26.20,
    totalLotGain: 33500,
    gainPercentage: 34.4,
    realWorldChallenge: 'High urban retail demand in Bengaluru, yet farmers are trapped in volatile early-morning mandi auctions with aggressive quality cuts.',
    solutionSummary: 'Direct farm-to-quick-commerce express delivery using pre-cooling hubs to meet 6-hour farm-to-darkstore quality SLAs.',
    keyBuyers: ['Blinkit Dark Store Network', 'Zepto Fresh Hub (Hoskote)', 'BigBasket Central', 'ITC Agri-Business'],
  },
];
