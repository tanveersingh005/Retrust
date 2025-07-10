import React, { useState } from 'react';
import Footer from '../components/Footer';
import ReturnForm from '../components/ReturnForm';
import ImageUploader from '../components/ImageUploader';
import MLPredictionCard from '../components/MLPredictionCard';
import ImpactSection from '../components/ImpactSection';

// Simple CO2 and credits logic for demo
const getImpactStats = (form) => {
  if (!form) return { co2: 0, progress: 0, credits: 0, smartDecision: 'Resell' };
  let co2 = 5;
  let credits = 100;
  let progress = 30;
  let smartDecision = 'Resell';
  if (form.category && form.category.toLowerCase().includes('jeans')) { co2 += 7; credits += 50; progress += 10; }
  if (form.category && form.category.toLowerCase().includes('jacket')) { co2 += 10; credits += 80; progress += 20; }
  if (form.condition === 'Excellent') { credits += 50; progress += 10; }
  if (form.images && form.images.length > 1) { credits += 20 * (form.images.length - 1); progress += 5 * (form.images.length - 1); }
  if (form.productType === 'Electronics') { co2 += 12; credits += 100; progress += 20; smartDecision = 'Recycle'; }
  if (form.productType === 'Clothing') { smartDecision = 'Resell'; }
  if (form.productType === 'Accessories') { smartDecision = 'Donate'; }
  if (progress > 100) progress = 100;
  return { co2, credits, progress, smartDecision };
};

const ReturnProductPage = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleSubmit = (data) => {
    setFormData(data);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData(null);
    setSubmitted(false);
  };

  const impact = getImpactStats(formData);

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
                condition={formData?.condition || 'Good'}
              />
              <div className="my-8 flex items-center justify-center">
                <div className="w-full max-w-xl border-t border-gray-200" />
              </div>
              <ImpactSection
                co2={impact.co2}
                smartDecision={impact.smartDecision}
                progress={impact.progress}
                credits={impact.credits}
                animate={true}
              />
              <div className="flex justify-center mt-8">
                <button
                  className="px-6 py-3 rounded-lg bg-[#2e7d32] text-white font-bold border border-[#2e7d32] shadow hover:bg-[#256427] transition-colors duration-200"
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