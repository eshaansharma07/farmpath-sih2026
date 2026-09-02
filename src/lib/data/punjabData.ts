import { SupplyChainNode, SupplyChainEdge, CropLot } from '../engine/types';

// Punjab Geographic Coordinates Bounding Box: ~30.0 - 31.8° N, 74.5 - 76.5° E
export const PUNJAB_NODES: SupplyChainNode[] = [
  // ================= 20 FARMS =================
  {
    id: 'farm-01',
    name: 'Gurmail Singh Farm (Nakodar)',
    type: 'farm',
    location: { lat: 31.1270, lng: 75.4740, district: 'Jalandhar', name: 'Nakodar Cluster' },
    capacityKg: 25000,
    currentLoadKg: 5000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-02',
    name: 'Harpreet Dhillon Farm (Shahkot)',
    type: 'farm',
    location: { lat: 31.0820, lng: 75.3410, district: 'Jalandhar', name: 'Shahkot' },
    capacityKg: 30000,
    currentLoadKg: 6500,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-03',
    name: 'Balwinder Sandhu Farm (Phillaur)',
    type: 'farm',
    location: { lat: 31.0180, lng: 75.7870, district: 'Jalandhar', name: 'Phillaur' },
    capacityKg: 20000,
    currentLoadKg: 4000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-04',
    name: 'Manjit Kang Farm (Jagraon)',
    type: 'farm',
    location: { lat: 30.7840, lng: 75.4780, district: 'Ludhiana', name: 'Jagraon' },
    capacityKg: 35000,
    currentLoadKg: 8000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-05',
    name: 'Sukhdev Cheema Farm (Samrala)',
    type: 'farm',
    location: { lat: 30.8350, lng: 76.1910, district: 'Ludhiana', name: 'Samrala' },
    capacityKg: 28000,
    currentLoadKg: 5200,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-06',
    name: 'Jagtar Grewal Farm (Khanna Outskirts)',
    type: 'farm',
    location: { lat: 30.7070, lng: 76.2160, district: 'Ludhiana', name: 'Khanna Rural' },
    capacityKg: 40000,
    currentLoadKg: 9000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-07',
    name: 'Amanpreet Gill Farm (Kapurthala West)',
    type: 'farm',
    location: { lat: 31.3800, lng: 75.3800, district: 'Kapurthala', name: 'Kapurthala West' },
    capacityKg: 22000,
    currentLoadKg: 4500,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-08',
    name: 'Surjit Bawa Farm (Sultanpur Lodhi)',
    type: 'farm',
    location: { lat: 31.2150, lng: 75.1980, district: 'Kapurthala', name: 'Sultanpur Lodhi' },
    capacityKg: 32000,
    currentLoadKg: 7000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-09',
    name: 'Kuldeep Brar Farm (Phagwara Rural)',
    type: 'farm',
    location: { lat: 31.2240, lng: 75.7710, district: 'Kapurthala', name: 'Phagwara' },
    capacityKg: 24000,
    currentLoadKg: 5000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-10',
    name: 'Davinder Mahal Farm (Hoshiarpur Citrus)',
    type: 'farm',
    location: { lat: 31.5270, lng: 75.9140, district: 'Hoshiarpur', name: 'Hoshiarpur Plain' },
    capacityKg: 30000,
    currentLoadKg: 6000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-11',
    name: 'Jaswant Saini Farm (Dasuya)',
    type: 'farm',
    location: { lat: 31.8150, lng: 75.6580, district: 'Hoshiarpur', name: 'Dasuya' },
    capacityKg: 18000,
    currentLoadKg: 3500,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-12',
    name: 'Tarlochan Randhawa Farm (Ajnala)',
    type: 'farm',
    location: { lat: 31.8410, lng: 74.7610, district: 'Amritsar', name: 'Ajnala' },
    capacityKg: 26000,
    currentLoadKg: 5400,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-13',
    name: 'Pritam Bajwa Farm (Rayya)',
    type: 'farm',
    location: { lat: 31.5370, lng: 75.2280, district: 'Amritsar', name: 'Rayya' },
    capacityKg: 25000,
    currentLoadKg: 4800,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-14',
    name: 'Satnam Pannu Farm (Tarn Taran Border)',
    type: 'farm',
    location: { lat: 31.4520, lng: 74.9250, district: 'Tarn Taran', name: 'Tarn Taran' },
    capacityKg: 29000,
    currentLoadKg: 6200,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-15',
    name: 'Karamjit Sidhu Farm (Patti)',
    type: 'farm',
    location: { lat: 31.2820, lng: 74.8560, district: 'Tarn Taran', name: 'Patti' },
    capacityKg: 21000,
    currentLoadKg: 4100,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-16',
    name: 'Amarjit Mann Farm (Nabha)',
    type: 'farm',
    location: { lat: 30.3750, lng: 76.1520, district: 'Patiala', name: 'Nabha' },
    capacityKg: 35000,
    currentLoadKg: 7500,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-17',
    name: 'Rupinder Tiwana Farm (Samana)',
    type: 'farm',
    location: { lat: 30.1580, lng: 76.1920, district: 'Patiala', name: 'Samana' },
    capacityKg: 33000,
    currentLoadKg: 6800,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-18',
    name: 'Hardial Dhaliwal Farm (Sunam)',
    type: 'farm',
    location: { lat: 30.1290, lng: 75.8010, district: 'Sangrur', name: 'Sunam' },
    capacityKg: 38000,
    currentLoadKg: 8200,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-19',
    name: 'Bhupinder Johal Farm (Malerkotla Veg)',
    type: 'farm',
    location: { lat: 30.5280, lng: 75.8890, district: 'Malerkotla', name: 'Malerkotla Belt' },
    capacityKg: 45000,
    currentLoadKg: 10000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },
  {
    id: 'farm-20',
    name: 'Avtar Khangura Farm (Moga East)',
    type: 'farm',
    location: { lat: 30.8160, lng: 75.1740, district: 'Moga', name: 'Moga Belt' },
    capacityKg: 30000,
    currentLoadKg: 6000,
    handlingCostPerKg: 0.20,
    storageCostPerKgDay: 0.10,
    processingTimeHours: 2,
  },

  // ================= 8 COLLECTION CENTERS =================
  {
    id: 'cc-01',
    name: 'Doaba Farmers FPO Aggregation Hub (Jalandhar)',
    type: 'collection_center',
    location: { lat: 31.2850, lng: 75.5820, district: 'Jalandhar', name: 'Jalandhar Bypass' },
    capacityKg: 80000,
    currentLoadKg: 28000,
    handlingCostPerKg: 0.45,
    storageCostPerKgDay: 0.25,
    processingTimeHours: 4,
  },
  {
    id: 'cc-02',
    name: 'Malwa Agro Primary Processing Hub (Ludhiana)',
    type: 'collection_center',
    location: { lat: 30.8900, lng: 75.8200, district: 'Ludhiana', name: 'Gill Road CC' },
    capacityKg: 100000,
    currentLoadKg: 42000,
    handlingCostPerKg: 0.40,
    storageCostPerKgDay: 0.25,
    processingTimeHours: 3,
  },
  {
    id: 'cc-03',
    name: 'Majha Vegetable Farmers Cluster (Amritsar)',
    type: 'collection_center',
    location: { lat: 31.6100, lng: 74.9200, district: 'Amritsar', name: 'Tarn Taran Road CC' },
    capacityKg: 75000,
    currentLoadKg: 31000,
    handlingCostPerKg: 0.50,
    storageCostPerKgDay: 0.30,
    processingTimeHours: 4,
  },
  {
    id: 'cc-04',
    name: 'Kapurthala Modern Packhouse & Pre-cooling',
    type: 'collection_center',
    location: { lat: 31.3650, lng: 75.4120, district: 'Kapurthala', name: 'Subhanpur Road CC' },
    capacityKg: 60000,
    currentLoadKg: 19000,
    handlingCostPerKg: 0.55,
    storageCostPerKgDay: 0.35,
    processingTimeHours: 3,
  },
  {
    id: 'cc-05',
    name: 'Hoshiarpur Kandi Cold-Chain Aggregator',
    type: 'collection_center',
    location: { lat: 31.5120, lng: 75.8950, district: 'Hoshiarpur', name: 'Hoshiarpur Industrial CC' },
    capacityKg: 50000,
    currentLoadKg: 15000,
    handlingCostPerKg: 0.60,
    storageCostPerKgDay: 0.40,
    processingTimeHours: 5,
  },
  {
    id: 'cc-06',
    name: 'Khanna Integrated Agro Terminal',
    type: 'collection_center',
    location: { lat: 30.7150, lng: 76.2250, district: 'Ludhiana', name: 'GT Road Khanna CC' },
    capacityKg: 120000,
    currentLoadKg: 65000,
    handlingCostPerKg: 0.42,
    storageCostPerKgDay: 0.22,
    processingTimeHours: 3,
  },
  {
    id: 'cc-07',
    name: 'Patiala Agri-Logistics Collection Center',
    type: 'collection_center',
    location: { lat: 30.3420, lng: 76.3850, district: 'Patiala', name: 'Sanaur Road CC' },
    capacityKg: 65000,
    currentLoadKg: 22000,
    handlingCostPerKg: 0.48,
    storageCostPerKgDay: 0.28,
    processingTimeHours: 4,
  },
  {
    id: 'cc-08',
    name: 'Malerkotla Greenhouse & Organic Packhouse',
    type: 'collection_center',
    location: { lat: 30.5340, lng: 75.8750, district: 'Malerkotla', name: 'Malerkotla Packhouse' },
    capacityKg: 55000,
    currentLoadKg: 20000,
    handlingCostPerKg: 0.52,
    storageCostPerKgDay: 0.30,
    processingTimeHours: 3,
  },

  // ================= 6 MANDIS =================
  {
    id: 'mandi-01',
    name: 'APMC Jalandhar Main Vegetable Mandi (Maqsudan)',
    type: 'mandi',
    location: { lat: 31.3540, lng: 75.5670, district: 'Jalandhar', name: 'Maqsudan Mandi' },
    capacityKg: 250000,
    currentLoadKg: 195000,
    handlingCostPerKg: 0.70,
    storageCostPerKgDay: 0.45,
    processingTimeHours: 12,
    baseOfferPricePerKg: 27.00,
    intermediaryMarginPct: 0.08, // Arhatiya / auction fee + unloading commission
  },
  {
    id: 'mandi-02',
    name: 'Ludhiana Grain & Fruit Mandi (Salem Tabri)',
    type: 'mandi',
    location: { lat: 30.9320, lng: 75.8450, district: 'Ludhiana', name: 'Salem Tabri Mandi' },
    capacityKg: 400000,
    currentLoadKg: 320000,
    handlingCostPerKg: 0.65,
    storageCostPerKgDay: 0.40,
    processingTimeHours: 14,
    baseOfferPricePerKg: 28.50,
    intermediaryMarginPct: 0.085,
  },
  {
    id: 'mandi-03',
    name: 'Amritsar APMC Mandi (Bhagtanwala)',
    type: 'mandi',
    location: { lat: 31.6050, lng: 74.8720, district: 'Amritsar', name: 'Bhagtanwala Mandi' },
    capacityKg: 220000,
    currentLoadKg: 170000,
    handlingCostPerKg: 0.75,
    storageCostPerKgDay: 0.50,
    processingTimeHours: 10,
    baseOfferPricePerKg: 26.50,
    intermediaryMarginPct: 0.09,
  },
  {
    id: 'mandi-04',
    name: 'Khanna Asia Largest Grain & Produce Mandi',
    type: 'mandi',
    location: { lat: 30.7020, lng: 76.2200, district: 'Ludhiana', name: 'Khanna Mandi' },
    capacityKg: 600000,
    currentLoadKg: 490000,
    handlingCostPerKg: 0.60,
    storageCostPerKgDay: 0.35,
    processingTimeHours: 16,
    baseOfferPricePerKg: 27.80,
    intermediaryMarginPct: 0.075,
  },
  {
    id: 'mandi-05',
    name: 'Patiala APMC Subzi Mandi',
    type: 'mandi',
    location: { lat: 30.3390, lng: 76.4020, district: 'Patiala', name: 'Patiala Mandi' },
    capacityKg: 180000,
    currentLoadKg: 135000,
    handlingCostPerKg: 0.72,
    storageCostPerKgDay: 0.42,
    processingTimeHours: 11,
    baseOfferPricePerKg: 26.80,
    intermediaryMarginPct: 0.08,
  },
  {
    id: 'mandi-06',
    name: 'Delhi Azadpur Inter-State Gateway Mandi (Transit)',
    type: 'mandi',
    location: { lat: 28.7150, lng: 77.1780, district: 'Delhi Transit', name: 'Azadpur Gateway' },
    capacityKg: 1500000,
    currentLoadKg: 1200000,
    handlingCostPerKg: 0.95,
    storageCostPerKgDay: 0.60,
    processingTimeHours: 20,
    baseOfferPricePerKg: 33.00,
    intermediaryMarginPct: 0.11, // Interstate trader + mandi cess + market toll
  },

  // ================= 5 PROCESSORS =================
  {
    id: 'proc-01',
    name: 'Cremica Agro Foods (Phillaur Plant)',
    type: 'processor',
    location: { lat: 31.0250, lng: 75.7920, district: 'Jalandhar', name: 'Phillaur Processing' },
    capacityKg: 150000,
    currentLoadKg: 85000,
    handlingCostPerKg: 0.50,
    storageCostPerKgDay: 0.30,
    processingTimeHours: 6,
    buyerDemandKg: 12000,
    baseOfferPricePerKg: 31.50,
    intermediaryMarginPct: 0.0, // Direct contract! Zero intermediary commission
    contactPerson: 'Manmohan Singh (Procurement Lead)',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'proc-02',
    name: 'Pagro Frozen Foods & Dehydration (Fatehgarh)',
    type: 'processor',
    location: { lat: 30.6480, lng: 76.3980, district: 'Fatehgarh Sahib', name: 'Sirhind Plant' },
    capacityKg: 200000,
    currentLoadKg: 120000,
    handlingCostPerKg: 0.48,
    storageCostPerKgDay: 0.28,
    processingTimeHours: 5,
    buyerDemandKg: 18000,
    baseOfferPricePerKg: 32.00,
    intermediaryMarginPct: 0.0,
    contactPerson: 'Rohit Verma',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'proc-03',
    name: 'Punjab Agro Juices & Puree Mega Plant (Hoshiarpur)',
    type: 'processor',
    location: { lat: 31.5410, lng: 75.9220, district: 'Hoshiarpur', name: 'Hoshiarpur Mega Plant' },
    capacityKg: 180000,
    currentLoadKg: 95000,
    handlingCostPerKg: 0.52,
    storageCostPerKgDay: 0.32,
    processingTimeHours: 6,
    buyerDemandKg: 15000,
    baseOfferPricePerKg: 30.80,
    intermediaryMarginPct: 0.0,
    contactPerson: 'Dr. G.S. Kalkat',
    qualityPreference: ['A', 'B', 'C'],
  },
  {
    id: 'proc-04',
    name: 'Nijjer Agro Foods Tomato Paste Terminal (Jandiala Guru)',
    type: 'processor',
    location: { lat: 31.5640, lng: 75.0210, district: 'Amritsar', name: 'Jandiala Guru' },
    capacityKg: 160000,
    currentLoadKg: 90000,
    handlingCostPerKg: 0.50,
    storageCostPerKgDay: 0.30,
    processingTimeHours: 5,
    buyerDemandKg: 14000,
    baseOfferPricePerKg: 31.00,
    intermediaryMarginPct: 0.0,
    contactPerson: 'Hardeep Nijjer',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'proc-05',
    name: 'Del Monte / FieldFresh Foods Aggregation Unit (Ludhiana)',
    type: 'processor',
    location: { lat: 30.8750, lng: 75.9120, district: 'Ludhiana', name: 'Sahnewal Unit' },
    capacityKg: 220000,
    currentLoadKg: 140000,
    handlingCostPerKg: 0.45,
    storageCostPerKgDay: 0.25,
    processingTimeHours: 4,
    buyerDemandKg: 20000,
    baseOfferPricePerKg: 32.50,
    intermediaryMarginPct: 0.0,
    contactPerson: 'Vikas Sharma',
    qualityPreference: ['A'],
  },

  // ================= 10 INSTITUTIONAL BUYERS =================
  {
    id: 'inst-01',
    name: 'Reliance Retail Fresh Fulfillment Center (Ludhiana)',
    type: 'institutional_buyer',
    location: { lat: 30.8640, lng: 75.8900, district: 'Ludhiana', name: 'Doraha Logistics Park' },
    capacityKg: 120000,
    currentLoadKg: 78000,
    handlingCostPerKg: 0.40,
    storageCostPerKgDay: 0.25,
    processingTimeHours: 4,
    buyerDemandKg: 10000,
    baseOfferPricePerKg: 30.50,
    intermediaryMarginPct: 0.02, // Minimal platform aggregation surcharge
    contactPerson: 'Sanjay Aggarwal',
    qualityPreference: ['A'],
  },
  {
    id: 'inst-02',
    name: 'BigBasket Regional Distribution Hub (Jalandhar)',
    type: 'institutional_buyer',
    location: { lat: 31.3120, lng: 75.5990, district: 'Jalandhar', name: 'Jalandhar Industrial Area' },
    capacityKg: 85000,
    currentLoadKg: 52000,
    handlingCostPerKg: 0.45,
    storageCostPerKgDay: 0.28,
    processingTimeHours: 3,
    buyerDemandKg: 7500,
    baseOfferPricePerKg: 30.20,
    intermediaryMarginPct: 0.02,
    contactPerson: 'Ankush Mehra',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'inst-03',
    name: 'Mother Dairy / Safal Direct Sourcing Hub (Mohali)',
    type: 'institutional_buyer',
    location: { lat: 30.7040, lng: 76.7170, district: 'SAS Nagar', name: 'Mohali Industrial Phase' },
    capacityKg: 110000,
    currentLoadKg: 65000,
    handlingCostPerKg: 0.42,
    storageCostPerKgDay: 0.26,
    processingTimeHours: 4,
    buyerDemandKg: 9000,
    baseOfferPricePerKg: 31.20,
    intermediaryMarginPct: 0.015,
    contactPerson: 'Ramesh K. Joshi',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'inst-04',
    name: 'Blinkit Dark Store Master Replenishment (Ludhiana)',
    type: 'institutional_buyer',
    location: { lat: 30.9150, lng: 75.8300, district: 'Ludhiana', name: 'Civil Lines Hub' },
    capacityKg: 60000,
    currentLoadKg: 38000,
    handlingCostPerKg: 0.50,
    storageCostPerKgDay: 0.35,
    processingTimeHours: 2,
    buyerDemandKg: 5000,
    baseOfferPricePerKg: 31.80,
    intermediaryMarginPct: 0.025,
    contactPerson: 'Simran Jolly',
    qualityPreference: ['A'],
  },
  {
    id: 'inst-05',
    name: 'ITC Choupal Fresh Distribution Center (Patiala)',
    type: 'institutional_buyer',
    location: { lat: 30.3450, lng: 76.4150, district: 'Patiala', name: 'Patiala Hub' },
    capacityKg: 95000,
    currentLoadKg: 54000,
    handlingCostPerKg: 0.38,
    storageCostPerKgDay: 0.24,
    processingTimeHours: 4,
    buyerDemandKg: 8000,
    baseOfferPricePerKg: 29.80,
    intermediaryMarginPct: 0.02,
    contactPerson: 'Arunav Sengupta',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'inst-06',
    name: 'Zomato Hyperpure Agri-Warehouse (Chandigarh/Panchkula)',
    type: 'institutional_buyer',
    location: { lat: 30.6940, lng: 76.8600, district: 'Transit/Tricity', name: 'Panchkula Industrial' },
    capacityKg: 130000,
    currentLoadKg: 82000,
    handlingCostPerKg: 0.44,
    storageCostPerKgDay: 0.30,
    processingTimeHours: 3,
    buyerDemandKg: 11000,
    baseOfferPricePerKg: 31.40,
    intermediaryMarginPct: 0.02,
    contactPerson: 'Karanvir Kapoor',
    qualityPreference: ['A'],
  },
  {
    id: 'inst-07',
    name: 'Walmart Best Price Wholesale Club (Amritsar)',
    type: 'institutional_buyer',
    location: { lat: 31.6380, lng: 74.9120, district: 'Amritsar', name: 'Airport Road Wholesale' },
    capacityKg: 140000,
    currentLoadKg: 91000,
    handlingCostPerKg: 0.40,
    storageCostPerKgDay: 0.26,
    processingTimeHours: 5,
    buyerDemandKg: 12000,
    baseOfferPricePerKg: 30.00,
    intermediaryMarginPct: 0.02,
    contactPerson: 'Sunil Duggal',
    qualityPreference: ['A', 'B'],
  },
  {
    id: 'inst-08',
    name: 'Taj / Radisson Luxury Hospitality Procurement Consortium',
    type: 'institutional_buyer',
    location: { lat: 30.7330, lng: 76.7790, district: 'Chandigarh', name: 'Sector 17 Central' },
    capacityKg: 40000,
    currentLoadKg: 22000,
    handlingCostPerKg: 0.60,
    storageCostPerKgDay: 0.40,
    processingTimeHours: 2,
    buyerDemandKg: 4000,
    baseOfferPricePerKg: 33.50,
    intermediaryMarginPct: 0.01,
    contactPerson: 'Executive Chef Vineet',
    qualityPreference: ['A'],
  },
  {
    id: 'inst-09',
    name: 'Haldiram Snacks Agricultural Raw Material Depot',
    type: 'institutional_buyer',
    location: { lat: 30.7580, lng: 76.4250, district: 'Fatehgarh Sahib', name: 'Sirhind GT Depot' },
    capacityKg: 170000,
    currentLoadKg: 105000,
    handlingCostPerKg: 0.42,
    storageCostPerKgDay: 0.25,
    processingTimeHours: 5,
    buyerDemandKg: 15000,
    baseOfferPricePerKg: 30.70,
    intermediaryMarginPct: 0.02,
    contactPerson: 'Rajeev Singla',
    qualityPreference: ['A', 'B', 'C'],
  },
  {
    id: 'inst-10',
    name: 'Zepto Quick-Commerce Sourcing Hub (Jalandhar Urban)',
    type: 'institutional_buyer',
    location: { lat: 31.3340, lng: 75.5780, district: 'Jalandhar', name: 'Rama Mandi Hub' },
    capacityKg: 50000,
    currentLoadKg: 29000,
    handlingCostPerKg: 0.52,
    storageCostPerKgDay: 0.32,
    processingTimeHours: 2,
    buyerDemandKg: 4500,
    baseOfferPricePerKg: 31.60,
    intermediaryMarginPct: 0.025,
    contactPerson: 'Pooja Tandon',
    qualityPreference: ['A'],
  },

  // ================= 10 RETAIL DESTINATIONS =================
  {
    id: 'ret-01',
    name: 'Ludhiana Model Town Retailers Association',
    type: 'retail',
    location: { lat: 30.8980, lng: 75.8340, district: 'Ludhiana', name: 'Model Town Retail' },
    capacityKg: 30000,
    currentLoadKg: 22000,
    handlingCostPerKg: 0.80,
    storageCostPerKgDay: 0.50,
    processingTimeHours: 8,
    buyerDemandKg: 6000,
    baseOfferPricePerKg: 36.00,
  },
  {
    id: 'ret-02',
    name: 'Jalandhar Cantt Supermarket Cluster',
    type: 'retail',
    location: { lat: 31.2950, lng: 75.6180, district: 'Jalandhar', name: 'Cantt Market' },
    capacityKg: 25000,
    currentLoadKg: 18000,
    handlingCostPerKg: 0.85,
    storageCostPerKgDay: 0.55,
    processingTimeHours: 8,
    buyerDemandKg: 5000,
    baseOfferPricePerKg: 35.50,
  },
  {
    id: 'ret-03',
    name: 'Chandigarh Sector 26 Wholesale-to-Retail Bazar',
    type: 'retail',
    location: { lat: 30.7280, lng: 76.8050, district: 'Chandigarh', name: 'Sector 26 Retail' },
    capacityKg: 45000,
    currentLoadKg: 34000,
    handlingCostPerKg: 0.90,
    storageCostPerKgDay: 0.60,
    processingTimeHours: 10,
    buyerDemandKg: 9000,
    baseOfferPricePerKg: 38.00,
  },
  {
    id: 'ret-04',
    name: 'Amritsar Lawrence Road Premium Grocers',
    type: 'retail',
    location: { lat: 31.6350, lng: 74.8780, district: 'Amritsar', name: 'Lawrence Road' },
    capacityKg: 28000,
    currentLoadKg: 20000,
    handlingCostPerKg: 0.88,
    storageCostPerKgDay: 0.58,
    processingTimeHours: 7,
    buyerDemandKg: 5500,
    baseOfferPricePerKg: 37.00,
  },
  {
    id: 'ret-05',
    name: 'Mohali Phase 7 High-Density Consumer Market',
    type: 'retail',
    location: { lat: 30.7100, lng: 76.7150, district: 'SAS Nagar', name: 'Phase 7 Retail' },
    capacityKg: 32000,
    currentLoadKg: 23000,
    handlingCostPerKg: 0.82,
    storageCostPerKgDay: 0.52,
    processingTimeHours: 8,
    buyerDemandKg: 7000,
    baseOfferPricePerKg: 37.50,
  },
  {
    id: 'ret-06',
    name: 'Patiala Urban Mall & Bazar Network',
    type: 'retail',
    location: { lat: 30.3420, lng: 76.3980, district: 'Patiala', name: 'Chhoti Baradari' },
    capacityKg: 24000,
    currentLoadKg: 17000,
    handlingCostPerKg: 0.80,
    storageCostPerKgDay: 0.50,
    processingTimeHours: 8,
    buyerDemandKg: 4800,
    baseOfferPricePerKg: 35.00,
  },
  {
    id: 'ret-07',
    name: 'Hoshiarpur Mall Road Super Bazaar',
    type: 'retail',
    location: { lat: 31.5300, lng: 75.9180, district: 'Hoshiarpur', name: 'Mall Road Hoshiarpur' },
    capacityKg: 20000,
    currentLoadKg: 14000,
    handlingCostPerKg: 0.80,
    storageCostPerKgDay: 0.50,
    processingTimeHours: 7,
    buyerDemandKg: 4200,
    baseOfferPricePerKg: 34.50,
  },
  {
    id: 'ret-08',
    name: 'Khanna Local Grocers & Retail Collective',
    type: 'retail',
    location: { lat: 30.7090, lng: 76.2180, district: 'Ludhiana', name: 'GT Road Bazaar' },
    capacityKg: 22000,
    currentLoadKg: 15000,
    handlingCostPerKg: 0.78,
    storageCostPerKgDay: 0.48,
    processingTimeHours: 7,
    buyerDemandKg: 4500,
    baseOfferPricePerKg: 34.80,
  },
  {
    id: 'ret-09',
    name: 'Bathinda City Wholesale-Retail Aggregate Hub',
    type: 'retail',
    location: { lat: 30.2110, lng: 74.9450, district: 'Bathinda', name: 'Bathinda City' },
    capacityKg: 35000,
    currentLoadKg: 26000,
    handlingCostPerKg: 0.85,
    storageCostPerKgDay: 0.55,
    processingTimeHours: 9,
    buyerDemandKg: 6500,
    baseOfferPricePerKg: 35.80,
  },
  {
    id: 'ret-10',
    name: 'Phagwara Main Chowk Retail Hub',
    type: 'retail',
    location: { lat: 31.2210, lng: 75.7750, district: 'Kapurthala', name: 'Phagwara Market' },
    capacityKg: 19000,
    currentLoadKg: 13000,
    handlingCostPerKg: 0.80,
    storageCostPerKgDay: 0.50,
    processingTimeHours: 6,
    buyerDemandKg: 3800,
    baseOfferPricePerKg: 34.00,
  }
];

// Helper to calculate distance between coordinates (Haversine formula * road winding factor)
export function calculateRoadDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const straightDistance = R * c;
  // Road winding factor in Punjab plains is ~1.25x - 1.35x
  return Math.round(straightDistance * 1.3 * 10) / 10;
}

// Generate realistic edges between logically connected tiers
export function generateSupplyChainEdges(nodes: SupplyChainNode[]): SupplyChainEdge[] {
  const edges: SupplyChainEdge[] = [];
  const nodeMap = new Map(nodes.map(n => [n.id, n]));

  // Connection logic:
  // 1. Farms -> Collection Centers & Mandis
  // 2. Collection Centers -> Processors, Institutional Buyers, & Mandis
  // 3. Mandis -> Processors, Institutional Buyers, Retailers
  // 4. Processors -> Institutional Buyers, Retailers
  // 5. Institutional Buyers -> Retailers

  const farms = nodes.filter(n => n.type === 'farm');
  const ccs = nodes.filter(n => n.type === 'collection_center');
  const mandis = nodes.filter(n => n.type === 'mandi');
  const procs = nodes.filter(n => n.type === 'processor');
  const insts = nodes.filter(n => n.type === 'institutional_buyer');
  const ret = nodes.filter(n => n.type === 'retail');

  let edgeCounter = 1;

  function addEdge(from: SupplyChainNode, to: SupplyChainNode, isCold: boolean = false) {
    const dist = calculateRoadDistanceKm(
      from.location.lat,
      from.location.lng,
      to.location.lat,
      to.location.lng
    );
    // Speed: 38 km/h for rural trucks, 50 km/h for highway
    const speed = dist > 60 ? 48 : 36;
    const timeHours = Math.round((dist / speed + 0.5) * 10) / 10; // +0.5h loading buffer
    const baseFreight = isCold ? 3.8 : 2.6; // ₹ per km per ton equivalent
    const roadQuality = dist > 70 ? 1.05 : 1.15;
    const toll = dist > 50 ? 180 : 0;
    const spoilageRisk = isCold ? 0.01 : (timeHours > 10 ? 0.08 : 0.03);

    edges.push({
      id: `edge-${edgeCounter++}`,
      fromNodeId: from.id,
      toNodeId: to.id,
      distanceKm: dist,
      travelTimeHours: timeHours,
      baseFreightPerKm: baseFreight,
      roadQualityFactor: roadQuality,
      tollAndInterstatePerTrip: toll,
      spoilageRiskBasePct: spoilageRisk,
      isColdChain: isCold,
    });
  }

  // Connect Farms to nearby CCs (< 65km) and nearby Mandis (< 60km)
  farms.forEach(f => {
    ccs.forEach(cc => {
      const d = calculateRoadDistanceKm(f.location.lat, f.location.lng, cc.location.lat, cc.location.lng);
      if (d <= 65) addEdge(f, cc, true);
    });
    mandis.forEach(m => {
      const d = calculateRoadDistanceKm(f.location.lat, f.location.lng, m.location.lat, m.location.lng);
      if (d <= 60 || m.id === 'mandi-06') addEdge(f, m, false); // m-06 is Delhi gateway transit
    });
  });

  // Connect CCs to Processors, Institutional Buyers, and Mandis
  ccs.forEach(cc => {
    procs.forEach(p => {
      const d = calculateRoadDistanceKm(cc.location.lat, cc.location.lng, p.location.lat, p.location.lng);
      if (d <= 90) addEdge(cc, p, true);
    });
    insts.forEach(ib => {
      const d = calculateRoadDistanceKm(cc.location.lat, cc.location.lng, ib.location.lat, ib.location.lng);
      if (d <= 100) addEdge(cc, ib, true);
    });
    mandis.forEach(m => {
      const d = calculateRoadDistanceKm(cc.location.lat, cc.location.lng, m.location.lat, m.location.lng);
      if (d <= 50) addEdge(cc, m, false);
    });
  });

  // Connect Mandis to Wholesalers/Processors/Institutional and Retailers
  mandis.forEach(m => {
    procs.forEach(p => {
      const d = calculateRoadDistanceKm(m.location.lat, m.location.lng, p.location.lat, p.location.lng);
      if (d <= 100) addEdge(m, p, false);
    });
    insts.forEach(ib => {
      const d = calculateRoadDistanceKm(m.location.lat, m.location.lng, ib.location.lat, ib.location.lng);
      if (d <= 80) addEdge(m, ib, false);
    });
    ret.forEach(r => {
      const d = calculateRoadDistanceKm(m.location.lat, m.location.lng, r.location.lat, r.location.lng);
      if (d <= 60) addEdge(m, r, false);
    });
  });

  // Connect Processors and Institutional Buyers to Retailers
  procs.forEach(p => {
    ret.forEach(r => {
      const d = calculateRoadDistanceKm(p.location.lat, p.location.lng, r.location.lat, r.location.lng);
      if (d <= 90) addEdge(p, r, true);
    });
  });

  insts.forEach(ib => {
    ret.forEach(r => {
      const d = calculateRoadDistanceKm(ib.location.lat, ib.location.lng, r.location.lat, r.location.lng);
      if (d <= 70) addEdge(ib, r, true);
    });
  });

  return edges;
}

export const PUNJAB_EDGES = generateSupplyChainEdges(PUNJAB_NODES);

// Default active demonstration lot: 5,000 kg Tomatoes at Gurmail Singh Farm, Nakodar
export const DEFAULT_CROP_LOT: CropLot = {
  id: 'lot-punjab-tomato-01',
  farmerId: 'farm-01',
  farmerName: 'Gurmail Singh (Nakodar, Jalandhar)',
  farmLocation: { lat: 31.1270, lng: 75.4740, district: 'Jalandhar', name: 'Nakodar Cluster' },
  crop: 'Tomato',
  quantityKg: 5000,
  harvestDate: 'Tomorrow (Early Morning)',
  maxTransitHours: 48,
  quality: 'A',
  availableOnFarmStorageKg: 1000,
  targetMarket: 'Open / Multi-channel Optimization',
};
