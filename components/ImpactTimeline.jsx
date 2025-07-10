import React from 'react';

const defaultMilestones = [
  {
    icon: (
      <img src="./assets/trophy.png" alt="First Product Returned" className="w-7 h-7 object-contain" />
    ),
    label: 'First Product Returned',
    date: 'June 15, 2023',
  },
  {
    icon: (
      <img src="./assets/milestone2.png" alt="Reached Level 2" className="w-7 h-7 object-contain" />
    ),
    label: 'Reached Level 2',
    date: 'July 20, 2023',
  },
  {
    icon: (
      <img src="./assets/milestone3.png" alt="Top 20% of Users" className="w-7 h-7 object-contain" />
    ),
    label: 'Top 20% of Users',
    date: 'August 5, 2023',
  },
];

const ImpactTimeline = ({ milestones = defaultMilestones }) => (
  <div className="mt-12 animate-fade-in-up">
    <h2 className="text-xl font-bold mb-6">Impact Timeline</h2>
    <div className="relative pl-8">
      {/* Vertical dashed line */}
      <div className="absolute left-3 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-[#d3dae6] z-0" />
      {milestones.map((m, idx) => (
        <div key={idx} className="mb-8 flex items-start gap-4 relative z-10">
          <div className="mt-1">{m.icon}</div>
          <div>
            <div className="font-semibold text-gray-900">{m.label}</div>
            <div className="text-[#2196f3] text-sm font-medium">{m.date}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ImpactTimeline; 