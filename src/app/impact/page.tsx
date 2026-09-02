'use client';

import React from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  Award, 
  TrendingUp, 
  ShieldAlert, 
  Truck, 
  Leaf, 
  Users, 
  Store, 
  CheckCircle2, 
  Info,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ImpactResultsPage() {
  const { results, cropLot } = useSimulation();

  const optimal = results.optimalRoute;
  const baseline = results.baselineRoute;

  const currentRealization = baseline?.costBreakdown.netFarmerRealizationPerKg || 18.90;
  const bestRealization = optimal?.costBreakdown.netFarmerRealizationPerKg || 24.80;
  const realizationDelta = Math.max(0, bestRealization - currentRealization);
  const realizationPct = Math.round((realizationDelta / currentRealization) * 1000) / 10;

  const currentSpoilage = baseline?.costBreakdown.expectedSpoilagePct || 8.1;
  const bestSpoilage = optimal?.costBreakdown.expectedSpoilagePct || 3.2;
  const spoilageReductionPct = Math.round(((currentSpoilage - bestSpoilage) / currentSpoilage) * 1000) / 10;

  const currentLogistics = baseline?.costBreakdown.transportCostTotal || 14800;
  const bestLogistics = optimal?.costBreakdown.transportCostTotal || 11240;
  const logisticsSavings = Math.max(0, currentLogistics - bestLogistics);
  const logisticsSavingsPct = Math.round((logisticsSavings / currentLogistics) * 1000) / 10;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Impact & Value Realization Dashboard
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparative synthesis of economic uplift, food loss reduction, and supply-chain efficiency.
          </p>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Illustrative simulation — not field-validated results</span>
        </div>
      </div>

      {/* Primary Before vs Optimized 3-Column Hero Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1: Farmer Realization */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Farmer Realization
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              +{realizationPct}%
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <div className="text-sm line-through text-slate-400 font-semibold">
              ₹{currentRealization.toFixed(2)}/kg
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <div className="text-2xl font-black text-emerald-700">
              ₹{bestRealization.toFixed(2)}/kg
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
            Yields <strong>+₹{results.totalLotValueGain.toLocaleString()}</strong> incremental gross margin on this {cropLot.quantityKg.toLocaleString()} kg harvest lot.
          </p>
        </div>

        {/* Metric 2: Supply-Chain Spoilage Loss */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Supply-Chain Loss
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800">
              -{spoilageReductionPct}%
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <div className="text-sm line-through text-slate-400 font-semibold">
              {currentSpoilage}%
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <div className="text-2xl font-black text-emerald-700">
              {bestSpoilage}%
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
            Saves <strong>{Math.round(cropLot.quantityKg * ((currentSpoilage - bestSpoilage) / 100))} kg</strong> of nutritious produce from landfill degradation.
          </p>
        </div>

        {/* Metric 3: Logistics Cost */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Logistics Cost
            </span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              -{logisticsSavingsPct}%
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <div className="text-sm line-through text-slate-400 font-semibold">
              ₹{currentLogistics.toLocaleString()}
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
            <div className="text-2xl font-black text-emerald-700">
              ₹{bestLogistics.toLocaleString()}
            </div>
          </div>

          <p className="text-xs text-slate-500 pt-1 border-t border-slate-100">
            Route consolidation saves <strong>₹{logisticsSavings.toLocaleString()}</strong> in diesel fuel, driver hours, and interstate tolls.
          </p>
        </div>
      </div>

      {/* 4-Pillar Multi-Stakeholder Benefits Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Multi-Stakeholder Value Distribution
          </h3>
          <p className="text-xs text-slate-500">
            How FARMPATH disintermediates inefficiency without destabilizing agricultural trade networks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Pillar 1: Farmer */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-emerald-100 text-emerald-700">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Farmer Benefits</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Higher net realization (+20% to +35%) through contract transparency.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Eliminates distress selling during local mandi arrival gluts.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Immediate digital proof-of-dispatch and guaranteed offloading.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Consumer */}
          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/40 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-blue-100 text-blue-700">
                <Users className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Consumer Benefits</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Reduced avoidable supply-chain markup lowers retail inflation.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Higher produce freshness with 36 hours saved in transit velocity.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Traceable farm-of-origin food safety and quality grading.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Operator */}
          <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/40 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-100 text-amber-700">
                <Truck className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Logistics & FPO Operator</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Optimized vehicle load factor and eliminated empty return deadhead legs.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Pre-booked unloading slots reduce truck detention at mandi gates.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>FPO aggregation centers capture profitable grading and packing revenue.</span>
              </li>
            </ul>
          </div>

          {/* Pillar 4: Environment */}
          <div className="p-4 rounded-xl border border-teal-200 bg-teal-50/40 space-y-2">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-teal-100 text-teal-700">
                <Leaf className="w-4 h-4" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Environmental Sustainability</h4>
            </div>
            <ul className="space-y-1 text-xs text-slate-600">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Prevents agricultural methane emissions by preventing produce spoilage.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Reduced ton-km road transport diminishes freight carbon footprint.</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                <span>Aligns with UN SDG 12.3 (Halving per capita food waste by 2030).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
