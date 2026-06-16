import React from 'react';
import { ShoppingBag, RefreshCw, Sparkles } from 'lucide-react';

const steps = [
  {
    title: 'Browse & Buy',
    desc: 'Shop verified refurbished premium products at fraction of the price, backed by ReTrust confidence scoring.',
    icon: ShoppingBag,
    color: 'teal',
    bgLight: 'bg-teal-50 dark:bg-teal-950/30',
    iconColor: 'text-teal-600 dark:text-teal-400',
    borderGlow: 'hover:border-teal-500/30 dark:hover:border-teal-400/20 hover:shadow-teal-500/5'
  },
  {
    title: 'Return & Recycle',
    desc: 'Easily return old electronics or packaging materials. Drop them off or find our verified partner centers.',
    icon: RefreshCw,
    color: 'amber',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30',
    iconColor: 'text-amber-600 dark:text-amber-400',
    borderGlow: 'hover:border-amber-500/30 dark:hover:border-amber-400/20 hover:shadow-amber-500/5'
  },
  {
    title: 'Earn & Impact',
    desc: 'Earn credit rewards for every return to spend in our shop, while tracking your verified CO₂ footprint offset.',
    icon: Sparkles,
    color: 'emerald',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    borderGlow: 'hover:border-emerald-500/30 dark:hover:border-emerald-400/20 hover:shadow-emerald-500/5'
  },
];

const HowItWorksSection = () => (
  <section className="my-24 relative px-6 md:px-12 py-16 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-xl overflow-hidden animate-fade-in-up transition-colors duration-300">
    {/* Decorative background gradients */}
    <div className="absolute top-0 right-0 w-80 h-80 bg-teal-200/10 dark:bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

    <div className="relative z-10 text-center max-w-2xl mx-auto mb-16">
      <span className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-50 dark:bg-teal-950/40 px-3.5 py-1.5 rounded-full">
        Platform Cycle
      </span>
      <h2 className="text-3xl md:text-4xl font-bold mt-4 text-slate-900 dark:text-white tracking-tight">
        A Smarter Way to Shop & Recycle
      </h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mt-3 leading-relaxed">
        We make circular commerce frictionless. Buy quality gear, return when done, and watch your credits and positive environmental impact grow.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
      {steps.map((step, idx) => {
        const IconComponent = step.icon;
        return (
          <div
            key={step.title}
            className={`group relative bg-white/90 dark:bg-slate-900/85 rounded-2xl border border-slate-100 dark:border-slate-800/60 p-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${step.borderGlow}`}
            style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
          >
            {/* Step Counter Badge */}
            <div className="absolute top-5 right-5 text-xs font-semibold text-slate-350 dark:text-slate-550 bg-slate-50 dark:bg-slate-850 px-2 py-0.5 rounded-md border border-slate-100 dark:border-slate-800 group-hover:border-slate-200 dark:group-hover:border-slate-700 transition-colors">
              0{idx + 1}
            </div>

            {/* Icon Sphere */}
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${step.bgLight} mb-6 shadow-sm group-hover:scale-110 transition duration-300`}>
              <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
            </div>

            <h3 className="font-bold text-lg mb-3 text-slate-900 dark:text-white tracking-tight">
              {step.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              {step.desc}
            </p>
          </div>
        );
      })}
    </div>
  </section>
);

export default HowItWorksSection;