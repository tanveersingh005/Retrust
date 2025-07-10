import React from 'react';
import Footer from '../components/Footer';
import ImpactStats from '../components/ImpactStats';
import LevelProgress from '../components/LevelProgress';
import RedeemCredits from '../components/RedeemCredits';
import ImpactTimeline from '../components/ImpactTimeline';

const ImpactDashboard = () => {
  return (
    <>
      <div className="bg-[#f7faf7] min-h-screen w-full pt-24 pb-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight text-center">Your Impact</h1>
          <ImpactStats co2={120} credits={500} returned={25} rank="Top 10%" />
          <LevelProgress level={3} progress={75} nextLevel={4} />
          <RedeemCredits />
          <ImpactTimeline />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ImpactDashboard; 