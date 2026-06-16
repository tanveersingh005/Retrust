import React from 'react';
import { Gift, Truck, Coins } from 'lucide-react';

const options = [
  {
    title: 'Eco-Delivery',
    desc: 'Get free carbon-neutral shipping on your next shop purchase.',
    credits: 100,
    icon: Truck,
    color: 'from-emerald-500 to-teal-500',
    bgLight: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40',
  },
  {
    title: 'Cashback Voucher',
    desc: 'Redeem credits for $10 cashback on items in our circular shop.',
    credits: 200,
    icon: Gift,
    color: 'from-amber-500 to-orange-500',
    bgLight: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
  },
];

const RedeemCredits = ({ onRedeem = () => {} }) => (
  <div className="mb-12 animate-fade-in-up">
    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">Available Rewards</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {options.map(opt => {
        const IconComponent = opt.icon;
        return (
          <div
            key={opt.title}
            className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-sm hover:shadow-md transition duration-300"
          >
            {/* Gradient Icon Plate */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${opt.color} flex items-center justify-center text-white shadow-md shrink-0`}>
              <IconComponent className="w-6 h-6" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-bold text-slate-800 dark:text-white text-base leading-tight">
                  {opt.title}
                </h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${opt.bgLight}`}>
                  {opt.credits} cr
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                {opt.desc}
              </p>
              <button
                className="group flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-650 hover:bg-teal-700 text-white font-bold text-xs shadow-sm transition duration-200 cursor-pointer"
                onClick={() => onRedeem(opt.title)}
              >
                <span>Redeem Reward</span>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default RedeemCredits;