'use client';

import React from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  Sliders, 
  RotateCcw, 
  TrendingUp, 
  Fuel, 
  Clock, 
  Flame, 
  DollarSign, 
  Building2, 
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Tractor
} from 'lucide-react';
import { solveSupplyChainOptimization, DEFAULT_SIMULATION_CONDITIONS } from '../../lib/engine/optimizer';

export default function WhatIfSimulatorPage() {
  const { 
    cropLot, 
    conditions, 
    updateConditions, 
    resetConditions, 
    results, 
    nodes, 
    edges 
  } = useSimulation();

  // Baseline snapshot (what normal conditions look like)
  const baselineResults = React.useMemo(() => {
    return solveSupplyChainOptimization(cropLot, DEFAULT_SIMULATION_CONDITIONS, nodes, edges);
  }, [cropLot, nodes, edges]);

  const currentOptimal = results.optimalRoute;
  const initialOptimal = baselineResults.optimalRoute;

  const hasRouteChanged = currentOptimal?.id !== initialOptimal?.id;

  // Human, simple farmer-friendly advice
  const farmerFriendlyAdvice = React.useMemo(() => {
    if (conditions.fuelPricePerLiter > 115) {
      return `Diesel is expensive at ₹${conditions.fuelPricePerLiter}/L today, so truck travel costs more. We automatically picked a closer buyer so you don't waste your earnings on diesel fuel.`;
    }
    if (conditions.transitDelayHours >= 12) {
      return `There is a heavy road delay of +${conditions.transitDelayHours} hours. We rerouted your truck to a nearby cold storage hub so your tomatoes stay fresh and do not rot in the heat.`;
    }
    if (conditions.ambientTemperatureC >= 38) {
      return `It is a hot day (${conditions.ambientTemperatureC}°C). Produce spoils quickly in open tractors, so our route uses a pre-cooling cold hub to protect your crop quality.`;
    }
    if (conditions.marketPriceMultiplier <= 0.8) {
      return `Mandi auction rates have dropped today. Instead of selling in a falling mandi, we send your crop to a food processing company with a fixed pre-agreed price.`;
    }
    if (conditions.buyerDemandMultiplier >= 1.3) {
      return `Supermarkets and processing factories are buying in bulk today. We connected your truck to direct modern retail buyers paying top rupee.`;
    }
    if (hasRouteChanged) {
      return `Because conditions changed, we found a different route that puts more cash in your hand than the default path.`;
    }
    return `Roads are smooth and conditions are normal. Selling directly to the processing plant gives you the highest profit with ₹0 middleman cut.`;
  }, [conditions, hasRouteChanged]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Tractor className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Farmer&apos;s Profit Calculator &amp; Route Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            See how everyday changes in diesel price, traffic delay, or summer heat affect your take-home cash.
          </p>
        </div>

        <button
          onClick={resetConditions}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Normal Day (₹95 Diesel, 30°C)</span>
        </button>
      </div>

      {/* BEFORE vs AFTER Real-Time Comparison Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Best Route for Your Crop Right Now</h3>
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            hasRouteChanged 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {hasRouteChanged ? '🔄 REROUTED FOR HIGHER PROFIT' : '✓ BEST ROUTE LOCKED IN'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Normal Baseline */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Normal Day (Baseline)
              </span>
              <span className="text-xs font-mono text-slate-400">₹95/L Fuel • Smooth Roads</span>
            </div>
            <h4 className="text-sm font-black text-white line-clamp-1">
              {initialOptimal?.name}
            </h4>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Farmer Takes Home:</span>
              <span className="text-xl font-black text-slate-200">
                ₹{initialOptimal?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)} / kg
              </span>
            </div>
          </div>

          {/* Current Live Output */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            hasRouteChanged 
              ? 'bg-amber-950/30 border-amber-500/50' 
              : 'bg-emerald-950/30 border-emerald-500/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                hasRouteChanged ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                Updated Route (With Your Sliders)
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">CALCULATED LIVE</span>
            </div>
            <h4 className="text-sm font-black text-white line-clamp-1">
              {currentOptimal?.name}
            </h4>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Farmer Takes Home:</span>
              <span className={`text-xl font-black ${
                hasRouteChanged ? 'text-amber-300' : 'text-emerald-400'
              }`}>
                ₹{currentOptimal?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)} / kg
              </span>
            </div>
          </div>
        </div>

        {/* Human Friendly Advice */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Advice for the Farmer: </span>
            <span>{farmerFriendlyAdvice}</span>
          </div>
        </div>
      </div>

      {/* Interactive Sliders Grid in Plain English */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Adjust Everyday Road &amp; Market Conditions
          </h3>
          <p className="text-xs text-slate-500">
            Move any slider below to see how changes on the road or at the market affect your final payout:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {/* Slider 1: Fuel Cost */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Fuel className="w-4 h-4 text-amber-600" />
                <span>Diesel Price at Pump</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                ₹{conditions.fuelPricePerLiter.toFixed(0)} / Liter
              </span>
            </div>
            <input
              type="range"
              min="85"
              max="140"
              step="1"
              value={conditions.fuelPricePerLiter}
              onChange={e => updateConditions({ fuelPricePerLiter: Number(e.target.value) })}
              className="w-full accent-amber-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹85 (Cheaper)</span>
              <span>₹95 (Normal)</span>
              <span>₹140 (Expensive)</span>
            </div>
          </div>

          {/* Slider 2: Transport Delay */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Road Delay / Traffic Jam</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                +{conditions.transitDelayHours} Hours Delay
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="2"
              value={conditions.transitDelayHours}
              onChange={e => updateConditions({ transitDelayHours: Number(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0h (Clear Road)</span>
              <span>6h (Traffic Jam)</span>
              <span>24h (Monsoon Flood)</span>
            </div>
          </div>

          {/* Slider 3: Ambient Temperature */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Outside Air Temperature</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {conditions.ambientTemperatureC}°C
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="45"
              step="1"
              value={conditions.ambientTemperatureC}
              onChange={e => updateConditions({ ambientTemperatureC: Number(e.target.value) })}
              className="w-full accent-rose-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>20°C (Pleasant)</span>
              <span>32°C (Summer)</span>
              <span>45°C (Extreme Heat)</span>
            </div>
          </div>

          {/* Slider 4: Market Price Multiplier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Mandi Tomato Market Rate</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {Math.round(conditions.marketPriceMultiplier * 100)}% of Normal
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.5"
              step="0.05"
              value={conditions.marketPriceMultiplier}
              onChange={e => updateConditions({ marketPriceMultiplier: Number(e.target.value) })}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-40% (Rate Crash)</span>
              <span>100% (Normal Rate)</span>
              <span>+50% (High Price)</span>
            </div>
          </div>

          {/* Slider 5: Buyer Demand Surge */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Buyer Demand at Factory</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {Math.round(conditions.buyerDemandMultiplier * 100)}% Demand
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={conditions.buyerDemandMultiplier}
              onChange={e => updateConditions({ buyerDemandMultiplier: Number(e.target.value) })}
              className="w-full accent-purple-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50% (Slow Buying)</span>
              <span>100% (Steady)</span>
              <span>200% (Festival Rush)</span>
            </div>
          </div>

          {/* Slider 6: Storage Cost Multiplier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Cold Storage Rent</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {conditions.storageCostMultiplier.toFixed(1)}x Normal Rent
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={conditions.storageCostMultiplier}
              onChange={e => updateConditions({ storageCostMultiplier: Number(e.target.value) })}
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.5x (Govt Subsidy)</span>
              <span>1.0x (Normal Rent)</span>
              <span>3.0x (Peak Season)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
