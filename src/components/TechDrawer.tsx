'use client';

import React from 'react';
import { useSimulation } from '../lib/context/SimulationContext';
import { X, Cpu, Database, Network, LineChart, Server, Layers, CheckCircle2, Copy } from 'lucide-react';

export default function TechDrawer() {
  const { isTechDrawerOpen, setIsTechDrawerOpen } = useSimulation();

  if (!isTechDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity"
        onClick={() => setIsTechDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-white shadow-2xl border-l border-slate-200 flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <h2 className="text-lg font-bold">Technical Credibility & Architecture</h2>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                SIH 2026 Evaluation Spec • FARMPATH Core Stack
              </p>
            </div>
            <button
              onClick={() => setIsTechDrawerOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-slate-700">
            {/* Tech Stack Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Production Technology Stack
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <LineChart className="w-4 h-4 text-emerald-600" />
                    <span>ML & Forecasting</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">LightGBM / XGBoost Regressor</p>
                  <p className="text-[11px] text-slate-500 mt-1">Multi-factor arrival & mandi price forecasting with conformal prediction intervals.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <Cpu className="w-4 h-4 text-amber-600" />
                    <span>Optimization Engine</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">Google OR-Tools / ILP</p>
                  <p className="text-[11px] text-slate-500 mt-1">Constrained Mixed-Integer Linear Programming maximizing net farmer realization.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <Network className="w-4 h-4 text-blue-600" />
                    <span>Graph Representation</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">Weighted Directed Acyclic Graph</p>
                  <p className="text-[11px] text-slate-500 mt-1">Multi-echelon network with multi-attribute edge weights (distance, freight, vibration, cooling).</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <Database className="w-4 h-4 text-indigo-600" />
                    <span>Geospatial Database</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">PostgreSQL 16 + PostGIS</p>
                  <p className="text-[11px] text-slate-500 mt-1">Spatial indexing (R-Tree), road network topology (pgRouting), and temporal partitions.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <Server className="w-4 h-4 text-purple-600" />
                    <span>Backend Microservices</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">Python 3.11 + FastAPI</p>
                  <p className="text-[11px] text-slate-500 mt-1">Asynchronous RESTful APIs with Pydantic validation and Celery task execution.</p>
                </div>

                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50/50">
                  <div className="flex items-center gap-2 text-slate-900 font-semibold text-xs mb-1">
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>Frontend Twin</span>
                  </div>
                  <p className="text-xs font-mono text-slate-600">Next.js 14 / React / Tailwind</p>
                  <p className="text-[11px] text-slate-500 mt-1">Responsive client-side decision simulator with real-time recalculation engine.</p>
                </div>
              </div>
            </div>

            {/* Mathematical Formulation */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Optimization Problem Formulation
              </h3>
              <div className="p-3.5 rounded-lg bg-slate-900 text-slate-100 font-mono text-xs space-y-2">
                <div className="text-emerald-400 font-semibold">
                  maximize: NetFarmerRealization(r)
                </div>
                <div className="text-slate-300 pl-4">
                  = [ Q · (1 - Spoilage(r)) · Price_dest ]<br />
                  &nbsp;&nbsp;- TransportCost(r, fuel)<br />
                  &nbsp;&nbsp;- ∑ HandlingCost(v)<br />
                  &nbsp;&nbsp;- ∑ StorageCost(v)<br />
                  &nbsp;&nbsp;- ∑ IntermediaryCommission(v)
                </div>
                <div className="pt-2 text-amber-300 font-semibold">subject to:</div>
                <div className="text-slate-300 pl-4 space-y-1 text-[11px]">
                  <div>1. TransitTime(r) ≤ MaxAllowedWindow</div>
                  <div>2. SpoilagePct(r) ≤ CropPerishabilityThreshold (10%)</div>
                  <div>3. LotQuantity ≤ BuyerAbsorptionQuota</div>
                  <div>4. CropLotQuality ∈ BuyerAcceptanceSet</div>
                  <div>5. Route r is connected path in G(V, E)</div>
                </div>
              </div>
            </div>

            {/* Spoilage Decay Physics */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Biochemical Perishability Model
              </h3>
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1.5">
                <p className="font-semibold">Modified Arrhenius Decay Function:</p>
                <p className="font-mono text-[11px]">
                  L(t) = 1 - exp[ -k_crop · (1 + β·ΔT) · t_transit · α_cold · γ_vibration ]
                </p>
                <p className="text-[11px] text-emerald-800">
                  Parameters calibrated to post-harvest respiration curves for Punjab lycopene crops.
                  Cold chain reduces decay coefficient by 75% (α_cold = 0.25).
                </p>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                SIH Rigor & Verification
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% deterministic & internally consistent mathematical calculations.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No hardcoded UI illusions; parameters alter optimal route dynamically.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>59 realistic geolocated nodes across 7 agricultural districts in Punjab.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">FARMPATH Core v2.4</span>
            <button
              onClick={() => setIsTechDrawerOpen(false)}
              className="px-4 py-1.5 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
            >
              Close Technical Drawer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
