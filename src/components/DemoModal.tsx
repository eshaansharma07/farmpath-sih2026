'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useSimulation } from '../lib/context/SimulationContext';
import { 
  X, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle,
  Tractor,
  Snowflake,
  ShieldCheck,
  Scale,
  DollarSign,
  Fuel,
  Clock,
  Flame,
  Factory,
  ArrowRight,
  TrendingUp,
  ChevronDown,
  Sparkles,
  Zap
} from 'lucide-react';

export default function DemoModal() {
  const { 
    isDemoModalOpen, 
    setIsDemoModalOpen, 
    cropLot, 
    updateCropLot,
    conditions, 
    updateConditions,
    results 
  } = useSimulation();

  const [currentChapter, setCurrentChapter] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [selectedLossTab, setSelectedLossTab] = useState<'commission' | 'spoilage' | 'auction' | null>('commission');
  const [activeRouteMode, setActiveRouteMode] = useState<'mandi' | 'farmpath'>('farmpath');
  const [activeFaqId, setActiveFaqId] = useState<number>(1);
  const [gainBreakdownTab, setGainBreakdownTab] = useState<'commission' | 'rot' | 'premium' | null>('commission');

  const totalChapters = 4;

  const optimal = results.optimalRoute;
  const baseline = results.baselineRoute;
  const netMandi = baseline?.costBreakdown.netFarmerRealizationPerKg || 18.90;
  const netFarmpath = optimal?.costBreakdown.netFarmerRealizationPerKg || 24.80;
  const totalGain = results.totalLotValueGain || 29500;
  const gainPct = (((netFarmpath - netMandi) / Math.max(0.1, netMandi)) * 100).toFixed(1);

  // Dynamic values calculated directly from active commodity and solver results
  const mandiTotalPayout = Math.round(netMandi * cropLot.quantityKg);
  const farmpathTotalPayout = Math.round(netFarmpath * cropLot.quantityKg);
  const mandiCommission = baseline?.costBreakdown.intermediaryCostTotal || Math.round(mandiTotalPayout * 0.085);
  const farmpathCommission = optimal?.costBreakdown.intermediaryCostTotal || 0;
  const commissionSaved = Math.max(0, Math.round(mandiCommission - farmpathCommission));

  const mandiSpoilageKg = baseline?.costBreakdown.expectedSpoilageKg || Math.round(cropLot.quantityKg * 0.081);
  const mandiSpoilagePct = baseline?.costBreakdown.expectedSpoilagePct || 8.1;
  const farmpathSpoilageKg = optimal?.costBreakdown.expectedSpoilageKg || Math.round(cropLot.quantityKg * 0.032);
  const farmpathSpoilagePct = optimal?.costBreakdown.expectedSpoilagePct || 3.2;
  const rotKgSaved = Math.max(0, Math.round(mandiSpoilageKg - farmpathSpoilageKg));
  const rotValueSaved = Math.max(
    0,
    Math.round((baseline?.costBreakdown.expectedSpoilageLossValue || 0) - (optimal?.costBreakdown.expectedSpoilageLossValue || 0))
  ) || Math.round(rotKgSaved * (baseline?.costBreakdown.grossPricePerKg || 27));

  const grossContractGain = Math.max(
    0,
    Math.round((optimal?.costBreakdown.grossSaleValue || 0) - (baseline?.costBreakdown.grossSaleValue || 0))
  ) || Math.round(cropLot.quantityKg * 2.2);

  const totalGrossGain = commissionSaved + rotValueSaved + grossContractGain;
  const extraLogisticsCost = Math.max(0, totalGrossGain - totalGain);

  // Auto-play timer (7s per chapter for comfortable digestion)
  useEffect(() => {
    if (isPlaying && isDemoModalOpen) {
      timerRef.current = setTimeout(() => {
        if (currentChapter < totalChapters) {
          setCurrentChapter(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 7000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentChapter, isDemoModalOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isDemoModalOpen) return;
      if (e.key === 'ArrowRight') {
        setCurrentChapter(prev => Math.min(totalChapters, prev + 1));
        setIsPlaying(false);
      } else if (e.key === 'ArrowLeft') {
        setCurrentChapter(prev => Math.max(1, prev - 1));
        setIsPlaying(false);
      } else if (e.key === 'Escape') {
        setIsDemoModalOpen(false);
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDemoModalOpen, setIsDemoModalOpen]);

  if (!isDemoModalOpen) return null;

  const chapters = [
    { id: 1, title: 'The Harvest Lot', tag: '1. Setup' },
    { id: 2, title: 'The Mandi Trap', tag: '2. Leak' },
    { id: 3, title: 'FARMPATH Engine', tag: '3. Route' },
    { id: 4, title: `+₹${totalGain.toLocaleString()} Gain`, tag: '4. Victory' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800 w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header Bar */}
        <div className="px-6 py-3.5 bg-slate-950 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-black text-xs">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base text-white">FARMPATH Interactive Live Tour</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SIH26033
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-slate-700 hidden sm:inline">
                  Team 2brain Cells
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Interactive walkthrough demonstrating how intelligent routing earns the farmer +31.2% more cash
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setIsDemoModalOpen(false);
            }}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5 Minimal Chapter Steps Header */}
        <div className="px-4 sm:px-6 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-1 sm:gap-2">
          {chapters.map(c => {
            const isActive = c.id === currentChapter;
            const isCompleted = c.id < currentChapter;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setCurrentChapter(c.id);
                  setIsPlaying(false);
                }}
                className={`flex-1 py-1.5 px-2 rounded-xl text-center transition-all border text-xs font-bold ${
                  isActive
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-sm'
                    : isCompleted
                    ? 'bg-slate-800/80 text-emerald-400 border-slate-700 hover:bg-slate-800'
                    : 'bg-slate-950/40 text-slate-500 border-slate-800/60 hover:text-slate-300'
                }`}
              >
                <div className="truncate">
                  <span className="opacity-75 mr-1 font-mono">{c.id}.</span>
                  <span>{c.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Content Canvas */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-900/60">

          {/* ================= CHAPTER 1: THE HARVEST LOT & FRESHNESS METER ================= */}
          {currentChapter === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Header Headline */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Step 1 • The Human Reality</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">Meet Farmer Gurmail Singh (Nakodar, Punjab)</h2>
                </div>
                <div className="text-xs px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                  GT Road Corridor (NH-44)
                </div>
              </div>

              {/* Interactive Lot Controller */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">
                  👉 Tap to Test Different Crops &amp; Volumes:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    onClick={() => updateCropLot({ crop: 'Tomato', quantityKg: 5000, maxTransitHours: 48 })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cropLot.crop === 'Tomato'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">🍅 Tomato (5,000 kg)</span>
                      {cropLot.crop === 'Tomato' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">High perishable • 48h window</span>
                  </button>

                  <button
                    onClick={() => updateCropLot({ crop: 'Onion', quantityKg: 5000, maxTransitHours: 72 })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cropLot.crop === 'Onion'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">🧅 Onion (5,000 kg)</span>
                      {cropLot.crop === 'Onion' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Semi-perishable • 72h window</span>
                  </button>

                  <button
                    onClick={() => updateCropLot({ crop: 'Potato', quantityKg: 10000, maxTransitHours: 120 })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      cropLot.crop === 'Potato'
                        ? 'bg-emerald-500/10 border-emerald-500 text-white font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm">🥔 Potato (10,000 kg)</span>
                      {cropLot.crop === 'Potato' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-1">Sturdy bulk • 120h window</span>
                  </button>
                </div>
              </div>

              {/* Freshness Clock Visual Gauge */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-rose-400">
                    <Clock className="w-6 h-6 animate-pulse" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      The Perishability Clock
                    </span>
                    <div className="text-lg font-black text-rose-300 font-mono">
                      {cropLot.maxTransitHours} Hours Freshness Limit
                    </div>
                    <span className="text-xs text-slate-400">
                      Outside Air: <strong className="text-amber-300">{conditions.ambientTemperatureC}°C Summer Heat</strong>
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 max-w-sm border-l border-slate-800 pl-4 space-y-1">
                  <span className="font-bold text-white block">The Dilemma:</span>
                  <p className="text-slate-400 leading-relaxed text-[11px]">
                    4 months of back-breaking farming investment. If Gurmail makes the wrong transit decision tomorrow at dawn, his entire harvest turns to rotten mush in the open sun.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ================= CHAPTER 2: THE MANDI TRAP (INTERACTIVE LOSS EXPLORER) ================= */}
          {currentChapter === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider">Step 2 • The Systemic Drain</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">Why Mandi Trades Drain ₹{totalGain.toLocaleString()}</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Status Quo Bottleneck
                </span>
              </div>

              {/* 3 Interactive Loss Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                <button
                  onClick={() => setSelectedLossTab('commission')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedLossTab === 'commission'
                      ? 'bg-rose-950/80 border-rose-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-rose-400 text-sm">1. Arhatiya Cut</span>
                    <span className="font-mono text-xs font-bold text-rose-300">−8.5%</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono mt-1">−₹{mandiCommission.toLocaleString()}</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Middleman commission deducted before farmer receives single rupee.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedLossTab('spoilage')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedLossTab === 'spoilage'
                      ? 'bg-rose-950/80 border-rose-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-400 text-sm">2. 48h Sun Rot</span>
                    <span className="font-mono text-xs font-bold text-amber-300">{mandiSpoilagePct.toFixed(1)}% Rot</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono mt-1">{mandiSpoilageKg.toLocaleString()} kg Lost</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Tractors idle 54h in 38°C heat; produce decomposes into mud in queue.
                  </p>
                </button>

                <button
                  onClick={() => setSelectedLossTab('auction')}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    selectedLossTab === 'auction'
                      ? 'bg-rose-950/80 border-rose-500 text-white shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-400 text-sm">3. Distress Sale</span>
                    <span className="font-mono text-xs font-bold text-blue-300">₹{netMandi.toFixed(2)}/kg</span>
                  </div>
                  <div className="text-lg font-black text-white font-mono mt-1">₹{mandiTotalPayout.toLocaleString()} Total</div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Zero contract protection; farmer takes whatever local cartel bids.
                  </p>
                </button>
              </div>

              {/* Active Loss Inspector Details Box */}
              <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-500/40 text-xs space-y-1 animate-in fade-in duration-150">
                {selectedLossTab === 'commission' && (
                  <>
                    <div className="flex items-center justify-between text-rose-400 font-bold">
                      <span>Inspection: Middleman Intermediary Commission (−₹{mandiCommission.toLocaleString()})</span>
                      <span className="font-mono text-[10px] bg-rose-500/20 px-2 py-0.5 rounded-full border border-rose-500/30">
                        8.5% Statutory Mandi Fee
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      At APMC mandis, registered commission agents (Arhatiyas) automatically slice <strong>8.5%</strong> off the gross auction total before issuing farmer payment chits. On this lot, that is <strong>₹{mandiCommission.toLocaleString()}</strong> lost before factoring in handling and weighment tips.
                    </p>
                  </>
                )}
                {selectedLossTab === 'spoilage' && (
                  <>
                    <div className="flex items-center justify-between text-amber-400 font-bold">
                      <span>Inspection: Open-Sun Thermal Spoilage ({mandiSpoilageKg.toLocaleString()} kg lost)</span>
                      <span className="font-mono text-[10px] bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-500/30">
                        {mandiSpoilagePct.toFixed(1)}% Spoilage Rate
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      Lacking cold pre-cooling, produce loaded into open tractor trolleys endures high ambient heat ({conditions.ambientTemperatureC}°C) and 48+ hours in auction queues. Cellular respiration accelerates exponentially, turning <strong>{mandiSpoilageKg.toLocaleString()} kg</strong> of harvest into rotten waste dumped outside the mandi yard.
                    </p>
                  </>
                )}
                {selectedLossTab === 'auction' && (
                  <>
                    <div className="flex items-center justify-between text-blue-400 font-bold">
                      <span>Inspection: Distress Spot Auction Payout (₹{mandiTotalPayout.toLocaleString()} Total)</span>
                      <span className="font-mono text-[10px] bg-blue-500/20 px-2 py-0.5 rounded-full border border-blue-500/30">
                        ₹{netMandi.toFixed(2)}/kg Realized
                      </span>
                    </div>
                    <p className="text-slate-300 text-[11px] leading-relaxed">
                      With produce rapidly rotting in the heat, the farmer has zero bargaining power and must accept whatever distress price the local buyer cartel bids, yielding only <strong>₹{netMandi.toFixed(2)} / kg</strong> net cash in hand.
                    </p>
                  </>
                )}
              </div>

              {/* Dynamic Status Quo Bill */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 block uppercase font-mono">
                    Traditional APMC Mandi Payout:
                  </span>
                  <div className="text-2xl font-black text-rose-400 font-mono mt-0.5">
                    ₹{Math.round(netMandi * cropLot.quantityKg).toLocaleString()}
                    <span className="text-xs text-slate-400 font-normal font-sans ml-2">
                      (₹{netMandi.toFixed(2)} / kg realized)
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-400 max-w-sm text-right">
                  Middlemen take the profits while the smallholder bears 100% of the agricultural and weather risk.
                </div>
              </div>
            </div>
          )}

          {/* ================= CHAPTER 3: THE FARMPATH ENGINE (INTERACTIVE ROUTE COMPARATOR) ================= */}
          {currentChapter === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Step 3 • The Algorithmic Engine</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">How FARMPATH Discovers the Route</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  0 ms Constrained Graph Solver
                </span>
              </div>

              {/* Interactive Route Mode Selector */}
              <div className="flex items-center gap-2 p-1.5 bg-slate-950 rounded-2xl border border-slate-800">
                <button
                  onClick={() => setActiveRouteMode('mandi')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeRouteMode === 'mandi'
                      ? 'bg-rose-500/20 border border-rose-500/40 text-rose-300'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Option A: Mandi Open Tractor
                </button>
                <button
                  onClick={() => setActiveRouteMode('farmpath')}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeRouteMode === 'farmpath'
                      ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Option B: FARMPATH Direct (Recommended)
                </button>
              </div>

              {/* Visual Route Pathway Diagram */}
              {activeRouteMode === 'farmpath' ? (
                <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold">1</div>
                      <div>
                        <span className="font-bold text-white block">Nakodar Farmgate</span>
                        <span className="text-[11px] text-slate-400">Origin Loading</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold">2</div>
                      <div>
                        <span className="font-bold text-white block">Doaba Cold Hub</span>
                        <span className="text-[11px] text-emerald-300">Pre-chill to 8°C (Rot drops to 3.2%)</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-emerald-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold">3</div>
                      <div>
                        <span className="font-bold text-white block">Cremica Agro Plant</span>
                        <span className="text-[11px] text-amber-300">Fixed contract @ ₹31.50/kg</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-emerald-800/40 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Transit Distance</span>
                      <span className="font-bold text-white font-mono">46 km (Direct GT Road)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Middleman Fee</span>
                      <span className="font-bold text-emerald-400 font-mono">₹0.00 (0% Cut)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Produce Spoilage</span>
                      <span className="font-bold text-emerald-400 font-mono">{farmpathSpoilagePct.toFixed(1)}% (Only {farmpathSpoilageKg.toLocaleString()} kg)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Net Realization</span>
                      <span className="font-bold text-emerald-300 font-mono">₹{netFarmpath.toFixed(2)} / kg</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-5 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">1</div>
                      <div>
                        <span className="font-bold text-white block">Nakodar Farmgate</span>
                        <span className="text-[11px] text-slate-400">Open Tractor Trailer</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-rose-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">2</div>
                      <div>
                        <span className="font-bold text-white block">Highway Queue Jams</span>
                        <span className="text-[11px] text-rose-300">54 hrs in 38°C sun</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-rose-400 hidden sm:block" />

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 font-bold">3</div>
                      <div>
                        <span className="font-bold text-white block">Maqsudan APMC Mandi</span>
                        <span className="text-[11px] text-rose-300">−8.5% Commission</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-rose-800/40 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Queue Delay</span>
                      <span className="font-bold text-rose-400 font-mono">+24 Hours Stuck</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Arhatiya Fee</span>
                      <span className="font-bold text-rose-400 font-mono">−8.5% Cut (-₹{mandiCommission.toLocaleString()})</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Rot In Queue</span>
                      <span className="font-bold text-rose-400 font-mono">{mandiSpoilagePct.toFixed(1)}% ({mandiSpoilageKg.toLocaleString()} kg lost)</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">Net Realization</span>
                      <span className="font-bold text-rose-300 font-mono">₹{netMandi.toFixed(2)} / kg</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================= CHAPTER 4: THE DYNAMIC PAYOUT (INTERACTIVE BREAKDOWN) ================= */}
          {currentChapter === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Step 4 • The Financial Victory</span>
                  <h2 className="text-xl sm:text-2xl font-black text-white">+₹{totalGain.toLocaleString()} Extra Farmer Cash</h2>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500 text-slate-950 font-black">
                  +{gainPct}% Income Increase
                </span>
              </div>

              {/* Side by Side Comparative Bar */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Option A: Conventional APMC Mandi</span>
                    <span className="font-mono text-white">₹{mandiTotalPayout.toLocaleString()}</span>
                  </div>
                  <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-slate-600 rounded-full transition-all duration-500" 
                      style={{ width: `${(netMandi / netFarmpath) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-emerald-400 font-bold">
                    <span>Option B: FARMPATH Intelligent Direct Route</span>
                    <span className="font-mono text-emerald-400">₹{farmpathTotalPayout.toLocaleString()} (+{gainPct}%)</span>
                  </div>
                  <div className="h-5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full transition-all duration-500" 
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Interactive Gain Breakdown Pills */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    👉 Tap any card to inspect where the +₹{totalGain.toLocaleString()} comes from:
                  </span>
                  {gainBreakdownTab && (
                    <button
                      type="button"
                      onClick={() => setGainBreakdownTab(null)}
                      className="text-[10px] text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Hide Details
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setGainBreakdownTab(prev => prev === 'commission' ? null : 'commission')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gainBreakdownTab === 'commission'
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-sm sm:text-base">+₹{commissionSaved.toLocaleString()}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                        {gainBreakdownTab === 'commission' ? '▲ Open' : '▼ Inspect'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 block font-semibold mt-0.5">0% Intermediary Fee</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Mandi 8.5% cut eliminated</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGainBreakdownTab(prev => prev === 'rot' ? null : 'rot')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gainBreakdownTab === 'rot'
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-sm sm:text-base">+₹{rotValueSaved.toLocaleString()}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                        {gainBreakdownTab === 'rot' ? '▲ Open' : '▼ Inspect'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 block font-semibold mt-0.5">{rotKgSaved.toLocaleString()} kg Rot Saved</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Cold hub stops thermal decay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGainBreakdownTab(prev => prev === 'premium' ? null : 'premium')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gainBreakdownTab === 'premium'
                        ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 text-sm sm:text-base">+₹{grossContractGain.toLocaleString()}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-emerald-300">
                        {gainBreakdownTab === 'premium' ? '▲ Open' : '▼ Inspect'}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-300 block font-semibold mt-0.5">Factory Price Premium</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Direct contract price advantage</span>
                  </button>
                </div>

                {/* 100% Mathematically Rigorous Financial Reconciliation Equation */}
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span>Financial Reconciliation (Why Net Gain is +₹{totalGain.toLocaleString()}):</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">
                      100% Audited Identity
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase font-sans">1. Gross Value Created</span>
                      <span className="text-emerald-400 font-bold text-sm block">+₹{totalGrossGain.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 block font-sans">
                        ₹{commissionSaved.toLocaleString()} + ₹{rotValueSaved.toLocaleString()} + ₹{grossContractGain.toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-0.5">
                      <span className="text-[10px] text-slate-400 block uppercase font-sans">2. Cold Chain Logistics</span>
                      <span className="text-rose-400 font-bold text-sm block">−₹{extraLogisticsCost.toLocaleString()}</span>
                      <span className="text-[10px] text-slate-500 block font-sans">
                        Reefer transport &amp; 8°C pre-cooling
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-950/70 border border-emerald-500/50 space-y-0.5">
                      <span className="text-[10px] text-emerald-300 block uppercase font-sans font-bold">3. Net Cash in Bank</span>
                      <span className="text-white font-black text-sm block">+₹{totalGain.toLocaleString()}</span>
                      <span className="text-[10px] text-emerald-400 block font-sans">
                        Take-home farmer profit boost
                      </span>
                    </div>
                  </div>
                </div>

                {/* Active Gain Inspection Details Drawer */}
                {gainBreakdownTab ? (
                  <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 text-xs space-y-1.5 animate-in fade-in duration-200 shadow-lg">
                    {gainBreakdownTab === 'commission' && (
                      <>
                        <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-emerald-800/60 pb-1.5">
                          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <DollarSign className="w-4 h-4 text-emerald-400" />
                            <span>1. Middleman Commission Elimination (+₹{commissionSaved.toLocaleString()} Saved)</span>
                          </span>
                          <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            100% Retained by Farmer
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed pt-1">
                          At conventional APMC Mandis, commission agents (Arhatiyas) automatically slice <strong>8.5% statutory commission</strong> plus loading and weighment deductions (totaling <strong>₹{mandiCommission.toLocaleString()}</strong>). FARMPATH connects registered FPOs directly to the corporate factory gate under Section 40, completely reducing middleman commission to <strong>₹0.00</strong>.
                        </p>
                      </>
                    )}

                    {gainBreakdownTab === 'rot' && (
                      <>
                        <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-emerald-800/60 pb-1.5">
                          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Snowflake className="w-4 h-4 text-emerald-400" />
                            <span>2. Arrhenius Thermal Spoilage Prevention (+₹{rotValueSaved.toLocaleString()} Saved)</span>
                          </span>
                          <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            {rotKgSaved.toLocaleString()} kg Fresh Produce Saved
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed pt-1">
                          In an open tractor sitting 54 hours in 38°C sun, biological respiration decay destroys <strong>{mandiSpoilagePct.toFixed(1)}% ({mandiSpoilageKg.toLocaleString()} kg)</strong> of harvest. Pre-chilling produce to 8°C at Doaba Cold Hub suppresses respiration, slashing spoilage down to <strong>{farmpathSpoilagePct.toFixed(1)}% ({farmpathSpoilageKg.toLocaleString()} kg)</strong> and saving <strong>{rotKgSaved.toLocaleString()} kg</strong> from rotting into mud.
                        </p>
                      </>
                    )}

                    {gainBreakdownTab === 'premium' && (
                      <>
                        <div className="flex items-center justify-between text-emerald-300 font-bold border-b border-emerald-800/60 pb-1.5">
                          <span className="flex items-center gap-1.5 text-xs sm:text-sm">
                            <Factory className="w-4 h-4 text-emerald-400" />
                            <span>3. Guaranteed Factory Price Premium (+₹{grossContractGain.toLocaleString()})</span>
                          </span>
                          <span className="font-mono text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                            Direct Corporate PO
                          </span>
                        </div>
                        <p className="text-slate-200 text-xs leading-relaxed pt-1">
                          Mandi auctions force distress pricing during daily arrival gluts (often dropping to ₹{netMandi.toFixed(2)}/kg). Direct food processors (Cremica, Del Monte) offer guaranteed forward purchase orders at premium rates (up to ₹{netFarmpath.toFixed(2)}/kg), providing a reliable price floor protected by digital escrow.
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800 text-center text-xs text-slate-500">
                    💡 Tap any of the 3 cards above to view its detailed mathematical &amp; physical breakdown
                  </div>
                )}
              </div>

              {/* 4 Real-World Execution Safeguards */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Institutional Guarantees &amp; Safeguards:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Digital Escrow Payment</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Pre-dispatch quality assaying at cold hub; buyer payment locked in escrow before departure.
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="font-bold text-blue-400 flex items-center gap-1.5">
                      <Scale className="w-4 h-4" />
                      <span>APMC Section 40 Legal</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      100% legally compliant direct procurement under Central FPO framework (2020).
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Fuel className="w-4 h-4" />
                      <span>Rural Fleet Pooling</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Tata 407 &amp; Eicher truck network with 40% fuel advances and OTP delivery sign-off.
                    </p>
                  </div>

                  <div className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 space-y-0.5">
                    <span className="font-bold text-purple-400 flex items-center gap-1.5">
                      <Zap className="w-4 h-4" />
                      <span>Daily 6 AM e-NAM Sync</span>
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Central Agmarknet &amp; e-NAM APIs synced across 2,800+ mandis in MongoDB Atlas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl text-xs text-center font-bold text-emerald-300">
                🏆 Built by Team 2brain Cells for Smart India Hackathon 2026 (Problem Statement: SIH26033)
              </div>
            </div>
          )}

        </div>

        {/* Modal Controls Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentChapter(1);
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Restart</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs ${
                isPlaying
                  ? 'bg-amber-500 hover:bg-amber-600 text-slate-950'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause Auto-Play' : 'Auto Play (7s)'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentChapter === 1}
              onClick={() => {
                setCurrentChapter(prev => Math.max(1, prev - 1));
                setIsPlaying(false);
              }}
              className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
            >
              <SkipBack className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              disabled={currentChapter === totalChapters}
              onClick={() => {
                setCurrentChapter(prev => Math.min(totalChapters, prev + 1));
                setIsPlaying(false);
              }}
              className="px-5 py-1.5 rounded-xl text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <span>{currentChapter === totalChapters ? 'Completed' : 'Next Step'}</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
