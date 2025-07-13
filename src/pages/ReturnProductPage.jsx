import React, { useState } from 'react';
import Footer from '../components/Footer';
import ReturnForm from '../components/ReturnForm';
import ImageUploader from '../components/ImageUploader';
import MLPredictionCard from '../components/MLPredictionCard';
import ImpactSection from '../components/ImpactSection';
import axios from 'axios';
import { useAuth } from '../context/useAuth';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL;

const ReturnProductPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [impact, setImpact] = useState(null);
  const [returnId, setReturnId] = useState(null);
  const [redeemed, setRedeemed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { token, setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    // Prepare images as URLs or base64 strings
    const images = (data.images || []).map(img => img.url || img);
    setSubmitting(true);
    try {
      const res = await axios.post(`${API_URL}/returns`, {
        item: data.category,
        condition: data.condition,
        images,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setImpact({
        co2: res.data.co2Saved,
        credits: res.data.credits,
        status: res.data.status,
        id: res.data._id,
        condition: res.data.condition,
        item: res.data.item,
      });
      setReturnId(res.data._id);
      setSubmitted(true);
    } catch {
      alert('Failed to submit return.');
    }
    setSubmitting(false);
  };

  const handleReset = () => {
    setSubmitted(false);
    setImpact(null);
    setReturnId(null);
    setRedeemed(false);
  };

  const handleRedeem = async () => {
    if (!returnId) return;
    try {
      const res = await axios.post(`${API_URL}/returns/${returnId}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRedeemed(true);
      toast.success('Credits redeemed and added to your account!');
      if (res.data && res.data.user) setUser(res.data.user);
    } catch {
      toast.error('Failed to redeem credits.');
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12 bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f0ee] relative">
        {submitting && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm">
            <PacmanLoader color="#15803d" size={32} speedMultiplier={4} />
            <span className="mt-4 text-green-800 font-semibold text-lg animate-pulse">Submitting...</span>
          </div>
        )}
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Return or List Your Product</h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">Fill out the form below to list your item for return, resale, or donation. Help us build a more sustainable future!</p>
          </div>
          {!submitted ? (
            <ReturnForm onSubmit={handleSubmit} />
          ) : (
            <>
              <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 animate-fade-in-up border border-[#e0e7ef] max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100">
                      <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="#15803d"/></svg>
                    </span>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">CO₂ Saved</div>
                      <div className="text-3xl font-extrabold text-green-700 leading-tight">{impact?.co2 || 0}kg</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-xs text-gray-500 font-medium flex items-center gap-1">
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="10" stroke="#2563eb" strokeWidth="2"/></svg>
                      Smart Decision
                    </div>
                    <div className="text-2xl font-bold text-blue-700 leading-tight">{impact?.item || 'Other'}</div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-sm text-gray-600 font-semibold mb-2">Next Steps</div>
                  <div className="flex flex-wrap gap-3 mb-2">
                    <span className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 font-semibold shadow-sm border border-blue-100">Resell</span>
                    <span className="px-4 py-2 rounded-lg bg-yellow-50 text-yellow-700 font-semibold shadow-sm border border-yellow-100">Repair</span>
                    <span className="px-4 py-2 rounded-lg bg-green-50 text-green-700 font-semibold shadow-sm border border-green-100">Recycle</span>
                    <span className="px-4 py-2 rounded-lg bg-purple-50 text-purple-700 font-semibold shadow-sm border border-purple-100">Donate</span>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600 font-semibold">Sustainability Progress</span>
                    <span className="text-xs text-gray-500 font-semibold">{impact?.co2 ? Math.min(Math.round((impact.co2/100)*100), 100) : 2}%</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-400 to-green-700 rounded-full transition-all duration-700" style={{ width: `${impact?.co2 ? Math.min(Math.round((impact.co2/100)*100), 100) : 2}%` }}></div>
                  </div>
                  <div className="flex justify-end mt-1 text-xs text-gray-500 font-semibold">Credits Earned: <span className="ml-1 text-green-700 font-bold">{impact?.credits || 0}</span></div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-4">
                <button
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold shadow hover:bg-blue-700 transition-colors duration-200 text-lg"
                  onClick={() => navigate('/partner-locator')}
                >
                  <span className="inline-flex items-center gap-2">
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" fill="#fff"/></svg>
                    Find Nearby Centers
                  </span>
                </button>
              </div>
              <div className="flex flex-col items-center mt-8 gap-4">
                {!redeemed && (
                  <button
                    className="px-6 py-3 rounded-lg bg-[#2e7d32] text-white font-bold border border-[#2e7d32] shadow hover:bg-[#256427] transition-colors duration-200"
                    onClick={handleRedeem}
                  >
                    Redeem Credits
                  </button>
                )}
                {redeemed && <div className="text-green-700 font-bold">Credits redeemed and added to your account!</div>}
                <button
                  className="px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-bold border border-gray-300 shadow hover:bg-gray-300 transition-colors duration-200"
                  onClick={handleReset}
                >
                  Submit Another Item
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnProductPage; 