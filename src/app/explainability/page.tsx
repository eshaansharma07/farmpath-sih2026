'use client';

import React from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  ArrowRight, 
  ShieldAlert, 
  Layers, 
  AlertTriangle,
  Award,
  Sparkles
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

export default function ExplainabilityPage() {
  const { explainability, results, cropLot } = useSimulation();

  const waterfallData = explainability.waterfallSteps.map(s => ({
    name: s.label,
    amount: s.amountPerKg,
    total: s.totalAmount,
    type: s.type,
    description: s.description,
  }));

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-emerald-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Decision Explainability Engine
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          &ldquo;Why Did FARMPATH Choose This Route?&rdquo; — Transparent additive feature attribution and rejection ledger.
        </p>
      </div>

      {/* Executive Headline Card */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl p-6 shadow-xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-300">
          <Award className="w-4 h-4" />
          <span>Optimal Route Decision Rationale</span>
        </div>
        <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
          {explainability.headlineSummary}
        </h2>
        <p className="text-xs text-emerald-100 pt-1">
          Comparing <strong className="text-white">{explainability.optimalRouteName}</strong> against traditional status quo baseline.
        </p>
      </div>

      {/* Ranked Decision Breakdown Waterfall Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Economic Advantage Decomposition (Per kg)
            </h3>
            <p className="text-xs text-slate-500">
              Additive breakdown demonstrating how each supply-chain component contributes to farmer realization.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
            Total Payout Gain: +₹{results.totalLotValueGain.toLocaleString()}
          </span>
        </div>

        {/* Visual Waterfall Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {explainability.keyDrivers.map((driver, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-bold text-slate-700">{driver.title}</span>
                  <span className="text-sm font-black text-emerald-700">
                    {driver.impactPerKg}
                  </span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{driver.explanation}</p>
              </div>
            </div>
          ))}

          {/* Total Net Advantage Card */}
          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800">
                  Total Expected Advantage
                </span>
                <span className="text-base font-black text-emerald-800">
                  +₹{results.netRealizationImprovementPerKg.toFixed(2)}/kg
                </span>
              </div>
              <p className="text-xs text-emerald-700">
                Combined financial uplift delivering +{((results.netRealizationImprovementPerKg / (results.baselineRoute?.costBreakdown.netFarmerRealizationPerKg || 18.90)) * 100).toFixed(1)}% higher net income to the farm.
              </p>
            </div>
          </div>
        </div>

        {/* Waterfall Horizontal Stack Visualizer */}
        <div className="space-y-2 pt-2">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Step-by-Step Economic Progression
          </h4>
          <div className="space-y-1.5">
            {explainability.waterfallSteps.map((step, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-slate-100 hover:bg-slate-50 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center text-[10px] font-mono text-slate-600 font-bold">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900">{step.label}</span>
                    <span className="text-[11px] text-slate-500 block">{step.description}</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className={`font-black text-sm ${
                    step.type === 'total' 
                      ? 'text-emerald-700' 
                      : step.type === 'base'
                      ? 'text-slate-800'
                      : step.amountPerKg >= 0
                      ? 'text-emerald-600'
                      : 'text-rose-600'
                  }`}>
                    {step.type !== 'base' && step.amountPerKg > 0 ? '+' : ''}₹{step.amountPerKg.toFixed(2)}/kg
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">
                    ₹{step.totalAmount.toLocaleString()} lot total
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Rejected Alternatives Ledger (Critical for Judge Trust) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Constraint Rejection Ledger (Audit Trail)
            </h3>
            <p className="text-xs text-slate-500">
              Demonstrating why inferior or infeasible candidate paths were systematically excluded by the solver.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 font-bold">
            {explainability.rejectedAnalysis.totalRejected} Routes Pruned
          </span>
        </div>

        <div className="space-y-3">
          {explainability.rejectedAnalysis.reasons.map((r, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{r.category}</span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
                      {r.count} routes rejected
                    </span>
                  </div>
                  <p className="text-slate-600 mt-0.5 text-[11px]">{r.rationale}</p>
                </div>
              </div>

              <div className="text-right shrink-0 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                <span className="text-[10px] text-slate-400 block">Sample Excluded Route</span>
                <span className="font-mono text-[11px] text-slate-700 font-medium line-clamp-1 max-w-[220px]">
                  {r.sampleRoute}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
