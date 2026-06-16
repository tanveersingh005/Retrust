import React, { useEffect, useRef } from 'react';
import { Award, Zap } from 'lucide-react';

const LevelProgress = ({ level = 3, progress = 75, nextLevel = 4, label = 'Eco-Champion' }) => {
  const progressRef = useRef();

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        progressRef.current.style.transition = 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
        progressRef.current.style.width = `${progress}%`;
      }, 100);
    }
  }, [progress]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800 p-6 shadow-sm mb-8 animate-fade-in-up transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-teal-50 dark:bg-teal-950/40 flex items-center justify-center text-teal-600 dark:text-teal-400 shadow-sm">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 dark:text-white text-base">
              Level {level}: {label}
            </h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Keep recycling to unlock the next level</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-wider block">Level Progress</span>
          <span className="text-xl font-black text-teal-600 dark:text-teal-400 block mt-0.5">{progress}%</span>
        </div>
      </div>

      <div className="w-full h-3 bg-slate-100 dark:bg-slate-950 rounded-full overflow-hidden border border-slate-200/20 dark:border-slate-800 mb-3.5">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all"
          style={{ width: 0 }}
        />
      </div>

      {nextLevel && (
        <div className="flex items-center gap-1.5 text-xs text-teal-600 dark:text-teal-400 font-bold hover:text-teal-700 dark:hover:text-teal-300 transition duration-150">
          <Zap className="w-3.5 h-3.5 shrink-0" />
          <span>Next Rank: Level {nextLevel}</span>
        </div>
      )}
    </div>
  );
};

export default LevelProgress;