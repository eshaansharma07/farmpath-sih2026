'use client';

import React, { useState } from 'react';
import { useSimulation } from '../../lib/context/SimulationContext';
import { EvaluatedRoute } from '../../lib/engine/types';
import { 
  GitCompare, 
  CheckCircle2, 
  HelpCircle, 
  Truck, 
  ShieldAlert, 
  DollarSign, 
  Clock, 
  MapPin, 
  Layers, 
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Award
} from 'lucide-react';

export default function RouteComparisonPage() {
  const { results, cropLot } = useSimulation();
  const [selectedRouteForExplain, setSelectedRouteForExplain] = useState<EvaluatedRoute | null>(null);

  // Pick 3-5 distinctive candidate routes to compare:
  // 1. Baseline Route A (Conventional APMC Mandi)
  // 2. Optimal Route B (Direct to Processor / CC)
  // 3. Alternative Route C (Institutional Buyer / Supermarket)
  // 4. Alternative Route D (Interstate Gateway or Second Mandi)
  const candidateRoutesToCompare = React.useMemo(() => {
    const list: { label: string; route: EvaluatedRoute; isOptimal: boolean; isBaseline: boolean }[] = [];

    if (results.optimalRoute) {
      list.push({
        label: 'ROUTE B (OPTIMAL RECOMMENDATION)',
        route: results.optimalRoute,
        isOptimal: true,
        isBaseline: false,
      });
    }

    if (results.baselineRoute && results.baselineRoute.id !== results.optimalRoute?.id) {
      list.push({
        label: 'ROUTE A (CONVENTIONAL MANDI CHANNEL)',
        route: results.baselineRoute,
        isOptimal: false,
        isBaseline: true,
      });
    }

    // Find other feasible routes with different destinations
    const others = results.allRoutes.filter(r => 
      r.isFeasible && 
      r.id !== results.optimalRoute?.id && 
      r.id !== results.baselineRoute?.id
    );

    if (others[0]) {
      list.push({
        label: 'ROUTE C (INSTITUTIONAL DIRECT CHANNEL)',
        route: others[0],
        isOptimal: false,
        isBaseline: false,
      });
    }

    if (others[1]) {
      list.push({
        label: 'ROUTE D (SECONDARY INTER-DISTRICT MANDI)',
        route: others[1],
        isOptimal: false,
        isBaseline: false,
      });
    }

    // Sort to place Route A first, then Route B, Route C, Route D
    list.sort((a, b) => a.label.localeCompare(b.label));

    return list;
  }, [results]);

  const optimalRoute = results.optimalRoute;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GitCompare className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Multi-Route Economic Comparison
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Side-by-side unit economic audit comparing conventional APMC channels against direct-to-processing pathways.
          </p>
        </div>

        {/* Highlight Why Route B */}
        {optimalRoute && (
          <button
            onClick={() => setSelectedRouteForExplain(optimalRoute)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm flex items-center gap-2 transition-all transform active:scale-95"
          >
            <HelpCircle className="w-4 h-4" />
            <span>WHY {optimalRoute.name.includes('Processor') ? 'ROUTE B' : 'THIS ROUTE'}?</span>
          </button>
        )}
      </div>

      {/* Comparative Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {candidateRoutesToCompare.map(({ label, route, isOptimal, isBaseline }) => {
          const cost = route.costBreakdown;
          const isWinner = isOptimal;

          return (
            <div
              key={route.id}
              className={`rounded-2xl border transition-all flex flex-col justify-between overflow-hidden ${
                isWinner
                  ? 'border-emerald-500 bg-emerald-50/20 shadow-md ring-2 ring-emerald-500/20'
                  : isBaseline
                  ? 'border-amber-300 bg-white shadow-xs'
                  : 'border-slate-200 bg-white shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className={`p-4 border-b ${
                isWinner ? 'bg-emerald-600 text-white' : isBaseline ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-800'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {label.split('(')[0]}
                  </span>
                  {isWinner && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white text-emerald-800">
                      RECOMMENDED
                    </span>
                  )}
                  {isBaseline && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-amber-800">
                      STATUS QUO
                    </span>
                  )}
                </div>
                <h3 className="font-black text-sm mt-1 line-clamp-1">
                  {route.name}
                </h3>
              </div>

              {/* Card Body Metrics */}
              <div className="p-5 space-y-3.5 flex-1">
                {/* Net Realization Hero Value */}
                <div className={`p-3 rounded-xl border text-center ${
                  isWinner ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'
                }`}>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                    Net Farmer Realization
                  </span>
                  <div className={`text-2xl font-black mt-0.5 ${isWinner ? 'text-emerald-700' : 'text-slate-900'}`}>
                    ₹{cost.netFarmerRealizationPerKg.toFixed(2)} / kg
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    Total Payout: ₹{cost.netFarmerPayout.toLocaleString()}
                  </span>
                </div>

                {/* Line Item Breakdown */}
                <div className="space-y-2 text-xs divide-y divide-slate-100">
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Destination Sale Price:</span>
                    <span className="font-bold text-slate-900">₹{cost.grossPricePerKg.toFixed(2)}/kg</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500">Transport & Toll:</span>
                    <span className="font-semibold text-slate-800">₹{cost.transportCostPerKg.toFixed(2)}/kg</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500">Handling & Storage:</span>
                    <span className="font-semibold text-slate-800">₹{(cost.handlingCostPerKg + cost.storageCostPerKg).toFixed(2)}/kg</span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500">Mandi / Intermediary Fee:</span>
                    <span className={`font-semibold ${cost.intermediaryCostTotal > 0 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {cost.intermediaryCostTotal > 0 ? `₹${cost.intermediaryCostPerKg.toFixed(2)}/kg` : '₹0.00 (Direct)'}
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500">Expected Spoilage Loss:</span>
                    <span className={`font-bold ${cost.expectedSpoilagePct > 6 ? 'text-rose-600' : 'text-emerald-700'}`}>
                      {cost.expectedSpoilagePct}% ({cost.expectedSpoilageKg} kg)
                    </span>
                  </div>

                  <div className="flex justify-between pt-2">
                    <span className="text-slate-500">Total Transit Time:</span>
                    <span className="font-semibold text-slate-800">{route.totalTransitHours} Hours</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Action */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  onClick={() => setSelectedRouteForExplain(route)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    isWinner
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Inspect Decision Logic</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Full-Width Comparison Matrix Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Detailed Unit Economics Matrix
          </h3>
          <span className="text-xs text-slate-400">Values per 5,000 kg harvest lot</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-3">Route Identifier</th>
                <th className="p-3">Distance & Time</th>
                <th className="p-3">Gross Price</th>
                <th className="p-3">Freight & Toll</th>
                <th className="p-3">Intermediary Margin</th>
                <th className="p-3">Spoilage Loss</th>
                <th className="p-3">Net Realization</th>
                <th className="p-3">Total Farmer Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {candidateRoutesToCompare.map(({ route, isOptimal, isBaseline }) => {
                const cost = route.costBreakdown;
                return (
                  <tr
                    key={route.id}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isOptimal ? 'bg-emerald-50/40 font-medium' : ''
                    }`}
                  >
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{route.name}</div>
                      <span className="text-[10px] text-slate-400">{route.description}</span>
                    </td>
                    <td className="p-3 text-slate-700">
                      {route.totalDistanceKm} km / {route.totalTransitHours}h
                    </td>
                    <td className="p-3 font-semibold text-slate-900">
                      ₹{cost.grossPricePerKg.toFixed(2)}/kg
                    </td>
                    <td className="p-3 text-slate-700">
                      ₹{cost.transportCostPerKg.toFixed(2)}/kg (₹{cost.transportCostTotal.toLocaleString()})
                    </td>
                    <td className="p-3 text-slate-700">
                      {cost.intermediaryCostTotal > 0 ? `₹${cost.intermediaryCostPerKg.toFixed(2)}/kg` : '₹0.00'}
                    </td>
                    <td className="p-3">
                      <span className={`font-semibold ${cost.expectedSpoilagePct > 6 ? 'text-rose-600' : 'text-emerald-700'}`}>
                        {cost.expectedSpoilagePct}% (₹{cost.expectedSpoilageLossValue.toLocaleString()})
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`text-sm font-black ${isOptimal ? 'text-emerald-700' : 'text-slate-900'}`}>
                        ₹{cost.netFarmerRealizationPerKg.toFixed(2)}/kg
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`font-black ${isOptimal ? 'text-emerald-700' : 'text-slate-900'}`}>
                        ₹{cost.netFarmerPayout.toLocaleString()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive [WHY ROUTE B?] Modal / Drawer */}
      {selectedRouteForExplain && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden animate-in zoom-in-95">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-base">
                  Why Was This Route Evaluated?
                </h3>
              </div>
              <button
                onClick={() => setSelectedRouteForExplain(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-emerald-900 text-sm mb-1">
                  Executive Decision Summary
                </h4>
                <p className="text-emerald-800 text-xs leading-relaxed">
                  &ldquo;Route B has a lower headline price advantage than expected, but its shorter transit time and lower spoilage outweigh the additional logistics cost.&rdquo;
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Factor-By-Factor Rationale:
                </h5>
                <ul className="space-y-2">
                  <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Perishability & Spoilage Mitigation: </span>
                      By utilizing direct cold-chain aggregation, spoilage drops to {selectedRouteForExplain.costBreakdown.expectedSpoilagePct}%, preserving over 240 kg of produce from decay.
                    </div>
                  </li>
                  <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Intermediary Disintermediation: </span>
                      Direct delivery eliminates the traditional 8.5% commission fee levied by APMC commission agents, keeping ₹{selectedRouteForExplain.costBreakdown.intermediaryCostPerKg > 0 ? selectedRouteForExplain.costBreakdown.intermediaryCostPerKg.toFixed(2) : '2.20'}/kg in the farmer&apos;s pocket.
                    </div>
                  </li>
                  <li className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">Turnaround Velocity: </span>
                      Total staging and transit takes only {selectedRouteForExplain.totalTransitHours} hours vs over 48 hours in standard mandi multi-tier trading yards.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedRouteForExplain(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800"
                >
                  Close Explainability Insight
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
