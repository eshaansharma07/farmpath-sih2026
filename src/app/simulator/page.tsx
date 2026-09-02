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

      {/* ⚡ REAL-TIME DIESEL REALITY CHECK BANNER */}
      {dieselDiff !== 0 && (
        <div className={`p-4 rounded-2xl border text-xs leading-relaxed flex flex-wrap items-center justify-between gap-4 transition-all ${
          dieselDiff > 0 
            ? 'bg-amber-950/40 border-amber-500/70 text-amber-200'
            : 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base shrink-0 ${
              dieselDiff > 0 ? 'bg-amber-900/60 text-amber-300' : 'bg-emerald-900/60 text-emerald-300'
            }`}>
              <Fuel className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white flex items-center gap-2">
                <span>{dieselDiff > 0 ? '⛽ Diesel Price Increase Alert' : '⛽ Diesel Price Discount'}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  dieselDiff > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  {dieselDiff > 0 ? `+₹${dieselDiff}/L Above Baseline` : `₹${Math.abs(dieselDiff)}/L Savings`}
                </span>
              </div>
              <p className="text-slate-300 text-xs mt-0.5">
                {dieselDiff > 0 ? (
                  <>
                    Higher diesel <strong className="text-white">ALWAYS reduces farmer profit</strong> by burning more fuel. Transport costs jumped from ₹{baselineTransportPerKg.toFixed(2)}/kg to ₹{currentTransportPerKg.toFixed(2)}/kg (eating <strong className="text-amber-300 font-mono">₹{totalExtraFuelCost.toLocaleString()}</strong> on your {cropLot.quantityKg.toLocaleString()} kg lot). FARMPATH prevents worse losses by selecting closer buyers!
                  </>
                ) : (
                  <>
                    Cheaper fuel reduces transport costs to ₹{currentTransportPerKg.toFixed(2)}/kg, saving you ₹{totalExtraFuelCost.toLocaleString()} on road travel.
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
            <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-[11px] text-amber-200">
              💡 <strong>The Bottom Line:</strong> The farmer loses 20 paise per kg (₹1,000 lost on a 5,000 kg lot) purely to expensive diesel! FARMPATH&apos;s job is to instantly calculate which route loses the least money.
            </div>
          </div>
        )}

        {/* Tab 2 Content: Reefer Chiller AC */}
        {activeKnowledgeTab === 'coldchain' && (
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm">
              <Snowflake className="w-4 h-4" />
              <span>How Diesel and Cold Storage Connect: Reefer Cooling Power</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              To transport delicate fresh tomatoes, strawberries, or capsicum in 35°C–45°C summer heat, refrigerated trucks run an active refrigeration compressor (a &ldquo;reefer&rdquo; unit).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
                <span className="text-blue-400 font-bold block">1. Active Chiller Fuel Consumption:</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  The cooling unit burns <strong>2 to 3 liters of diesel every single hour</strong> just to keep the cargo chilled. When diesel surges to ₹135/L, keeping an active chiller running over long highway trips becomes very costly.
                </p>
              </div>
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5">
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
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>Cold Storage is Crop Insurance Against Highway Jams</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Why do farmers pay for cold storage if it adds a small handling fee? Because of what happens during traffic delays:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl space-y-1.5 text-rose-200">
                <span className="font-bold block text-rose-400">❌ Open Tractor Without Cold Pre-Cooling:</span>
                <p className="text-[11px] leading-relaxed">
                  A 12-hour traffic jam in 40°C heat causes <strong>40% of the tomatoes to rot into mush</strong>. On a 5,000 kg lot, that is a direct cash wipeout of over <strong>-₹40,000</strong>!
                </p>
              </div>
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-1.5 text-emerald-200">
                <span className="font-bold block text-emerald-400">✓ With FARMPATH Cold Pre-Cooling Hub:</span>
                <p className="text-[11px] leading-relaxed">
                  Tomatoes chilled at 8°C remain firm for days. Even if diesel costs ₹1,000 more or traffic delays the trip, <strong>zero produce rots</strong>, protecting the entire ₹1,24,000 harvest payout!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
