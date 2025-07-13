import React, { useEffect } from 'react';

const toastColors = {
  success: 'bg-green-600 text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-blue-600 text-white',
};

const NotificationToast = ({ message, type = 'info', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 ${toastColors[type]} animate-fade-in-up`}
      style={{ minWidth: 220 }}
    >
      {type === 'success' && (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" opacity=".15"/><path d="M8 12.5l2.5 2.5L16 9.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      )}
      {type === 'error' && (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" opacity=".15"/><path d="M15 9l-6 6M9 9l6 6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
      )}
      {type === 'info' && (
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff" opacity=".15"/><path d="M12 8v4m0 4h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
      )}
      <span className="font-semibold text-base">{message}</span>
      <button onClick={onClose} className="ml-2 text-white/80 hover:text-white text-lg">&times;</button>
    </div>
  );
};

export default NotificationToast; 