import React from 'react';

const stats = [
  { label: 'CO₂ Saved', value: '12,450 kg', color: 'text-[#2e7d32]' },
  { label: 'Items Returned', value: '3,200', color: 'text-[#1976d2]' },
  { label: 'Credits Issued', value: '$5,800', color: 'text-[#f9a825]' },
];

const StatsSection = () => (
  <section className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 my-12 animate-fade-in-up delay-100">
    {stats.map((stat) => (
      <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center">
        <span className={`text-3xl md:text-4xl font-extrabold ${stat.color}`}>{stat.value}</span>
        <span className="text-gray-500 mt-2 text-lg font-medium">{stat.label}</span>
      </div>
    ))}
  </section>
);

export default StatsSection; 