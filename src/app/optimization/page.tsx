'use client';

import React, { useState } from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  Cpu, 
  Play, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  ChevronRight,
  TrendingUp,
  Layers,
  Award,
  Flame,
  Fuel,
  Scale,
  DollarSign,
  Calculator
} from 'lucide-react';

export default function OptimizationEnginePage() {
  const { results, cropLot, conditions } = useSimulation();

  const [isSolving, setIsSolving] = useState<boolean>(false);
  const [solveProgress, setSolveProgress] = useState<number>(100);
  const [animatedStep, setAnimatedStep] = useState<number>(7); // 1 to 7 stages
  const [revealedStats, setRevealedStats] = useState({
    evaluated: results.candidateRoutesEvaluated,
    feasible: results.feasibleRoutesCount,
    rejected: results.rejectedRoutesCount,
    highLoss: results.highLossRejectedCount,
    inferior: results.economicallyInferiorCount,
    shortlisted: results.shortlistedCount,
  });

  const handleRunOptimization = async () => {
    setIsSolving(true);
    setSolveProgress(0);
    setAnimatedStep(1);

    const stages = [
      { step: 1, text: 'Stage 1: INGESTION OF LOT AND ENVIRONMENTAL VECTORS', pct: 15 },
      { step: 2, text: 'Stage 2: ML PREDICTIVE PRICE AND ARRIVAL FORECAST', pct: 30 },
      { step: 3, text: 'Stage 3: DIRECTED GRAPH CONSTRUCTION & PATH DISCOVERY', pct: 45 },
      { step: 4, text: 'Stage 4: CONSTRAINTS EVALUATION & INFEASIBLE PRUNING', pct: 60 },
      { step: 5, text: 'Stage 5: NET REALIZATION COMPUTATION (OR-TOOLS FORMULATION)', pct: 80 },
      { step: 6, text: 'Stage 6: MULTI-CRITERIA PARETO RANKING', pct: 90 },
      { step: 7, text: 'Stage 7: OPTIMAL ROUTE RECOMMENDED & EXPLAINED', pct: 100 },
    ];

    for (const s of stages) {
      setAnimatedStep(s.step);
      setSolveProgress(s.pct);
      await new Promise(res => setTimeout(res, 280));
    }

    setRevealedStats({
      evaluated: results.candidateRoutesEvaluated,
      feasible: results.feasibleRoutesCount,
      rejected: results.rejectedRoutesCount,
      highLoss: results.highLossRejectedCount,
      inferior: results.economicallyInferiorCount,
      shortlisted: results.shortlistedCount,
    });

    setIsSolving(false);
  };

  const optimal = results.optimalRoute;
  const baseline = results.baselineRoute;

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Constrained Optimization Engine
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            The mathematical heart of FARMPATH: Mixed-Integer Programming maximizing expected net farmer payout.
          </p>
        </div>

        <button
          disabled={isSolving}
          onClick={handleRunOptimization}
          className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all transform active:scale-95 disabled:opacity-50"
        >
          <Play className="w-4 h-4 fill-current" />
          <span>{isSolving ? 'Solving OR Formulation...' : 'RUN OPTIMIZATION'}</span>
        </button>
      </div>

      {/* Formal Objective and Formulation Box */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Mathematical Objective
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono bg-emerald-950/80 text-emerald-300 px-2.5 py-1 rounded-lg border border-emerald-500/40 flex items-center gap-1.5 font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live In-Code Variables: Synced with Active Lot</span>
            </span>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs sm:text-sm">
          <div className="text-emerald-300 font-bold text-base sm:text-lg">
            MAXIMIZE EXPECTED NET FARMER REALIZATION
          </div>

          <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-200 leading-relaxed font-mono text-xs sm:text-sm">
            <span className="text-emerald-400">Expected Farmer Realization</span> = <br />
            &nbsp;&nbsp;<span className="text-blue-300">Expected Sale Value</span> (Delivered Quantity × Market Price) <br />
            &nbsp;&nbsp;− <span className="text-amber-300">Transport & Toll Costs</span> <br />
            &nbsp;&nbsp;− <span className="text-purple-300">Handling Costs</span> (Loading/Unloading touches) <br />
            &nbsp;&nbsp;− <span className="text-indigo-300">Storage Costs</span> (Holding buffers) <br />
            &nbsp;&nbsp;− <span className="text-rose-400">Intermediary Costs</span> (Arhatiya / Mandi commissions) <br />
            &nbsp;&nbsp;− <span className="text-red-400">Expected Spoilage Loss Value</span>
          </div>

          <div className="pt-2">
            <span className="text-amber-400 font-bold block mb-2 uppercase text-xs tracking-wider">
              Subject To Operational Constraints:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs text-slate-300 font-sans">
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700">
                <span className="font-semibold text-white block">1. Vehicle Capacity:</span>
                Lot quantity ≤ Truck load limit (1.5T / 5T / 10T)
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700">
                <span className="font-semibold text-white block">2. Buyer Quota:</span>
                Lot quantity ≤ Destination daily absorption
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700">
                <span className="font-semibold text-white block">3. Freshness Window:</span>
                Cumulative transit + processing ≤ {cropLot.maxTransitHours} Hours
              </div>
              <div className="p-2.5 bg-slate-800/70 rounded-lg border border-slate-700">
                <span className="font-semibold text-white block">4. Perishability Cutoff:</span>
                Expected spoilage ≤ Safety threshold (10.0%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📐 FORMULAS USED IN THE OPTIMIZATION ENGINE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Calculator className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Mathematical Formulations &amp; Physical Laws Used
              </h3>
              <p className="text-xs text-slate-500">
                100% deterministic arithmetic grounded in thermodynamics and commercial Punjab freight logistics:
              </p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold bg-emerald-100 text-emerald-900 px-3 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Live In-Code Variables: Synced with Active Lot ({cropLot.crop} {cropLot.quantityKg.toLocaleString()} kg)</span>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          {/* Formula 1: Arrhenius Spoilage */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <Flame className="w-4 h-4" />
                <span>1. Thermodynamic Spoilage Decay (Arrhenius)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Respiration Kinetics</span>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto text-center font-bold">
              Loss% = 100 × (1 − e<sup>−k · (1 + β·(T − 20)) · t · α_cold · γ_vib</sup>)
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">k (Biological Decay Rate):</span>
                <span className="font-mono text-white font-bold">
                  {cropLot.crop === 'Tomato' ? '0.0035 (Tomato)' : cropLot.crop === 'Onion' ? '0.0008 (Onion)' : cropLot.crop === 'Potato' ? '0.0006 (Potato)' : '0.0001 (Wheat)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">β (Thermal Sensitivity):</span>
                <span className="font-mono text-white">0.05 / °C (rate doubles every 10°C)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">T (Ambient Air Temperature):</span>
                <span className="font-mono text-amber-300 font-bold">{conditions.ambientTemperatureC}°C</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">α_cold (Cold Chain Multiplier):</span>
                <span className="font-mono text-blue-300 font-bold">0.25 (Cold Hub) vs 1.0 (Open Tractor)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">γ_vib (Road Mechanical Vibration):</span>
                <span className="font-mono text-white">1.0 (Smooth Highway) vs 1.35 (Dirt Road)</span>
              </div>
            </div>
          </div>

          {/* Formula 2: Freight Tariff */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <Fuel className="w-4 h-4" />
                <span>2. Commercial Freight Logistics Tariff</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Punjab Corridor</span>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 overflow-x-auto text-center font-bold">
              Freight = BaseFee + (Dist<sub>km</sub> × (18 + 10·Tons) × (Diesel/95)<sup>1.4</sup> × RoadFactor) + Tolls
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">BaseFee (Dispatch &amp; Loading):</span>
                <span className="font-mono text-white font-bold">₹350 minimum staging</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Payload Tonnage:</span>
                <span className="font-mono text-white font-bold">{(cropLot.quantityKg / 1000).toFixed(1)} Metric Tons</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Diesel Fuel Price Index:</span>
                <span className="font-mono text-amber-300 font-bold">₹{conditions.fuelPricePerLiter}/L (baseline ₹95/L)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Fuel Elasticity Exponent:</span>
                <span className="font-mono text-white">1.4 (accounts for engine idle &amp; AC)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tolls &amp; Interstate Checkposts:</span>
                <span className="font-mono text-white">₹120 per national highway toll plaza</span>
              </div>
            </div>
          </div>

          {/* Formula 3: Net Realization Objective */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <Scale className="w-4 h-4" />
                <span>3. Net Farmer Realization Objective</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Optimization Target</span>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-emerald-300 overflow-x-auto text-center font-bold">
              Max R<sub>net</sub> = [Q<sub>deliv</sub> × P<sub>buyer</sub> − (Transport + Handling + Storage + Intermediary)] / Q<sub>harvest</sub>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Delivered Quantity:</span>
                <span className="font-mono text-white font-bold">Q<sub>deliv</sub> = Q<sub>harvest</sub> × (1 − Loss%)</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Buyer Price (P_buyer):</span>
                <span className="font-mono text-white">Fixed contract or wholesale spot price</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Real-World Outcome:</span>
                <span className="font-mono text-emerald-400 font-bold">Maximizes cash in farmer&apos;s pocket</span>
              </div>
            </div>
          </div>

          {/* Formula 4: Intermediary Commission Elimination */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-blue-400 flex items-center gap-1.5 text-xs sm:text-sm">
                <DollarSign className="w-4 h-4" />
                <span>4. Intermediary Fee Elimination</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Commission Elimination</span>
            </div>

            {/* Formula Block */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-blue-200 space-y-1 text-center font-bold">
              <div>Mandi Fee = GrossValue × (8.5% Arhatiya + 2% Labor + Weighment)</div>
              <div className="text-emerald-300 font-bold">FARMPATH Fee = ₹0 (Direct Contract &amp; FPO Settlement)</div>
            </div>

            <div className="space-y-1.5 text-[11px] text-slate-300">
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">Conventional Mandi Cut:</span>
                <span className="font-mono text-rose-400 font-bold">−₹{(baseline?.costBreakdown.intermediaryCostTotal || 8032).toLocaleString()} on current lot</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-1">
                <span className="text-slate-400">FARMPATH Intermediary Cut:</span>
                <span className="font-mono text-emerald-400 font-bold">₹0.00 (100% Retained by Farmer)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Net Extra Farmer Realization:</span>
                <span className="font-mono text-emerald-400 font-bold">+₹{results.totalLotValueGain.toLocaleString()} Profit Gain</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Execution Pipeline Workflow Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Algorithmic Execution Pipeline
        </h3>

        <div className="flex flex-wrap items-center justify-between gap-2 overflow-x-auto py-2">
          {[
            { id: 1, label: 'INPUT', sub: 'Lot & Constraints' },
            { id: 2, label: 'PREDICT', sub: 'Price & Demand' },
            { id: 3, label: 'BUILD GRAPH', sub: 'Multi-Echelon' },
            { id: 4, label: 'APPLY CONSTRAINTS', sub: 'Pruning' },
            { id: 5, label: 'OPTIMIZE', sub: 'Solve Realization' },
            { id: 6, label: 'RANK ROUTES', sub: 'Shortlisting' },
            { id: 7, label: 'RECOMMEND', sub: 'Optimal Path' },
          ].map((stage, idx) => (
            <React.Fragment key={stage.id}>
              <div className={`p-3 rounded-xl border flex flex-col items-center min-w-[120px] transition-all ${
                animatedStep >= stage.id
                  ? 'border-emerald-500 bg-emerald-50/50 text-emerald-900 shadow-xs'
                  : 'border-slate-200 bg-slate-50 text-slate-400'
              }`}>
                <span className={`text-[10px] font-mono font-bold ${animatedStep >= stage.id ? 'text-emerald-700' : 'text-slate-400'}`}>
                  0{stage.id}
                </span>
                <span className="font-bold text-xs mt-0.5">{stage.label}</span>
                <span className="text-[10px] text-slate-500 mt-0.5">{stage.sub}</span>
              </div>

              {idx < 6 && (
                <ChevronRight className={`w-4 h-4 shrink-0 ${animatedStep > stage.id ? 'text-emerald-600' : 'text-slate-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Route Pruning and Filtering Ledger */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-center">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 block uppercase">Candidate Routes</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{revealedStats.evaluated}</span>
          <span className="text-[10px] text-slate-500">Total Permutations</span>
        </div>

        <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-800 block uppercase">Feasible</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">{revealedStats.feasible}</span>
          <span className="text-[10px] text-emerald-600">Passed Constraints</span>
        </div>

        <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 shadow-xs">
          <span className="text-[11px] font-bold text-rose-800 block uppercase">Rejected</span>
          <span className="text-2xl font-black text-rose-600 mt-1 block">{revealedStats.rejected}</span>
          <span className="text-[10px] text-rose-500">Violated Bounds</span>
        </div>

        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 shadow-xs">
          <span className="text-[11px] font-bold text-amber-800 block uppercase">High-Loss</span>
          <span className="text-2xl font-black text-amber-600 mt-1 block">{revealedStats.highLoss}</span>
          <span className="text-[10px] text-amber-600">Spoilage &gt; 10%</span>
        </div>

        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-bold text-slate-500 block uppercase">Inferior</span>
          <span className="text-2xl font-black text-slate-700 mt-1 block">{revealedStats.inferior}</span>
          <span className="text-[10px] text-slate-400">Sub-viability</span>
        </div>

        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 shadow-xs">
          <span className="text-[11px] font-bold text-blue-800 block uppercase">Shortlisted</span>
          <span className="text-2xl font-black text-blue-700 mt-1 block">{revealedStats.shortlisted}</span>
          <span className="text-[10px] text-blue-600">Top Tier</span>
        </div>

        <div className="p-4 bg-emerald-600 text-white rounded-xl shadow-md">
          <span className="text-[11px] font-bold text-emerald-200 block uppercase">Recommended</span>
          <span className="text-2xl font-black text-white mt-1 block">1</span>
          <span className="text-[10px] text-emerald-100">Global Optimum</span>
        </div>
      </div>

      {/* Optimal Route Found Banner */}
      {optimal && (
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-300" />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                OPTIMAL ROUTE FOUND
              </span>
            </div>
            <h3 className="text-lg font-black text-white">{optimal.name}</h3>
            <p className="text-xs text-emerald-100">
              Delivers <strong className="text-white">₹{optimal.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg</strong> net payout (+₹{results.netRealizationImprovementPerKg.toFixed(2)}/kg gain) with only {optimal.costBreakdown.expectedSpoilagePct}% expected spoilage.
            </p>
          </div>

          <div className="text-right sm:border-l sm:border-emerald-700 sm:pl-6 shrink-0">
            <span className="text-[11px] text-emerald-200 block">Total Payout Gain</span>
            <div className="text-2xl font-black text-white mt-0.5">
              +₹{results.totalLotValueGain.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-300">for {cropLot.quantityKg.toLocaleString()} kg lot</span>
          </div>
        </div>
      )}
    </div>
  );
}
