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
  TrendingUp, 
  MapPin, 
  Cpu, 
  HelpCircle, 
  Award,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

interface DemoStepInfo {
  step: number;
  title: string;
  subtitle: string;
  badge: string;
  category: 'Input' | 'Graph' | 'Physics' | 'Optimization' | 'Decision';
  details: string;
  metrics?: { label: string; value: string; color?: string }[];
  technicalNote: string;
}

const DEMO_STEPS: DemoStepInfo[] = [
  {
    step: 1,
    title: 'Create Crop Lot Profile',
    subtitle: 'Farmer Gurmail Singh (Nakodar, Jalandhar) registers harvested produce',
    badge: 'Step 1 of 13',
    category: 'Input',
    details: 'The farmer logs 5,000 kg of Grade-A hybrid tomatoes harvested tomorrow at dawn. The system registers geographical origin coordinates [31.1270° N, 75.4740° E], available on-farm shade storage (1,000 kg), and a strict 48-hour transit freshness window.',
    metrics: [
      { label: 'Crop Lot', value: '5,000 kg Tomatoes' },
      { label: 'Location', value: 'Nakodar Cluster (Punjab)' },
      { label: 'Quality Grade', value: 'Grade A (Hybrid Table)' },
      { label: 'Freshness Window', value: '48 Hours Max' },
    ],
    technicalNote: 'Ingested via mobile farmer interface or local FPO kiosk into the geospatial candidate queue.',
  },
  {
    step: 2,
    title: 'Discover Candidate Buyers & Mandis',
    subtitle: 'Spatial querying across the Punjab agricultural network',
    badge: 'Step 2 of 13',
    category: 'Graph',
    details: 'FARMPATH queries its multi-echelon network of 59 verified entities within an 85 km radius: 8 collection centers, 6 APMC mandis, 5 food processing plants, and 10 modern institutional trade hubs.',
    metrics: [
      { label: 'Radius Queried', value: '85 km Road Network' },
      { label: 'Entities Scanned', value: '59 Regional Nodes' },
      { label: 'Eligible Mandis', value: '6 APMC Markets' },
      { label: 'Direct Buyers', value: '15 Processors & Inst.' },
    ],
    technicalNote: 'Spatial filtering performed using PostGIS R-Tree indexed bounding circle with road topology.',
  },
  {
    step: 3,
    title: 'Load Multi-Source Spot & Contract Prices',
    subtitle: 'Harvesting price vectors across APMC auctions and direct buyer POs',
    badge: 'Step 3 of 13',
    category: 'Input',
    details: 'The system pulls wholesale auction prices from Jalandhar, Ludhiana, Amritsar, and Khanna Mandis alongside purchase orders from food processors (Cremica, Pagro, Del Monte) and quick-commerce dark stores (Blinkit, BigBasket).',
    metrics: [
      { label: 'Local Mandi Spot', value: '₹27.00/kg' },
      { label: 'Ludhiana Mandi', value: '₹28.50/kg' },
      { label: 'Processor Offer', value: '₹31.50 - ₹32.00/kg' },
      { label: 'Inst. Buyer Offer', value: '₹30.50 - ₹33.50/kg' },
    ],
    technicalNote: 'Data ingested via Agmarknet e-NAM feeds and verified B2B procurement contract webhooks.',
  },
  {
    step: 4,
    title: 'Forecast Short-Term Price Trajectory',
    subtitle: 'Machine learning predictive horizon for next 3–7 days',
    badge: 'Step 4 of 13',
    category: 'Physics',
    details: 'LightGBM and XGBoost regressors evaluate arrival momentum, rainfall forecasts, and historical seasonal elasticity. Model predicts a stable ₹28.50/kg mandi spot with 87% confidence, but flags high volatility if incoming arrivals peak.',
    metrics: [
      { label: 'Forecast (3-Day)', value: '₹28.40/kg (±₹1.2)' },
      { label: 'Model Confidence', value: '87% Interval' },
      { label: 'Arrival Trend', value: '+14% Expected Surge' },
      { label: 'Mandi Volatility', value: 'High Downside Risk' },
    ],
    technicalNote: 'LightGBM model trained on 5 years of daily Agmarknet mandi arrivals and IMD weather indices.',
  },
  {
    step: 5,
    title: 'Construct Multi-Echelon Supply Chain Graph',
    subtitle: 'Building candidate directed paths from farm to consumer destinations',
    badge: 'Step 5 of 13',
    category: 'Graph',
    details: 'The graph generator constructs all simple paths across 4 distinct supply chain echelons: Farmgate → Primary Collection Hub → Wholesale/Processing Gate → Consumer Retail/Fulfillment.',
    metrics: [
      { label: 'Candidate Routes', value: '42 Total Paths' },
      { label: 'Graph Topology', value: 'Directed Acyclic Graph' },
      { label: 'Network Tiers', value: '4 Echelons' },
      { label: 'Intermediary Steps', value: '1 to 4 Transfers' },
    ],
    technicalNote: 'Directed acyclic graph traversal bounded by depth limit of 4 hops and geographical bounding box.',
  },
  {
    step: 6,
    title: 'Calculate Logistics & Freight Physics',
    subtitle: 'Dynamic road distance, diesel consumption, and toll simulation',
    badge: 'Step 6 of 13',
    category: 'Physics',
    details: 'For all 42 paths, the logistics engine calculates precise route distance, diesel consumption based on current ₹95/L fuel pricing, vehicle capacity utilization (1.5-ton vs 5-ton trucks), road roughness, and highway toll overheads.',
    metrics: [
      { label: 'Baseline Fuel', value: '₹95.00/L' },
      { label: 'Shortest Route', value: '28 km (₹1.80/kg)' },
      { label: 'Direct Factory', value: '46 km (₹2.40/kg)' },
      { label: 'Long-Haul Metro', value: '340 km (₹6.80/kg)' },
    ],
    technicalNote: 'Uses parameterized ton-km freight equations calibrated with All India Motor Transport Congress tariffs.',
  },
  {
    step: 7,
    title: 'Estimate Biochemical Perishability & Spoilage',
    subtitle: 'Temperature and transit time decay modeling',
    badge: 'Step 7 of 13',
    category: 'Physics',
    details: 'Given ambient summer temperatures of 32°C, the engine models cellular respiration decay for tomatoes. Standard open-body mandi transit results in 8.1% spoilage; pre-cooled reefer or swift direct routing reduces loss to 3.2%.',
    metrics: [
      { label: 'Ambient Temp', value: '32°C' },
      { label: 'Mandi Path Spoilage', value: '8.1% (405 kg lost)' },
      { label: 'Optimized Path', value: '3.2% (160 kg lost)' },
      { label: 'Crop Saved', value: '245 kg Produce' },
    ],
    technicalNote: 'Arrhenius respiration decay equation incorporating mechanical vibration and thermal exposure.',
  },
  {
    step: 8,
    title: 'Constraint Enforcement & Path Pruning',
    subtitle: 'Eliminating impossible, unsafe, or sub-viable candidate routes',
    badge: 'Step 8 of 13',
    category: 'Optimization',
    details: 'The optimization solver rigorously tests all 42 routes against operational constraints. 15 candidate routes are pruned: 6 exceeded transit time (>48h), 5 exceeded spoilage cutoff (>10%), and 4 exceeded buyer procurement capacities.',
    metrics: [
      { label: 'Evaluated Routes', value: '42 Candidates' },
      { label: 'Pruned / Infeasible', value: '15 Routes Eliminated' },
      { label: 'Remaining Feasible', value: '27 Valid Routes' },
      { label: 'Elimination Reason', value: 'Spoilage, Time, Quota' },
    ],
    technicalNote: 'Hard constraint bounding reduces the search space prior to integer linear programming execution.',
  },
  {
    step: 9,
    title: 'Execute Constrained Optimization Solver',
    subtitle: 'Maximizing expected net farmer realization across feasible solution space',
    badge: 'Step 9 of 13',
    category: 'Optimization',
    details: 'The optimization solver computes the exact economic breakdown for each of the 27 feasible paths: Gross Revenue - Transport - Handling - Storage - Intermediary Commissions - Spoilage Value. Evaluates routes to find the global optimum.',
    metrics: [
      { label: 'Objective', value: 'Maximize Net Realization' },
      { label: 'Feasible Evaluated', value: '27 Candidate Paths' },
      { label: 'Solution Time', value: '< 18 ms' },
      { label: 'Solver Paradigm', value: 'Deterministic ILP' },
    ],
    technicalNote: 'Mathematically formulated as a Multi-Commodity Network Flow with piecewise linear spoilage costs.',
  },
  {
    step: 10,
    title: 'Rank Feasible Solution Space & Shortlist',
    subtitle: 'Multi-criteria ranking of top alternatives',
    badge: 'Step 10 of 13',
    category: 'Optimization',
    details: 'The engine sorts all 27 feasible options. 8 high-loss paths and 5 economically inferior routes are filtered out. The system shortlists the top 3 high-performance routes for farmer review.',
    metrics: [
      { label: 'Shortlist Top 1', value: '₹24.80/kg Net' },
      { label: 'Shortlist Top 2', value: '₹23.40/kg Net' },
      { label: 'Shortlist Top 3', value: '₹22.10/kg Net' },
      { label: 'Conventional Base', value: '₹18.90/kg Net' },
    ],
    technicalNote: 'Top candidate routes ranked with confidence intervals against demand fulfillment probability.',
  },
  {
    step: 11,
    title: 'Recommend Globally Optimal Route',
    subtitle: 'Optimal Route Selected: Farm → Collection Center → Agro-Processor',
    badge: 'Step 11 of 13',
    category: 'Decision',
    details: 'FARMPATH selects Route B: Nakodar Farm → Doaba FPO Aggregation Hub → Cremica Agro Foods (Phillaur Plant). Total distance is 46 km with direct offloading and contract pricing.',
    metrics: [
      { label: 'Selected Route', value: 'Farm → FPO CC → Processor' },
      { label: 'Optimal Realization', value: '₹24.80/kg' },
      { label: 'Conventional Baseline', value: '₹18.90/kg' },
      { label: 'Net Gain', value: '+₹5.90/kg (+31.2%)' },
    ],
    technicalNote: 'Optimal route avoids mandi commission entirely (0% vs 8%) and achieves rapid 6h factory intake.',
  },
  {
    step: 12,
    title: 'Generate Explainable Decision Attribution',
    subtitle: 'Decomposing the economic advantage for farmer trust',
    badge: 'Step 12 of 13',
    category: 'Decision',
    details: 'FARMPATH explains WHY Route B won: Direct buyer price premium (+₹4.00/kg), elimination of mandi commission (+₹2.20/kg), and spoilage reduction (+₹1.10/kg) easily outweigh slightly higher logistics and FPO handling costs (-₹1.40/kg).',
    metrics: [
      { label: 'Intermediary Savings', value: '+₹2.20/kg' },
      { label: 'Price Premium', value: '+₹4.00/kg' },
      { label: 'Spoilage Avoidance', value: '+₹1.10/kg' },
      { label: 'Net Advantage', value: '+₹5.90/kg Payout' },
    ],
    technicalNote: 'SHAP-inspired additive economic attribution allows non-technical farmers to inspect the logic.',
  },
  {
    step: 13,
    title: 'Financial & Sustainability Impact Assessment',
    subtitle: 'Quantifying real-world gains for the farmer, consumer, and supply chain',
    badge: 'Step 13 of 13',
    category: 'Decision',
    details: 'On this single 5,000 kg tomato lot, Gurmail Singh earns ₹124,000 instead of ₹94,500 (+₹29,500 incremental income). Food spoilage is cut from 8.1% to 3.2% (-60.5% waste), and transit time decreases from 54h to 18h.',
    metrics: [
      { label: 'Total Lot Gain', value: '+₹29,500' },
      { label: 'Farmer Income Boost', value: '+31.2%' },
      { label: 'Food Waste Cut', value: '-60.5% Spoilage' },
      { label: 'Transit Time Saved', value: '-36 Hours' },
    ],
    technicalNote: 'Scalable across India: 10,000 lots optimized = ₹29.5 Crores in direct farmer income unlocked.',
  },
];

export default function DemoModal() {
  const { isDemoModalOpen, setIsDemoModalOpen } = useSimulation();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const step = DEMO_STEPS[currentStepIndex];

  // Auto-play timer
  useEffect(() => {
    if (isPlaying && isDemoModalOpen) {
      timerRef.current = setTimeout(() => {
        if (currentStepIndex < DEMO_STEPS.length - 1) {
          setCurrentStepIndex(prev => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, currentStepIndex, isDemoModalOpen]);

  if (!isDemoModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold text-sm">
              SIH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white">FARMPATH Interactive Demonstration</h3>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Judges Walkthrough
                </span>
              </div>
              <p className="text-xs text-slate-400">
                13-step complete supply-chain discovery & optimization pipeline (SIH26033)
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setIsPlaying(false);
              setIsDemoModalOpen(false);
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Dots */}
        <div className="px-6 py-2.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between overflow-x-auto gap-1">
          {DEMO_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                setCurrentStepIndex(idx);
                setIsPlaying(false);
              }}
              className={`flex-1 min-w-[28px] h-1.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-emerald-600 ring-2 ring-emerald-300'
                  : idx < currentStepIndex
                  ? 'bg-emerald-400'
                  : 'bg-slate-200'
              }`}
              title={`Step ${s.step}: ${s.title}`}
            />
          ))}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Step Header */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  {step.category}
                </span>
                <span className="text-xs font-semibold text-slate-400">{step.badge}</span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{step.title}</h2>
              <p className="text-xs font-medium text-emerald-700">{step.subtitle}</p>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono text-slate-400">Progress</span>
              <div className="text-sm font-bold text-slate-900">
                {Math.round(((currentStepIndex + 1) / DEMO_STEPS.length) * 100)}% Complete
              </div>
            </div>
          </div>

          {/* Narrative Details */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-sm leading-relaxed">
            {step.details}
          </div>

          {/* Key Metrics Grid */}
          {step.metrics && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {step.metrics.map((m, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white shadow-sm">
                  <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                    {m.label}
                  </div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    {m.value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technical Note */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
            <Cpu className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-amber-900">System Mechanics: </span>
              <span className="text-amber-800">{step.technicalNote}</span>
            </div>
          </div>
        </div>

        {/* Modal Controls Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span>Restart</span>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                isPlaying
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Auto Play'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentStepIndex === 0}
              onClick={() => {
                setCurrentStepIndex(prev => Math.max(0, prev - 1));
                setIsPlaying(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1"
            >
              <SkipBack className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <button
              disabled={currentStepIndex === DEMO_STEPS.length - 1}
              onClick={() => {
                setCurrentStepIndex(prev => Math.min(DEMO_STEPS.length - 1, prev + 1));
                setIsPlaying(false);
              }}
              className="px-4 py-1.5 rounded-lg text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 shadow-sm"
            >
              <span>Next Step</span>
              <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
