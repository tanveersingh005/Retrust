import React, { useState } from 'react';
import Footer from '../components/Footer';
import PartnerMap from '../components/PartnerMap';
import PartnerCard from '../components/PartnerCard';

const partners = [
  { name: 'EcoTech Recyclers', type: 'Electronics, Small Appliances' },
  { name: 'Renew Threads', type: 'Clothing, Textiles' },
  { name: 'ReHome Refurbishers', type: 'Furniture, Large Items' },
  { name: 'GreenLeaf Recycling', type: 'Bulk Pickup Available' },
];

const PartnerLocatorPage = () => {
  const [location, setLocation] = useState('');

  const handleSchedule = (partner) => {
    alert(`Schedule requested for ${partner.name}`);
  };

  return (
    <>
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">Find Sustainable Partners Near You</h1>
          <PartnerMap location={location} setLocation={setLocation} />
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Local Partners</h2>
            {partners.map((partner, idx) => (
              <PartnerCard key={idx} partner={partner} onSchedule={handleSchedule} />
            ))}
          </div>
          <div className="flex justify-center">
            <button className="px-6 py-3 rounded-lg bg-[#2196f3] text-white font-semibold shadow hover:bg-[#1769aa] transition-colors">View All Partners</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PartnerLocatorPage; 