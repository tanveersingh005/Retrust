import React, { useEffect, useRef } from 'react';

const LevelProgress = ({ level = 3, progress = 75, nextLevel = 4, label = 'Eco-Champion' }) => {
  const progressRef = useRef();
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = '0%';
      setTimeout(() => {
        progressRef.current.style.transition = 'width 1.2s cubic-bezier(0.4,0,0.2,1)';
        progressRef.current.style.width = `${progress}%`;
      }, 100);
    }
  }, [progress]);

  return (
    <div className="mb-8 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-1">
        <span className="font-semibold text-base text-gray-800">Level {level}: {label}</span>
        <span className="ml-auto text-sm text-gray-500">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-[#e3eaf2] rounded-full mb-1 overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-[#2196f3] rounded-full transition-all"
          style={{ width: 0 }}
        />
      </div>
      <div className="text-left text-sm text-[#2196f3] font-medium cursor-pointer">Next Level: {nextLevel}</div>
    </div>
  );
};

export default LevelProgress; 