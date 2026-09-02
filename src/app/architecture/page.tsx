'use client';

import React, { useState } from 'react';
import { 
  Layers, 
  Database, 
  Cpu, 
  LineChart, 
  Network, 
  HelpCircle, 
  Smartphone, 
  ArrowDown, 
  CheckCircle2, 
  Info,
  Code2
} from 'lucide-react';

interface ArchitectureBlock {
  id: string;
  title: string;
  category: string;
  icon: any;
  color: string;
  summary: string;
  whatItDoes: string;
  inputs: string[];
  outputs: string[];
  technology: string;
}

const ARCHITECTURE_BLOCKS: ArchitectureBlock[] = [
  {
    id: 'block-data',
    title: 'Data Ingestion & Sensory Layer',
    category: 'Layer 01: Ingestion',
    icon: Database,
    color: 'bg-blue-500 text-white',
    summary: 'Aggregates real-time mandi prices, buyer demand, farm location telemetry, and historical loss.',
    whatItDoes: 'Collects and normalizes multi-source agricultural telemetry: Agmarknet APMC mandi daily arrivals, B2B procurement contract feeds, GPS logistics fleet coordinates, and historical perishability loss benchmarks.',
    inputs: [
      'Agmarknet / e-NAM daily wholesale price feeds',
      'Processor & Supermarket B2B Purchase Orders (APIs/Webhooks)',
      'GPS location coordinates of farm origin & destination gates',
      'Indian Meteorological Department (IMD) ambient temperature feeds',
      'All India Motor Transport Congress (AIMTC) freight diesel benchmarks',
    ],
    outputs: [
      'Normalized schema events in PostgreSQL/PostGIS',
      'Geocoded location vectors (Lat, Lng)',
      'Dynamic freight cost parameters ($/km/ton)',
    ],
    technology: 'PostgreSQL 16, PostGIS Spatial Extension, Apache Kafka, Redis Caching, Python Async HTTP Scrapers',
  },
  {
    id: 'block-processing',
    title: 'Data Processing & Spatial Pipeline',
    category: 'Layer 02: Processing',
    icon: Layers,
    color: 'bg-indigo-500 text-white',
    summary: 'Cleans, validates, partitions, and calculates spatial road network distances via pgRouting.',
    whatItDoes: 'Cleans price anomalies, calculates road distance matrices using Haversine and topological graph routing, resolves coordinate projections, and prepares training matrices for predictive inference.',
    inputs: [
      'Raw incoming transaction data streams',
      'OpenStreetMap (OSM) Punjab road network topology shapefiles',
    ],
    outputs: [
      'Precomputed OD (Origin-Destination) distance & travel time matrix',
      'Cleaned feature vectors for ML models',
    ],
    technology: 'Python Pandas, NumPy, pgRouting, GeoPandas, Celery Distributed Task Queue',
  },
  {
    id: 'block-prediction',
    title: 'Prediction Services (ML Layer)',
    category: 'Layer 03: Machine Learning',
    icon: LineChart,
    color: 'bg-emerald-600 text-white',
    summary: 'LightGBM price forecasting, buyer absorption modeling, and Arrhenius spoilage decay curves.',
    whatItDoes: 'Executes short-term (1-7 day) price forecasting on wholesale auctions with conformal prediction bands; estimates perishable spoilage loss percentages as a function of transit temperature and duration; predicts buyer order fulfillment probability.',
    inputs: [
      'Cleaned historical arrival volumes and price history',
      'Transit duration and ambient temperature conditions',
      'Crop perishability constant (k_crop) and cold-chain status',
    ],
    outputs: [
      'Price forecast vector P_dest (₹/kg) with 87% confidence interval',
      'Expected spoilage percentage Loss(r)% per candidate edge',
      'Buyer capacity absorption probabilities',
    ],
    technology: 'LightGBM Regressor, XGBoost, Scikit-Learn, MLflow model registry, ONNX Runtime',
  },
  {
    id: 'block-graph',
    title: 'Supply-Chain Graph Construction',
    category: 'Layer 04: Topology',
    icon: Network,
    color: 'bg-amber-600 text-white',
    summary: 'Builds weighted Directed Acyclic Graph (DAG) across 4 supply-chain echelons.',
    whatItDoes: 'Constructs candidate multi-echelon network topology connecting Farmgate → Collection Center / Packhouse → Mandi / Wholesale Hub → Processor / Institutional Buyer → Retail Cluster. Discovers all simple paths bounded by depth limits.',
    inputs: [
      'Spatial node metadata (capacities, handling fees, processing hours)',
      'Edge metrics (freight tariffs, road roughness, cold chain availability)',
      'Registered Crop Lot specifications',
    ],
    outputs: [
      'Candidate directed path graph G(V, E)',
      'Candidate path enumeration list (42 permutations)',
    ],
    technology: 'NetworkX (Prototypes), Rust petgraph (Production microservice), Graph Theory',
  },
  {
    id: 'block-optimizer',
    title: 'Constrained Optimization Engine',
    category: 'Layer 05: Mathematical Solver',
    icon: Cpu,
    color: 'bg-rose-600 text-white',
    summary: 'Google OR-Tools / ILP maximizing expected net farmer realization subject to hard constraints.',
    whatItDoes: 'Solves a Mixed-Integer Linear Programming (MILP) formulation. Prunes infeasible paths violating delivery windows, spoilage thresholds, or buyer capacities. Evaluates net economic payout for all feasible routes and shortlists the global Pareto optimum.',
    inputs: [
      'Candidate paths from Graph Layer',
      'Price and spoilage predictions from ML Layer',
      'Operational constraints (vehicle payload, delivery window, quality grade)',
    ],
    outputs: [
      'Optimal Route recommendation (Path node sequence)',
      'Shortlisted alternative feasible routes (Ranked 1 to N)',
      'Route pruning ledger (Infeasible routes & explicit rejection reasons)',
    ],
    technology: 'Google OR-Tools, SCIP Solver, PuLP Mixed-Integer Linear Programming, Python 3.11',
  },
  {
    id: 'block-explainability',
    title: 'Explainability & Feature Attribution',
    category: 'Layer 06: Explainability',
    icon: HelpCircle,
    color: 'bg-teal-600 text-white',
    summary: 'SHAP-inspired economic delta breakdown and rejected alternative ledger.',
    whatItDoes: 'Decomposes the optimal route advantage into plain-language, additive economic drivers (base price advantage, intermediary fee avoidance, spoilage mitigation, freight efficiency) so farmers and judges have 100% transparent auditability.',
    inputs: [
      'Optimal route unit economics',
      'Baseline status quo mandi unit economics',
      'Constraint violation log',
    ],
    outputs: [
      'Additive waterfall steps (+₹/kg attribution)',
      'Natural-language decision synthesis (&quot;Why Route B?&quot;)',
      'Categorized rejection audit trail',
    ],
    technology: 'SHAP Feature Decomposition, Natural Language Template Engine, Deterministic Attribution',
  },
  {
    id: 'block-application',
    title: 'User Application & Decision Twin',
    category: 'Layer 07: Presentation',
    icon: Smartphone,
    color: 'bg-slate-900 text-white',
    summary: 'Next.js responsive interactive digital twin with real-time What-If sensitivity tester.',
    whatItDoes: 'Provides an intuitive, rich interactive interface for farmers, FPO managers, and hackathon judges to configure lots, visualize GIS routes on interactive maps, simulate environmental stress tests, and inspect financial impact.',
    inputs: [
      'Optimization & Explainability JSON payloads from backend REST APIs',
      'User slider inputs and scenario triggers',
    ],
    outputs: [
      'Interactive geospatial supply-chain map visualization',
      'Real-time comparative dashboards and KPI cards',
      'Guided 13-step demonstration walkthrough',
    ],
    technology: 'Next.js 14, React 18, TypeScript, Tailwind CSS, Recharts, Leaflet GIS, Lucide Icons',
  },
];

export default function SystemArchitecturePage() {
  const [selectedBlock, setSelectedBlock] = useState<ArchitectureBlock>(ARCHITECTURE_BLOCKS[4]); // Default Optimization

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-emerald-600" />
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            System Architecture & Data Flow
          </h1>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Full-stack blueprint of the FARMPATH platform from raw agricultural ingestion to the constrained optimization core.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Interactive Flowchart (7 Blocks with Connecting Arrows) */}
        <div className="lg:col-span-7 space-y-2.5">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              End-to-End Pipeline Architecture
            </span>
            <span className="text-[11px] text-slate-400">Click any block to inspect specifications</span>
          </div>

          {ARCHITECTURE_BLOCKS.map((block, idx) => {
            const isSelected = selectedBlock.id === block.id;
            const Icon = block.icon;

            return (
              <React.Fragment key={block.id}>
                <button
                  onClick={() => setSelectedBlock(block)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-500/20 shadow-md'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`w-10 h-10 rounded-xl ${block.color} flex items-center justify-center shadow-xs shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {block.category}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {block.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {block.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 group-hover:text-emerald-600 font-semibold">
                      Inspect &rarr;
                    </span>
                  </div>
                </button>

                {/* Connecting Arrow */}
                {idx < ARCHITECTURE_BLOCKS.length - 1 && (
                  <div className="flex justify-center py-0.5">
                    <ArrowDown className="w-4 h-4 text-slate-300 animate-bounce" />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Detail Inspection Panel */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5 animate-in fade-in">
            <div className="border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg ${selectedBlock.color}`}>
                  <selectedBlock.icon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    {selectedBlock.category}
                  </span>
                  <h3 className="text-base font-black text-slate-900">
                    {selectedBlock.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* What It Does */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Functional Overview
              </h4>
              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {selectedBlock.whatItDoes}
              </p>
            </div>

            {/* Inputs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Inputs Received
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedBlock.inputs.map((inp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outputs */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Outputs Produced
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedBlock.outputs.map((out, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology Stack */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Production Technology Stack
              </h4>
              <div className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs leading-relaxed">
                {selectedBlock.technology}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
