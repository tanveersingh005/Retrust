import React from 'react';
import { Link } from 'react-router-dom';
import { Recycle, ArrowRight, Leaf } from 'lucide-react';

const HeroBanner = () => (
  <section className="relative flex flex-col items-center justify-center text-center py-20 md:py-32 rounded-3xl overflow-hidden min-h-[500px] md:min-h-[580px]">
    {/* Background image */}
    <img
      src="./assets/hero-bg.jpg"
      alt="Eco background"
      className="absolute inset-0 w-full h-full object-cover object-center"
    />
    {/* Strong overlay for readability */}
    <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-slate-900/70 to-emerald-900/80" />
    {/* Decorative glowing orbs */}
    <div className="absolute top-10 left-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

    {/* Content */}
    <div className="relative z-10 max-w-3xl mx-auto px-4 animate-fade-in-up">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium backdrop-blur-sm">
        <Leaf className="w-4 h-4 text-emerald-400" />
        Circular Economy Platform
      </div>

      <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-5 leading-tight tracking-tight">
        Re<span className="text-teal-400">Trust</span>
        <span className="text-emerald-400">+</span>
      </h1>

      <p className="text-lg md:text-xl text-white/80 mb-10 max-w-xl mx-auto font-medium leading-relaxed">
        Shop refurbished, return your items, and earn <span className="text-teal-300 font-semibold">eco-credits</span>. Together, let's build a circular future.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/shop">
          <button className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-bold text-base shadow-xl hover:from-teal-600 hover:to-emerald-600 transition-all duration-300 hover:shadow-teal-500/40 hover:-translate-y-0.5">
            Shop Refurbished
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
        <Link to="/return">
          <button className="group flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-white/10 border border-white/30 text-white font-bold text-base backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5">
            <Recycle className="w-4 h-4 text-emerald-300 group-hover:rotate-180 transition-transform duration-500" />
            Return Product
          </button>
        </Link>
      </div>

      {/* Quick stats */}
      <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
        {[
          { value: '12K+', label: 'CO₂ Saved (kg)' },
          { value: '3.2K', label: 'Items Returned' },
          { value: '5.8K', label: 'Credits Issued' },
        ].map(stat => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-extrabold text-white">{stat.value}</div>
            <div className="text-xs text-white/60 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HeroBanner;