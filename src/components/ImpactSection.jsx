import React, { useEffect, useRef } from 'react';

const nextSteps = [
  { label: 'Resell', color: 'bg-blue-100 text-blue-700' },
  { label: 'Repair', color: 'bg-yellow-100 text-yellow-700' },
  { label: 'Recycle', color: 'bg-green-100 text-green-700' },
  { label: 'Donate', color: 'bg-purple-100 text-purple-700' },
];

const icons = {
  co2: (
    <svg className="w-7 h-7 text-green-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><text x="12" y="16" textAnchor="middle" fontSize="8" fill="currentColor">CO₂</text></svg>
  ),
  smart: (
    <svg className="w-7 h-7 text-blue-600 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7" /></svg>
  ),
};

const ImpactSection = ({
  co2 = 25,
  smartDecision = 'Resell',
  progress = 75,
  credits = 500,
  animate = true,
}) => {
  const progressRef = useRef();
  useEffect(() => {
    if (animate && progressRef.current) {
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        progressRef.current.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        progressRef.current.style.width = `${progress}%`;
      }, 100);
    }
  }, [progress, animate]);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center mb-1 text-gray-500 text-sm">{icons.co2}CO₂ Saved</div>
          <div className="text-2xl font-bold text-green-700 mb-2">{co2}kg</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="flex items-center mb-1 text-gray-500 text-sm">{icons.smart}Smart Decision</div>
          <div className="text-2xl font-bold text-blue-700 mb-2">{smartDecision}</div>
        </div>
      </div>
      <div className="mb-6">
        <div className="text-gray-500 text-sm mb-2">Next Steps</div>
        <div className="flex flex-wrap gap-3">
          {nextSteps.map(step => (
            <button
              key={step.label}
              className={`px-4 py-2 rounded-lg font-semibold ${step.color} hover:opacity-90 transition`}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-gray-500 text-sm">Sustainability Progress</span>
        <span className="text-gray-700 text-sm font-semibold">{progress}%</span>
      </div>
      <div className="w-full h-3 bg-gray-100 rounded-full mb-4 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-[#2e7d32] to-[#81c784] rounded-full transition-all"
          style={{ width: animate ? 0 : `${progress}%` }}
        />
      </div>
      <div className="text-right text-gray-500 text-sm">Credits Earned: <span className="font-bold text-primary">{credits}</span></div>
    </div>
  );
};

export default ImpactSection; 