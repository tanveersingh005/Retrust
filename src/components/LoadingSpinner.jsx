import React from 'react';
import PacmanLoader from 'react-spinners/PacmanLoader';

const LoadingSpinner = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
    <div className="flex flex-col items-center">
      <PacmanLoader color="#15803d" size={32} speedMultiplier={4} />
      <span className="mt-4 text-green-800 font-semibold text-lg animate-pulse">Loading...</span>
    </div>
  </div>
);

export default LoadingSpinner; 