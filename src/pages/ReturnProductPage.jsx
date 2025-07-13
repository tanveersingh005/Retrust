import React, { useState } from 'react';
import Footer from '../components/Footer';
import ReturnForm from '../components/ReturnForm';
import ImageUploader from '../components/ImageUploader';
import MLPredictionCard from '../components/MLPredictionCard';
import ImpactSection from '../components/ImpactSection';
import axios from 'axios';
import { useAuth } from '../context/useAuth';

const API_URL = import.meta.env.VITE_API_URL;

const ReturnProductPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);
  const [impact, setImpact] = useState(null);
  const [returnId, setReturnId] = useState(null);
  const [redeemed, setRedeemed] = useState(false);
  const { token } = useAuth();

  const handleSubmit = async (data) => {
    setFormData(data);
    // Prepare images as URLs or base64 strings
    const images = (data.images || []).map(img => img.url || img);
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
  };

  const handleReset = () => {
    setFormData(null);
    setSubmitted(false);
    setImpact(null);
    setReturnId(null);
    setRedeemed(false);
  };

  const handleRedeem = async () => {
    if (!returnId) return;
    try {
      await axios.post(`${API_URL}/returns/${returnId}/redeem`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRedeemed(true);
      alert('Credits redeemed!');
    } catch {
      alert('Failed to redeem credits.');
    }
  };

  return (
    <>
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12 bg-gradient-to-br from-[#f8fafc] via-white to-[#e6f0ee]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">Return or List Your Product</h1>
            <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">Fill out the form below to list your item for return, resale, or donation. Help us build a more sustainable future!</p>
          </div>
          {!submitted ? (
            <ReturnForm onSubmit={handleSubmit} />
          ) : (
            <>
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 animate-fade-in-up">
                <div className="text-center text-2xl font-bold text-primary mb-2">Thank you for your submission!</div>
                <div className="text-center text-gray-500 mb-2">Our system has analyzed your item and provided the following insights:</div>
              </div>
              <MLPredictionCard
                image={formData?.images?.[0]?.url || './src/assets/tshirt.jpg'}
                condition={impact?.condition || 'Good'}
              />
              <div className="my-8 flex items-center justify-center">
                <div className="w-full max-w-xl border-t border-gray-200" />
              </div>
              <ImpactSection
                co2={impact?.co2}
                smartDecision={impact?.item}
                progress={impact?.co2}
                credits={impact?.credits}
                animate={true}
              />
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