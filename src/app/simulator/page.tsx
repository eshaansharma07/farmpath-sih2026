'use client';

import React, { useState } from 'react';
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
  Tractor,
  Snowflake,
  ShieldCheck,
  AlertTriangle,
  Info,
  ArrowRight
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

  // Baseline snapshot (what normal conditions look like)
  const baselineResults = React.useMemo(() => {
    return solveSupplyChainOptimization(cropLot, DEFAULT_SIMULATION_CONDITIONS, nodes, edges);
  }, [cropLot, nodes, edges]);

  const currentOptimal = results.optimalRoute;
  const initialOptimal = baselineResults.optimalRoute;

  const hasRouteChanged = currentOptimal?.id !== initialOptimal?.id;

  // Active knowledge card tab
  const [activeKnowledgeTab, setActiveKnowledgeTab] = useState<'diesel' | 'coldchain' | 'insurance'>('diesel');

  // Exact real-world fuel calculations
  const baselineDiesel = 95;
  const currentDiesel = conditions.fuelPricePerLiter;
  const dieselDiff = currentDiesel - baselineDiesel;
  const baselineTransportPerKg = initialOptimal?.costBreakdown.transportCostPerKg || 1.45;
  const currentTransportPerKg = currentOptimal?.costBreakdown.transportCostPerKg || 1.45;
  const transportDiffPerKg = Math.round((currentTransportPerKg - baselineTransportPerKg) * 100) / 100;
  const totalExtraFuelCost = Math.round(Math.abs(transportDiffPerKg) * cropLot.quantityKg);

  // Human, simple farmer-friendly advice
  const farmerFriendlyAdvice = React.useMemo(() => {
    if (dieselDiff > 25 && conditions.ambientTemperatureC > 38) {
      return `Extreme double shock! Diesel is +₹${dieselDiff}/L and heat is ${conditions.ambientTemperatureC}°C. FARMPATH actively pre-cools at Doaba Cold Hub to prevent a -₹40,000 rot disaster while pooling reefer trucks!`;
    }
    if (dieselDiff > 20) {
      return `Diesel is high (+₹${dieselDiff}/L). Driving far burns money. Notice how FARMPATH redirects Gurmail to Doaba Cold Hub (just 12 km away) to pool logistics rather than driving solo to distant mandis!`;
    }
    if (conditions.ambientTemperatureC >= 40) {
      return `Extreme heatwave (${conditions.ambientTemperatureC}°C). Open tractors will lose 40% of harvest to sun rot in mandi queues. FARMPATH locks in pre-cooling to guarantee 0% spoilage.`;
    }
    if (conditions.transitDelayHours >= 12) {
      return `Heavy ${conditions.transitDelayHours}h traffic delay. Produce held at chilled temperatures survives indefinitely, whereas mandi-bound tractors decompose on the highway.`;
    }
    if (hasRouteChanged) {
      return `Notice how the route dynamically rerouted to preserve maximum farmer margin as your conditions changed!`;
    }
    return `Conditions are stable. Direct delivery under APMC Section 40 provides Gurmail with highest net realization.`;
  }, [conditions, hasRouteChanged, dieselDiff]);

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

      {/* 🌾 COMMODITY & HARVEST LOT QUICK SELECTOR */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-xl font-bold shadow-xs">
            {cropLot.crop === 'Tomato' ? '🍅' : cropLot.crop === 'Onion' ? '🧅' : '🥔'}
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Harvest Lot Being Optimized:
            </span>
            <div className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>{cropLot.farmerName}&apos;s {cropLot.crop} Lot</span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                {cropLot.quantityKg.toLocaleString()} kg ({cropLot.maxTransitHours}h shelf limit)
              </span>
            </div>
          </div>
        </div>

        {/* 3 Quick Switcher Buttons */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1 hidden sm:inline">Switch Commodity:</span>
          
          <button
            type="button"
            onClick={() => updateCropLot({ crop: 'Tomato', quantityKg: 5000, maxTransitHours: 48 })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              cropLot.crop === 'Tomato'
                ? 'bg-rose-600 text-white shadow-xs ring-2 ring-rose-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>🍅 Tomato</span>
            <span className="text-[10px] opacity-80">(5,000 kg)</span>
          </button>

          <button
            type="button"
            onClick={() => updateCropLot({ crop: 'Onion', quantityKg: 5000, maxTransitHours: 72 })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              cropLot.crop === 'Onion'
                ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>🧅 Onion</span>
            <span className="text-[10px] opacity-80">(5,000 kg)</span>
          </button>

          <button
            type="button"
            onClick={() => updateCropLot({ crop: 'Potato', quantityKg: 10000, maxTransitHours: 120 })}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              cropLot.crop === 'Potato'
                ? 'bg-emerald-600 text-white shadow-xs ring-2 ring-emerald-300'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>🥔 Potato</span>
            <span className="text-[10px] opacity-80">(10,000 kg)</span>
          </button>
        </div>
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

      {/* ⚡ REAL-TIME DIESEL REALITY CHECK BANNER */}
      {dieselDiff !== 0 && (
        <div className={`p-4 rounded-2xl border-2 text-xs leading-relaxed flex flex-wrap items-center justify-between gap-4 transition-all shadow-sm ${
          dieselDiff > 0 
            ? 'bg-amber-50 border-amber-400 text-amber-950'
            : 'bg-emerald-50 border-emerald-400 text-emerald-950'
        }`}>
          <div className="flex items-center gap-3.5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-xs ${
              dieselDiff > 0 ? 'bg-amber-500 text-slate-950' : 'bg-emerald-500 text-slate-950'
            }`}>
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-sm flex items-center gap-2">
                <span className={dieselDiff > 0 ? 'text-amber-950' : 'text-emerald-950'}>
                  {dieselDiff > 0 ? '⛽ Diesel Price Increase Alert' : '⛽ Diesel Price Discount'}
                </span>
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase font-mono ${
                  dieselDiff > 0 ? 'bg-amber-200 text-amber-900 border border-amber-300' : 'bg-emerald-200 text-emerald-900 border border-emerald-300'
                }`}>
                  {dieselDiff > 0 ? `+₹${dieselDiff}/L Above Baseline` : `₹${Math.abs(dieselDiff)}/L Savings`}
                </span>
              </div>
              <p className={`text-xs mt-1 leading-relaxed ${dieselDiff > 0 ? 'text-amber-900' : 'text-emerald-900'}`}>
                {dieselDiff > 0 ? (
                  <>
                    Higher diesel <strong className="text-amber-950 font-black">ALWAYS reduces farmer profit</strong> by burning more fuel. Transport costs jumped from ₹{baselineTransportPerKg.toFixed(2)}/kg to ₹{currentTransportPerKg.toFixed(2)}/kg (eating <strong className="text-amber-950 font-mono font-black bg-amber-200/90 px-1.5 py-0.5 rounded border border-amber-300">₹{totalExtraFuelCost.toLocaleString()}</strong> on your {cropLot.quantityKg.toLocaleString()} kg lot). FARMPATH prevents worse losses by selecting closer buyers!
                  </>
                ) : (
                  <>
                    Cheaper fuel reduces transport costs to ₹{currentTransportPerKg.toFixed(2)}/kg, saving you <strong className="text-emerald-950 font-mono font-black bg-emerald-200/90 px-1.5 py-0.5 rounded border border-emerald-300">₹{totalExtraFuelCost.toLocaleString()}</strong> on road travel.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* 📚 INTERACTIVE REAL-WORLD KNOWLEDGE SECTION FOR JUDGES & FARMERS */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
              <Info className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base sm:text-lg text-white">
                The Real-World Economics: How Diesel &amp; Cold Storage Actually Work
              </h3>
              <p className="text-xs text-slate-400">
                Click the 3 tabs below to understand how FARMPATH models real agricultural economics for farmers:
              </p>
            </div>
          </div>
        </div>

        {/* 3 Interactive Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          <button
            onClick={() => setActiveKnowledgeTab('diesel')}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              activeKnowledgeTab === 'diesel'
                ? 'bg-amber-950 border-amber-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Fuel className="w-4 h-4 text-amber-400 shrink-0" />
            <div className="truncate">
              <span className="block truncate">1. The Diesel Truth</span>
              <span className="text-[10px] opacity-70 font-normal">Why profit drops with diesel</span>
            </div>
          </button>

          <button
            onClick={() => setActiveKnowledgeTab('coldchain')}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              activeKnowledgeTab === 'coldchain'
                ? 'bg-blue-950 border-blue-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <Snowflake className="w-4 h-4 text-blue-400 shrink-0" />
            <div className="truncate">
              <span className="block truncate">2. Reefer Chiller AC</span>
              <span className="text-[10px] opacity-70 font-normal">Cooling burns 2-3L fuel/hr</span>
            </div>
          </button>

          <button
            onClick={() => setActiveKnowledgeTab('insurance')}
            className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
              activeKnowledgeTab === 'insurance'
                ? 'bg-emerald-950 border-emerald-500 text-white font-bold shadow-xs'
                : 'bg-slate-800/60 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <div className="truncate">
              <span className="block truncate">3. Cold Storage as Insurance</span>
              <span className="text-[10px] opacity-70 font-normal">Prevents ₹40,000 rot wipeout</span>
            </div>
          </button>
        </div>

        {/* Tab 1 Content: The Diesel Truth */}
        {activeKnowledgeTab === 'diesel' && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertTriangle className="w-4 h-4" />
              <span>Does increasing diesel price increase profit? NO — It ALWAYS cuts profit!</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              When diesel goes up from <strong>₹95/L to ₹135/L</strong>, the truck transporter charges more per kilometer. On the same delivery route:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-semibold">At ₹95/L Normal Diesel:</span>
                <span className="text-slate-200 font-mono text-xs">• Transport Freight: ₹1.45 / kg</span>
                <span className="text-emerald-400 font-bold block text-sm">Farmer Takes Home: ₹29.97 / kg</span>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
                <span className="text-[11px] text-slate-400 block font-semibold">At ₹135/L Expensive Diesel:</span>
                <span className="text-slate-200 font-mono text-xs">• Transport Freight: ₹1.65 / kg (+20 paise)</span>
                <span className="text-amber-400 font-bold block text-sm">Farmer Takes Home: ₹29.77 / kg</span>
              </div>
            </div>
            <div className="p-3.5 bg-amber-950/80 border border-amber-500/80 rounded-xl text-xs text-amber-100 font-medium leading-relaxed">
              💡 <strong className="text-amber-300 font-bold">The Bottom Line:</strong> The farmer loses 20 paise per kg (₹1,000 lost on a 5,000 kg lot) purely to expensive diesel! FARMPATH&apos;s job is to instantly calculate which route loses the least money.
            </div>
          </div>
        )}

        {/* Tab 2 Content: Reefer Chiller AC */}
        {activeKnowledgeTab === 'coldchain' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Snowflake className="w-4 h-4" />
              <span>How Diesel and Cold Storage Connect: Reefer Cooling Power</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To transport delicate fresh tomatoes, strawberries, or capsicum in 35°C–45°C summer heat, refrigerated trucks run an active refrigeration compressor (a &ldquo;reefer&rdquo; unit).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-blue-400 font-bold block">1. Active Chiller Fuel Consumption:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  The cooling unit burns <strong>2 to 3 liters of diesel every single hour</strong> just to keep the cargo chilled. When diesel surges to ₹135/L, keeping an active chiller running over long highway trips becomes very costly.
                </p>
              </div>
              <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-emerald-400 font-bold block">2. Travel Distance vs. Nearby Cold Hub:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  When diesel is cheap (₹95/L), driving 80 km straight to a big city factory works. When diesel is ₹135/L, driving far alone burns money. The farmer instead drops the crop at a <strong>nearby cold hub (12 km away)</strong>, where 5 farmers combine lots into one 20-ton truck!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3 Content: Cold Storage as Insurance */}
        {activeKnowledgeTab === 'insurance' && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Cold Storage is Crop Insurance Against Highway Jams</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Why do farmers pay for cold storage if it adds a small handling fee? Because of what happens during traffic delays:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-rose-950/90 border border-rose-500 rounded-xl space-y-1.5 text-rose-100">
                <span className="font-bold block text-rose-300 text-xs">❌ Open Tractor Without Cold Pre-Cooling:</span>
                <p className="text-[11px] leading-relaxed text-rose-100">
                  A 12-hour traffic jam in 40°C heat causes <strong className="text-white font-bold">40% of the tomatoes to rot into mush</strong>. On a 5,000 kg lot, that is a direct cash wipeout of over <strong className="text-rose-300 font-bold">-₹40,000</strong>!
                </p>
              </div>
              <div className="p-3.5 bg-emerald-950/90 border border-emerald-500 rounded-xl space-y-1.5 text-emerald-100">
                <span className="font-bold block text-emerald-300 text-xs">✓ With FARMPATH Cold Pre-Cooling Hub:</span>
                <p className="text-[11px] leading-relaxed text-emerald-100">
                  Tomatoes chilled at 8°C remain firm for days. Even if diesel costs ₹1,000 more or traffic delays the trip, <strong className="text-white font-bold">zero produce rots</strong>, protecting the entire ₹1,24,000 harvest payout!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
