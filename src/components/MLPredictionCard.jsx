import React from 'react';

const MLPredictionCard = ({ image, condition = 'Good' }) => (
  <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center mb-8 animate-fade-in-up">
    <img src={image} alt="ML Prediction" className="w-40 h-40 object-cover rounded-lg mb-4" />
    <div className="text-lg font-semibold text-gray-700 mb-1">Predicted Condition</div>
    <div className="text-2xl font-bold text-green-700 mb-2">{condition}</div>
    <span className="text-gray-400 text-sm">ML Prediction</span>
  </div>
);

export default MLPredictionCard; 