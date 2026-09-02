'use client';

import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  change?: string;
  isPositive?: boolean;
  icon?: LucideIcon;
  variant?: 'emerald' | 'amber' | 'blue' | 'slate' | 'rose';
  tooltip?: string;
}

export default function MetricsCard({
  title,
  value,
  subtitle,
  change,
  isPositive,
  icon: Icon,
  variant = 'emerald',
  tooltip,
}: MetricsCardProps) {
  const variantStyles = {
    emerald: {
      bg: 'bg-emerald-50/50',
      border: 'border-emerald-200/80',
      iconBg: 'bg-emerald-100 text-emerald-700',
      accent: 'text-emerald-700',
    },
    amber: {
      bg: 'bg-amber-50/50',
      border: 'border-amber-200/80',
      iconBg: 'bg-amber-100 text-amber-700',
      accent: 'text-amber-700',
    },
    blue: {
      bg: 'bg-blue-50/50',
      border: 'border-blue-200/80',
      iconBg: 'bg-blue-100 text-blue-700',
      accent: 'text-blue-700',
    },
    slate: {
      bg: 'bg-white',
      border: 'border-slate-200',
      iconBg: 'bg-slate-100 text-slate-700',
      accent: 'text-slate-700',
    },
    rose: {
      bg: 'bg-rose-50/50',
      border: 'border-rose-200/80',
      iconBg: 'bg-rose-100 text-rose-700',
      accent: 'text-rose-700',
    },
  }[variant];

  return (
    <div className={`p-4 rounded-xl border ${variantStyles.border} ${variantStyles.bg} shadow-sm transition-all hover:shadow-md flex flex-col justify-between`}>
      <div className="flex items-start justify-between gap-2">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {title}
          </span>
          <div className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            {value}
          </div>
        </div>
        {Icon && (
          <div className={`p-2.5 rounded-lg ${variantStyles.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-500">{subtitle}</span>}
          {change && (
            <span
              className={`inline-flex items-center gap-0.5 font-bold px-1.5 py-0.5 rounded text-[11px] ${
                isPositive
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-rose-100 text-rose-800'
              }`}
            >
              {isPositive ? (
                <ArrowUpRight className="w-3 h-3" />
              ) : (
                <ArrowDownRight className="w-3 h-3" />
              )}
              {change}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
