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
  Award
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
          <span className="text-xs font-mono text-slate-400">
            Linear Program • Deterministic Solver
          </span>
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
