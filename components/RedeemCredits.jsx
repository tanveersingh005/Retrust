import React from 'react';

const options = [
  {
    title: 'Eco-Delivery',
    desc: 'Use 100 credits for free eco-friendly shipping on your next purchase.',
    credits: 100,
    img: './src/assets/eco-delivery.jpg',
  },
  {
    title: 'Cashback',
    desc: 'Redeem 200 credits for a $10 cashback on your next purchase.',
    credits: 200,
    img: './src/assets/cashback.jpg',
  },
];

const RedeemCredits = ({ onRedeem = () => {} }) => (
  <div className="mb-12 animate-fade-in-up">
    <h2 className="text-xl font-bold mb-6">Redeem Credits</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {options.map(opt => (
        <div key={opt.title} className=" rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <img src={opt.img} alt={opt.title} className="w-32 h-22 object-cover rounded-lg shadow" />
          <div className="flex-1">
            <div className="font-semibold text-lg mb-1 text-gray-700">{opt.title}</div>
            <div className="text-gray-500 text-sm mb-2">{opt.desc}</div>
            <button
              className="px-4 py-2 rounded bg-[#2e7d32] text-white font-semibold shadow hover:bg-[#256427] transition-colors"
              onClick={() => onRedeem(opt.title)}
            >
              Redeem
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default RedeemCredits; 