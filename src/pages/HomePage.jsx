import React, { useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import StatsSection from '../components/StatsSection';
import HowItWorksSection from '../components/HowItWorksSection';
import FeaturedProductsSection from '../components/FeaturedProductsSection';
import EcoBananaRun from '../components/EcoBananaRun';
import Footer from '../components/Footer';

const HomePage = () => {
  const [showGame, setShowGame] = useState(true);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen w-full relative overflow-hidden transition-colors duration-300">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <main className="pt-28 pb-16 max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <HeroBanner />
        <StatsSection />
        <HowItWorksSection />
        <FeaturedProductsSection />
        
        {showGame ? (
          <EcoBananaRun onExit={() => setShowGame(false)} />
        ) : (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowGame(true)}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>🎮</span> Play Eco-Banana Run Game
            </button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage; 