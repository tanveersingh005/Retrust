import React from 'react';
import { ArrowRight, Leaf, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: 'Refurbished Laptop',
    desc: 'High-performance workhorse machine, carefully graded & certified like new.',
    img: './assets/laptop.jpg',
    condition: 'Excellent',
    borderGlow: 'hover:border-teal-500/20 dark:hover:border-teal-400/10 hover:shadow-teal-500/5',
    badge: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
  },
  {
    name: 'Refurbished Smartwatch',
    desc: 'Latest fitness tracking & notification hub, fully checked & restored.',
    img: './assets/watch.jpg',
    condition: 'Good',
    borderGlow: 'hover:border-amber-500/20 dark:hover:border-amber-400/10 hover:shadow-amber-500/5',
    badge: 'bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30'
  },
  {
    name: 'Refurbished Headphones',
    desc: 'Premium active noise-cancelling headphones, pure acoustic condition.',
    img: './assets/headphones.jpg',
    condition: 'Excellent',
    borderGlow: 'hover:border-teal-500/20 dark:hover:border-teal-400/10 hover:shadow-teal-500/5',
    badge: 'bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/30'
  },
];

const FeaturedProductsSection = () => (
  <section className="my-24 relative animate-fade-in-up transition-colors duration-300">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
      <div>
        <span className="text-teal-600 dark:text-teal-400 font-semibold text-xs tracking-wider uppercase bg-teal-50 dark:bg-teal-950/40 px-3 py-1 rounded-full">
          Featured Deals
        </span>
        <h2 className="text-2xl md:text-3xl font-bold mt-3 text-slate-900 dark:text-white tracking-tight">
          Trending Refurbished Gear
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
          Top-selling products that keep carbon emissions out of the atmosphere.
        </p>
      </div>

      <Link
        to="/shop"
        className="group flex items-center gap-1.5 text-xs font-bold text-teal-650 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 transition whitespace-nowrap"
      >
        <span>Explore Circular Shop</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
      </Link>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <div
          key={product.name}
          className={`group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/80 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${product.borderGlow}`}
        >
          <div>
            <div className="aspect-video w-full bg-slate-50 dark:bg-slate-950 rounded-2xl overflow-hidden mb-5 flex items-center justify-center border border-slate-100 dark:border-slate-850">
              <img
                src={product.img}
                alt={product.name}
                className="w-24 h-24 object-contain group-hover:scale-110 transition duration-500"
              />
            </div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-base leading-tight group-hover:text-teal-650 dark:group-hover:text-teal-400 transition-colors">
                {product.name}
              </h4>
              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded border ${product.badge}`}>
                {product.condition}
              </span>
            </div>
            <p className="text-slate-505 dark:text-slate-400 text-xs leading-relaxed mb-4">
              {product.desc}
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
            <Leaf className="w-4 h-4" />
            <span>Reduces E-waste footprint</span>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedProductsSection;