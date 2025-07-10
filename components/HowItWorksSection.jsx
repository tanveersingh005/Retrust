import React from 'react';

const steps = [
  {
    title: 'Buy',
    desc: 'Shop high-quality refurbished items at great prices.',
    icon: (
      <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 shadow-md">
        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 7V6a6 6 0 1 1 12 0v1" />
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M16 11a4 4 0 0 1-8 0" />
        </svg>
      </span>
    ),
  },
  {
    title: 'Return',
    desc: 'Return your used items to us for refurbishment.',
    icon: (
      <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 mb-4 shadow-md">
        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M4 4v5h5" />
          <path d="M20 20v-5h-5" />
          <path d="M4 9a9 9 0 0 1 16 3" />
          <path d="M20 15a9 9 0 0 1-16-3" />
        </svg>
      </span>
    ),
  },
  {
    title: 'Earn Impact',
    desc: 'Earn credits for every item you return, contributing to a sustainable future.',
    icon: (
      <span className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4 shadow-md">
        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 2 4-4"/></svg>
      </span>
    ),
  },
];

const HowItWorksSection = () => (
  <section className="my-20 py-12 px-2 bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f0ee] rounded-3xl shadow-lg animate-fade-in-up delay-200">
    <h2 className="text-3xl font-extrabold mb-10 text-center text-gray-900 tracking-tight">How It Works</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
      {steps.map((step, idx) => (
        <div
          key={step.title}
          className={`bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl animate-fade-in-up`}
          style={{ animationDelay: `${0.2 + idx * 0.1}s` }}
        >
          {step.icon}
          <h3 className="font-semibold text-xl mb-2 text-gray-900">{step.title}</h3>
          <p className="text-gray-500 text-center text-base font-medium">{step.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorksSection; 