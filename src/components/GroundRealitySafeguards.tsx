'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileCheck2, 
  Scale, 
  Truck, 
  Database, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Award,
  ChevronRight,
  Lock,
  Building
} from 'lucide-react';

export default function GroundRealitySafeguards() {
  const [activePillar, setActivePillar] = useState<'quality' | 'legal' | 'logistics' | 'data'>('quality');

  const pillars = [
    {
      id: 'quality' as const,
      icon: Scale,
      title: 'Gate Quality Disputes',
      sub: 'Digital Assaying & Escrow',
      badge: 'Operational Safeguard',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    },
    {
      id: 'legal' as const,
      icon: FileCheck2,
      title: 'APMC & Legal Compliance',
      sub: 'State & Central FPO Acts',
      badge: 'Regulatory Framework',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    },
    {
      id: 'logistics' as const,
      icon: Truck,
      title: 'Rural Fleet Execution',
      sub: 'Driver Escrow & Mileage',
      badge: 'Ground Logistics',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    },
    {
      id: 'data' as const,
      icon: Database,
      title: 'National Data Pipeline',
      sub: 'e-NAM & Agmarknet Sync',
      badge: 'Govt Tech Stack',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    },
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-slate-900">
                Ground Reality &amp; Institutional Safeguards
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                SIH Evaluator FAQ
              </span>
            </div>
            <p className="text-xs text-slate-500">
              How FARMPATH solves the dirty, real-world operational challenges of Indian agriculture:
            </p>
          </div>
        </div>
      </div>

      {/* 4 Interactive Pillars */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {pillars.map(p => {
          const Icon = p.icon;
          const isActive = activePillar === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(p.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-400' : 'text-slate-500'}`} />
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  isActive ? 'bg-slate-800 text-slate-300 border-slate-700' : p.badgeColor
                }`}>
                  {p.badge}
                </span>
              </div>
              <div>
                <span className="font-bold text-xs block truncate">{p.title}</span>
                <span className={`text-[10px] block truncate ${isActive ? 'text-slate-400' : 'text-slate-500'}`}>
                  {p.sub}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pillar 1: Gate Quality Disputes */}
      {activePillar === 'quality' && (
        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
            <Scale className="w-5 h-5 text-emerald-700" />
            <span>Real-World Challenge: What if the factory inspector rejects the produce at the gate?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            In traditional trades, buyers reject shipments arbitrarily or deduct arbitrary 20% quality penalties. FARMPATH prevents this through <strong>Pre-Dispatch Digital Assaying</strong> at local collection hubs:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-xs">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>1. Objective Assay at Hub</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Before the truck departs, FPO quality staff grade tomatoes using digital refractometers (Brix sugar) and penetrometers (firmness).
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-xs">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Escrow Payment Lock</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                The institutional buyer (e.g. Cremica, Del Monte) pre-authorizes payment into an escrow account against the digital quality manifest.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-emerald-100 space-y-1 shadow-xs">
              <span className="font-bold text-emerald-900 block flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>3. Tamper-Proof Audit</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                If a gate dispute occurs, IoT transit temperature logs and the pre-cooling dispatch manifest serve as binding arbitration evidence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pillar 2: APMC Legal Compliance */}
      {activePillar === 'legal' && (
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
            <FileCheck2 className="w-5 h-5 text-blue-700" />
            <span>Real-World Challenge: How do we legally bypass APMC Mandis without violating market laws?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            FARMPATH operates strictly within the existing statutory framework of state APMC reforms and central farmer-support policies:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-blue-100 space-y-1.5 shadow-xs">
              <span className="font-bold text-blue-900 block">Section 40 &amp; Direct Purchase Licensing:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                State APMC (Amendment) Acts legally permit registered processors and aggregators to establish <strong>Private Market Yards and Direct Purchase Centers</strong> outside physical mandi gates, eliminating intermediary auction fees.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-blue-100 space-y-1.5 shadow-xs">
              <span className="font-bold text-blue-900 block">Central FPO Promotion Framework (2020):</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Under central guidelines, Farmer Producer Organizations (FPOs) and Farmer Producer Companies (FPCs) are explicitly granted interstate and direct trade rights, shielding smallholders from mandi cartel coercion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pillar 3: Rural Fleet Execution */}
      {activePillar === 'logistics' && (
        <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-sm">
            <Truck className="w-5 h-5 text-purple-700" />
            <span>Real-World Challenge: Software doesn&apos;t drive trucks. Who physically moves the harvest?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            FARMPATH connects into existing rural transport ecosystems rather than attempting to buy expensive truck fleets:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-1 shadow-xs">
              <span className="font-bold text-purple-900 block">1. FPO Fleet Aggregation</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Partners with rural commercial transport unions (Tata 407, Eicher 5-ton, Mahindra Bolero Maxi Truck) operating in district clusters.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-1 shadow-xs">
              <span className="font-bold text-purple-900 block">2. Fuel Advance Escrow</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Drivers receive a 40% fuel advance upon loading; remaining freight balance is automatically unlocked upon buyer OTP sign-off.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-purple-100 space-y-1 shadow-xs">
              <span className="font-bold text-purple-900 block">3. Multi-Farmer Pooling</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Combines five 1,000 kg harvest lots into one 5-ton vehicle, cutting individual farmer freight expenditure by over 45%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pillar 4: National Data Pipeline */}
      {activePillar === 'data' && (
        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Database className="w-5 h-5 text-amber-700" />
            <span>Real-World Challenge: How do we sync with Government e-NAM &amp; Agmarknet in production?</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            How FARMPATH handles live data feeds across India without getting blocked by slow government servers:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-white rounded-xl border border-amber-100 space-y-1.5 shadow-xs">
              <span className="font-bold text-amber-900 block">Daily 6:00 AM Cron Ingestion:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Our backend runs automated daily batch syncs against the <strong>Central Agmarknet &amp; e-NAM REST API</strong> across 2,800+ national APMC mandis to establish daily modal and maximum price vectors.
              </p>
            </div>
            <div className="p-3.5 bg-white rounded-xl border border-amber-100 space-y-1.5 shadow-xs">
              <span className="font-bold text-amber-900 block">B2B Private Purchase Order Feeds:</span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Processing factories and retail chains upload daily forward procurement quotas (volume needed + target delivery window + floor price) directly via enterprise webhooks.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
