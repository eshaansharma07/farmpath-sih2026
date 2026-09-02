'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  Sliders, 
  RotateCcw, 
  TrendingUp, 
  Fuel, 
  Clock, 
  Flame, 
  DollarSign, 
  Package, 
  Building2, 
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { solveSupplyChainOptimization, DEFAULT_SIMULATION_CONDITIONS } from '../../lib/engine/optimizer';

export default function WhatIfSimulatorPage() {
  const { 
    cropLot, 
    updateCropLot, 
    conditions, 
    updateConditions, 
    resetConditions, 
    results, 
    nodes, 
    edges 
  } = useSimulation();

  // Keep a baseline snapshot of "BEFORE" (default baseline when page opened)
  const baselineResults = React.useMemo(() => {
    return solveSupplyChainOptimization(cropLot, DEFAULT_SIMULATION_CONDITIONS, nodes, edges);
  }, [cropLot, nodes, edges]);

  // Current results represent "AFTER" (live calculated from conditions)
  const currentOptimal = results.optimalRoute;
  const initialOptimal = baselineResults.optimalRoute;

  // Did the recommended route change?
  const hasRouteChanged = currentOptimal?.id !== initialOptimal?.id;

  // Derive dynamic explanation based on active condition shifts
  const dynamicReason = React.useMemo(() => {
    if (conditions.fuelPricePerLiter > 115) {
      return 'Higher diesel freight costs penalize long-distance transit corridors, shifting recommendation toward proximate processing or local Mandi.';
    }
    if (conditions.transitDelayHours >= 12) {
      return 'Severe road transit delays trigger exponential perishability decay, forcing the system to abandon long routes in favor of nearby cold-chain aggregators.';
    }
    if (conditions.ambientTemperatureC >= 38) {
      return 'Extreme summer ambient temperatures accelerate tomato respiration, rendering uncooled open trucks infeasible due to excessive spoilage.';
    }
    if (conditions.marketPriceMultiplier <= 0.8) {
      return 'Market price crash in wholesale APMC mandis causes distressed pricing; system redirects produce toward pre-contracted processing plants.';
    }
    if (conditions.buyerDemandMultiplier >= 1.3) {
      return 'Surging institutional buyer demand provides volume absorption and direct procurement premiums, prioritizing modern retail fulfillment.';
    }
    if (hasRouteChanged) {
      return 'Combination of altered parameters shifted the Pareto boundary, selecting an alternate route with superior net farmer realization.';
    }
    return 'Conditions remain within nominal operating tolerance; original optimal route maintains superior unit economics.';
  }, [conditions, hasRouteChanged]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Real-Time What-If Scenario Simulator
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Stress-test the system by manipulating real-world variables. Watch the optimization engine re-solve live.
          </p>
        </div>

        <button
          onClick={resetConditions}
          className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Reset to Nominal Defaults</span>
        </button>
      </div>

      {/* BEFORE vs AFTER Real-Time Comparison Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-white">Live Decision Shift Matrix</h3>
          </div>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
            hasRouteChanged 
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
          }`}>
            {hasRouteChanged ? 'ROUTE SHIFT DETECTED' : 'OPTIMAL ROUTE STABLE'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* BEFORE CARD */}
          <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Baseline (Nominal Conditions)
              </span>
              <span className="text-xs font-mono text-slate-400">₹95/L Fuel • 0h Delay</span>
            </div>
            <h4 className="text-sm font-black text-white line-clamp-1">
              {initialOptimal?.name}
            </h4>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Farmer Realization:</span>
              <span className="text-xl font-black text-slate-200">
                ₹{initialOptimal?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
              </span>
            </div>
          </div>

          {/* AFTER CARD */}
          <div className={`p-4 rounded-2xl border space-y-2 ${
            hasRouteChanged 
              ? 'bg-amber-950/30 border-amber-500/50' 
              : 'bg-emerald-950/30 border-emerald-500/50'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                hasRouteChanged ? 'text-amber-400' : 'text-emerald-400'
              }`}>
                Current Dynamic Solution (After Shift)
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">LIVE CALCULATION</span>
            </div>
            <h4 className="text-sm font-black text-white line-clamp-1">
              {currentOptimal?.name}
            </h4>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xs text-slate-400">Farmer Realization:</span>
              <span className={`text-xl font-black ${
                hasRouteChanged ? 'text-amber-300' : 'text-emerald-400'
              }`}>
                ₹{currentOptimal?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Natural Language Reason */}
        <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">FARMPATH Solver Assessment: </span>
            <span>{dynamicReason}</span>
          </div>
        </div>
      </div>

      {/* Interactive Controls & Sliders Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Environmental & Economic Stress Variables
          </h3>
          <p className="text-xs text-slate-500">
            Slide any control below to immediately watch the optimization algorithm re-solve.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
          {/* Slider 1: Fuel Cost */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Fuel className="w-4 h-4 text-amber-600" />
                <span>Diesel Fuel Price</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                ₹{conditions.fuelPricePerLiter.toFixed(0)} / L
              </span>
            </div>
            <input
              type="range"
              min="85"
              max="140"
              step="1"
              value={conditions.fuelPricePerLiter}
              onChange={e => updateConditions({ fuelPricePerLiter: Number(e.target.value) })}
              className="w-full accent-amber-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹85/L (Subsidized)</span>
              <span>₹95/L (Baseline)</span>
              <span>₹140/L (Crisis)</span>
            </div>
          </div>

          {/* Slider 2: Transport Delay */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Highway Transit Delay</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                +{conditions.transitDelayHours} Hours
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="24"
              step="2"
              value={conditions.transitDelayHours}
              onChange={e => updateConditions({ transitDelayHours: Number(e.target.value) })}
              className="w-full accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>+0h (Smooth)</span>
              <span>+12h (Bottleneck)</span>
              <span>+24h (Monsoon Block)</span>
            </div>
          </div>

          {/* Slider 3: Ambient Temperature */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Flame className="w-4 h-4 text-rose-600" />
                <span>Ambient Summer Heat</span>
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
              className="w-full accent-rose-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>20°C (Mild)</span>
              <span>32°C (Summer)</span>
              <span>45°C (Heatwave)</span>
            </div>
          </div>

          {/* Slider 4: Market Price Multiplier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <DollarSign className="w-4 h-4 text-emerald-600" />
                <span>Wholesale Spot Price Shock</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {Math.round(conditions.marketPriceMultiplier * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.6"
              max="1.5"
              step="0.05"
              value={conditions.marketPriceMultiplier}
              onChange={e => updateConditions({ marketPriceMultiplier: Number(e.target.value) })}
              className="w-full accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-40% (Glut Crash)</span>
              <span>100% (Normal)</span>
              <span>+50% (Scarcity Spike)</span>
            </div>
          </div>

          {/* Slider 5: Buyer Demand Surge */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <TrendingUp className="w-4 h-4 text-purple-600" />
                <span>Buyer Demand Volume Factor</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {Math.round(conditions.buyerDemandMultiplier * 100)}%
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={conditions.buyerDemandMultiplier}
              onChange={e => updateConditions({ buyerDemandMultiplier: Number(e.target.value) })}
              className="w-full accent-purple-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>50% (Sluggish)</span>
              <span>100% (Steady)</span>
              <span>200% (Festival Surge)</span>
            </div>
          </div>

          {/* Slider 6: Storage Cost Multiplier */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Building2 className="w-4 h-4 text-indigo-600" />
                <span>Warehouse / Storage Cost</span>
              </div>
              <span className="font-black text-slate-900 text-sm">
                {conditions.storageCostMultiplier.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.25"
              value={conditions.storageCostMultiplier}
              onChange={e => updateConditions({ storageCostMultiplier: Number(e.target.value) })}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>0.5x (Subsidized)</span>
              <span>1.0x (Standard)</span>
              <span>3.0x (Cold Storage Crunch)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
