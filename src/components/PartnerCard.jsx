import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Building2, Calendar } from 'lucide-react';

const PartnerCard = ({ partner, onSchedule }) => {
  const handleSchedule = () => {
    toast.success(`Schedule requested for ${partner.name}!`, {
      position: 'top-center',
      autoClose: 2500,
      icon: '📅',
      style: { fontWeight: 'bold', fontSize: '1rem' },
    });
    if (onSchedule) onSchedule(partner);
  };
  return (
    <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5 hover:shadow-md hover:border-slate-200 dark:hover:border-slate-700 transition-all duration-300 mb-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/35 flex-shrink-0">
          <Building2 className="w-4.5 h-4.5 text-teal-600 dark:text-teal-400" />
        </div>
        <div>
          <div className="font-bold text-slate-900 dark:text-white">{partner.name}</div>
          <div className="text-slate-500 dark:text-slate-400 text-sm">{partner.type}</div>
        </div>
      </div>
      <button
        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-teal-400/30 hover:-translate-y-0.5 transition-all duration-200"
        onClick={handleSchedule}
      >
        <Calendar className="w-3.5 h-3.5" />
        Schedule
      </button>
    </div>
  );
};

export default PartnerCard;