import React, { useState, useEffect } from 'react';
import { Leaf } from 'lucide-react';

const LoadingSpinner = ({ inline = false, size = 'lg', text = 'Loading...' }) => {
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = [
    "Nurturing the circular ecosystem...",
    "Calculating carbon offsets...",
    "Renewing electronic assets...",
    "Restoring resources, retrusting future...",
    "Cultivating sustainable commerce...",
    "Reducing e-waste, one device at a time..."
  ];

  useEffect(() => {
    if (inline) return;
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [inline]);

  // Size configurations
  const spinnerSizes = {
    sm: { ring: 'w-10 h-10', inner: 'w-7 h-7', icon: 'w-4 h-4', border: 'border-2' },
    md: { ring: 'w-16 h-16', inner: 'w-11 h-11', icon: 'w-6 h-6', border: 'border-[3px]' },
    lg: { ring: 'w-24 h-24', inner: 'w-16 h-16', icon: 'w-8 h-8', border: 'border-4' }
  };

  const currentSize = spinnerSizes[size] || spinnerSizes.lg;

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center">
      <div className={`relative ${currentSize.ring} flex items-center justify-center`}>
        {/* Outer spinning gradient ring */}
        <div className={`absolute inset-0 rounded-full ${currentSize.border} border-teal-500/10 border-t-teal-500 border-r-emerald-500 animate-spin`} />
        
        {/* Inner pulsing circle with Leaf */}
        <div className={`absolute ${currentSize.inner} rounded-full bg-gradient-to-tr from-teal-500/10 to-emerald-500/10 dark:from-teal-500/20 dark:to-emerald-500/20 animate-pulse flex items-center justify-center`}>
          <Leaf className={`${currentSize.icon} text-teal-650 dark:text-teal-400 animate-bounce`} style={{ animationDuration: '2s' }} />
        </div>
      </div>
      
      {!inline && (
        <div className="mt-6 text-center space-y-2 relative z-10">
          <div className="text-teal-800 dark:text-teal-400 font-extrabold text-xl tracking-tight animate-pulse">
            {text}
          </div>
          <div className="text-slate-500 dark:text-slate-400 text-xs font-semibold h-4 min-w-[200px] transition-all duration-500">
            {messages[msgIndex]}
          </div>
        </div>
      )}
    </div>
  );

  if (inline) {
    return spinnerContent;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-50/70 dark:bg-slate-950/70 backdrop-blur-md transition-colors duration-300">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-100 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-2xl max-w-sm w-full mx-4 flex flex-col items-center relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        
        {spinnerContent}
      </div>
    </div>
  );
};

export default LoadingSpinner;