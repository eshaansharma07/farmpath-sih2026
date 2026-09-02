'use client';

import React from 'react';
import SupplyChainMapViewer from '../../components/SupplyChainMapViewer';
import { useSimulation } from '../../lib/context/SimulationContext';
import { 
  MapPin, 
  Info, 
  Navigation, 
  Sparkles, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

export default function SupplyChainMapPage() {
  const { 
    results, 
    selectedRouteId, 
    setSelectedRouteId, 
    cropLot 
  } = useSimulation();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Geospatial Supply-Chain Twin
            </h1>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
              Punjab Agricultural Basin
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Visualizing 59 active nodes and candidate transit corridors with live friction & spoilage thermals.
          </p>
        </div>

        {/* Dataset Disclosure */}
        <div className="px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
          <span>Synthetic simulation dataset — Punjab Agricultural Corridor</span>
        </div>
      </div>

      {/* Main Interactive Map Viewer */}
      <SupplyChainMapViewer />

      {/* Route Quick Selector Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Featured Multi-Echelon Routes</h3>
            <p className="text-xs text-slate-500">Click a route below to highlight and inspect on the map above.</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            {results.feasibleRoutesCount} Feasible / {results.candidateRoutesEvaluated} Total Evaluated
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Optimal Route Card */}
          {results.optimalRoute && (
            <button
              onClick={() => setSelectedRouteId(results.optimalRoute!.id)}
              className={`p-3.5 rounded-xl text-left border transition-all relative ${
                selectedRouteId === results.optimalRoute.id
                  ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-emerald-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  Optimal Recommendation
                </span>
                <span className="text-sm font-black text-emerald-700">
                  ₹{results.optimalRoute.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{results.optimalRoute.name}</h4>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>{results.optimalRoute.totalDistanceKm} km • {results.optimalRoute.totalTransitHours}h transit</span>
                <span className="font-semibold text-emerald-700">
                  {results.optimalRoute.costBreakdown.expectedSpoilagePct}% spoilage
                </span>
              </div>
            </button>
          )}

          {/* Baseline Route Card */}
          {results.baselineRoute && (
            <button
              onClick={() => setSelectedRouteId(results.baselineRoute!.id)}
              className={`p-3.5 rounded-xl text-left border transition-all relative ${
                selectedRouteId === results.baselineRoute.id
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20 shadow-sm'
                  : 'border-slate-200 hover:border-amber-300 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 uppercase">
                  Traditional APMC Mandi
                </span>
                <span className="text-sm font-black text-amber-700">
                  ₹{results.baselineRoute.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{results.baselineRoute.name}</h4>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>{results.baselineRoute.totalDistanceKm} km • {results.baselineRoute.totalTransitHours}h transit</span>
                <span className="font-semibold text-rose-600">
                  {results.baselineRoute.costBreakdown.expectedSpoilagePct}% spoilage
                </span>
              </div>
            </button>
          )}

          {/* Alternate Feasible Route */}
          {results.allRoutes.filter(r => r.isFeasible && r.id !== results.optimalRoute?.id && r.id !== results.baselineRoute?.id)[0] && (
            <button
              onClick={() => {
                const alt = results.allRoutes.filter(r => r.isFeasible && r.id !== results.optimalRoute?.id && r.id !== results.baselineRoute?.id)[0];
                if (alt) setSelectedRouteId(alt.id);
              }}
              className="p-3.5 rounded-xl text-left border border-slate-200 hover:border-slate-300 bg-white transition-all"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 uppercase">
                  Alternative Feasible
                </span>
                <span className="text-sm font-black text-slate-800">
                  ₹{results.allRoutes.filter(r => r.isFeasible && r.id !== results.optimalRoute?.id && r.id !== results.baselineRoute?.id)[0]?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                {results.allRoutes.filter(r => r.isFeasible && r.id !== results.optimalRoute?.id && r.id !== results.baselineRoute?.id)[0]?.name}
              </h4>
              <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Direct Institutional Delivery</span>
                <span className="text-slate-600 font-medium">Valid alternative</span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
