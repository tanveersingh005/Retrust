import React from 'react';
import HeroBanner from '../components/HeroBanner';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="bg-[#f7faf7] min-h-screen w-full">
      <main className="pt-24 max-w-7xl mx-auto px-4 sm:px-8">
        <HeroBanner />
        <StatsSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 