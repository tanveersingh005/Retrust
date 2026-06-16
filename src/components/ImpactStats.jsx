import React from 'react';
import { Leaf, Coins, RotateCcw, Trophy } from 'lucide-react';

const ImpactStats = ({ co2 = 120, credits = 500, returned = 25, rank = 'Top 10%' }) => {
  const statsList = [
    {
      label: 'CO₂ Saved',
      value: `${co2} kg`,
      icon: Leaf,
      bg: 'bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-100/50 dark:border-emerald-900/30',
      iconColor: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Credits Balance',
      value: `${credits} cr`,
      icon: Coins,
      bg: 'bg-teal-50/70 dark:bg-teal-950/20 border-teal-100/50 dark:border-teal-900/30',
      iconColor: 'text-teal-600 dark:text-teal-400',
    },
    {
      label: 'Items Recycled',
      value: returned,
      icon: RotateCcw,
      bg: 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-100/50 dark:border-amber-900/30',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      label: 'Global Rank',
      value: rank,
      icon: Trophy,
      bg: 'bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 animate-fade-in-up">
      {statsList.map((stat, idx) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={idx}
            className={`rounded-2xl border p-5 flex flex-col items-start shadow-sm transition-all duration-350 hover:-translate-y-1 hover:shadow-md bg-white dark:bg-slate-900 ${stat.bg}`}
          >
            <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-950 shadow-sm mb-4 ${stat.iconColor}`}>
              <IconComponent className="w-5 h-5" />
            </div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider">{stat.label}</span>
            <span className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white tracking-tight mt-1">
              {stat.value}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ImpactStats;