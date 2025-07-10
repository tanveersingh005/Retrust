import React from 'react';

const ImpactStats = ({ co2 = 120, credits = 500, returned = 25, rank = 'Top 10%' }) => (
  <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8 animate-fade-in-up">
    <div className="bg-[#f1f6fa] rounded-xl p-6 flex flex-col items-start">
      <span className="text-base text-gray-500 mb-1">Total CO₂ Saved</span>
      <span className="text-2xl font-extrabold text-black">{co2} kg</span>
    </div>
    <div className="bg-[#f1f6fa] rounded-xl p-6 flex flex-col items-start">
      <span className="text-base text-gray-500 mb-1">Credits Earned</span>
      <span className="text-2xl font-extrabold text-black">{credits}</span>
    </div>
    <div className="bg-[#f1f6fa] rounded-xl p-6 flex flex-col items-start">
      <span className="text-base text-gray-500 mb-1">Products Returned</span>
      <span className="text-2xl font-extrabold text-black">{returned}</span>
    </div>
    <div className="bg-[#f1f6fa] rounded-xl p-6 flex flex-col items-start">
      <span className="text-base text-gray-500 mb-1">Rank</span>
      <span className="text-2xl font-extrabold text-black">{rank}</span>
    </div>
  </div>
);

export default ImpactStats; 