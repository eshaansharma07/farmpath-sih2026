import { EvaluatedRoute, OptimizationResult, CropLot } from './types';

export interface WaterfallStep {
  label: string;
  amountPerKg: number;
  totalAmount: number;
  type: 'base' | 'positive' | 'negative' | 'total';
  description: string;
}

export interface ExplainabilityReport {
  optimalRouteName: string;
  baselineRouteName: string;
  headlineSummary: string;
  waterfallSteps: WaterfallStep[];
  rejectedAnalysis: {
    totalEvaluated: number;
    totalFeasible: number;
    totalRejected: number;
    reasons: {
      category: string;
      count: number;
      sampleRoute: string;
      rationale: string;
    }[];
  };
  keyDrivers: {
    title: string;
    impactPerKg: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    explanation: string;
  }[];
}

export function generateExplainabilityReport(
  result: OptimizationResult,
  lot: CropLot
): ExplainabilityReport {
  const { optimalRoute, baselineRoute } = result;

  if (!optimalRoute || !baselineRoute) {
    return {
      optimalRouteName: 'N/A',
      baselineRouteName: 'N/A',
      headlineSummary: 'Simulation in progress or no feasible routes found.',
      waterfallSteps: [],
      rejectedAnalysis: { totalEvaluated: 0, totalFeasible: 0, totalRejected: 0, reasons: [] },
      keyDrivers: [],
    };
  }

  const optCost = optimalRoute.costBreakdown;
  const baseCost = baselineRoute.costBreakdown;
  const qty = lot.quantityKg;

  // Baseline Net Realization
  const baseRealization = baseCost.netFarmerRealizationPerKg;
  const optRealization = optCost.netFarmerRealizationPerKg;

  // Deltas
  const priceDelta = Math.round((optCost.grossPricePerKg - baseCost.grossPricePerKg) * 100) / 100;
  const transportSavings = Math.round((baseCost.transportCostPerKg - optCost.transportCostPerKg) * 100) / 100;
  const handlingSavings = Math.round((baseCost.handlingCostPerKg - optCost.handlingCostPerKg) * 100) / 100;
  const intermediarySavings = Math.round((baseCost.intermediaryCostPerKg - optCost.intermediaryCostPerKg) * 100) / 100;
  const spoilageSavings = Math.round(((baseCost.expectedSpoilageLossValue - optCost.expectedSpoilageLossValue) / qty) * 100) / 100;

  const waterfallSteps: WaterfallStep[] = [
    {
      label: 'Baseline Mandi Realization',
      amountPerKg: baseRealization,
      totalAmount: Math.round(baseRealization * qty),
      type: 'base',
      description: 'Current conventional payout at local APMC mandi channel',
    },
    {
      label: 'Direct Buyer Price Delta',
      amountPerKg: priceDelta,
      totalAmount: Math.round(priceDelta * qty),
      type: priceDelta >= 0 ? 'positive' : 'negative',
      description: priceDelta >= 0 ? 'Higher contracted rate offered at direct processing/retail hub' : 'Slightly lower headline price offset by other savings',
    },
    {
      label: 'Intermediary Fee Elimination',
      amountPerKg: intermediarySavings,
      totalAmount: Math.round(intermediarySavings * qty),
      type: intermediarySavings >= 0 ? 'positive' : 'negative',
      description: 'Bypassing Arhatiya commission (6-8.5%), market cess, and multi-tier trader markups',
    },
    {
      label: 'Spoilage Loss Avoidance',
      amountPerKg: spoilageSavings,
      totalAmount: Math.round(spoilageSavings * qty),
      type: spoilageSavings >= 0 ? 'positive' : 'negative',
      description: `Reduced decay (${optCost.expectedSpoilagePct}% vs ${baseCost.expectedSpoilagePct}%) from faster cold/pre-cooled transit`,
    },
    {
      label: 'Transport & Freight Delta',
      amountPerKg: transportSavings,
      totalAmount: Math.round(transportSavings * qty),
      type: transportSavings >= 0 ? 'positive' : 'negative',
      description: transportSavings >= 0 ? 'Shorter or more consolidated truck route' : 'Higher freight mileage justified by higher destination payout',
    },
    {
      label: 'Handling & Storage Delta',
      amountPerKg: handlingSavings,
      totalAmount: Math.round(handlingSavings * qty),
      type: handlingSavings >= 0 ? 'positive' : 'negative',
      description: 'Fewer physical touchpoints between farmgate and end buyer',
    },
    {
      label: 'FARMPATH Optimized Realization',
      amountPerKg: optRealization,
      totalAmount: Math.round(optRealization * qty),
      type: 'total',
      description: `Net outcome delivering +₹${(optRealization - baseRealization).toFixed(2)}/kg (+${((optRealization - baseRealization) / baseRealization * 100).toFixed(1)}%)`,
    },
  ];

  // Analyze rejected routes
  const rejectedRoutes = result.allRoutes.filter(r => !r.isFeasible);
  const spoilageRejections = rejectedRoutes.filter(r => r.rejectionReason?.toLowerCase().includes('spoilage'));
  const windowRejections = rejectedRoutes.filter(r => r.rejectionReason?.toLowerCase().includes('transit time'));
  const capacityRejections = rejectedRoutes.filter(r => r.rejectionReason?.toLowerCase().includes('capacity'));
  const viabilityRejections = rejectedRoutes.filter(r => r.rejectionReason?.toLowerCase().includes('viability') || r.rejectionReason?.toLowerCase().includes('floor'));

  const reasons = [
    {
      category: 'Perishability / Spoilage Threshold Exceeded',
      count: spoilageRejections.length,
      sampleRoute: spoilageRejections[0]?.name || 'Long haul uncooled route',
      rationale: 'Transit duration under prevailing heat caused expected spoilage to exceed the safety limit (>10%).',
    },
    {
      category: 'Delivery Window Exceeded',
      count: windowRejections.length,
      sampleRoute: windowRejections[0]?.name || 'Multi-stop circuitous route',
      rationale: 'Cumulative transit and handling hours exceeded farmer specified maximum freshness window.',
    },
    {
      category: 'Buyer Absorption Capacity Insufficient',
      count: capacityRejections.length,
      sampleRoute: capacityRejections[0]?.name || 'Local small-format retailer',
      rationale: 'Buyer daily procurement quota cannot absorb the 5,000 kg lot without distress discounting.',
    },
    {
      category: 'Economic Deficit / Sub-Viability',
      count: viabilityRejections.length,
      sampleRoute: viabilityRejections[0]?.name || 'High-toll interstate broker',
      rationale: 'Excessive freight and intermediate handling costs rendered net farmer realization below viability floor.',
    },
  ].filter(r => r.count > 0);

  const headlineSummary = `${optimalRoute.name.split('→')[1]?.trim() || 'Optimized Channel'} achieves the highest net return (+₹${(optRealization - baseRealization).toFixed(2)}/kg) primarily through ${intermediarySavings > 1.5 ? 'direct disintermediation of mandi commissions' : 'spoilage mitigation'} and ${priceDelta >= 0 ? 'contract value addition' : 'reduced logistics loss'}.`;

  const keyDrivers = [
    {
      title: 'Intermediary Disintermediation',
      impactPerKg: `+₹${intermediarySavings.toFixed(2)}/kg`,
      sentiment: intermediarySavings >= 0 ? ('positive' as const) : ('negative' as const),
      explanation: 'Direct delivery to processing/institutional terminal eliminates APMC market cess and traditional Arhatiya commission.',
    },
    {
      title: 'Perishability Spoilage Mitigation',
      impactPerKg: `+₹${spoilageSavings.toFixed(2)}/kg`,
      sentiment: spoilageSavings >= 0 ? ('positive' as const) : ('negative' as const),
      explanation: `Reduces post-harvest loss from ${baseCost.expectedSpoilagePct}% to ${optCost.expectedSpoilagePct}%, preserving ${baseCost.expectedSpoilageKg - optCost.expectedSpoilageKg} kg of saleable produce.`,
    },
    {
      title: 'Gross Buyer Offer Differential',
      impactPerKg: `${priceDelta >= 0 ? '+' : ''}₹${priceDelta.toFixed(2)}/kg`,
      sentiment: priceDelta >= 0 ? ('positive' as const) : ('negative' as const),
      explanation: `Destination purchase price of ₹${optCost.grossPricePerKg.toFixed(2)}/kg vs ₹${baseCost.grossPricePerKg.toFixed(2)}/kg conventional baseline.`,
    },
    {
      title: 'Net Freight & Handling Impact',
      impactPerKg: `${(transportSavings + handlingSavings) >= 0 ? '+' : ''}₹${(transportSavings + handlingSavings).toFixed(2)}/kg`,
      sentiment: (transportSavings + handlingSavings) >= 0 ? ('positive' as const) : ('negative' as const),
      explanation: 'Optimized routing balances transport mileage against multi-touch transfer costs.',
    },
  ];

  return {
    optimalRouteName: optimalRoute.name,
    baselineRouteName: baselineRoute.name,
    headlineSummary,
    waterfallSteps,
    rejectedAnalysis: {
      totalEvaluated: result.candidateRoutesEvaluated,
      totalFeasible: result.feasibleRoutesCount,
      totalRejected: result.rejectedRoutesCount,
      reasons,
    },
    keyDrivers,
  };
}
