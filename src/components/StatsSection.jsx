import React from 'react';
import { Wind, RotateCcw, Star } from 'lucide-react';

const stats = [
  {
    label: 'CO₂ Saved',
    value: '12,450 kg',
    icon: Wind,
    gradient: 'from-teal-500 to-emerald-500',
    bg: 'from-teal-50 to-emerald-50',
    text: 'text-teal-700',
  },
  {
    label: 'Items Returned',
    value: '3,200',
    icon: RotateCcw,
    gradient: 'from-blue-500 to-cyan-500',
    bg: 'from-blue-50 to-cyan-50',
    text: 'text-blue-700',
  },
  {
    label: 'Credits Issued',
    value: '5,800',
    icon: Star,
    gradient: 'from-amber-500 to-orange-500',
    bg: 'from-amber-50 to-orange-50',
    text: 'text-amber-700',
  },
];

const StatsSection = () => (
  <section className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-5 my-12">
    {stats.map((stat, i) => {
      const Icon = stat.icon;
      return (
        <div
          key={stat.label}
          className={`relative bg-gradient-to-br ${stat.bg} dark:from-slate-900/40 dark:to-slate-800/40 dark:bg-slate-900 rounded-2xl p-6 flex items-center gap-5 border border-white dark:border-slate-800/50 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group`}
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {/* Decorative blob */}
          <div className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`} />
          
          <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className={`text-2xl font-extrabold ${stat.text} dark:text-white`}>{stat.value}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">{stat.label}</div>
          </div>
        </div>
      );
    })}
  </section>
);

export default StatsSection;