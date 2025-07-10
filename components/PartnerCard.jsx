import React from 'react';

const PartnerCard = ({ partner, onSchedule }) => (
  <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow mb-3">
    <div>
      <div className="font-semibold text-gray-900">{partner.name}</div>
      <div className="text-gray-500 text-sm">{partner.type}</div>
    </div>
    <button
      className="px-4 py-2 rounded bg-[#2196f3] text-white font-semibold hover:bg-[#1769aa] transition-colors"
      onClick={() => onSchedule && onSchedule(partner)}
    >
      Schedule
    </button>
  </div>
);

export default PartnerCard; 