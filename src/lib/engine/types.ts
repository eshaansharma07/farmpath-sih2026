export type NodeType = 
  | 'farm' 
  | 'collection_center' 
  | 'mandi' 
  | 'processor' 
  | 'institutional_buyer' 
  | 'retail';

export type CropType = 'Tomato' | 'Onion' | 'Potato' | 'Wheat';
export type QualityGrade = 'A' | 'B' | 'C';

export interface GeoLocation {
  lat: number;
  lng: number;
  district: string;
  name: string;
}

export interface SupplyChainNode {
  id: string;
  name: string;
  type: NodeType;
  location: GeoLocation;
  capacityKg: number;
  currentLoadKg: number;
  handlingCostPerKg: number;
  storageCostPerKgDay: number;
  processingTimeHours: number;
  buyerDemandKg?: number;
  baseOfferPricePerKg?: number; // Spot or contract offer price
  intermediaryMarginPct?: number; // e.g. 5% commission in Mandi
  contactPerson?: string;
  qualityPreference?: QualityGrade[];
}

export interface SupplyChainEdge {
  id: string;
  fromNodeId: string;
  toNodeId: string;
  distanceKm: number;
  travelTimeHours: number;
  baseFreightPerKm: number;
  roadQualityFactor: number; // 1.0 = smooth highway, 1.3 = congested / rough rural
  tollAndInterstatePerTrip: number;
  spoilageRiskBasePct: number;
  isColdChain: boolean;
}

export interface CropLot {
  id: string;
  farmerId: string;
  farmerName: string;
  farmLocation: GeoLocation;
  crop: CropType;
  quantityKg: number;
  harvestDate: string;
  maxTransitHours: number;
  quality: QualityGrade;
  availableOnFarmStorageKg: number;
  targetMarket?: string;
}

export interface SimulationConditions {
  fuelPricePerLiter: number; // default ₹95/L
  transitDelayHours: number; // default 0 hrs
  marketPriceMultiplier: number; // default 1.0 (100%)
  buyerDemandMultiplier: number; // default 1.0 (100%)
  ambientTemperatureC: number; // default 32°C
  storageCostMultiplier: number; // default 1.0
  roadVibrationMultiplier: number; // default 1.0
}

export interface RouteCostBreakdown {
  grossSaleValue: number;
  grossPricePerKg: number;
  transportCostTotal: number;
  transportCostPerKg: number;
  handlingCostTotal: number;
  handlingCostPerKg: number;
  storageCostTotal: number;
  storageCostPerKg: number;
  intermediaryCostTotal: number;
  intermediaryCostPerKg: number;
  expectedSpoilageKg: number;
  expectedSpoilagePct: number;
  expectedSpoilageLossValue: number;
  netFarmerPayout: number;
  netFarmerRealizationPerKg: number;
}

export interface EvaluatedRoute {
  id: string;
  name: string;
  description: string;
  pathNodeIds: string[];
  pathNodes: SupplyChainNode[];
  edges: SupplyChainEdge[];
  totalDistanceKm: number;
  totalTransitHours: number;
  costBreakdown: RouteCostBreakdown;
  isFeasible: boolean;
  rejectionReason?: string;
  score: number;
  explainability: {
    priceAdvantagePerKg: number;
    logisticsAdvantagePerKg: number;
    spoilageAdvantagePerKg: number;
    intermediarySavingsPerKg: number;
    summary: string;
  };
}

export interface OptimizationResult {
  candidateRoutesEvaluated: number;
  feasibleRoutesCount: number;
  rejectedRoutesCount: number;
  highLossRejectedCount: number;
  economicallyInferiorCount: number;
  shortlistedCount: number;
  optimalRoute: EvaluatedRoute | null;
  baselineRoute: EvaluatedRoute | null; // Traditional Mandi route
  allRoutes: EvaluatedRoute[];
  netRealizationImprovementPerKg: number;
  totalLotValueGain: number;
  spoilageReductionPct: number;
  transitTimeReductionHours: number;
}
