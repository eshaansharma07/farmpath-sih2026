'use client';

import React from 'react';

export function SIHLogoBulb({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <img 
      src="/sih-bulb.png" 
      alt="Smart India Hackathon Logo" 
      className={`${className} object-contain shrink-0`}
    />
  );
}

export function SIHBadge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
      isDark 
        ? "bg-slate-900 border-slate-750 text-white shadow-xs" 
        : "bg-white border-slate-200 text-slate-900 shadow-xs"
    }`}>
      <img 
        src="/sih-bulb.png" 
        alt="SIH" 
        className="w-6 h-6 object-contain shrink-0" 
      />
      <div className="flex flex-col text-left leading-none">
        <div className="flex items-center gap-1">
          <span className="font-black text-xs tracking-tight text-orange-500">SMART INDIA</span>
          <span className="font-black text-xs tracking-tight text-emerald-600">HACKATHON</span>
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className={`text-[10px] font-bold font-mono ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            2026
          </span>
          <span className="text-[9px] px-1.5 py-0.2 rounded bg-orange-100 text-orange-800 font-bold">
            SIH26033
          </span>
        </div>
      </div>
    </div>
  );
}

export function MoEBadge({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all ${
      isDark 
        ? "bg-slate-900 border-slate-750 text-white shadow-xs" 
        : "bg-white border-slate-200 text-slate-900 shadow-xs"
    }`}>
      <img 
        src="/sih-bulb.png" 
        alt="SIH" 
        className="w-6 h-6 object-contain shrink-0" 
      />
      <div className="flex flex-col text-left leading-none">
        <span className="font-bold text-[9px] tracking-tight uppercase text-slate-400">
          Govt. of India
        </span>
        <span className={`font-black text-[11px] mt-0.5 ${isDark ? "text-white" : "text-slate-800"}`}>
          Ministry of Agriculture
        </span>
      </div>
    </div>
  );
}
