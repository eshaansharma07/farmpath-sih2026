import { SimulationConditions, CropLot } from '../engine/types';

export interface PredefinedScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  initialConditionsSummary: string;
  conditions: Partial<SimulationConditions>;
  lotModifications?: Partial<CropLot>;
  expectedShiftDescription: string;
  whyRouteChanged: string;
  economicImpactSummary: string;
}

export const PREDEFINED_SCENARIOS: PredefinedScenario[] = [
  {
    id: 'scenario-1',
    title: 'Mandi Tomato Oversupply Glut',
    badge: 'Market Price Shock',
    description: 'Bumper harvest in Malwa & Doaba regions causes local APMC mandi wholesale prices to crash by 28%. Conventional mandi farmers face distress selling.',
    initialConditionsSummary: 'Mandi price dropped to 0.72x multiplier; fuel ₹95/L; ambient temp 32°C.',
    conditions: {
      marketPriceMultiplier: 0.72,
      fuelPricePerLiter: 95.0,
      transitDelayHours: 0,
      ambientTemperatureC: 32.0,
      storageCostMultiplier: 1.0,
    },
    expectedShiftDescription: 'System bypasses APMC Mandi and redirects 5,000 kg lot directly to Pagro Foods / Cremica Agro-Processor with contract pricing floor.',
    whyRouteChanged: 'Agro-processing contract pricing is immune to local mandi spot collapse, yielding +₹6.40/kg higher net realization despite slightly higher sorting standards.',
    economicImpactSummary: 'Farmer avoids ₹28,000 loss from mandi price crash; realizes ₹23.40/kg vs ₹15.80/kg in crashed mandi.',
  },
  {
    id: 'scenario-2',
    title: 'Diesel Fuel Price Spike (₹125/L)',
    badge: 'Energy Shock',
    description: 'Global oil price surge pushes diesel from ₹95/L to ₹125/L (+31.5%). Long-haul freight rates jump significantly across highway corridors.',
    initialConditionsSummary: 'Fuel ₹125/L; standard market prices; ambient temp 32°C.',
    conditions: {
      fuelPricePerLiter: 125.0,
      marketPriceMultiplier: 1.0,
      transitDelayHours: 0,
      ambientTemperatureC: 32.0,
      storageCostMultiplier: 1.0,
    },
    expectedShiftDescription: 'System shifts from distant inter-district processor to high-density local collection center & Jalandhar urban institutional hub.',
    whyRouteChanged: 'Longer 95km haul to distant plants incurs ₹1.80/kg higher freight burden under ₹125/L diesel, making closer regional aggregation nodes economically superior.',
    economicImpactSummary: 'Minimizes freight bill by ₹3,850 while preserving ₹24.10/kg net farmer realization.',
  },
  {
    id: 'scenario-3',
    title: 'Monsoon Flooding & Highway Transit Delay (+18h)',
    badge: 'Perishability Emergency',
    description: 'Heavy rain causes highway waterlogging on NH-44, inducing an 18-hour transport standstill under 34°C humid weather.',
    initialConditionsSummary: 'Transit delay +18 hrs; ambient temp 34°C; road vibration 1.4x.',
    conditions: {
      transitDelayHours: 18.0,
      ambientTemperatureC: 34.0,
      roadVibrationMultiplier: 1.4,
      marketPriceMultiplier: 1.0,
      fuelPricePerLiter: 95.0,
    },
    expectedShiftDescription: 'System immediately eliminates 14 long-distance routes due to severe spoilage (>12%) and routes to nearest cold-chain pre-cooling packhouse.',
    whyRouteChanged: 'Standard open trucks face catastrophic 15.4% rotting under 18h monsoon delay. The pre-cooling collection hub preserves crop integrity with under 4.1% loss.',
    economicImpactSummary: 'Saves 565 kg of tomatoes from rotting; preserves ₹14,200 in crop value for the farmer.',
  },
  {
    id: 'scenario-4',
    title: 'Supermarket / Quick-Commerce Demand Surge',
    badge: 'Demand Surge',
    description: 'Festival season surges urban quick-commerce and retail chain demand by +40%. Institutional buyers offer premium forward-contract rates.',
    initialConditionsSummary: 'Buyer demand 1.4x; market price +15%; priority dispatch.',
    conditions: {
      buyerDemandMultiplier: 1.4,
      marketPriceMultiplier: 1.15,
      fuelPricePerLiter: 95.0,
      transitDelayHours: 0,
      ambientTemperatureC: 30.0,
    },
    expectedShiftDescription: 'System prioritizes direct scheduled delivery to Reliance Fresh / Blinkit Dark Store Master Hub with guaranteed fast offloading.',
    whyRouteChanged: 'Institutional buyer absorbs entire lot with zero mandi commission (0% vs 8.5%), fast 2h turn-around, and ₹33.20/kg purchase premium.',
    economicImpactSummary: 'Maximizes lot revenue to ₹138,500 (+₹38,000 gain over traditional commission mandi).',
  },
  {
    id: 'scenario-5',
    title: 'Cold Storage Capacity Shortage',
    badge: 'Infrastructure Bottleneck',
    description: 'Regional cold storage breakdown triples intermediate holding fees and eliminates multi-day holding capacity.',
    initialConditionsSummary: 'Storage cost 3.0x multiplier; perishable buffer restricted to 24h.',
    conditions: {
      storageCostMultiplier: 3.0,
      ambientTemperatureC: 33.0,
      marketPriceMultiplier: 1.0,
      fuelPricePerLiter: 95.0,
    },
    expectedShiftDescription: 'System selects a lean, just-in-time direct transit path to Del Monte processing facility, completely bypassing intermediate storage yards.',
    whyRouteChanged: 'Eliminates staging yard storage charges (saving ₹1.45/kg) and minimizes cumulative handling touches from 4 to 2.',
    economicImpactSummary: 'Saves ₹7,250 in unnecessary storage and multi-touch handling costs.',
  },
];
