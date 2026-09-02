'use client';

import React, { useState } from 'react';
import { SupplyChainNode, NodeType } from '../lib/engine/types';
import { useSimulation } from '../lib/context/SimulationContext';
import { 
  Tractor, 
  Building2, 
  Store, 
  Factory, 
  ShoppingCart, 
  Users, 
  ChevronRight,
  Info,
  Clock,
  IndianRupee,
  ShieldCheck,
  Package
} from 'lucide-react';

interface TierDefinition {
  type: NodeType | 'consumer';
  title: string;
  subtitle: string;
  icon: any;
  color: string;
  borderColor: string;
  badgeColor: string;
}

const TIERS: TierDefinition[] = [
  {
    type: 'farm',
    title: 'Farmgate Cluster',
    subtitle: 'Primary Harvest Origin',
    icon: Tractor,
    color: 'bg-emerald-50 text-emerald-700',
    borderColor: 'border-emerald-300',
    badgeColor: 'bg-emerald-100 text-emerald-800',
  },
  {
    type: 'collection_center',
    title: 'Collection Center',
    subtitle: 'FPO Pre-cooling & Grading',
    icon: Building2,
    color: 'bg-teal-50 text-teal-700',
    borderColor: 'border-teal-300',
    badgeColor: 'bg-teal-100 text-teal-800',
  },
  {
    type: 'mandi',
    title: 'APMC Mandi Hub',
    subtitle: 'Commission Yard / Arhatiya',
    icon: Store,
    color: 'bg-amber-50 text-amber-700',
    borderColor: 'border-amber-300',
    badgeColor: 'bg-amber-100 text-amber-800',
  },
  {
    type: 'processor',
    title: 'Agro-Processor / Direct',
    subtitle: 'Value Addition & Pulping',
    icon: Factory,
    color: 'bg-blue-50 text-blue-700',
    borderColor: 'border-blue-300',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    type: 'retail',
    title: 'Retail & Fulfillment',
    subtitle: 'Modern Trade & Kirana',
    icon: ShoppingCart,
    color: 'bg-indigo-50 text-indigo-700',
    borderColor: 'border-indigo-300',
    badgeColor: 'bg-indigo-100 text-indigo-800',
  },
  {
    type: 'consumer',
    title: 'Final Consumer',
    subtitle: 'Household Demand Point',
    icon: Users,
    color: 'bg-slate-50 text-slate-700',
    borderColor: 'border-slate-300',
    badgeColor: 'bg-slate-100 text-slate-800',
  },
];

export default function SupplyChainGraph() {
  const { nodes, results, cropLot } = useSimulation();
  const [selectedNode, setSelectedNode] = useState<SupplyChainNode | null>(nodes[0]);

  // Find nodes matching the optimal route
  const optimalNodeIds = new Set(results.optimalRoute?.pathNodeIds || []);

  const getNodeSample = (type: NodeType | 'consumer'): SupplyChainNode | null => {
    if (type === 'consumer') {
      return {
        id: 'node-consumer',
        name: 'Punjab Urban Households (Tri-City / Ludhiana)',
        type: 'retail',
        location: { lat: 30.7333, lng: 76.7794, district: 'Consumer Market', name: 'Urban Kitchens' },
        capacityKg: 500000,
        currentLoadKg: 420000,
        handlingCostPerKg: 0,
        storageCostPerKgDay: 0,
        processingTimeHours: 0,
        baseOfferPricePerKg: 42.0,
      };
    }
    // Prefer optimal route node if available
    const optMatch = nodes.find(n => n.type === type && optimalNodeIds.has(n.id));
    if (optMatch) return optMatch;
    return nodes.find(n => n.type === type) || null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-black text-base sm:text-lg text-slate-900 tracking-tight">
              Multi-Echelon Agricultural Supply-Chain Graph
            </h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase tracking-wider">
              Interactive Nodes
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Click any node below to inspect operating capacities, handling unit costs, and transit times.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-emerald-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
            Optimal Path Segment
          </span>
          <span className="text-slate-300">|</span>
          <span className="flex items-center gap-1.5 font-medium text-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
            Traditional APMC Route
          </span>
        </div>
      </div>

      {/* Pipeline Tiers Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 pb-6 relative">
        {TIERS.map((tier, idx) => {
          const sampleNode = getNodeSample(tier.type);
          const isSelected = selectedNode?.id === sampleNode?.id;
          const isOptimal = sampleNode && optimalNodeIds.has(sampleNode.id);
          const Icon = tier.icon;

          return (
            <div key={tier.title} className="relative flex flex-col items-center">
              <button
                onClick={() => sampleNode && setSelectedNode(sampleNode)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all relative group flex flex-col justify-between min-h-[140px] ${
                  isSelected
                    ? 'ring-2 ring-emerald-600 shadow-md bg-emerald-50/40 border-emerald-500'
                    : isOptimal
                    ? 'border-emerald-300 bg-emerald-50/20 hover:border-emerald-400'
                    : `${tier.borderColor} bg-white hover:shadow-sm`
                }`}
              >
                {/* Node Top Row */}
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${tier.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isOptimal && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      OPTIMAL
                    </span>
                  )}
                </div>

                {/* Title and details */}
                <div className="mt-3">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Echelon 0{idx + 1}
                  </div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors line-clamp-1 mt-0.5">
                    {sampleNode?.name.split('(')[0].trim() || tier.title}
                  </div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">
                    {tier.subtitle}
                  </div>
                </div>

                {/* Cost / Rate Indicator */}
                <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Handling:</span>
                  <span className="font-semibold text-slate-800">
                    {sampleNode ? `₹${sampleNode.handlingCostPerKg.toFixed(2)}/kg` : '—'}
                  </span>
                </div>
              </button>

              {/* Connecting Chevron Arrow (Except Last) */}
              {idx < TIERS.length - 1 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-white border border-slate-200 shadow-xs items-center justify-center text-slate-400">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Node Detailed Inspector */}
      {selectedNode && (
        <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 animate-in fade-in-50">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                  {selectedNode.type.replace('_', ' ')}
                </span>
                <h4 className="text-sm font-bold text-slate-900">{selectedNode.name}</h4>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                District: {selectedNode.location.district} • GPS: [{selectedNode.location.lat.toFixed(4)}° N, {selectedNode.location.lng.toFixed(4)}° E]
              </p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-slate-500">Procurement / Offer Price</span>
              <div className="text-base font-black text-emerald-700">
                {selectedNode.baseOfferPricePerKg ? `₹${selectedNode.baseOfferPricePerKg.toFixed(2)}/kg` : 'Cost Center'}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200/70">
              <span className="text-slate-400 block text-[11px] font-medium">Daily Capacity</span>
              <span className="font-bold text-slate-900 text-sm">
                {(selectedNode.capacityKg / 1000).toFixed(0)} Tons
              </span>
              <span className="text-[10px] text-slate-500 block">
                Load: {((selectedNode.currentLoadKg / selectedNode.capacityKg) * 100).toFixed(0)}%
              </span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200/70">
              <span className="text-slate-400 block text-[11px] font-medium">Handling Cost</span>
              <span className="font-bold text-slate-900 text-sm">
                ₹{selectedNode.handlingCostPerKg.toFixed(2)} / kg
              </span>
              <span className="text-[10px] text-slate-500 block">Loading & Unloading</span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200/70">
              <span className="text-slate-400 block text-[11px] font-medium">Processing Time</span>
              <span className="font-bold text-slate-900 text-sm">
                {selectedNode.processingTimeHours} Hours
              </span>
              <span className="text-[10px] text-slate-500 block">Average Staging Buffer</span>
            </div>

            <div className="p-2.5 bg-white rounded-lg border border-slate-200/70">
              <span className="text-slate-400 block text-[11px] font-medium">Intermediary Margin</span>
              <span className="font-bold text-slate-900 text-sm">
                {selectedNode.intermediaryMarginPct
                  ? `${(selectedNode.intermediaryMarginPct * 100).toFixed(1)}%`
                  : '0% (Direct)'}
              </span>
              <span className="text-[10px] text-slate-500 block">
                {selectedNode.intermediaryMarginPct ? 'APMC Mandi Commission' : 'Disintermediated'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
