'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Github, Heart, ShieldCheck, Sparkles, Tractor } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-slate-950 text-white border-t border-slate-800 mt-12 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-700 to-emerald-900 flex items-center justify-center text-white font-black text-base shadow-sm border border-emerald-600/40">
              FP
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-base tracking-tight text-white">FARMPATH</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  SIH26033
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Intelligent Multi-Echelon Farm-to-Market Supply Chain Optimization
              </p>
            </div>
          </div>

          {/* Team Identification Badge */}
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs text-slate-400">Developed by:</span>
              <span className="text-xs font-black text-amber-300 tracking-wide">
                Team 2brain Cells
              </span>
            </div>

            <a
              href="https://github.com/eshaansharma07/farmpath-sih2026"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white transition-colors"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Evaluation Metadata & Copyright */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>Official Submission for <strong>Smart India Hackathon 2026</strong></span>
            <span>•</span>
            <span>Ministry of Agriculture &amp; Farmers Welfare</span>
            <span>•</span>
            <span>Problem Statement: <strong className="text-white font-mono">SIH26033</strong></span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/simulator" className="hover:text-emerald-400 transition-colors">
              Simulator
            </Link>
            <Link href="/architecture" className="hover:text-emerald-400 transition-colors">
              Architecture
            </Link>
            <Link href="/explainability" className="hover:text-emerald-400 transition-colors">
              Explainability
            </Link>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-bold">Team 2brain Cells 🇮🇳</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
