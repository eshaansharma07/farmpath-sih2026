import { SupplyChainNode, SupplyChainEdge, CropLot, SimulationConditions, RouteCostBreakdown, EvaluatedRoute, OptimizationResult, CropType } from './types';
import { discoverCandidatePaths, CandidatePath } from './graph';
import { calculateExpectedSpoilagePct, getMaxAllowedSpoilagePct } from './spoilage';
import { PUNJAB_NODES, PUNJAB_EDGES } from '../data/punjabData';

// Price normalization factors per crop based on Punjab market baselines
const CROP_PRICE_SCALE: Record<string, number> = {
  Tomato: 1.0,
  Onion: 0.85,
  Potato: 0.65,
  Wheat: 0.78,
};

export const DEFAULT_SIMULATION_CONDITIONS: SimulationConditions = {
  fuelPricePerLiter: 95.0, // ₹95/L baseline
  transitDelayHours: 0.0,
  marketPriceMultiplier: 1.0,
  buyerDemandMultiplier: 1.0,
  ambientTemperatureC: 32.0, // Summer average Punjab
  storageCostMultiplier: 1.0,
  roadVibrationMultiplier: 1.0,
};

/**
 * Evaluates a single candidate path under current lot parameters and simulation conditions.
 */
export function evaluateCandidatePath(
  path: CandidatePath,
  cropLot: CropLot,
  conditions: SimulationConditions
): EvaluatedRoute {
  const { nodes, edges } = path;
  const destinationNode = nodes[nodes.length - 1];
  const quantity = cropLot.quantityKg;

  // 1. Transit and time physics
  const isColdChain = edges.some(e => e.isColdChain);
  const totalTransitHours = Math.round((path.totalTransitHours + conditions.transitDelayHours) * 10) / 10;
  const totalDistanceKm = path.totalDistanceKm;

  // 2. Pricing at destination (includes buyer quality discount for delayed arrivals)
  const cropScale = CROP_PRICE_SCALE[cropLot.crop] || 1.0;
  const baseOffer = destinationNode.baseOfferPricePerKg || 28.0;

  // Real-world perishable penalty: commercial buyers deduct 0.8% per hour delay due to lost shelf-life
  const isPerishable = cropLot.crop === 'Tomato';
  const delayDeductionPct = isPerishable 
    ? Math.min(0.28, (conditions.transitDelayHours || 0) * 0.009)
    : Math.min(0.08, (conditions.transitDelayHours || 0) * 0.002);

  const grossPricePerKg = Math.round(baseOffer * cropScale * conditions.marketPriceMultiplier * (1 - delayDeductionPct) * 100) / 100;

  // 3. Spoilage calculation
  const maxAllowedSpoilage = getMaxAllowedSpoilagePct(cropLot.crop);
  const expectedSpoilagePct = calculateExpectedSpoilagePct({
    crop: cropLot.crop,
    transitHours: totalTransitHours,
    ambientTempC: conditions.ambientTemperatureC,
    isColdChain,
    roadVibrationMultiplier: conditions.roadVibrationMultiplier,
  });
  const expectedSpoilageKg = Math.round(quantity * (expectedSpoilagePct / 100));
  const expectedSpoilageLossValue = Math.round(expectedSpoilageKg * grossPricePerKg);

  // 4. Logistics & Transport Costs
  // Real-world Punjab commercial trucking model (Tata 407 / Eicher 14-ft commercial rates):
  // Baseline diesel is ₹95/L.
  const fuelMultiplier = conditions.fuelPricePerLiter / 95.0;
  let transportCostTotal = 0;

  edges.forEach(e => {
    // Fixed vehicle placement & loading fee + distance-based running rate indexed to fuel
    const fixedDispatch = 1200 * (quantity / 5000);
    const runningRatePerKm = (18 + 10 * Math.min(2.0, quantity / 5000)) * Math.pow(fuelMultiplier, 1.4);
    const tripFreight = fixedDispatch + (e.distanceKm * runningRatePerKm * e.roadQualityFactor);
    transportCostTotal += Math.round(tripFreight + e.tollAndInterstatePerTrip);
  });
  const transportCostPerKg = Math.round((transportCostTotal / quantity) * 100) / 100;

  // 5. Handling Costs at intermediate hubs and destination
  let handlingCostTotal = 0;
  nodes.forEach(n => {
    handlingCostTotal += (n.handlingCostPerKg || 0.2) * quantity;
  });
  handlingCostTotal = Math.round(handlingCostTotal);
  const handlingCostPerKg = Math.round((handlingCostTotal / quantity) * 100) / 100;

  // 6. Storage & Climate Cooling Costs
  let storageCostTotal = 0;
  nodes.forEach(n => {
    const hours = n.processingTimeHours || 2;
    const days = hours / 24.0;
    storageCostTotal += (n.storageCostPerKgDay || 0.2) * days * quantity * conditions.storageCostMultiplier;
  });
  // Active refrigeration cooling power surcharge during summer heatwaves (>32°C)
  if (conditions.ambientTemperatureC > 32 && isColdChain) {
    const heatwavePowerCost = (conditions.ambientTemperatureC - 32) * 0.05 * quantity;
    storageCostTotal += Math.round(heatwavePowerCost);
  }
  storageCostTotal = Math.round(storageCostTotal);
  const storageCostPerKg = Math.round((storageCostTotal / quantity) * 100) / 100;

  // 7. Intermediary / APMC commissions (Arhatiya fee)
  let intermediaryCostTotal = 0;
  nodes.forEach(n => {
    if (n.intermediaryMarginPct && n.intermediaryMarginPct > 0) {
      intermediaryCostTotal += n.intermediaryMarginPct * (grossPricePerKg * quantity);
    }
  });
  intermediaryCostTotal = Math.round(intermediaryCostTotal);
  const intermediaryCostPerKg = Math.round((intermediaryCostTotal / quantity) * 100) / 100;

  // 8. Net Farmer Revenue
  const healthyDeliveredKg = Math.max(0, quantity - expectedSpoilageKg);
  const grossSaleValue = Math.round(healthyDeliveredKg * grossPricePerKg);
  const netFarmerPayout = Math.max(0, Math.round(grossSaleValue - transportCostTotal - handlingCostTotal - storageCostTotal - intermediaryCostTotal));
  const netFarmerRealizationPerKg = Math.round((netFarmerPayout / quantity) * 100) / 100;

  const costBreakdown: RouteCostBreakdown = {
    grossSaleValue,
    grossPricePerKg,
    transportCostTotal,
    transportCostPerKg,
    handlingCostTotal,
    handlingCostPerKg,
    storageCostTotal,
    storageCostPerKgDay: storageCostPerKg,
    storageCostPerKg,
    intermediaryCostTotal,
    intermediaryCostPerKg,
    expectedSpoilageKg,
    expectedSpoilagePct,
    expectedSpoilageLossValue,
    netFarmerPayout,
    netFarmerRealizationPerKg,
  } as any;

  // 9. Feasibility Constraints
  let isFeasible = true;
  let rejectionReason: string | undefined;

  // Constraint A: Shelf Life Delivery Window
  if (totalTransitHours > cropLot.maxTransitHours && cropLot.crop === 'Tomato') {
    isFeasible = false;
    rejectionReason = `Transit duration (${totalTransitHours}h) exceeds tomato maximum freshness shelf-life (${cropLot.maxTransitHours}h)`;
  }
  // Constraint B: Spoilage Cutoff
  else if (expectedSpoilagePct > maxAllowedSpoilage * 1.5) {
    isFeasible = false;
    rejectionReason = `Expected spoilage (${expectedSpoilagePct}%) exceeds buyer rejection threshold (${maxAllowedSpoilage * 1.5}%)`;
  }

  // Name construction
  const nodeNames = nodes.map(n => n.name.split('(')[0].trim());
  const routeName = `${nodeNames[0]} → ${nodeNames.slice(1).join(' → ')}`;

  return {
    id: `route-${nodes.map(n => n.id).join('-')}`,
    name: routeName,
    description: `Transit: ${totalTransitHours}h | Distance: ${totalDistanceKm} km | Net: ₹${netFarmerRealizationPerKg}/kg`,
    pathNodeIds: nodes.map(n => n.id),
    pathNodes: nodes,
    edges,
    totalDistanceKm,
    totalTransitHours,
    costBreakdown,
    isFeasible,
    rejectionReason,
    score: netFarmerRealizationPerKg,
    explainability: {
      priceAdvantagePerKg: 0,
      logisticsAdvantagePerKg: 0,
      spoilageAdvantagePerKg: 0,
      intermediarySavingsPerKg: 0,
      summary: '',
    },
  };
}

/**
 * Solves the constrained multi-echelon agricultural supply chain optimization problem.
 */
export function solveSupplyChainOptimization(
  cropLot: CropLot,
  conditions: SimulationConditions = DEFAULT_SIMULATION_CONDITIONS,
  nodes: SupplyChainNode[] = PUNJAB_NODES,
  edges: SupplyChainEdge[] = PUNJAB_EDGES
): OptimizationResult {
  // 1. Identify origin farm node
  const farmNode = nodes.find(n => n.id === cropLot.farmerId) || nodes.find(n => n.type === 'farm') || nodes[0];

  // 2. Discover candidate paths from origin
  const candidatePaths = discoverCandidatePaths(farmNode, nodes, edges);

  // 3. Evaluate each route
  const evaluatedRoutes = candidatePaths.map(path => evaluateCandidatePath(path, cropLot, conditions));

  // 4. Partition feasible vs rejected
  const feasibleRoutes = evaluatedRoutes.filter(r => r.isFeasible);
  const rejectedRoutes = evaluatedRoutes.filter(r => !r.isFeasible);

  const highLossRejected = rejectedRoutes.filter(r => r.rejectionReason?.includes('spoilage') || r.rejectionReason?.includes('freshness'));
  const economicallyInferior = rejectedRoutes.filter(r => !highLossRejected.includes(r));

  // 5. Rank feasible routes by Net Farmer Realization (Descending)
  feasibleRoutes.sort((a, b) => b.costBreakdown.netFarmerRealizationPerKg - a.costBreakdown.netFarmerRealizationPerKg);
  evaluatedRoutes.sort((a, b) => b.costBreakdown.netFarmerRealizationPerKg - a.costBreakdown.netFarmerRealizationPerKg);

  // 6. Find representative baseline route (Traditional Mandi Route: Farm -> Mandi -> Retailer)
  const baselineRoute = evaluatedRoutes.find(r => 
    r.pathNodes.some(n => n.type === 'mandi') && 
    r.pathNodes[r.pathNodes.length - 1].type === 'retail'
  ) || evaluatedRoutes.find(r => r.pathNodes.some(n => n.type === 'mandi')) || evaluatedRoutes[0];

  // 7. Determine optimal route
  const optimalRoute = feasibleRoutes.length > 0 ? feasibleRoutes[0] : evaluatedRoutes[0];

  // 8. Compute relative explainability for top shortlisted routes against baseline
  feasibleRoutes.slice(0, 5).forEach(route => {
    const priceAdv = Math.round((route.costBreakdown.grossPricePerKg - baselineRoute.costBreakdown.grossPricePerKg) * 100) / 100;
    const logisticsAdv = Math.round((baselineRoute.costBreakdown.transportCostPerKg - route.costBreakdown.transportCostPerKg) * 100) / 100;
    const spoilageAdv = Math.round(((baselineRoute.costBreakdown.expectedSpoilageLossValue - route.costBreakdown.expectedSpoilageLossValue) / cropLot.quantityKg) * 100) / 100;
    const intermediaryAdv = Math.round((baselineRoute.costBreakdown.intermediaryCostPerKg - route.costBreakdown.intermediaryCostPerKg) * 100) / 100;

    route.explainability = {
      priceAdvantagePerKg: priceAdv,
      logisticsAdvantagePerKg: logisticsAdv,
      spoilageAdvantagePerKg: spoilageAdv,
      intermediarySavingsPerKg: intermediaryAdv,
      summary: route.id === optimalRoute.id
        ? `Delivers highest net payout (₹${optimalRoute.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg) by cutting intermediary commissions and reducing transit spoilage.`
        : `Competitive alternative with ₹${route.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg net payout.`,
    };
  });

  const netRealizationImprovementPerKg = Math.max(
    0,
    Math.round((optimalRoute.costBreakdown.netFarmerRealizationPerKg - baselineRoute.costBreakdown.netFarmerRealizationPerKg) * 100) / 100
  );
  const totalLotValueGain = Math.round(netRealizationImprovementPerKg * cropLot.quantityKg);
  const spoilageReductionPct = Math.max(
    0,
    Math.round((baselineRoute.costBreakdown.expectedSpoilagePct - optimalRoute.costBreakdown.expectedSpoilagePct) * 10) / 10
  );
  const transitTimeReductionHours = Math.max(
    0,
    Math.round((baselineRoute.totalTransitHours - optimalRoute.totalTransitHours) * 10) / 10
  );

  return {
    candidateRoutesEvaluated: evaluatedRoutes.length,
    feasibleRoutesCount: feasibleRoutes.length,
    rejectedRoutesCount: rejectedRoutes.length,
    highLossRejectedCount: highLossRejected.length,
    economicallyInferiorCount: economicallyInferior.length,
    shortlistedCount: Math.min(3, feasibleRoutes.length),
    optimalRoute,
    baselineRoute,
    allRoutes: evaluatedRoutes,
    netRealizationImprovementPerKg,
    totalLotValueGain,
    spoilageReductionPct,
    transitTimeReductionHours,
  };
}
