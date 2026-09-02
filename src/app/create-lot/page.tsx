'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSimulation } from '../../lib/context/SimulationContext';
import { CropType, QualityGrade } from '../../lib/engine/types';
import { PUNJAB_NODES } from '../../lib/data/punjabData';
import { 
  Tractor, 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  Clock, 
  Layers, 
  CheckCircle2, 
  Loader2,
  Package,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function CreateCropLotPage() {
  const router = useRouter();
  const { 
    cropLot, 
    updateCropLot, 
    runSimulationPipeline, 
    isSimulating,
    results 
  } = useSimulation();

  const [crop, setCrop] = useState<CropType>(cropLot.crop);
  const [quantityKg, setQuantityKg] = useState<number>(cropLot.quantityKg);
  const [farmerId, setFarmerId] = useState<string>(cropLot.farmerId);
  const [harvestDate, setHarvestDate] = useState<string>(cropLot.harvestDate);
  const [maxTransitHours, setMaxTransitHours] = useState<number>(cropLot.maxTransitHours);
  const [availableStorageKg, setAvailableStorageKg] = useState<number>(cropLot.availableOnFarmStorageKg);
  const [quality, setQuality] = useState<QualityGrade>(cropLot.quality);

  const [currentPipelineStep, setCurrentPipelineStep] = useState<string>('');
  const [pipelineProgress, setPipelineProgress] = useState<number>(0);
  const [hasCompletedRun, setHasCompletedRun] = useState<boolean>(false);

  const farmNodes = PUNJAB_NODES.filter(n => n.type === 'farm');

  const handleGenerateMarketOptions = async () => {
    // 1. Commit form changes to state
    const selectedFarm = farmNodes.find(f => f.id === farmerId) || farmNodes[0];
    updateCropLot({
      crop,
      quantityKg,
      farmerId,
      farmerName: selectedFarm.name,
      farmLocation: selectedFarm.location,
      harvestDate,
      maxTransitHours,
      availableOnFarmStorageKg: availableStorageKg,
      quality,
    });

    // 2. Animate pipeline
    setHasCompletedRun(false);
    await runSimulationPipeline((stepText, progressPct) => {
      setCurrentPipelineStep(stepText);
      setPipelineProgress(progressPct);
    });
    setHasCompletedRun(true);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Tractor className="w-5 h-5 text-emerald-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create & Register Crop Lot</h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Specify crop volume, farm origin, and perishability constraints to generate feasible market routes.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Container */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-slate-900">Lot Specifications</h2>
            <p className="text-xs text-slate-500">All parameters are fed dynamically into the mathematical graph engine.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Crop Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Crop Commodity
              </label>
              <select
                value={crop}
                onChange={e => setCrop(e.target.value as CropType)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Tomato">Tomato (High Perishability / Fast Respiration)</option>
                <option value="Onion">Onion (Medium Perishability / Allium Bulb)</option>
                <option value="Potato">Potato (Durable Tuber / Cold Storage)</option>
                <option value="Wheat">Wheat (Durable Cereal Grain / Low Moisture)</option>
              </select>
            </div>

            {/* Quantity Slider / Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Lot Quantity: <span className="text-emerald-700 font-bold">{quantityKg.toLocaleString()} kg</span>
              </label>
              <div className="space-y-1.5">
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="500"
                  value={quantityKg}
                  onChange={e => setQuantityKg(Number(e.target.value))}
                  className="w-full accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>1,000 kg (Smallholder)</span>
                  <span>5,000 kg (Standard)</span>
                  <span>15,000 kg (Commercial)</span>
                </div>
              </div>
            </div>

            {/* Farm Location Predefined Selector */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Farm Origin Location (Punjab Cluster)
              </label>
              <select
                value={farmerId}
                onChange={e => setFarmerId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {farmNodes.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} — {f.location.district} District [{f.location.lat.toFixed(3)}°N, {f.location.lng.toFixed(3)}°E]
                  </option>
                ))}
              </select>
            </div>

            {/* Harvest Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Harvest Window
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={harvestDate}
                  onChange={e => setHarvestDate(e.target.value)}
                  placeholder="e.g. Tomorrow (Early Morning)"
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Calendar className="w-4 h-4 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Maximum Transit Time */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Max Acceptable Transit Time
              </label>
              <div className="relative">
                <select
                  value={maxTransitHours}
                  onChange={e => setMaxTransitHours(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value={24}>24 Hours (Strict Freshness)</option>
                  <option value={48}>48 Hours (Standard Perishable Window)</option>
                  <option value={72}>72 Hours (Extended Regional Transit)</option>
                  <option value={96}>96 Hours (Long-Haul Metro)</option>
                </select>
                <Clock className="w-4 h-4 text-slate-400 absolute right-8 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Available Storage */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Available Farmgate Storage
              </label>
              <input
                type="number"
                value={availableStorageKg}
                onChange={e => setAvailableStorageKg(Number(e.target.value))}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Temporary covered holding capacity at farm</span>
            </div>

            {/* Quality Grade */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Quality Grade
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['A', 'B', 'C'] as QualityGrade[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setQuality(g)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                      quality === g
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Grade {g}
                  </button>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                {quality === 'A' ? 'Premium (Direct Processor & Modern Retail Eligible)' : quality === 'B' ? 'Standard Table Quality' : 'Processing / Economy Grade'}
              </span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-2">
            <button
              disabled={isSimulating}
              onClick={handleGenerateMarketOptions}
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Supply-Chain Graph...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>GENERATE MARKET OPTIONS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Simulation Progress / Output Terminal */}
        <div className="space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800 flex flex-col justify-between min-h-[380px]">
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isSimulating ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`}></span>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Execution Pipeline
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  {isSimulating ? `${pipelineProgress}%` : hasCompletedRun ? 'Complete' : 'Ready'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-1.5 mb-4 overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full transition-all duration-300"
                  style={{ width: `${isSimulating ? pipelineProgress : hasCompletedRun ? 100 : 0}%` }}
                />
              </div>

              {/* Animated Step Feed */}
              <div className="space-y-2.5 font-mono text-xs">
                {isSimulating || hasCompletedRun ? (
                  <>
                    <div className="flex items-start gap-2 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>Building supply-chain graph... (59 Nodes, 4 Echelons)</span>
                    </div>
                    {pipelineProgress >= 35 && (
                      <div className="flex items-start gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>Evaluating 42 candidate paths from origin...</span>
                      </div>
                    )}
                    {pipelineProgress >= 50 && (
                      <div className="flex items-start gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>Estimating wholesale & contract pricing...</span>
                      </div>
                    )}
                    {pipelineProgress >= 68 && (
                      <div className="flex items-start gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>Estimating logistics freight & vibration toll...</span>
                      </div>
                    )}
                    {pipelineProgress >= 85 && (
                      <div className="flex items-start gap-2 text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                        <span>Calculating biochemical spoilage risk...</span>
                      </div>
                    )}
                    {pipelineProgress >= 100 && (
                      <div className="flex items-start gap-2 text-emerald-300 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-400" />
                        <span>Pruning 15 infeasible paths → Optimal Found!</span>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-slate-500 italic">
                    Press &quot;GENERATE MARKET OPTIONS&quot; to compile the graph solver for this lot.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Result Reveal */}
            {hasCompletedRun && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3 animate-in fade-in">
                <div className="p-3 bg-emerald-950/70 border border-emerald-800 rounded-xl">
                  <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-semibold">
                    Optimal Net Outcome
                  </span>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">
                    ₹{results.optimalRoute?.costBreakdown.netFarmerRealizationPerKg.toFixed(2)}/kg
                  </div>
                  <span className="text-xs text-slate-300">
                    +₹{results.netRealizationImprovementPerKg.toFixed(2)}/kg over conventional baseline
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => router.push('/comparison')}
                    className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Inspect Routes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => router.push('/map')}
                    className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                  >
                    View Map
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
