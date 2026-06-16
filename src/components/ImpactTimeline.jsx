import React from 'react';
import { Calendar, CheckCircle, Sparkles } from 'lucide-react';

const defaultMilestones = [
  {
    icon: Sparkles,
    label: 'Joined ReTrust+ Community',
    date: 'June 15, 2024',
    bg: 'bg-teal-50 dark:bg-teal-950/30 text-teal-600 dark:text-teal-400 border-teal-100 dark:border-teal-900/40',
  },
  {
    icon: CheckCircle,
    label: 'First Recycle Action Completed',
    date: 'July 20, 2024',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-900/40',
  },
  {
    icon: Calendar,
    label: 'Unlocked Level 3 Milestone',
    date: 'August 05, 2024',
    bg: 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/40',
  },
];

const ImpactTimeline = ({ milestones = defaultMilestones }) => (
  <div className="mt-12 animate-fade-in-up">
    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-8">Recycle Milestones</h2>
    <div className="relative pl-8 space-y-8">
      {/* Vertical line indicator */}
      <div className="absolute left-4.5 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
      
      {milestones.map((m, idx) => {
        // Fallback for m.icon if it's a react node / image
        const hasCustomIcon = React.isValidElement(m.icon);
        const IconComp = m.icon;
        
        return (
          <div key={idx} className="flex items-start gap-4 relative z-10 group">
            {/* Timeline bullet container */}
            <div className={`w-9.5 h-9.5 rounded-xl border flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm shrink-0 transition-transform duration-300 group-hover:scale-110 ${m.bg || 'bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-800'}`}>
              {hasCustomIcon ? (
                m.icon
              ) : (
                <IconComp className="w-4.5 h-4.5" />
              )}
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-150 dark:border-slate-800 p-4 shadow-sm flex-1">
              <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                {m.label}
              </h4>
              {m.date && (
                <p className="text-[10px] font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mt-1.5 flex items-center gap-1">
                  <span>📅</span> {m.date}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default ImpactTimeline;