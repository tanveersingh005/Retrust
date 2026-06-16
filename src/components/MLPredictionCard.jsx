import React from 'react';

const MLPredictionCard = ({ image, condition = 'Good' }) => (
  <div className="w-full max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-lg p-6 flex flex-col items-center mb-8 animate-fade-in-up transition-colors duration-300">
    <img src={image} alt="ML Prediction" className="w-40 h-40 object-cover rounded-lg mb-4" />
    <div className="text-lg font-semibold text-gray-700 dark:text-slate-200 mb-1">Predicted Condition</div>
    <div className="text-2xl font-bold text-green-700 dark:text-emerald-400 mb-2">{condition}</div>
    <span className="text-gray-400 dark:text-slate-500 text-sm">ML Prediction</span>
  </div>
);

export default MLPredictionCard;