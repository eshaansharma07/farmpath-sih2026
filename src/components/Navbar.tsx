'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSimulation } from '../lib/context/SimulationContext';
import { PREDEFINED_SCENARIOS } from '../lib/data/scenarios';
import { Language } from '../lib/i18n/translations';
import { 
  Play, 
  RotateCcw, 
  Sparkles, 
  ChevronDown,
  Home,
  MapPin,
  GitCompare,
  Sliders,
  TrendingUp,
  Cpu,
  Layers,
  HelpCircle,
  Globe
} from 'lucide-react';

const ALL_NAV_ITEMS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/map', label: 'Live Map', icon: MapPin },
  { href: '/comparison', label: 'Compare Routes', icon: GitCompare },
  { href: '/simulator', label: 'Simulator', icon: Sliders },
  { href: '/market-intelligence', label: 'Market Prices', icon: TrendingUp },
  { href: '/optimization', label: 'How We Calculate', icon: Cpu },
  { href: '/explainability', label: 'Why This Route?', icon: HelpCircle },
  { href: '/architecture', label: 'Tech Specs', icon: Layers },
];

export default function Navbar() {
  const pathname = usePathname();
  const {
    activeScenarioId,
    applyScenario,
    resetConditions,
    setIsDemoModalOpen,
    language,
    setLanguage,
    t,
  } = useSimulation();

  const [isScenarioOpen, setIsScenarioOpen] = useState(false);

  const languages: { id: Language; label: string }[] = [
    { id: 'en', label: 'EN' },
    { id: 'hi', label: 'हिन्दी' },
    { id: 'pa', label: 'ਪੰਜਾਬੀ' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs w-full">
      {/* 🇮🇳 Official SIH Indian Tricolor Stripe Accent at Top Edge */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600 flex">
        <div className="w-1/3 bg-orange-500"></div>
        <div className="w-1/3 bg-white border-y border-slate-100 flex items-center justify-center">
          <span className="w-2 h-2 rounded-full border border-blue-900 bg-blue-900/20"></span>
        </div>
        <div className="w-1/3 bg-green-600"></div>
      </div>

      {/* Tier 1: Top SIH Identification Bar with Official Logos on Both Sides */}
      <div className="bg-slate-950 text-white text-xs px-4 sm:px-6 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Left: SIH Bulb Icon + Event Name */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs shrink-0">
              <img 
                src="/sih-bulb.png" 
                alt="Smart India Hackathon Logo" 
                className="w-5 h-5 object-contain"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-black tracking-wide text-orange-400 text-xs sm:text-sm whitespace-nowrap">
                SMART INDIA HACKATHON 2026
              </span>
              <span className="text-slate-600 hidden sm:inline">|</span>
              <span className="text-slate-300 font-medium text-[11px] hidden md:inline whitespace-nowrap">
                Problem Statement: <strong className="text-white font-mono">SIH26033</strong>
              </span>
              <span className="text-slate-600 hidden lg:inline">|</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hidden lg:inline whitespace-nowrap">
                Team: 2brain Cells
              </span>
            </div>
          </div>

          {/* Center: Language Switcher */}
          <div className="flex items-center p-0.5 bg-slate-900 border border-slate-700 rounded-lg text-xs shrink-0">
            <div className="px-2 text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            {languages.map(l => (
              <button
                key={l.id}
                onClick={() => setLanguage(l.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-bold whitespace-nowrap transition-all ${
                  language === l.id
                    ? 'bg-emerald-700 text-white shadow-xs font-black'
                    : 'text-slate-400 hover:text-white font-medium'
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Right: Ministry + SIH Bulb on Right */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-slate-300 text-[11px] hidden lg:inline whitespace-nowrap">
              Ministry of Agriculture & Farmers Welfare
            </span>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center p-0.5 shadow-xs shrink-0">
                <img 
                  src="/sih-bulb.png" 
                  alt="Smart India Hackathon Logo" 
                  className="w-5 h-5 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 2: Main Brand & Action Bar */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-700 to-emerald-900 flex items-center justify-center text-white font-black text-sm shadow-xs group-hover:scale-105 transition-transform border border-green-600/30 shrink-0">
              FP
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight whitespace-nowrap">FARMPATH</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 whitespace-nowrap">
                  SIH26033
                </span>
              </div>
            </div>
          </Link>

          {/* Tagline Center */}
          <div className="hidden md:flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>&ldquo;{t.tagline}&rdquo;</span>
          </div>

          {/* Actions: Scenarios + Start Demo */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Real-World Scenarios Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsScenarioOpen(!isScenarioOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                <span>{activeScenarioId ? 'Scenario Active' : 'Test Scenarios'}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 shrink-0" />
              </button>

              {isScenarioOpen && (
                <div 
                  className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95"
                  onMouseLeave={() => setIsScenarioOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                    <span>Judge Stress Tests</span>
                    <button
                      onClick={() => {
                        resetConditions();
                        setIsScenarioOpen(false);
                      }}
                      className="text-emerald-700 hover:underline flex items-center gap-1 normal-case font-medium"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> reset
                    </button>
                  </div>
                  {PREDEFINED_SCENARIOS.map(sc => (
                    <button
                      key={sc.id}
                      onClick={() => {
                        applyScenario(sc.id);
                        setIsScenarioOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2.5 text-xs hover:bg-slate-50 flex flex-col gap-0.5 border-b border-slate-50 transition-colors ${
                        activeScenarioId === sc.id ? 'bg-emerald-50 text-emerald-900 font-semibold' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-900">{sc.title}</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 font-medium">
                          {sc.badge}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-500 line-clamp-1">{sc.description}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dedicated START DEMO Button */}
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-green-700 hover:bg-green-800 text-white shadow-xs transition-all active:scale-95 border border-green-800 shrink-0 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-current text-orange-300" />
              <span>START DEMO</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: DEDICATED QUICK ACCESS BAR — ALIGNED LEFT TO RIGHT PERFECTLY WITH ZERO DROPDOWNS */}
      <div className="bg-slate-50/90 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 overflow-x-auto">
          <nav className="flex items-center justify-between gap-2 min-w-max">
            {ALL_NAV_ITEMS.map((item, idx) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? 'bg-emerald-800 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border-slate-200/80 shadow-2xs'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-orange-300' : 'text-emerald-700'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
