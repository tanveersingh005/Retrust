import React, { useEffect, useRef } from 'react';
import { Cloud, Lightbulb } from 'lucide-react';

const nextSteps = [
  { label: 'Resell', color: 'bg-blue-50 text-blue-700 border border-blue-100 hover:bg-blue-100/70' },
  { label: 'Repair', color: 'bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100/70' },
  { label: 'Recycle', color: 'bg-emerald-50 text-emerald-700 border border-emerald-100 hover:bg-emerald-100/70' },
  { label: 'Donate', color: 'bg-violet-50 text-violet-700 border border-violet-100 hover:bg-violet-100/70' },
];

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
    <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl border border-slate-100 shadow-sm p-8 animate-fade-in-up relative overflow-hidden">
      {/* Decorative blur orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-500/15">
                <Cloud className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-medium tracking-wide uppercase">CO₂ Saved</div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{co2}kg</div>
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-md shadow-teal-500/15">
                <Lightbulb className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-slate-500 text-xs font-medium tracking-wide uppercase">Smart Decision</div>
                <div className="text-2xl font-extrabold text-slate-900 tracking-tight">{smartDecision}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-3">Next Steps</div>
          <div className="flex flex-wrap gap-3">
            {nextSteps.map(step => (
              <button
                key={step.label}
                className={`px-5 py-2.5 rounded-full font-semibold text-sm ${step.color} transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
              >
                {step.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Sustainability Progress</span>
          <span className="text-slate-800 text-sm font-bold">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full mb-5 overflow-hidden">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full transition-all"
            style={{ width: animate ? 0 : `${progress}%` }}
          />
        </div>

        <div className="text-right text-slate-500 text-sm">
          Credits Earned: <span className="font-bold text-teal-600">{credits}</span>
        </div>
      </div>
    </div>
  );
};

export default ImpactSection;