'use client';

import React from 'react';
import { NATIONAL_CORRIDORS, RegionalCorridor } from '../lib/data/corridors';
import { 
  MapPin, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  Compass,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

interface PanIndiaCorridorsProps {
  activeCorridorId: string;
  onSelectCorridor: (corridor: RegionalCorridor) => void;
}

export default function PanIndiaCorridors({
  activeCorridorId,
  onSelectCorridor,
}: PanIndiaCorridorsProps) {
  const activeCorridor = NATIONAL_CORRIDORS.find(c => c.id === activeCorridorId) || NATIONAL_CORRIDORS[0];

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-900/60 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-lg text-white">
                Pan-India Agricultural Corridors
              </h3>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                National Scalability Architecture
              </span>
            </div>
            <p className="text-xs text-slate-400">
              FARMPATH is not limited to Punjab. Select any major Indian agricultural corridor to see unit economics re-evaluate:
            </p>
          </div>
        </div>
      </div>

      {/* 4 National Corridor Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {NATIONAL_CORRIDORS.map(corridor => {
          const isSelected = corridor.id === activeCorridorId;
          return (
            <button
              key={corridor.id}
              onClick={() => onSelectCorridor(corridor)}
              className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                isSelected
                  ? 'bg-gradient-to-b from-emerald-950/80 to-slate-900 border-emerald-500 shadow-md scale-[1.02]'
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full border ${
                  isSelected 
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                    : 'bg-slate-700/50 text-slate-400 border-slate-600'
                }`}>
                  {corridor.state}
                </span>
                <span className="text-xs font-black text-emerald-400 font-mono">
                  +{corridor.gainPercentage}% Gain
                </span>
              </div>

              <div>
                <h4 className="font-bold text-xs text-white line-clamp-1">
                  {corridor.name}
                </h4>
                <span className="text-[11px] text-slate-400 block line-clamp-1 mt-0.5">
                  {corridor.tagline}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Crop Lot:</span>
                <span className="font-bold text-white">
                  {corridor.crop} ({corridor.quantityKg.toLocaleString()} kg)
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Deep Dive on the Selected Pan-India Corridor */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <span className="font-black text-sm text-white">
                {activeCorridor.name} ({activeCorridor.state})
              </span>
            </div>
            <span className="text-xs text-slate-400 mt-0.5 block">
              Farmer: <strong className="text-white">{activeCorridor.farmerName}</strong> • Crop: <strong className="text-white">{activeCorridor.crop} ({activeCorridor.quantityKg.toLocaleString()} kg)</strong>
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Local Mandi:</span>
              <span className="text-slate-300 font-bold">₹{activeCorridor.mandiPayoutPerKg.toFixed(2)}/kg</span>
            </div>
            <div className="text-emerald-400">
              <span className="text-[10px] text-slate-400 uppercase block">FARMPATH Net:</span>
              <span className="font-black text-base">₹{activeCorridor.farmpathPayoutPerKg.toFixed(2)}/kg</span>
            </div>
            <div className="px-3 py-1 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold">
              +₹{activeCorridor.totalLotGain.toLocaleString()} Profit
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-amber-400 block text-[11px]">
              ⚠️ Real-World Regional Problem:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeCorridor.realWorldChallenge}
            </p>
          </div>

          <div className="p-3.5 bg-slate-900 rounded-xl border border-slate-800 space-y-1">
            <span className="font-bold text-emerald-400 block text-[11px]">
              ✓ FARMPATH Pan-India Solution:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {activeCorridor.solutionSummary}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-[11px] text-slate-400 border-t border-slate-800/80">
          <span>Connected Regional Buyers: <strong className="text-slate-200">{activeCorridor.keyBuyers.join(' • ')}</strong></span>
          <span className="text-emerald-400 font-medium">Destination: {activeCorridor.primaryDestination}</span>
        </div>
      </div>
    </div>
  );
}
