'use client';

import React, { useState, useEffect } from 'react';
import { useSimulation } from '../lib/context/SimulationContext';
import { 
  Tractor, 
  Store, 
  Factory, 
  Building2, 
  Truck, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Play, 
  RotateCcw,
  Navigation,
  MapPin,
  Clock,
  Sparkles,
  Info
} from 'lucide-react';

export default function SupplyChainMapViewer() {
  const { results, conditions, cropLot, updateConditions } = useSimulation();

  const optimal = results.optimalRoute;
  const baseline = results.baselineRoute;

  // View toggle: 'optimal' (Green route) vs 'baseline' (Red mandi route)
  const [activeRouteView, setActiveRouteView] = useState<'optimal' | 'baseline'>('optimal');
  const [isPlayingAnimation, setIsPlayingAnimation] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);

  // Animated truck along the route
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAnimation) {
      interval = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            setIsPlayingAnimation(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlayingAnimation]);

  const startAnimation = (view: 'optimal' | 'baseline') => {
    setActiveRouteView(view);
    setAnimationProgress(0);
    setIsPlayingAnimation(true);
  };

  const isOptimal = activeRouteView === 'optimal';

  // Geographic key landmarks coordinates on our calibrated Punjab SVG canvas (viewBox 0 0 900 650)
  // Nakodar (Farm): x=380, y=340
  // Maqsudan Mandi (Jalandhar): x=410, y=260
  // Doaba Cold Hub: x=440, y=320
  // Cremica Processing Plant (Phillaur): x=540, y=390
  // Ludhiana Hub: x=580, y=420
  // Amritsar Mandi: x=240, y=190
  // Hoshiarpur: x=520, y=200

  // Truck position interpolated
  const getTruckPosition = () => {
    const t = animationProgress / 100;
    if (activeRouteView === 'optimal') {
      // 2 segments: Farm (380,340) -> Cold Hub (440,320) -> Cremica (540,390)
      if (t < 0.4) {
        const segT = t / 0.4;
        return {
          x: 380 + (440 - 380) * segT,
          y: 340 + (320 - 340) * segT,
        };
      } else {
        const segT = (t - 0.4) / 0.6;
        return {
          x: 440 + (540 - 440) * segT,
          y: 320 + (390 - 320) * segT,
        };
      }
    } else {
      // 2 segments: Farm (380,340) -> Maqsudan Mandi (410,260) -> Wholesaler Yard (450,250)
      if (t < 0.6) {
        const segT = t / 0.6;
        return {
          x: 380 + (410 - 380) * segT,
          y: 340 + (260 - 340) * segT,
        };
      } else {
        const segT = (t - 0.6) / 0.4;
        return {
          x: 410 + (450 - 410) * segT,
          y: 260 + (250 - 260) * segT,
        };
      }
    }
  };

  const truckPos = getTruckPosition();

  return (
    <div className="space-y-6">
      {/* Route Switcher & Legend Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Road Route:</span>
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold">
            <button
              onClick={() => {
                setActiveRouteView('optimal');
                setAnimationProgress(100);
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                isOptimal 
                  ? 'bg-emerald-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
              <span>1. FARMPATH Route (Direct Value-Add)</span>
            </button>
            <button
              onClick={() => {
                setActiveRouteView('baseline');
                setAnimationProgress(100);
              }}
              className={`px-3.5 py-1.5 rounded-lg flex items-center gap-2 transition-all ${
                !isOptimal 
                  ? 'bg-rose-700 text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              <span>2. Old Mandi Route (What happens today)</span>
            </button>
          </div>
        </div>

        {/* Play animated truck button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => startAnimation(activeRouteView)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-850 text-xs font-bold flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
          >
            <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
            <span>Follow Truck on Road (Animate)</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Map Canvas & Route Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Geographic Punjab Map Canvas (8 Columns) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-3xl border border-slate-800 p-4 sm:p-6 shadow-md overflow-hidden relative">
          {/* Header over map */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white">Punjab Agri-Transit Geographic Corridor</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">National Highway NH-44 & GT Road Corridor</span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Smart Route</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>Mandi Route</span>
              </div>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[4/3] bg-[#0c1424] rounded-2xl overflow-hidden border border-slate-800">
            <svg 
              viewBox="0 0 900 650" 
              className="w-full h-full select-none"
            >
              {/* Background Geographic Grid & Punjab Region Silhouette */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.5" strokeOpacity="0.4" />
                </pattern>
                <linearGradient id="optimalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              <rect width="900" height="650" fill="url(#grid)" />

              {/* Punjab State Subtle Outline */}
              <path
                d="M 160,120 L 320,80 L 480,90 L 620,130 L 740,240 L 710,410 L 660,520 L 480,590 L 290,560 L 140,440 L 110,260 Z"
                fill="#0f1f38"
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* District Labels */}
              <text x="390" y="235" fill="#475569" fontSize="11" fontWeight="700" letterSpacing="1">JALANDHAR DISTRICT</text>
              <text x="540" y="445" fill="#475569" fontSize="11" fontWeight="700" letterSpacing="1">LUDHIANA DISTRICT</text>
              <text x="210" y="170" fill="#475569" fontSize="11" fontWeight="700" letterSpacing="1">AMRITSAR</text>
              <text x="500" y="160" fill="#475569" fontSize="11" fontWeight="700" letterSpacing="1">HOSHIARPUR</text>

              {/* Highway NH-44 Corridor (Base Road) */}
              <path
                d="M 240,190 Q 320,225 410,260 T 500,340 T 540,390 T 580,420 T 670,490"
                fill="none"
                stroke="#1e293b"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <text x="575" y="375" fill="#64748b" fontSize="9" fontWeight="bold">NH-44</text>

              {/* Road 1: Old Mandi Path (Red / Amber line) */}
              <path
                d="M 380,340 Q 395,300 410,260 L 450,250"
                fill="none"
                stroke={!isOptimal ? "#f43f5e" : "#e11d48"}
                strokeWidth={!isOptimal ? "5" : "2"}
                strokeDasharray={!isOptimal ? "none" : "4,4"}
                strokeOpacity={!isOptimal ? 1 : 0.3}
                strokeLinecap="round"
              />

              {/* Road 2: FARMPATH Smart Route (Thick Emerald Highway) */}
              <path
                d="M 380,340 Q 410,330 440,320 Q 490,355 540,390"
                fill="none"
                stroke={isOptimal ? "#10b981" : "#059669"}
                strokeWidth={isOptimal ? "6" : "2"}
                strokeOpacity={isOptimal ? 1 : 0.25}
                strokeLinecap="round"
              />

              {/* Animated Truck Icon on the Road */}
              {isPlayingAnimation && (
                <g transform={`translate(${truckPos.x - 14}, ${truckPos.y - 14})`}>
                  <circle cx="14" cy="14" r="16" fill={isOptimal ? "#10b981" : "#f43f5e"} fillOpacity="0.2" className="animate-ping" />
                  <rect x="0" y="0" width="28" height="28" rx="8" fill={isOptimal ? "#047857" : "#be123c"} stroke="#ffffff" strokeWidth="2" />
                  <text x="14" y="19" textAnchor="middle" fontSize="14">🚚</text>
                </g>
              )}

              {/* Node 1: Origin Farm (Nakodar) */}
              <g transform="translate(380, 340)">
                <circle cx="0" cy="0" r="22" fill="#10b981" fillOpacity="0.15" />
                <circle cx="0" cy="0" r="12" fill="#047857" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="10">🚜</text>
                <text x="-10" y="-18" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Gurmail&apos;s Farm
                </text>
                <text x="-10" y="-6" fill="#94a3b8" fontSize="9" textAnchor="middle">
                  Nakodar (5,000 kg Tomatoes)
                </text>
              </g>

              {/* Node 2: Conventional Maqsudan Mandi */}
              <g transform="translate(410, 260)">
                <circle cx="0" cy="0" r="20" fill="#f59e0b" fillOpacity="0.15" />
                <circle cx="0" cy="0" r="11" fill="#b45309" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="10">🏪</text>
                <text x="5" y="-16" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="start">
                  Maqsudan APMC Mandi
                </text>
                <text x="5" y="-4" fill="#ef4444" fontSize="9" fontWeight="bold" textAnchor="start">
                  -8.5% middleman commission
                </text>
              </g>

              {/* Node 3: Doaba FPO Cold Pre-Cooling Hub */}
              <g transform="translate(440, 320)">
                <circle cx="0" cy="0" r="18" fill="#06b6d4" fillOpacity="0.15" />
                <circle cx="0" cy="0" r="10" fill="#0891b2" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="3.5" textAnchor="middle" fontSize="9">❄️</text>
                <text x="14" y="3" fill="#67e8f9" fontSize="10" fontWeight="bold">
                  Doaba Cold Hub
                </text>
                <text x="14" y="14" fill="#94a3b8" fontSize="8">
                  Pre-cooling (saves 400kg rot)
                </text>
              </g>

              {/* Node 4: Cremica Food Processing Plant (Phillaur) */}
              <g transform="translate(540, 390)">
                <circle cx="0" cy="0" r="24" fill="#3b82f6" fillOpacity="0.2" />
                <circle cx="0" cy="0" r="13" fill="#1d4ed8" stroke="#ffffff" strokeWidth="2" />
                <text x="0" y="4" textAnchor="middle" fontSize="10">🏭</text>
                <text x="0" y="26" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
                  Cremica Processing Plant
                </text>
                <text x="0" y="38" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Pays ₹31.50/kg fixed contract
                </text>
              </g>

              {/* Floating Route Badge on Map */}
              <g transform={isOptimal ? "translate(470, 420)" : "translate(340, 240)"}>
                <rect x="0" y="0" width="200" height="42" rx="10" fill="#0f172a" stroke={isOptimal ? "#10b981" : "#f43f5e"} strokeWidth="1.5" />
                <text x="12" y="18" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {isOptimal ? "FARMPATH Recommended" : "Conventional Mandi"}
                </text>
                <text x="12" y="32" fill={isOptimal ? "#34d399" : "#fda4af"} fontSize="10" fontWeight="mono">
                  {isOptimal ? "₹24.80/kg • 2.5 hrs • 0% commission" : "₹18.90/kg • 48 hrs • 8.1% rot"}
                </text>
              </g>
            </svg>
          </div>
        </div>

        {/* Right Column: Clear Plain-English Route Story (4 Columns) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="space-y-1">
            <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-wider inline-block ${
              isOptimal ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {isOptimal ? 'Active Choice: Recommended Route' : 'Active Choice: Old Mandi Route'}
            </span>
            <h3 className="text-lg font-black text-slate-900">
              {isOptimal ? 'The Direct Value-Add Highway' : 'The Broken Intermediary Queue'}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              {isOptimal 
                ? 'By driving 46 km on NH-44 highway directly to Phillaur, Gurmail avoids the auction queue and puts +₹29,500 more into his family savings.'
                : 'Gurmail drives only 24 km to the local mandi, but waits 2 days in the heat while middlemen cut his earnings.'}
            </p>
          </div>

          {/* Unit Economics Comparison Table */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 text-xs">
            <div className="flex justify-between items-center border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Destination:</span>
              <span className="font-bold text-slate-900">
                {isOptimal ? 'Cremica Agro Foods (Phillaur)' : 'Maqsudan APMC Mandi (Jalandhar)'}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Transit Duration:</span>
              <span className="font-bold text-slate-900">
                {isOptimal ? '2.5 Hours (NH-44 Highway)' : '48 Hours (Yard Waiting)'}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Middleman Cut:</span>
              <span className={`font-bold ${isOptimal ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isOptimal ? '₹0 (Direct sale)' : '8.5% Commission (₹8,000+)'}
              </span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200/70 pb-2">
              <span className="text-slate-500">Produce Spoilage:</span>
              <span className={`font-bold ${isOptimal ? 'text-emerald-700' : 'text-rose-700'}`}>
                {isOptimal ? 'Only 3.2% (160 kg)' : '8.1% Rot (405 kg thrown away)'}
              </span>
            </div>

            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-slate-800">Net Farmer Cash:</span>
              <span className={`text-lg font-black font-mono ${isOptimal ? 'text-emerald-700' : 'text-slate-800'}`}>
                ₹{isOptimal ? '24.80' : '18.90'} <span className="text-xs font-normal text-slate-500">/ kg</span>
              </span>
            </div>
          </div>

          {/* Total Farmer Payout Card */}
          <div className={`p-4 rounded-2xl text-center border ${
            isOptimal 
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950' 
              : 'bg-slate-100 border-slate-200 text-slate-800'
          }`}>
            <span className="text-xs text-slate-500 block font-medium">
              {isOptimal ? 'Total Farmer Income for 5,000 kg:' : 'Total Mandi Income for 5,000 kg:'}
            </span>
            <div className="text-2xl font-black mt-0.5">
              ₹{isOptimal ? '124,000' : '94,500'}
            </div>
            {isOptimal && (
              <span className="text-xs font-bold text-emerald-700 mt-1 block">
                +₹29,500 Extra Cash in Pocket (+31.2%)
              </span>
            )}
          </div>

          {/* Step-by-Step Road Journey */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 block">Road Journey Stops:</span>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <div>
                  <span className="font-bold text-slate-900 block">Nakodar Farm (Harvest gate)</span>
                  <span className="text-[11px] text-slate-500">Loaded onto truck at 6:00 AM</span>
                </div>
              </div>

              {isOptimal ? (
                <>
                  <div className="p-2.5 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Doaba FPO Cold Hub</span>
                      <span className="text-[11px] text-cyan-800">18 km • Pre-cooled to 8°C (prevents rotting)</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-blue-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Cremica Agro Foods (Phillaur)</span>
                      <span className="text-[11px] text-blue-800">46 km • Direct factory delivery at ₹31.50/kg</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Maqsudan Mandi Auction Queue</span>
                      <span className="text-[11px] text-rose-800">24 km • 48 hours waiting in open sun</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-rose-700 text-white font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                    <div>
                      <span className="font-bold text-slate-900 block">Wholesaler Yard Transfer</span>
                      <span className="text-[11px] text-rose-800">8.1% produce spoiled & middleman fee deducted</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
